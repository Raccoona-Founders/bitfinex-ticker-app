export type Coin = {
    shortSymbol: string;
    symbol: string;
    name: string;
}

export const coinList: Record<string, Coin> = {
    USD: {
        shortSymbol: 'USD',
        symbol: 'USD',
        name: 'US Dollar',
    },
    BTC: {
        shortSymbol: 'BTC',
        symbol: 'BTC',
        name: 'Bitcoin',
    },
    DSH: {
        shortSymbol: 'DSH',
        symbol: 'DASH',
        name: 'Dash',
    },
};