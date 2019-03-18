import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Color, DefaultStyles } from 'styles/variables';

type RegularTextProps = TextProps & {
    children: string | any;
};

export const SpanText = (props: RegularTextProps) => {
    const { style = {}, children, ...otherProps } = props;
    const textStyles: any[] = [defaultStyle, style];

    return (
        <Text {...otherProps} style={StyleSheet.flatten(textStyles)}>
            {children}
        </Text>
    );
};

const defaultStyle = {
    ...DefaultStyles.mediumFont,
    color: Color.Text,
};

export default SpanText;
