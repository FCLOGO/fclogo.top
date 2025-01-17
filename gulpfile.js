const { src, dest, watch } = require('gulp')
const replace = require('gulp-replace')

const timestampString = new Date()
  .toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    timeZoneName: 'short',
    hour12: false
  })
  .replace(/\//g, '-')

const copyrightString = `<!-- Created by @FCLOGO ${timestampString} . https://fclogo.top/ -->
<!-- FOR PERSONAL USE ONLY NOT FOR COMMERCIAL USE -->`

const watcher = watch(['src/data/logos/**/svg/*.svg'])

function replaceSvgCommet() {
  watcher.on('add', function (fileName) {
    return src(fileName, { base: 'src/data/logos/' })
      .pipe(replace(/<!--.*-->/g, copyrightString))
      .pipe(replace('id="图层_1" ', ''))
      .pipe(replace('id="_图层_1" ', ''))
      .pipe(replace('data-name="图层 1" ', ''))
      .pipe(dest('src/data/logos/'))
  })
}
exports.default = replaceSvgCommet
