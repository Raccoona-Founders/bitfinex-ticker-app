import React from 'react';
import numeral from 'numeral';
import { compose } from 'recompose';
import { View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import RouteKeys from 'router/route-keys';
import { __ } from 'utils/i18n';
import { renderPrice } from 'utils/helper';
import { numFormat } from 'utils/number-helper';
import CoinIcon from 'components/coin-icon';
import SpanText from 'components/span-text';
import UIIconButton from 'components/ui-icon-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import RippleNotice from 'components/ripple-notice';
import InfoUnit from 'components/info-unit';

import PriceChangeBox from './components/change-price-box';
import Chart from './components/chart';
import MinMaxIndicator from './components/min-max-indicator';
import Favorite from './components/favorite';
import marketStyle from './market.style';

import { DefaultStyles } from 'styles/variables';

type MarketScreenOuterProps = {
    symbol: string;
};

type MarketScreenProps
    = MarketScreenOuterProps
    & NavigationInjectedProps
    & mobx.ticker.WithTickerProps;

class MarketBody extends React.Component<MarketScreenProps> {
    public render(): JSX.Element {
        const { Ticker } = this.props;

        const symbol = this._currentSymbol;
        const market = Ticker.getMarket(symbol);
        const tick = Ticker.getTicker(symbol);

        if (!tick) {
            return <ShadeScrollCard />;
        }

        const usdPrice = Ticker.usdCalculator.getUsdPrice(symbol);

        return (
            <>
                <View style={marketStyle.topic}>
                    <CoinIcon asset={market.baseAsset()}
                              naked={true}
                              withShadow={false}
                              size={68}
                              style={{ marginRight: 20 }}
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={marketStyle.topicName}>
                            <SpanText style={marketStyle.topicNameUnit}>
                                {market.baseAsset()}/{market.quoteAsset()}
                            </SpanText>
                            <SpanText style={marketStyle.topicNameFullname}>
                                {market.baseName()} to {market.quoteName()}
                            </SpanText>
                        </View>

                        <Favorite market={market} />
                    </View>
                </View>

                <View style={marketStyle.separator} />

                <View style={[marketStyle.section, marketStyle.sectionPrice]}>
                    <View>
                        <SpanText style={marketStyle.price}>
                            {renderPrice(tick.last_price || 0)} {market.quoteAsset()}
                        </SpanText>

                        <PriceChangeBox
                            value={tick.daily_change_perc}
                            style={{ position: 'absolute', right: 0, top: 0 }}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, paddingBottom: 20 }}>
                    {/*<Chart market={market} />*/}

                    <View style={[marketStyle.section, marketStyle.sectionInformation]}>
                        <InfoUnit topic="Vol $"
                                  value={numFormat(numeral(tick.volume).multiply(usdPrice.value()), '$0,0.[00]')}
                                  style={marketStyle.infoUnit}
                                  valueStyle={DefaultStyles.boldFont}
                        />

                        <InfoUnit topic={`Vol ${market.baseAsset()}`}
                                  value={numFormat(tick.volume)}
                                  style={marketStyle.infoUnit}

                        />

                        <InfoUnit topic={`Vol ${market.quoteAsset()}`}
                                  value={numFormat(numeral(tick.volume).multiply(tick.last_price || 0))}
                                  style={marketStyle.infoUnit}
                        />
                    </View>

                    <MinMaxIndicator
                        market={market}
                        min={tick.low}
                        max={tick.high}
                        price={tick.last_price || 0}
                    />


                    {market.baseAsset() === 'XRP' ? (
                        <>
                            <View style={marketStyle.separator} />
                            <RippleNotice />
                        </>
                    ) : undefined}
                </View>
            </>
        );
    }

    protected get _currentSymbol(): string {
        return this.props.symbol;
    }
}


export default compose<MarketScreenProps, MarketScreenOuterProps>(
    inject('Ticker'),
    withNavigation,
    observer,
)(MarketBody);
