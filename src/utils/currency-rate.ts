import Numeral from 'numeral';
import { find } from 'lodash';

export class UsdCalculator {
    protected tickers: Record<string, mobx.ticker.TTicker>;

    public constructor(tickers: Record<string, mobx.ticker.TTicker>) {
        this.tickers = tickers;
    }

    public getUsdPrice(marketSymbol: string): Numeral {
        const tickerPrice = this.getTickerPrice(marketSymbol);
        const end = marketSymbol.substr(marketSymbol.length - 3);

        if (end === 'USD') {
            return Numeral(tickerPrice);
        }

        const usdPrice = this.getTickerPrice(`t${end}USD`);

        return Numeral(tickerPrice).multiply(usdPrice);
    }


    public getBtcPrice(marketSymbol: string): number {
        const price = this.getTickerPrice('tBTCUSD');

        return Numeral(1).divide(price).value();
    }


    protected getTickerPrice(marketSymbol: string): number {
        const ticker = find(this.tickers, { symbol: marketSymbol });

        if (!ticker) {
            return 0;
        }

        return ticker.last_price;
    }
}
