const { src, dest, watch, series, parallel } = require('gulp');

const newer = require('gulp-newer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');


let srcFolder = './';
let distFolder = '../dist/';

let devBuild = true;

// CSS processing
function css(){
    const input = srcFolder + 'assets/scss/**/*.scss';
    const output = distFolder + 'assets/css';

    return src(input)
        .pipe(newer(output))
        .pipe(devBuild ? sourcemaps.init() : noop())
        .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
        //.pipe(concat('bundle.css')).pipe(devBuild ? sourcemaps.write() : noop())
        //.pipe(rename({suffix:'.min'}))
        .pipe(dest(output));
}

//in dist - Copy all CSS files to css/
function cssOrder() {
    const input = distFolder + 'assets/css/';
    const output = distFolder + 'assets/css';
    const files = [
        input + 'about/**/*.*',
        input + 'contact/**/*.*',
        input + 'home/**/*.*',
        input + 'projects/**/*.*',
        input + 'testimonials/**/*.*',
        input + 'services/**/*.*'
      ];

  return src(files)
        .pipe(dest(output));
};

//delete all subfolders in /dist/assets/css
function deleteDistCssExtra() {
    const input = distFolder + 'assets/css/';

    return del([ input + '**' , '!../dist/assets/css/*.css'], {force:true});
};


//watch for file changes
function watchFiles(done){

    browserSync.init({
        watch: true,
        socket: {
            domain: 'localhost:3000'
        },
        server: {
            baseDir: distFolder,
            startPath: 'index.html'
        }
    });
    //image changes
    watch(srcFolder + 'assets/img/**/*', img);
    //html changes
    watch(srcFolder + '*.html', html);
    //css changes
    watch(srcFolder + 'assets/scss/**/*', cssAll);
    //javascript changes
    watch(srcFolder + 'assets/js/**/*', js);

    done();
}

 // javascript processing
function js() {
    const input = srcFolder + 'assets/js/';
    const output = distFolder + 'assets/js';

    return src(input + '*.js')
        .pipe(newer(output))
        .pipe(minify({
            ext: {
                min: '.js' // Set the file extension for minified files to just .js
            },
            noSource: true
        }))
        .pipe(dest(output))
  };

// html processing
function html(){
    const input = srcFolder;
    const output = distFolder;
  
    return src(input  + '*.html')
        //.pipe(newer(output))
        .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true
        }))
        .pipe(dest(output));
}

// image processing
function img() {
    const input = srcFolder + 'assets/img/';
    const output = distFolder + 'assets/img';

    return src(input  + '**/*')
        .pipe(imagemin())
        .pipe(dest(output));
};


// create single tasks
exports.css = css;
exports.cssOrder = cssOrder;
exports.deleteDistCssExtra = deleteDistCssExtra;
exports.watchFiles = watchFiles;

exports.html = html;
exports.js = js;
exports.img = img;

//Group tasks
const cssAll = 
  series (
    css, 
    cssOrder, 
    deleteDistCssExtra
  )

// create build task
exports.build = series(exports.css, exports.cssOrder, exports.deleteDistCssExtra, exports.html, exports.js,  exports.img);

//defaut task
exports.default = series(exports.build, exports.watchFiles);

