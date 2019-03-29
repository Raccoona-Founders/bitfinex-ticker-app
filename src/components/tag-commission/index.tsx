import React from 'react';
import numeral from 'numeral';
import { __ } from 'utils/i18n';
import Tag from 'components/tag';
import { Color } from 'styles/variables';

type CommissionProps = {
    commission: number;
};

export default (props: CommissionProps): JSX.Element => {
    if (props.commission === 0) {
        return (
            <Tag style={{ backgroundColor: Color.Main }}>1 : 1</Tag>
        );
    }

    let textTemplate = __('You pay');
    if (props.commission < 0) {
        textTemplate = __('Maker pay');
    }

    const comm = numeral(Math.abs(props.commission));

    return (
        <Tag style={{ backgroundColor: Color.Main }}>
            {textTemplate.replace('{value}', comm.format('0,0.[00]%'))}
        </Tag>
    );
};
