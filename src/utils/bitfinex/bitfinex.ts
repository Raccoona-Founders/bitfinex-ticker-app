import Axios, { AxiosInstance } from 'axios';

export default class Bitfinex {
    protected readonly client: AxiosInstance;

    public constructor() {
        this.client = Axios.create({
            baseURL: 'https://api-pub.bitfinex.com/v2',
        });
    }


    public async tickers(symbols?: string[]): Promise<bitfinex.Ticker[]> {
        const symbolsString = symbols ? symbols.join(',') : 'ALL';

        const { data } = await this.client.get(`/tickers?symbols=${symbolsString}`);

        return data;
    }


    public async book(symbol: string, precision: string = 'P0', len: number = 25): Promise<bitfinex.OrderBook> {
        if ([25, 100].indexOf(len) < 0) len = 25;

        const { data } = await this.client.get<bitfinex.BookItem[]>(`/book/${symbol}/${precision}?len=${len}`);

        const ask: bitfinex.BookItem[] = [];
        const bid: bitfinex.BookItem[] = [];

        data.map((item: bitfinex.BookItem) => {
            item[2] > 0
                ? ask.push([item[0], item[1], Math.abs(item[2])])
                : bid.push([item[0], item[1], Math.abs(item[2])]);
        });

        return { ask, bid };
    }
}
