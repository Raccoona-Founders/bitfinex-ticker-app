import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { numFormat } from 'utils/number-helper';
import SpanText from 'components/span-text';
import ChangePercent from 'components/change-percent';
import { MarketNameCell } from './market-name-cell';
import styles from './market-row.styles';

export default class MarketRow extends React.Component<MarketRowProps> {
    public render(): JSX.Element {
        const {ticker, onPress, visible = true} = this.props;

        if (!ticker || !ticker.last_price) {
            return <View/>;
        }

        const containerStyle = [
            styles.listItemLink,
            visible ? undefined : styles.listItemLinkInvisible,
        ];

        return (
            <TouchableOpacity onPress={ticker ? onPress : undefined} style={containerStyle}>
                <View style={styles.listItem}>
                    <MarketNameCell ticker={ticker}/>

                    <View style={styles.tickerCell}>
                        <View style={styles.priceBox}>
                            <SpanText style={styles.priceValue}>
                                {ticker.last_price ? numFormat(ticker.last_price || 0, '0,0.[00]') : '—'}
                            </SpanText>
                        </View>

                        <View style={styles.secondaryInfo}>
                            <ChangePercent percent={ticker.daily_change_perc}
                                           style={{marginLeft: 8}}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

type MarketRowProps = {
    ticker: mobx.ticker.Ticker;
    usdPrice: number;
    visible?: boolean;
    onPress?: () => void;
};
