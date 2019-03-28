import {BitfinexTicker} from 'utils/bitfinex/bitfinex';

function mapTicker(ticker: BitfinexTicker): mobx.ticker.TTicker {
    const [
        symbol,
        bid,
        bid_size,
        ask,
        ask_size,
        daily_change,
        daily_change_perc,
        last_price,
        volume,
        high,
        low
    ] = ticker;

    return {
        key: symbol,
        symbol: symbol,
        type: symbol.startsWith('f') ? 'futures' : 'ticker',
        bid: bid,
        bid_size: bid_size,
        ask: ask,
        ask_size: ask_size,
        daily_change: daily_change,
        daily_change_perc: daily_change_perc,
        last_price: last_price,
        volume: volume,
        high: high,
        low: low,
    };
}

export default { mapTicker };