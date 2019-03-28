import React from 'react';
import numeral from 'numeral';
import { Line, G, Text } from 'react-native-svg';
import { Color, DefaultStyles } from 'styles/variables';

type Props = any & {
    price: number;
    format: string;
    side: 'top' | 'bottom';
};

export default ({ price, format, side, x, y }: Props) => {
    const positionY = y(price);
    const textY = positionY + (side == 'top' ? -10 : 10);

    return (
        <G>
            <Line key="element"
                  x1="97%"
                  x2="100%"
                  y1={positionY}
                  y2={positionY}
                  stroke={Color.BlueText}
                  strokeWidth={1}
            />

            <Text
                x="96%"
                dy={textY}
                alignmentBaseline="middle"
                textAnchor="end"
                fontFamily={DefaultStyles.mediumFont.fontFamily}
            >
                {numeral(price).format(format)}
            </Text>
        </G>
    );
};
