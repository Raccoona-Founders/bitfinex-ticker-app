import { Platform } from 'react-native';

export enum Color {
    Main = '#678e2f',
    Secondary = '#97c554',

    Purple = '#312A7D',
    Fade = '#676793',
    DarkPurple = '#0D0D3F',

    Text = '#4A4A4A',
    SecondaryText = '#6A6A6A',

    DeepBlue = '#2E71F0',

    PurpleNoactive = '#9DA3B8',
    Gold = '#',

    GrayBlues = '#93A9C3',
    Gray3 = '#E6EAEE',
    GrayWhite = '#F5F7F8',
    GrayNoactive = '#DCDCDC',

    GrayLight = '#F2F2F2',


    White = '#FFFFFF',
    Black = '#000000',


    Success = '#00BA4F',
    Warning = '##FFECA9',
    Danger = '#FD2A47',
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
