const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp-sync');
const axios = require('axios');

const dotenv = require('dotenv');
const config = dotenv.config();

const PotExtractor = require('./pot-extractor');

const locoReadKey = config.parsed.LOCO_READ_KEY || 'dhQPr2oER4qtN9vkYuGePC17HZage_ci';
const locoWriteKey = config.parsed.LOCO_WRITE_KEY;

const locales = require('./config/locales.json');

gulp.task('pot', PotExtractor.extract);

gulp.task('locales:import', () => {
    mkdirp(path.resolve('./resources/locales'));
    const writeLocaleFile = (locale, translates) => {
        fs.writeFileSync(path.resolve(`./src/locales/${locale}.json`), JSON.stringify(translates));
    };

    const extractLocale = (locale) => {
        const successLoad = function (response) {
            writeLocaleFile(locale, response.data);
        };

        const errorLoad = (error) => {
            console.log(`Locale ${locale} error!`);
            writeLocaleFile(locale, {});
        };

        axios
            .get(`https://localise.biz/api/export/locale/${locale}.json`, {
                params: {
                    index: 'text',
                    format: 'i18next3',
                    status: 'translated',
                    key: locoReadKey,
                },
            })
            .then(successLoad)
            .catch(errorLoad);
    };

    const codes = Object.keys(locales);
    codes.forEach(extractLocale);
});

gulp.task('locales:export', () => {
    if (!locoWriteKey) {
        console.log('You have to set Locolise KEY for https://localise.biz/');
        return;
    }

    const tagNew = 'To Translate';
    const tagAbsent = 'Deprecated';
    const requestBody = fs.readFileSync('build/messages.pot');
    const requestParams = {
        headers: {
            Authorization: `Loco ${locoWriteKey}`,
            'Content-Type': 'text/plain',
        },
        params: {
            'tag-new': tagNew,
            'tag-updated': tagNew,
            'tag-absent': tagAbsent,
            'untag-updated': tagAbsent,
            'untag-absent': tagNew,
        },
    };

    axios
        .post('https://localise.biz/api/import/pot?async=1', requestBody, requestParams)
        .then((resp) => {
            console.log('Upload done: ', resp.status);
        })
        .catch((err) => {
            console.log(err);
        });
});

function copyTask(opts) {
    const {source, destination, destinations = [destination], pattern = '**/*'} = opts;

    return () => {
        let stream = gulp.src(source + pattern, {base: source});
        destinations.forEach((destination) => {
            stream = stream.pipe(gulp.dest(destination));
        });

        return stream;
    };
}
