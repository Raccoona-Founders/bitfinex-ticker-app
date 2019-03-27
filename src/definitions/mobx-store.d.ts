import { UsdCalculator } from 'utils/currency-rate';

declare global {
    export namespace mobx {
        type Store
            = ticker.WithTickerProps
            & user.WithUserProps;

        /**
         * This model helps us to track Ticker list
         */
        namespace ticker {
            interface Market {
                symbol(): string;

                baseAsset(): string;

                baseName(): string;

                isBaseFiat(): boolean;

                quoteAsset(): string;

                quoteName(): string;

                isQuoteFiat(): boolean;
            }

            type Coin = {
                shortSymbol: string;
                symbol: string;
                name: string;
            };

            type Ticker = {
                key: string;
                symbol: string;
                type: 'futures' | 'ticker';
                bid: number;
                bid_size: number;
                ask: number;
                ask_size: number;
                daily_change: number;
                daily_change_perc: number;
                last_price: number;
                volume: number;
                high: number;
                low: number;
            };

            interface TickerModel {
                tickers: Record<string, Ticker>;
                favorite: FavoriteModel;
                lastUpdate?: string;
                usdCalculator: UsdCalculator;

                fetchTickers(): Promise<void>;

                getFavorite(): Ticker[];

                getTicker(tickerSymbol: string): Ticker;

                getTickers(tickerSymbols?: string[]): Ticker[];

                getMarketVolume(): Numeral;
            }

            interface FavoriteModel {
                exists(marketSymbol: string): boolean;

                add(marketSymbol: string): void;

                remove(marketSymbol: string): void;

                getList(): string[];

                setList(marketSymbols: string[]): void;
            }

            type WithTickerProps = {
                Ticker: TickerModel,
            };
        }

        /**
         * Mobx User
         */
        namespace user {
            interface UserModel {
                userId?: string;
                telegram?: string;
                displayName?: string;

                setDisplayName(name: string): void;

                setTelegram(telegram: string): void;
            }

            type WithUserProps = {
                User: UserModel,
            };
        }
    }
}

export {};
