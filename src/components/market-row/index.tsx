import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import SpanText from 'components/span-text';
import ChangePercent from 'components/change-percent';
import { renderPrice } from 'utils/helper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MarketNameCell } from './market-name-cell';
import styles from './market-row.styles';

type MarketRowProps = {
    ticker: mobx.ticker.TTicker;
    onPress?: () => void;
    market: mobx.ticker.IMarket;
    isFavorite?: boolean;
}

export default (props: MarketRowProps): JSX.Element => {
    const { ticker, onPress, market, isFavorite = false } = props;

    if (!ticker || !ticker.last_price) {
        return <View />;
    }

    return (
        <TouchableOpacity onPress={ticker ? onPress : undefined} style={styles.listItemLink}>
            <View style={styles.listItem}>
                {isFavorite ? (
                    <View style={styles.favoriteLabel}><Icon name="star" style={styles.favoriteIcon}/></View>
                ) : undefined}

                <MarketNameCell ticker={ticker} market={market} />

                <View style={styles.tickerCell}>
                    <View style={styles.priceBox}>
                        <SpanText style={styles.priceValue}>
                            {renderPrice(ticker.last_price)} {market.quoteAsset()}
                        </SpanText>
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
