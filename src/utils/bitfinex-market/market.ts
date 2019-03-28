import { coinList } from 'utils/bitfinex-market/coin-list';


const fiatsList = ['USD', 'EUR', 'GBP', 'JPY', 'CHN', 'CHF'];

export default class Market implements mobx.ticker.IMarket {
    protected _symbol: string;
    protected _base: mobx.ticker.TCoin;
    protected _quote: mobx.ticker.TCoin;

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
        return fiatsList.indexOf(this._base.shortSymbol) >= 0;
    }

    public quoteAsset(): string {
        return this._quote.shortSymbol;
    }

    public quoteName(): string {
        return this._quote.name;
    }

    public isQuoteFiat(): boolean {
        return fiatsList.indexOf(this._quote.shortSymbol) >= 0;
    }
}
