import React from 'react';
import { slice } from 'lodash';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
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
            <View>
                {slice(this.props.tickers, 0, this.props.renderCount).map(this.__marketRowRenderer())}
            </View>
        );
    }


    private __marketRowRenderer = () => {
        return (ticker: mobx.ticker.Ticker) => {
            return <MarketRow
                key={ticker.symbol}
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
