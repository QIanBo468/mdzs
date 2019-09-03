const files = require.context('../components', false, /\.vue$/)
const pages = {}
files.keys().forEach(key => {
pages[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
})
console.log(pages)
export default pages
