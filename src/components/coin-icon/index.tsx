import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import SvgIcon from 'react-native-svg-icon';
import { SpanText } from 'components/span-text';
import { Color, DefaultStyles } from 'styles/variables';
import { svgIcons, findIcon } from './svg-icons';

type CoinIconProps = {
    asset: string;
    color?: string;
    withShadow?: boolean;
    naked?: boolean;
    size?: number;
    style?: StyleProp<ViewStyle>;
};

export default (props: CoinIconProps) => {
    const { size = 32, asset, style = {}, color = Color.GrayBlues } = props;

    const coinBackgroundStyle = {
        height: size,
        width: size,
    };

    const existsIcon = findIcon(asset);

    if (!existsIcon) {
        const symbolContainerStyle: any = {
            width: '100%',
            fontSize: size * 0.375,
            textAlign: 'center',
            color: color,
        };

        const iconStyle = [
            styles.onlySymbolText,
            symbolContainerStyle,
        ];

        return (
            <View style={[coinBackgroundStyle, styles.onlySymbolView, style]}>
                <View style={styles.onlySymbolBox}>
                    <SpanText style={iconStyle}>{asset.toUpperCase()}</SpanText>
                </View>
            </View>
        );
    }

    const svgShapeIconStyle = {
        position: 'absolute',
        left: 0,
        top: 0,
    };

    return (
        <View style={[coinBackgroundStyle, style]}>
            <SvgIcon svgs={svgIcons}
                     name={asset}
                     width={size}
                     height={size}
                     fill={color}
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
    onlySymbolBox: {
        width: '100%',
    },
    onlySymbolText: {
        ...DefaultStyles.boldFont,
    },
});
