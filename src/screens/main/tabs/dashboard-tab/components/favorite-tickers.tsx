import React from 'react';
import Numeral from 'numeral';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { inject } from 'mobx-react/custom';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { __ } from 'utils/i18n';
import { renderPrice } from 'utils/helper';
import { UsdCalculator } from 'utils/currency-rate';
import SpanText from 'components/span-text';
import ChangePercent from 'components/change-percent';
import CoinIcon from 'components/coin-icon';
import { Color, DefaultStyles } from 'styles/variables';
import RouteKeys from 'router/route-keys';


const { width } = Dimensions.get('window');

type FavoriteProps = {
    tickers: mobx.ticker.TTicker[];
    usdCalculator: UsdCalculator;
};


// @ts-ignore
@withNavigation
@inject('Ticker')
export default class FavoriteTickers extends React.PureComponent<FavoriteProps> {
    public render(): JSX.Element {
        const { tickers } = this.props;

        if (tickers.length < 1) {
            return <View />;
        }

        return (
            <View style={styles.container}>
                <SpanText style={styles.title}>{__('Favorites')}</SpanText>
                {tickers.map(this.__itemRenderer())}
            </View>
        );
    }


    private __itemRenderer = () => {
        const { usdCalculator, Ticker } = this.props as FavoriteProps & mobx.ticker.WithTickerProps;

        return (ticker: mobx.ticker.TTicker) => {
            const { last_price } = ticker;

            const usdPrice = usdCalculator.getUsdPrice(ticker.symbol);
            const volume = Numeral(ticker.volume).multiply(usdPrice.value());
            const market = Ticker.getMarket(ticker.symbol);

            return (
                <TouchableOpacity style={styles.box} key={ticker.symbol} onPress={this.__onPressTicker(ticker)}>
                    <View style={styles.boxHead}>
                        <CoinIcon asset={ticker.symbol.substr(1, 3)}
                                  withShadow={false}
                                  naked={true}
                                  size={32}
                                  style={{ marginLeft: -8, marginRight: 2 }}
                        />

                        <SpanText style={styles.boxMarketName}>{market.baseAsset()}/{market.quoteAsset()}</SpanText>
                    </View>

                    <View style={styles.boxPrice}>
                        <SpanText style={styles.price}>
                            {renderPrice(last_price)} {market.quoteAsset()}
                        </SpanText>
                        <SpanText style={styles.volume}>
                            Vol: ${Numeral(volume).format('0,0')}
                        </SpanText>
                    </View>

                    <View>
                        <ChangePercent percent={ticker.daily_change_perc} />
                    </View>
                </TouchableOpacity>
            );
        };
    };


    private __onPressTicker = (ticker: mobx.ticker.TTicker) => {
        return () => {
            const { navigation } = this.props as any as NavigationInjectedProps;

            navigation.push(RouteKeys.Market, { symbol: ticker.symbol });
        };
    };
}


const styles = StyleSheet.create({
    title: {
        width: '100%',
        fontSize: 12,
        textTransform: 'uppercase',
        color: Color.GrayBlues,
        marginBottom: 10,
    },
    container: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginLeft: 20,
        marginRight: 20,
    },

    box: {
        width: (width - 20 * 3) / 2,
        marginBottom: 20,
        borderRadius: 10,
        padding: 10,
        paddingBottom: 15,
        backgroundColor: Color.White,
        shadowColor: "#1a1725",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 10,
    },
    boxHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    boxMarketName: {
        ...DefaultStyles.boldFont,
    },
    boxPrice: {
        marginBottom: 10,
        marginTop: 10,
    },

    price: {
        fontSize: 18,
    },
    volume: {
        fontSize: 12,
        color: Color.GrayBlues,
    },
});
