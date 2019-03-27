import React from 'react';
import Numeral from 'numeral';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { UsdCalculator } from 'utils/currency-rate';
import SpanText from 'components/span-text';
import { Color, DefaultStyles } from 'styles/variables';
import ChangePercent from 'components/change-percent';
import CoinIcon from 'components/coin-icon';
import RouteKeys from 'router/route-keys';
import { renderPrice } from 'utils/helper';


const { width } = Dimensions.get('window');

type FavoriteProps = {
    tickers: mobx.ticker.Ticker[];
    usdCalculator: UsdCalculator;
};


// @ts-ignore
@withNavigation
export default class FavoriteTickers extends React.PureComponent<FavoriteProps> {
    public render(): JSX.Element {
        const { tickers } = this.props;

        if (tickers.length < 1) {
            return <View />;
        }

        return (
            <View style={styles.container}>
                <SpanText style={styles.title}>Favorites</SpanText>

                {tickers.map(this.__itemRenderer())}
            </View>
        );
    }


    private __itemRenderer = () => {
        const { usdCalculator } = this.props;

        return (ticker: mobx.ticker.Ticker) => {
            const { last_price } = ticker;

            const usdPrice = usdCalculator.getUsdPrice(ticker.symbol);
            const volume = Numeral(ticker.volume).multiply(usdPrice.value());

            return (
                <TouchableOpacity style={styles.box} key={ticker.symbol} onPress={this.__onPressTicker(ticker)}>
                    <View style={styles.boxHead}>
                        <CoinIcon asset={ticker.symbol.substr(1, 3)}
                                  withShadow={false}
                                  naked={true}
                                  size={32}
                                  style={{ marginLeft: -8, marginRight: 2 }}
                        />

                        <SpanText>{ticker.symbol}</SpanText>
                    </View>

                    <View style={styles.boxPrice}>
                        <SpanText style={styles.price}>
                            {renderPrice(last_price)}
                        </SpanText>
                        <SpanText style={styles.priceUSD}>
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


    private __onPressTicker = (ticker: mobx.ticker.Ticker) => {
        return () => {
            const { navigation } = this.props as any as NavigationInjectedProps;

            // navigation.push(RouteKeys.Market, { symbol: market.key });
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
        borderRadius: 5,
        backgroundColor: Color.GrayLight,
        padding: 10,
    },

    boxHead: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    boxPrice: {
        marginBottom: 10,
        marginTop: 10,
    },

    price: {
        fontSize: 18,
        ...DefaultStyles.mediumFont,
    },
    priceUSD: {
        fontSize: 14,
        color: Color.GrayBlues,
    },
});
