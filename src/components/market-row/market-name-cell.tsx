import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpanText } from 'components/span-text';
import CoinIcon from 'components/coin-icon';
import { Color, DefaultStyles } from 'styles/variables';

type MarketNameProps = {
    ticker: mobx.ticker.TTicker;
    market: mobx.ticker.IMarket;
};

export const MarketNameCell = (props: MarketNameProps) => {
    const { market } = props;

    return (
        <View style={styles.container}>
            <CoinIcon size={45}
                      asset={market.baseAsset()}
                      style={styles.logoIcon}
                      withShadow={false}
            />

            <View>
                <View style={styles.marketRow}>
                    <SpanText style={[styles.pairBoxText, styles.pairBoxBase]}>
                        {market.baseAsset()}/{market.quoteAsset()}
                    </SpanText>
                </View>
                <View style={styles.baseAssetName}>
                    <SpanText style={styles.baseAssetNameText}>
                        {market.baseName()} to {market.quoteName()}
                    </SpanText>
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
        fontSize: 18,
    },
    logoIcon: {
        marginLeft: 10,
        marginRight: 10,
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
        marginTop: 2,
    },
    baseAssetNameText: {
        fontSize: 12,
        ...DefaultStyles.boldFont,
        color: Color.GrayBlues,
    },
});