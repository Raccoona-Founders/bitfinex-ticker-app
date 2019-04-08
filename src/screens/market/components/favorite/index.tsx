import React from 'react';
import { TouchableOpacity } from 'react-native';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from 'styles/variables';

type FavoriteOuterProps = {
    market: mobx.ticker.IMarket;
};

type FavoriteProps
    = FavoriteOuterProps
    & mobx.ticker.WithTickerProps;

class Favorite extends React.Component<FavoriteProps> {
    public render(): JSX.Element {
        const { market, Ticker } = this.props;

        return (
            <TouchableOpacity onPress={this.__pressFavorite}>
                <Icon name="star"
                      style={{ color: Ticker.favorite.exists(market.symbol()) ? Color.Main : Color.GrayNoactive }}
                      size={24}
                      solid
                />
            </TouchableOpacity>
        );
    }

    private __pressFavorite = () => {
        const { market, Ticker } = this.props;
        const fv = Ticker.favorite;

        fv.exists(market.symbol()) ? fv.remove(market.symbol()) : fv.add(market.symbol());
    };
}

export default compose<FavoriteProps, FavoriteOuterProps>(
    inject('Ticker'),
    observer,
)(Favorite);
