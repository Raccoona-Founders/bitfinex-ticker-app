const path = require('path');
const mkdirp = require('mkdirp-sync');
const { GettextExtractor, JsExtractors, HtmlExtractors } = require('gettext-extractor');


let extractor = new GettextExtractor();

function extract() {
    extractor
        .createJsParser([
            JsExtractors.callExpression(['props.i18n.gettext', '[this].i18n.gettext', '__'], {
                arguments: {
                    text: 0,
                    context: 1,
                },
            }),
            JsExtractors.callExpression(['props.i18n.ngettext', '[this].i18n.ngettext'], {
                arguments: {
                    text: 0,
                    textPlural: 1,
                },
            }),
            JsExtractors.callExpression(['props.i18n.pgettext', '[this].i18n.pgettext'], {
                arguments: {
                    context: 0,
                    text: 1,
                },
            }),
            JsExtractors.callExpression(['props.i18n.pngettext', '[this].i18n.npgettext'], {
                arguments: {
                    context: 0,
                    text: 1,
                    textPlural: 2,
                },
            }),
        ])
        .parseFilesGlob('./src/**/*.@(ts|js|tsx|jsx)');

    extractor
        .createHtmlParser([HtmlExtractors.elementContent('translate, [translate]')])
        .parseFilesGlob('./src/**/*.html');

    mkdirp(path.resolve('./build'));
    extractor.savePotFile('./build/messages.pot');

    extractor.printStats();
}

module.exports = {
    extract: extract,
};
