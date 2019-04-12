declare global {
    namespace bitfinex {
        type BookItem = [number, number, number];

        type OrderBook = {
            ask: BookItem[];
            bid: BookItem[];
        }

        type Ticker
            = [string, number, number, number, number, number, number, number, number, number, number];
    }
}

export {};
