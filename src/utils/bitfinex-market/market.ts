import { coinList } from 'utils/bitfinex-market/coin-list';


const fiatsList = ['USD', 'EUR', 'GBP', 'JPY', 'CHN'];

export default class Market implements mobx.ticker.Market {
    protected _symbol: string;
    protected _base: mobx.ticker.Coin;
    protected _quote: mobx.ticker.Coin;

    public constructor(symbol: string) {
        this._symbol = symbol;

        const baseAsset = symbol.substr(1, 3);
        this._base = coinList[baseAsset] || {
            symbol: baseAsset,
            shortSymbol: baseAsset,
            name: baseAsset,
        };

        const quoteAsset = symbol.substr(symbol.length - 3);
        this._quote = coinList[quoteAsset] || {
            symbol: quoteAsset,
            shortSymbol: quoteAsset,
            name: quoteAsset,
        };
    }


    public symbol(): string {
        return this._symbol;
    }

    public baseAsset(): string {
        return this._base.shortSymbol;
    }

    public baseName(): string {
        return this._base.name;
    }

    public isBaseFiat(): boolean {
        return this._base.shortSymbol;
    }

    public quoteAsset(): string {
        return this._quote.shortSymbol;
    }

    public quoteName(): string {
        return this._quote.name;
    }

    public isQuoteFiat(): boolean {
        return this._quote.shortSymbol;
    }
}
