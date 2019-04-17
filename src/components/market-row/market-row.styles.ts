import { StyleSheet } from 'react-native';
import { Color } from 'styles/variables';

const styles = StyleSheet.create({
    listItemLink: {
        paddingRight: 15,
        elevation: 10,
        borderBottomWidth: 1,
        borderBottomColor: Color.GhostWhite,
    },

    favoriteLabel: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 36,
        height: 36,
        zIndex: 0,
        overflow: 'hidden',
    },

    favoriteIcon: {
        height: 22,
        width: 60,
        transform: [{ rotate: '-45deg' }, { translateX: -14 }, { translateY: -14 }],
        textAlign: 'center',
        lineHeight: 22,
        color: Color.White,

        backgroundColor: Color.Main,
    },

    listItemLinkInvisible: {
        height: 0,
        overflow: 'hidden',
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 74,
    },

    tickerCell: {
        alignItems: 'flex-end',
    },

    priceBox: {
        flexDirection: 'row',
    },
    priceValue: {
        fontSize: 18,
    },

    secondaryInfo: {
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },

    marketVolume: {
        fontSize: 14,
        color: Color.GrayBlues,
    },
});

export default styles;
