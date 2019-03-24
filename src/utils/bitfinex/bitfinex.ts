import Axios, {AxiosInstance} from 'axios';

export type BitfinexTicker
    = [string, number, number, number, number, number, number, number, number, number, number];

export default class Bitfinex {
    protected readonly client: AxiosInstance;

    public constructor() {
        this.client = Axios.create({
            baseURL: 'https://api-pub.bitfinex.com/v2',
        });
    }

    public async tickers(symbols?: string[]): Promise<BitfinexTicker[]> {
        const symbolsString = symbols ? symbols.join(',') : 'ALL';

        const {data} = await this.client.get(`/tickers?symbols=${symbolsString}`);

        return data;
    }
}
