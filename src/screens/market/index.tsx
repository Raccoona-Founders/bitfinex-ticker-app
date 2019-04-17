import React from 'react';
import { Alert, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import AnalTracker from 'utils/ga-tracker';
import { __ } from 'utils/i18n';
import UIIconButton from 'components/ui-icon-button';
import { ShadeScrollCard } from 'components/shade-navigator';
import marketStyle from './market.style';
import MarketBody from 'screens/market/market.body';
import RouteKeys from 'router/route-keys';


type MarketScreenOuterProps = NavigationInjectedProps<{ symbol: string; }>;

type MarketScreenProps = MarketScreenOuterProps & mobx.ticker.WithTickerProps;

export default class MarketScreen extends React.Component<MarketScreenProps> {
    public async componentDidMount(): Promise<void> {
        const marketSymbol = this._currentSymbol;

        AnalTracker.logEvent('Market_Open', { market: marketSymbol });
    }


    public render(): JSX.Element {
        const symbol = this._currentSymbol;

        if (!symbol) {
            return <ShadeScrollCard />;
        }
        return (
            <ShadeScrollCard renderFooter={this.__renderFooter}>
                <MarketBody symbol={symbol} />
            </ShadeScrollCard>
        );
    }

    protected get _currentSymbol(): string {
        return this.props.navigation.getParam('symbol');
    }


    protected __openDepth = () => {
        this.props.navigation.push(RouteKeys.Market_OrderBook, {
            marketSymbol: this._currentSymbol,
        });
    };


    protected __openLastTrades = () => {
        Alert.alert('Currently unavailable');

        // this.props.navigation.push(RouteKeys.Market_LastTrades, {
        //     marketSymbol: this._currentSymbol,
        // });
    };


    protected __openCalculator = () => {
        this.props.navigation.push(RouteKeys.Market_Calculator, {
            marketSymbol: this._currentSymbol,
        });
    };


    private __renderFooter = () => {
        return (
            <View style={marketStyle.footer}>
                <View style={marketStyle.footerButton}>
                    <UIIconButton
                        icon="book"
                        onPress={this.__openDepth}
                        title={__('Order Book')}
                    />
                </View>

                <View style={marketStyle.footerButton}>
                    <UIIconButton
                        icon="calculator"
                        onPress={this.__openCalculator}
                        title={__('Calculate')}
                    />
                </View>

                <View style={marketStyle.footerButton}>
                    <UIIconButton
                        icon="exchange-alt"
                        onPress={this.__openLastTrades}
                        title={__('Last Trades')}
                        disabled={true}
                    />
                </View>
            </View>
        );
    };
}
