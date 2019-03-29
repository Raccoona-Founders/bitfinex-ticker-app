import RNLanguages from 'react-native-languages';
import i18n from 'i18n-js';

// Import all locales
import en from '../locales/en-us.json';
import ua from '../locales/uk-ua.json';
import ru from '../locales/ru-ru.json';

i18n.defaultLocale = 'en';
i18n.locale = RNLanguages.language;
i18n.fallbacks = true;
i18n.translations = { en, ua, ru };

export function __(scope: string, params = {}) {
    const tProps = {
        defaults: [{ message: scope }],
        ...params,
    };

    return i18n.t(scope, tProps);
}

export default i18n;