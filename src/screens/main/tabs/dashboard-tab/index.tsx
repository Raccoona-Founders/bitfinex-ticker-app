import React from 'react';
import { inject, observer } from 'mobx-react/native';
import { ScrollView, RefreshControl, StyleSheet, View } from 'react-native';
import AnalTracker from 'utils/ga-tracker';
import Constants from 'utils/constants';
import AdvBanner from 'components/adv-banner';
import VolumeCard from './components/volume-card';
import FavoriteTickers from './components/favorite-tickers';


type State = {
    refreshing: boolean;
    favorite: boolean;
    activeAsset?: string;
};

type OuterProps = {};
type Props
    = OuterProps
    & mobx.ticker.WithTickerProps;

// @ts-ignore
@inject('Ticker')
@observer
export default class MarketTab extends React.Component<Props, State> {
    public state: State = {
        refreshing: false,
        favorite: false,
        activeAsset: undefined,
    };


    public render(): JSX.Element {
        const { Ticker } = this.props;

        const volumeUSD = Ticker.getMarketVolume();
        const usdToBtc = Ticker.usdCalculator.getBtcPrice('fBTCUSD');

        return (
            <View style={{ justifyContent: 'space-between', flex: 1 }}>
                <ScrollView
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    refreshControl={this.__renderRefreshControl()}
                >
                    <VolumeCard
                        volumeUSD={volumeUSD.value()}
                        volumeBTC={volumeUSD.multiply(usdToBtc).value()}
                    />

                    <FavoriteTickers
                        tickers={Ticker.getFavorite()}
                        usdCalculator={Ticker.usdCalculator}
                    />
                </ScrollView>

                <AdvBanner showBanner={true} />
                <View style={{ height: Constants.IS_IPHONE_X ? 90 : 60 }} />
            </View>
        );
    }

    private __renderRefreshControl = () => {
        return (
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.__onRefresh}
            />
        );
    };


    private __onRefresh = async () => {
        this.setState({ refreshing: true });

        AnalTracker.logEvent('update_markets');

        try {
            await this.props.Ticker.fetchTickers();
        } catch (error) {
            console.error(error);
        }

        this.setState({ refreshing: false });
    };
}


const styles = StyleSheet.create({
    flatList: {
        flex: 1,
    },
});
