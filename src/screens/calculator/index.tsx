import React from 'react';
import { Keyboard, ActivityIndicator, View } from 'react-native';
import { Router, Switch, Route, RouteComponentProps } from 'react-router-native';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps } from 'react-navigation';
import * as History from 'history';
import { wait } from 'utils/helper';
import AnalTracker from 'utils/ga-tracker';
import { BitfinexClient } from 'utils/bitfinex';
import OrderBookProcessor from 'utils/order-book-processor';
import { ShadeScrollCard } from 'components/shade-navigator';
import Topic from 'components/topic';
import { CalculatorMode, OperationMode } from './common';
import OrderBookCalc from './order-book';


type State = {
    orderBook?: OrderBookProcessor;
    mode: CalculatorMode
};

type CalculatorScreenOuterProps = NavigationInjectedProps<{ marketSymbol: string; }>;
type CalculatorScreenProps = CalculatorScreenOuterProps & mobx.ticker.WithTickerProps;


@inject('Ticker')
@observer
export default class CalculatorScreen extends React.Component<CalculatorScreenProps, State> {
    public state: State = {
        orderBook: undefined,
        mode: CalculatorMode.LastPrice,
    };

    protected _history: History.MemoryHistory;

    public constructor(props: CalculatorScreenProps) {
        super(props);

        this._history = History.createMemoryHistory({
            initialIndex: 0,
            initialEntries: [`/${OperationMode.Buy}`],
        });
    }

    public async componentDidMount(): Promise<void> {
        const marketSymbol = this._marketSymbol;
        const market = this.props.Ticker.getMarket(marketSymbol);

        this.props.navigation.addListener('willBlur', () => {
            Keyboard.dismiss();
        });

        AnalTracker.logEvent('open_calculator', {
            market: market.symbol(),
        });

        await wait(300);

        try {
            const orderBook = await BitfinexClient.book(marketSymbol, 'P0', 100);

            this.setState({
                orderBook: new OrderBookProcessor(orderBook, 100),
            });
        } catch (error) {
            console.warn(error);
        }
    }


    public render(): JSX.Element {
        const { Ticker } = this.props;

        const market = this._currentMarket;
        const tick = Ticker.getTicker(market.symbol());

        if (!tick) {
            return <ShadeScrollCard />;
        }

        return (
            <ShadeScrollCard>
                <Topic title={`Calculate ${market.baseAsset()}/${market.quoteAsset()}`} />
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Router history={this._history}>
                        <Switch>
                            <Route path="/:operation"
                                   render={this.__renderOrderBookCalculator}
                            />
                        </Switch>
                    </Router>
                </View>
            </ShadeScrollCard>
        );
    }


    protected get _marketSymbol(): string {
        return this.props.navigation.getParam('marketSymbol');
    }

    protected get _currentMarket(): mobx.ticker.IMarket {
        const symbol = this._marketSymbol;

        return this.props.Ticker.getMarket(symbol);
    }

    protected __renderOrderBookCalculator = (props: RouteComponentProps<any>) => {
        const { Ticker } = this.props;
        const { orderBook } = this.state;

        const market = this._currentMarket;
        const tick = Ticker.getTicker(market.symbol());

        if (!orderBook || !tick) {
            return <ActivityIndicator />;
        }

        const usdCalculator = Ticker.usdCalculator;
        const usdPrice = usdCalculator.getUsdPrice(market.symbol());

        // @ts-ignore
        return <OrderBookCalc
            ticker={tick}
            orderBook={orderBook}
            market={market}
            usdPrice={usdPrice.value()}
            {...props}
        />;
    };
}
