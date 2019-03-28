import { Platform } from 'react-native';

export enum Color {
    Main = '#678e2f',
    Secondary = '#97c554',

    Text = '#000f18',
    BlueText = '#323f66',
    SecondaryText = '#6A6A6A',

    GrayBlues = '#c3c6d0',
    Gray3 = '#E6EAEE',
    GrayWhite = '#f5f5f5',
    GrayNoactive = '#DCDCDC',

    GrayLight = '#F2F2F2',

    White = '#FFFFFF',
    Black = '#000000',

    Success = '#07d26e',
    Warning = '#FFECA9',
    Danger = '#ff5b74',
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
