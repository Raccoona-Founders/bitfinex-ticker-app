import { StyleSheet } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';
import Constants from 'utils/constants';

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.GhostWhite,
    },
    baseBackground: {
        flex: 1,
        backgroundColor: Color.Main,
    },
});

export const tabBarStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: Constants.IS_IPHONE_X ? 40 : 10,
        left: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: Color.GrayLight,
        overflow: 'hidden',
        borderRadius: 6,
    },

    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    tabBtn: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    tab: {
        flexDirection: 'row',
    },
    text: {
        fontSize: 18,
        alignItems: 'center',
        color: Color.Text,
        ...DefaultStyles.boldFont,
    },

    // Info bar
    infoBar: {
        height: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: Color.Gray3,
    },


    betaLabel: {
        color: Color.Main,
        position: 'absolute',
        top: -8,
        right: -24,
        fontSize: 12,
        ...DefaultStyles.boldFont,
    },
});