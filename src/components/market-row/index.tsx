import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SpanText from 'components/span-text';
import ChangePercent from 'components/change-percent';
import { MarketNameCell } from './market-name-cell';
import styles from './market-row.styles';
import { renderPrice } from 'utils/helper';


type MarketRowProps = {
    ticker: mobx.ticker.Ticker;
    visible?: boolean;
    onPress?: () => void;
}




export default (props: MarketRowProps): JSX.Element => {
    const { ticker, onPress, visible = true } = props;

    if (!ticker || !ticker.last_price) {
        return <View />;
    }

    const containerStyle = [
        styles.listItemLink,
        visible ? undefined : styles.listItemLinkInvisible,
    ];

    return (
        <TouchableOpacity onPress={ticker ? onPress : undefined} style={containerStyle}>
            <View style={styles.listItem}>
                <MarketNameCell ticker={ticker} />

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <SpanText style={styles.priceValue}>{renderPrice(ticker.last_price)}</SpanText>
                    </View>

                    <View style={styles.secondaryInfo}>
                        <ChangePercent percent={ticker.daily_change_perc}
                                       style={{ marginLeft: 8 }}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
