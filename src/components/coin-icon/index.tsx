import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { KunaAsset } from 'kuna-sdk';
import { SpanText } from 'components/span-text';
import { svgIcons, findIcon } from './svg-icons';
import { DefaultStyles } from 'styles/variables';

type CoinIconProps = {
    asset: KunaAsset;

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
            fontSize: size * 0.625,
            lineHeight: size,
            textAlign: 'center',
        };

        const iconStyle = [
            styles.onlySymbolText,
            { color: asset.color },
            symbolContainerStyle,
        ];

        return (
            <View style={[coinIconStyle, style]}>
                <SpanText style={iconStyle}>{asset.name.charAt(0).toUpperCase()}</SpanText>
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
                     name={asset.key as string}
                     width={size}
                     height={size}
                     fill={asset.color}
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
