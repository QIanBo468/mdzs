// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-pxtorem":{
    //   rootValue: 75,
    // unitPrecision: 5,
    // propList: ['*'],
    // selectorBlackList: [],
    // replace: true,
    // mediaQuery: false,
    // minPixelValue: 0,
    // selectorBlackList  : ['van','mu'],
    rootValue: 16,
    unitPrecision: 5,
    propList: ['*'],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
    selectorBlackList  : ['van'],
    },
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
