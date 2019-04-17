import React from 'react';
import { View } from 'react-native';
import CalcAssetRow from './calc-asset-row';
import styles from './calculator-pair.style';
import { renderPrice } from 'utils/helper';

type CalculatorPairProps = {
    market: mobx.ticker.IMarket;
    processCalculating: (value: number, type: Side) => number;
};

export enum Side {
    Base,
    Quote
}

type LastTradeCalcState = {
    inputBuyValue: string;
    inputSellValue: string;
};

export default class CalculatorPair extends React.PureComponent<CalculatorPairProps, LastTradeCalcState> {
    public state: LastTradeCalcState = {
        inputBuyValue: '',
        inputSellValue: '',
    };

    public render(): JSX.Element {
        const { inputBuyValue, inputSellValue } = this.state;
        const { market } = this.props;

        return (
            <View style={styles.container}>
                <CalcAssetRow
                    asset={market.baseAsset()}
                    value={inputBuyValue}
                    onChangeText={this.changeTextInput(Side.Base)}
                />

                <CalcAssetRow
                    asset={market.quoteAsset()}
                    value={inputSellValue}
                    onChangeText={this.changeTextInput(Side.Quote)}
                />
            </View>
        );
    }


    public forceSetValues(baseValue: number, quoteValue: number): void {
        this.setState({
            inputBuyValue: baseValue > 0 ? renderPrice(baseValue) : '',
            inputSellValue: quoteValue > 0 ? renderPrice(quoteValue) : '',
        });
    };


    protected changeTextInput = (side: Side) => (text: string) => {
        if (text.length > 24) {
            text = text.substr(0, 24);
        }

        text = text
            .replace(/\s/gm, '')
            .replace(/,/gm, '.');

        if (text.length === 2 && text[0] == '0' && text[1] != '.') {
            text = text[0] + '.' + text[1];
        }

        const updateState = {
            inputBuyValue: side === Side.Base ? text : '',
            inputSellValue: side === Side.Quote ? text : '',
        };

        const result = this.props.processCalculating(+text, side);

        if (result && result > 0) {
            if (side === Side.Quote) {
                updateState.inputBuyValue = renderPrice(result);
            } else {
                updateState.inputSellValue = renderPrice(result);
            }
        }

        this.setState(updateState);
    };
}
