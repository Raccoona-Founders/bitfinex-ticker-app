import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { SpanText } from 'components/span-text';
import { svgIcons, findIcon } from './svg-icons';
import { DefaultStyles } from 'styles/variables';

type CoinIconProps = {
    asset: string;

    withShadow?: boolean;
    naked?: boolean;
    size?: number;
    style?: StyleProp<ViewStyle>;
};

export const CoinIcon = (props: CoinIconProps) => {
    const { size = 32, asset, style = {} } = props;

    const coinIconStyle = {
        height: size,
        width: size,
    };

    const existsIcon = findIcon(asset);

    if (!existsIcon) {
        const symbolContainerStyle: any = {
            width: size,
            height: size,
            fontSize: size * 0.375,
            lineHeight: size,
            textAlign: 'center',
        };

        const iconStyle = [
            styles.onlySymbolText,
            { color: '#000' },
            symbolContainerStyle,
        ];

        return (
            <View style={[coinIconStyle, style]}>
                <SpanText style={iconStyle}>{asset.toUpperCase()}</SpanText>
            </View>
        );
    }

    const svgShapeIconStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
    };

    return (
        <View style={[coinIconStyle, style]}>
            <SvgIcon svgs={svgIcons}
                     name={asset}
                     width={size}
                     height={size}
                     fill="#000"
                     style={svgShapeIconStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    onlySymbolView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    onlySymbolText: {
        ...DefaultStyles.boldFont,
        position: 'absolute',
        top: 0,
        left: 0,
    },
});
