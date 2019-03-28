import Market from './market';

export default class MarketProvider implements mobx.ticker.IMarketProvider {
    protected cache: Record<string, mobx.ticker.IMarket> = {};

    public getMarket(symbol: string): mobx.ticker.IMarket {
        if (symbol in this.cache) {
            return this.cache[symbol];
        }

        return this.cache[symbol] = new Market(symbol);
    }
}
