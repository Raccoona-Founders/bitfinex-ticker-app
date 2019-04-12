import React from 'react';
import { View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps } from 'react-navigation';
import { __ } from 'utils/i18n';
import AnalTracker from 'utils/ga-tracker';
import { BitfinexClient } from 'utils/bitfinex';
import OrderBookProcessor from 'utils/order-book-processor';
import { SpanText } from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import ResistanceChart from './components/resistance-chart';
import styles from './depth.style';
import SideRows from './side-rows';

const MIN_PRECISION = 0;
const MAX_PRECISION = 4;
const ORDER_DEPTH = 25;

type State = {
    orderBook?: OrderBookProcessor;
    error?: string;
    precisionIndex: number;
};

type DepthScreenOuterProps
    = NavigationInjectedProps<{ marketSymbol: string; }>;

type DepthScreenProps
    = DepthScreenOuterProps
    & mobx.ticker.WithTickerProps;

// @ts-ignore
@compose<DepthScreenProps, DepthScreenOuterProps>(
    inject('Ticker'),
    observer,
)
export default class OrderBookScreen extends React.Component<DepthScreenProps, State> {
    public state: State = {
        orderBook: undefined,
        error: undefined,
        precisionIndex: 0,
    };

    public get precision(): number {
        return this.state.precisionIndex;
    }


    public async componentDidMount(): Promise<void> {
        const marketSymbol = this.props.navigation.getParam('marketSymbol');

        AnalTracker.logEvent('OrderBook_Open', {
            market: marketSymbol,
        });

        setTimeout(this.__loadOrderBook, 600);
    }


    public render(): JSX.Element {
        const { Ticker } = this.props;
        const { orderBook, error } = this.state;
        const marketSymbol = this.props.navigation.getParam('marketSymbol');
        const market = Ticker.getMarket(marketSymbol);

        return (
            <ShadeScrollCard renderFooter={this.__renderOrderBookFooter}>
                <View style={styles.container}>
                    <View style={styles.topic}>
                        <SpanText style={styles.topicText}>{__('Order Book')}</SpanText>
                        <SpanText style={[styles.topicText, styles.topicTextMarket]}>
                            {market.baseAsset()} / {market.quoteAsset()}
                        </SpanText>
                    </View>

                    {orderBook ? (
                        <View style={styles.depthSheetContainer}>
                            {this.__renderDepthSheet(market, orderBook)}
                        </View>
                    ) : (
                        error ? <SpanText>{error}</SpanText> : <ActivityIndicator />
                    )}
                </View>
            </ShadeScrollCard>
        );
    }


    private __loadOrderBook = async () => {
        const marketSymbol = this.props.navigation.getParam('marketSymbol');

        try {
            const orderBook = await BitfinexClient.book(
                marketSymbol,
                `P${this.precision}`,
                ORDER_DEPTH,
            );

            this.setState({
                orderBook: new OrderBookProcessor(orderBook, ORDER_DEPTH),
                error: undefined,
            });
        } catch (error) {
            this.setState({
                orderBook: undefined,
                error: 'Something wrong on load Order Book. Try latest.',
            });
        }
    };


    private __renderDepthSheet(market: mobx.ticker.IMarket, orderBook: OrderBookProcessor): JSX.Element {
        return (
            <View style={styles.depthSheet}>
                {this.__renderPreSheet(market, orderBook)}

                <View style={styles.depthHeader}>
                    <SpanText style={styles.depthHeaderCell}>
                        {__('Amount ({{asset}})', { asset: market.baseAsset() })}
                    </SpanText>
                    <SpanText style={styles.depthHeaderCell}>
                        {__('Price ({{asset}})', { asset: market.quoteAsset() })}
                    </SpanText>
                    <SpanText style={styles.depthHeaderCell}>
                        {__('Amount ({{asset}})', { asset: market.baseAsset() })}
                    </SpanText>
                </View>

                <View style={styles.depthSheetBody}>
                    <SideRows side="ask"
                              orderBook={orderBook}
                              market={market}
                              style={styles.depthSheetSide}
                    />

                    <SideRows side="bid"
                              orderBook={orderBook}
                              market={market}
                              style={styles.depthSheetSide}
                    />
                </View>
            </View>
        );
    }

    private __renderPreSheet(market: mobx.ticker.IMarket, orderBook: OrderBookProcessor): JSX.Element {
        return (
            <ResistanceChart
                market={market}
                orderBook={orderBook}
            />
        );
    }

    protected __renderOrderBookFooter = () => {
        const precision = this.precision;

        return (
            <View style={styles.groupingContainer}>
                <SpanText>{__('Grouping')}</SpanText>

                <View style={styles.groupingButtonContainer}>
                    <SpanText style={styles.groupingValue}>
                        {precision > 0
                            ? `P${precision}`
                            : __('None')}
                    </SpanText>

                    <TouchableOpacity
                        onPress={() => this.__changePrecision(-1)}
                        style={styles.groupingButton}
                    >
                        <SpanText style={styles.groupingButtonText}>-</SpanText>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.__changePrecision(+1)}
                        style={styles.groupingButton}
                    >
                        <SpanText style={styles.groupingButtonText}>+</SpanText>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };


    private __changePrecision = (precisionDiff: number) => {
        let nextPrecision = this.state.precisionIndex + precisionDiff;

        if (nextPrecision < MIN_PRECISION) {
            nextPrecision = MIN_PRECISION;
        } else if (nextPrecision > MAX_PRECISION) {
            nextPrecision = MAX_PRECISION;
        }

        if (nextPrecision === this.state.precisionIndex) {
            return;
        }

        this.setState({ precisionIndex: nextPrecision }, this.__loadOrderBook);
    };
}
