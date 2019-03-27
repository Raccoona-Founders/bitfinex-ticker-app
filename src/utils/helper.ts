import { Dimensions, Platform } from 'react-native';
import numeral from 'numeral';
import { numFormat } from 'utils/number-helper';

export async function wait(delay: number = 1000): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, delay));
}

export function isIphoneX() {
    let d = Dimensions.get('window');
    const { height, width } = d;

    return (
        // This has to be iOS duh
        Platform.OS === 'ios' &&
        (
            // Check iPhones X, Xs
            (height === 812 || width === 812) ||

            // Check iPhones  XR, Xs Max
            (height === 896 || width === 896)
        )
    );
}

export function vw(percentageWidth: number = 100) {
    return Dimensions.get('window').width * (percentageWidth / 100);
}

export function vh(percentageHeight: number = 100) {
    return Dimensions.get('window').height * (percentageHeight / 100);
}

export function format(n: number, decimal: number = 2): string {
    return numeral(n || 0).format('0,0.[00]');
}

export function renderPrice(price?: number): string {
    if (!price) {
        return '-';
    }

    let format = '0,0.[00]';
    if (price >= 500) {
        format = '0,0';
    } else if (price >= 1) {
        format = '0,0.[00]';
    } else if (price >= 0.1) {
        format = '0,0.[0000]';
    } else if (price >= 0.001) {
        format = '0,0.[000000]';
    } else {
        format = '0,0.[00000000]';
    }

    return numFormat(price || 0, format);
}
