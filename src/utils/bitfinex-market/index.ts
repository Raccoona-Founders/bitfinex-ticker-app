import BitfinexMarket from './market';

export default class MarketManager {
    protected cache: Record<string, BitfinexMarket> = {};

    getMarket(symbol: string): BitfinexMarket {
        if (symbol in this.cache) {
            return this.cache[symbol];
        }

        return this.cache[symbol] = new BitfinexMarket();
    }
}
