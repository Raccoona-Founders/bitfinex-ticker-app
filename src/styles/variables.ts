import { Platform } from 'react-native';

export enum Color {
    Main = '#678e2f',
    Secondary = '#97c554',

    Text = '#000f18',
    SecondaryText = '#011627',

    GrayBlues = '#c3c6d0',
    Gray3 = '#E6EAEE',
    GrayWhite = '#f5f5f5',
    GrayNoactive = '#DCDCDC',

    Ask = '#00A155',
    Bid = '#E3170A',

    GrayLight = '#F2F2F2',

    White = '#FFFFFF',
    Black = '#000000',

    Success = '#00A155',
    Warning = '#EEE0CB',
    Danger = '#E3170A',
}

export const Fonts = {
    PTSans_Bold: 'PtSans-Bold',
    PTSans_Regular: 'PtSans-Regular',
};


export const DefaultStyles: any = {
    mediumFont: {
        fontWeight: '400',
        fontFamily: Fonts.PTSans_Regular,
    },
    boldFont: {
        fontWeight: '700',
        fontFamily: Fonts.PTSans_Bold,
    },
};
