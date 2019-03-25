import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpanText } from 'components/span-text';
import { CoinIcon } from 'components/coin-icon';
import { Color } from 'styles/variables';

type MarketNameProps = {
    ticker: mobx.ticker.Ticker;
};

export const MarketNameCell = (props: MarketNameProps) => {
    const { ticker } = props;

    return (
        <View style={styles.container}>
            <CoinIcon size={45}
                      asset={ticker.symbol.slice(1, 4)}
                      style={{ marginRight: 20 }}
                      withShadow={false}
            />

            <View>
                <View style={styles.marketRow}>
                    <SpanText style={[styles.pairBoxText, styles.pairBoxBase]}>
                        {ticker.symbol}
                    </SpanText>
                </View>
                <View style={styles.baseAssetName}>
                    <SpanText style={styles.baseAssetNameText}>{ticker.symbol}</SpanText>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    marketRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },

    pairBoxText: {
        color: Color.DarkPurple,
        fontSize: 18,
    },
    pairBoxBase: {},
    pairBoxSeparator: {
        marginLeft: 2,
        marginRight: 2,
        color: Color.GrayBlues,
        fontSize: 12,
        textAlignVertical: 'bottom',
    },
    pairBoxQuote: {
        fontSize: 12,
        color: Color.GrayBlues,
        textAlignVertical: 'bottom',
    },
    baseAssetName: {
        marginTop: 3,
    },
    baseAssetNameText: {
        color: Color.GrayBlues,
    },
});