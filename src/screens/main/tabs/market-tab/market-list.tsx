import React from 'react';
import { slice } from 'lodash';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { FlatList, ListRenderItemInfo } from 'react-native';
import MarketRow from 'components/market-row';
import { compose } from 'recompose';

type Props = {
    tickers: mobx.ticker.Ticker[];
    renderCount?: number;
    lastUpdate?: string;
};

class MarketList extends React.PureComponent<Props & NavigationInjectedProps> {
    public render(): JSX.Element {
        return (
            <FlatList data={slice(this.props.tickers, 0, this.props.renderCount)}
                      renderItem={this.__marketRowRenderer()}
                      initialNumToRender={10}
                      scrollEnabled={false}
            />
        );
    }


    private __marketRowRenderer = () => {
        return (item: ListRenderItemInfo<mobx.ticker.Ticker>) => {
            const ticker = item.item;

            return <MarketRow
                ticker={ticker}
                onPress={this.__pressMarketRow(ticker.symbol)}
            />;
        };
    };


    private __pressMarketRow = (market: string) => {
        return () => {
            // this.props.navigation.navigate('Market', { symbol: market });
        };
    };
}

export default compose<Props & NavigationInjectedProps, Props>(withNavigation)(MarketList);
