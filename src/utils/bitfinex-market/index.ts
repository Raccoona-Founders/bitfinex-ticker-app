import Market from './market';

export default class MarketManager {
    protected cache: Record<string, mobx.ticker.Market> = {};

    getMarket(symbol: string): mobx.ticker.Market {
        if (symbol in this.cache) {
            return this.cache[symbol];
        }

        return this.cache[symbol] = new Market();
    }
}
