import React from 'react';
import Numeral from 'numeral';
import { StyleSheet, View } from 'react-native';
import SpanText from 'components/span-text';
import { Color } from 'styles/variables';


type MinMaxIndicatorProps = {
    market: mobx.ticker.IMarket;
    min: number;
    max: number;
    price: number;
};

export default class MinMaxIndicator extends React.PureComponent<MinMaxIndicatorProps> {
    public render(): JSX.Element {
        const { min, max, price } = this.props;

        const pricePercent = (price - min) / (max - min);

        return (
            <View style={styles.box}>
                <View style={styles.chart}>
                    <View style={[styles.pricePosition, { left: `${pricePercent * 100}%` }]} />
                </View>

                <View style={styles.rangeContainer}>
                    <SpanText style={[styles.rangeValue, styles.rangeValueLow]}>
                        Low: {Numeral(min).format('0.0.00[000000]')}
                    </SpanText>

                    <SpanText style={[styles.rangeValue, styles.rangeValueHigh]}>
                        High: {Numeral(max).format('0.0.00[000000]')}
                    </SpanText>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
    },
    chart: {
        height: 5,
        width: '100%',
        borderRadius: 5,
        backgroundColor: Color.GrayLight,
    },

    pricePosition: {
        position: 'absolute',
        top: -2,
        marginRight: -1,
        width: 2,
        height: 9,
        backgroundColor: Color.Main,
    },

    rangeContainer: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    rangeValue: {
        fontSize: 14,
    },
    rangeValueLow: {
        color: Color.Danger,
    },
    rangeValueHigh: {
        color: Color.Main,
    },
});
