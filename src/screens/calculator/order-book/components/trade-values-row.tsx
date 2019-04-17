import React from 'react';
import { View, StyleSheet } from 'react-native';
import SpanText from 'components/span-text';
import { renderPrice } from 'utils/helper';
import { Color, DefaultStyles } from 'styles/variables';
import { OperationMode } from '../../common';

type TradeValuesRowProps = {
    baseValue: number;
    quoteValue: number;
    mode: OperationMode;
    baseAsset: string;
    quoteAsset: string;
};

type ValueCellProps = {
    asset: string;
    value: number;
    isMain: boolean;
};

const ValueCell = (props: ValueCellProps) => {
    const { asset } = props;

    return (
        <View style={styles.valueCell}>
            <SpanText style={[styles.valueAmount, props.isMain ? styles.valueAmountReceive : undefined]}>
                {renderPrice(props.value)} {asset}
            </SpanText>
        </View>
    );
};

export default (props: TradeValuesRowProps) => {
    const { mode } = props;

    const operationBoxStyle = [
        styles.box,
        mode === OperationMode.Sell ? styles.boxSell : styles.boxBuy,
    ];

    return (
        <View style={operationBoxStyle}>
            <ValueCell asset={props.baseAsset}
                       value={props.baseValue}
                       isMain={mode === OperationMode.Buy}
            />

            <SpanText style={styles.arrow}>→</SpanText>

            <ValueCell asset={props.quoteAsset}
                       value={props.quoteValue}
                       isMain={mode === OperationMode.Sell}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    arrow: {
        color: Color.GrayBlues,
    },
    boxSell: {},
    boxBuy: {
        flexDirection: 'row-reverse',
    },

    valueCell: {
        width: '40%',
    },
    valueAmount: {
        fontSize: 16,
    },
    valueAmountReceive: {
        ...DefaultStyles.boldFont,
    },
    valueFee: {
        fontSize: 12,
    },
});
