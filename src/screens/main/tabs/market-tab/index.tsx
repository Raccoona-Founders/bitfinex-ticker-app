import React from 'react';
import { chain, orderBy } from 'lodash';
import { inject, observer } from 'mobx-react/native';
import {
    ScrollView,
    RefreshControl,
    StyleSheet,
    View,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ActivityIndicator,
} from 'react-native';
import AnalTracker from 'utils/ga-tracker';
import Constants from 'utils/constants';
import { Color } from 'styles/variables';
import FilterCoin from './filter-coin';
import MarketList from './market-list';
import SpanText from 'components/span-text';
import { wait } from 'utils/helper';

type State = {
    refreshing: boolean;
    activeAsset: string;
    loading: boolean;
    tickerSymbols: string[];
    lastUpdate?: string;
    renderCount: number;
};

type OuterProps = {};
type Props
    = OuterProps
    & mobx.ticker.WithTickerProps;

// @ts-ignore
@inject('Ticker')
@observer
export default class MarketTab extends React.Component<Props, State> {
    public state: State = {
        refreshing: false,
        loading: false,
        activeAsset: 'USD',
        tickerSymbols: [],
        renderCount: 10,
    };


    public componentWillMount(): void {
        this.setState({
            lastUpdate: this.props.Ticker.lastUpdate,
            tickerSymbols: this.__getEnabledMarkets(this.state.activeAsset),
        });
    }

    public componentWillUpdate(nextProps: Readonly<Props>): void {
        if (nextProps.Ticker.lastUpdate !== this.state.lastUpdate) {
            this.setState({
                lastUpdate: this.props.Ticker.lastUpdate,
                tickerSymbols: this.__getEnabledMarkets(this.state.activeAsset),
            });
        }
    }


    public render(): JSX.Element {
        const { loading, activeAsset } = this.state;

        return (
            <View style={styles.flatList}>
                <View style={styles.filterTab}>
                    <FilterCoin onChoose={this.__onChooseCoin} active={activeAsset} />
                </View>

                <ScrollView
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={this.__renderRefreshControl()}
                    onScroll={this.__onReachScrollEnd}
                    scrollEventThrottle={1}
                >
                    {loading ? (
                        <View style={{ height: 200, justifyContent: 'center' }}>
                            <ActivityIndicator color={Color.Main} />
                        </View>
                    ) : this.__renderBody()}

                    <View style={{ height: Constants.IS_IPHONE_X ? 90 : 60 }} />
                </ScrollView>
            </View>
        );
    }


    private __renderBody = () => {
        const { Ticker } = this.props;
        const { tickerSymbols, renderCount } = this.state;
        const trs = this.props.Ticker.getTickers(tickerSymbols);

        const tickers = orderBy(trs, (t: mobx.ticker.TTicker) => t.volume * t.last_price, 'desc');

        return (
            <>
                <MarketList tickers={tickers}
                            favoriteTickers={Ticker.favorite.getList()}
                            renderCount={renderCount}
                            lastUpdate={Ticker.lastUpdate}
                            marketProvider={Ticker.getMarketProvider()}
                />

                {tickers.length > renderCount ? (
                    <ActivityIndicator size="small" style={{ marginTop: 20 }} />
                ) : undefined}

                <SpanText style={{ color: Color.GrayBlues, fontSize: 12, padding: 20 }}>
                    {this.state.lastUpdate}
                </SpanText>
            </>
        );
    };


    private __getEnabledMarkets = (activeAsset: string): string[] => {
        return chain(this.props.Ticker.tickers)
            .filter((market: mobx.ticker.TTicker) => market.symbol.endsWith(activeAsset))
            .map((market: mobx.ticker.TTicker) => market.symbol)
            .value();
    };


    private __onReachScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (this.state.loading) return;

        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        const isReachedEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;

        if (isReachedEnd) {
            this.setState({
                renderCount: this.state.renderCount + 10,
            });
        }
    };


    private __onChooseCoin = async (asset?: string): Promise<void> => {
        const newAsset = asset || 'USD';

        this.setState({
            activeAsset: newAsset,
            renderCount: 10,
            loading: true,
            tickerSymbols: this.__getEnabledMarkets(newAsset),
        });
        await wait(400);
        this.setState({ loading: false });
    };


    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('update_markets');

        try {
            await this.props.Ticker.fetchTickers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
    listItemSeparator: {
        borderBottomColor: Color.GrayLight,
        borderBottomWidth: 1,
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 20,
    },

    filterTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
});
