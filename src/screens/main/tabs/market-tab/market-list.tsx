import React from 'react';
import { values, chain, keys } from 'lodash';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import MarketRow from 'components/market-row';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';

type State = {};

// @ts-ignore
@withNavigation
@inject('Ticker')
@observer
export default class MarketList extends React.Component<Props, State> {
    public render(): JSX.Element {
        return (
            <>
                <FlatList data={values(this.props.Ticker.tickers)}
                          renderItem={this.__marketRowRenderer()}
                          initialNumToRender={10}
                          maxToRenderPerBatch={5}
                          scrollEnabled={false}
                />
                <SpanText style={{ color: Color.GrayBlues, fontSize: 12, paddingLeft: 20, paddingBottom: 20 }}>
                    {this.props.Ticker.lastUpdate}
                </SpanText>
            </>
        );
    }


    private __marketRowRenderer = () => {
        const { Ticker, activeAsset } = this.props;
        const enabledMarkets = this.__getEnabledMarkets(activeAsset);

        return (item: ListRenderItemInfo<mobx.ticker.Ticker>) => {
            const ticker = item.item;
            const usdPrice = 0; //Ticker.usdCalculator.getPrice(symbol);

            return (
                <MarketRow ticker={ticker}
                           usdPrice={usdPrice}
                           onPress={this.__pressMarketRow(ticker.symbol)}
                           visible={enabledMarkets.indexOf(ticker.symbol) >= 0}
                />
            );
        };
    };


    private __pressMarketRow = (market: string) => {
        return () => {
            // this.props.navigation.navigate('Market', { symbol: market });
        };
    };

    private __getEnabledMarkets = (activeAsset?: string): string[] => {
        if (!activeAsset) {
            return Object.keys(this.props.Ticker.tickers);
        }

        return chain(this.props.Ticker.tickers)
            .map((market: mobx.ticker.Ticker): string => market.symbol)
            .value();
    };
}

type OuterProps = {
    activeAsset?: string;
};

type Props
    = OuterProps
    & mobx.ticker.WithTickerProps
    & NavigationInjectedProps;
