import { get, forEach, find, values, filter } from 'lodash';
import { action, computed, observable, runInAction } from 'mobx';
import Numeral from 'numeral';
import ModelAsyncStorage from 'mobx-store/common/model-async-storage';
import { UsdCalculator } from 'utils/currency-rate';
import { BitfinexClient } from 'utils/bitfinex';
import FavoriteModel from './favorite-model';
import Helper from './helper';

const TICKER_UPDATE_TIMEOUT = 10 * 60 * 1000;

export default class TickerModel extends ModelAsyncStorage implements mobx.ticker.TickerModel {
    @observable
    public tickers: Record<string, mobx.ticker.Ticker> = {};

    @observable
    public favorite: mobx.ticker.FavoriteModel;

    @observable
    public lastUpdate?: string;


    @action
    public static create(): TickerModel {
        return new TickerModel();
    }


    public constructor() {
        super();

        this.favorite = new FavoriteModel();
    }


    public getStoreKey(): string {
        return 'BitfinexTicker@Mobx_Ticker';
    }


    @action
    public fetchTickers = async (): Promise<void> => {
        const newTickers: Record<string, mobx.ticker.Ticker> = {};

        try {
            const tickers = await BitfinexClient.tickers();
            forEach(tickers, (ticker) => {
                const newT = Helper.mapTicker(ticker);
                if (newT.type === 'ticker') newTickers[ticker[0]] = newT;
            });
        } catch (e) {
        }

        runInAction(() => {
            this.tickers = {
                ...this.tickers,
                ...newTickers,
            };
            this.lastUpdate = new Date().toISOString();
        });
    };


    public getFavorite(): mobx.ticker.Ticker[] {
        const list = this.favorite.getList();

        const tickers: mobx.ticker.Ticker[] = [];

        forEach(this.tickers, (ticker: mobx.ticker.Ticker) => {
            if (list.indexOf(ticker.symbol) >= 0) {
                tickers.push(ticker);
            }
        });

        return tickers;
    }


    public getTicker(tickerSymbol: string): mobx.ticker.Ticker {
        const ticker = find(this.tickers, { symbol: tickerSymbol });

        if (!ticker) {
            throw new Error('Fuck!');
        }

        return ticker;
    }


    public getTickers(tickerSymbols?: string[]): mobx.ticker.Ticker[] {
        if (!tickerSymbols) {
            return values(this.tickers);
        }

        return filter(this.tickers, (t: mobx.ticker.Ticker) => tickerSymbols.indexOf(t.symbol) >= 0);
    }


    public getMarketVolume(): Numeral {
        let sum = 0;
        const calculator = this.usdCalculator;

        forEach(this.tickers, (ticker: mobx.ticker.Ticker, market: string) => {
            if (ticker.type !== 'ticker') {
                return;
            }

            if (ticker.symbol.endsWith('USD')) {
                sum += ticker.volume;
            } else {
                sum += calculator.getUsdPrice(ticker.symbol).multiply(ticker.volume).value();
            }
        });

        return Numeral(sum);
    }


    @computed
    public get usdCalculator(): UsdCalculator {
        return new UsdCalculator(this.tickers);
    }


    @action
    public async initialize(): Promise<void> {
        await super.initialize();

        this.__runUpdater()
            .then(() => console.log('Ticker updater successfully run'));
    }


    protected _toJSON(): Object {
        return {
            tickers: this.tickers,
            lastUpdate: this.lastUpdate,
            favorite: this.favorite.getList(),
        };
    }


    @action
    protected _fromJSON(data: Object) {
        this.tickers = get(data, 'tickers', {});
        this.lastUpdate = get(data, 'lastUpdate', undefined);

        this.favorite.setList(get(data, 'favorite', []));
    }


    @action
    private async __runUpdater() {
        const lastUpdateDate = new Date(this.lastUpdate as string);

        const needUpdate
            = !this.lastUpdate
            || lastUpdateDate.getTime() + TICKER_UPDATE_TIMEOUT < new Date().getTime();

        if (needUpdate) {
            await this.fetchTickers();
        }

        setInterval(this.fetchTickers, TICKER_UPDATE_TIMEOUT);
    }
}
