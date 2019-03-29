import React from 'react';
import { View, Linking, TouchableOpacity } from 'react-native';
import { SpanText } from 'components/span-text';
import { ShadeScrollCard } from 'components/shade-navigator';
import Analytics from 'utils/ga-tracker';
import i18n, { __ } from 'utils/i18n';
import Topic from 'components/topic';
import MDMessage from 'components/md-message';
import { styles } from './about-screen.style';
import textContent from './text-content';

const qs = require('querystring');
const language: string = i18n.currentLocale().split('-')[0];

type LinkItem = {
    title: string;
    label: string;
    url: string;
    disabled?: boolean;
};

type SettingsProps = mobx.user.WithUserProps;


const links: LinkItem[] = [{
    title: __('Github'),
    label: 'Raccoona-Crypto/bitfinex-ticker-app',
    url: 'https://github.com/Raccoona-Crypto/bitfinex-ticker-app',
}, {
    title: __('Website'),
    label: 'coinwizard.github.io/kuna-ticker-app',
    url: 'https://coinwizard.github.io/kuna-ticker-app?ref=application',
    disabled: true,
}, {
    title: __('Telegram'),
    label: '@MaksymTymchyk',
    url: 'https://t.me/MaksymTymchyk',
}, {
    title: __('Email'),
    label: 'maksym.tymchyk@gmail.com',
    url: `mailto:maksym.tymchyk@gmail.com?${qs.stringify({ subject: 'Bitfinex Ticker' })}`,
}];


export default class AboutScreen extends React.Component<SettingsProps> {
    public render(): JSX.Element {
        return (
            <ShadeScrollCard>
                <Topic title={__('About Bitfinex Ticker')} />

                <View style={styles.body}>
                    <MDMessage content={textContent[language] || textContent.en} />

                    <View style={styles.separator} />
                    <View style={styles.linksContainer}>{links.map(this.__renderLinkItem)}</View>
                </View>
            </ShadeScrollCard>
        );
    }

    private __renderLinkItem = (item: LinkItem, index: number) => {
        const { title, url, label, disabled = false } = item;

        if (disabled) {
            return <View key={index} />;
        }

        return (
            <TouchableOpacity key={index} onPress={this.__linkTo(url, title)} style={styles.linkItem}>
                <SpanText style={styles.linkItemTitle}>{title}</SpanText>
                <SpanText style={styles.linkItemLabel}>{label}</SpanText>
            </TouchableOpacity>
        );
    };

    private __linkTo = (url: string, title: string) => {
        return async () => {
            const can = await Linking.canOpenURL(url);

            if (can) {
                Analytics.logEvent('open_link', {
                    title: title,
                });

                Linking.openURL(url);
            }
        };
    };
}
