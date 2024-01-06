const {src, dest, watch, series} =  require('gulp');
const sass =  require('gulp-sass')(require('sass'));
const postcss =  require('gulp-postcss');
const autoprefixer =  require('autoprefixer');
const imagemin =  require('gulp-imagemin');
const webp =  require('gulp-webp');

function css(done) {
src('src/scss/app.scss')
.pipe(sass())
.pipe(postcss([autoprefixer()]))
.pipe(dest('src/css'));

done();

}

function dev(){

    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
    // watch('src/scss/app.scss', css);
}

function imagenes(done){
    src('src/img/**/*')
    .pipe(imagemin({optimizationLevel: 3}))
    .pipe(dest('src/imagenes'));

    done();
}

function versionWebp(done){
    src('src/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(dest('src/imagenes'))
    done();
}

// exports.css = css;
// exports.dev = dev;
// exports.default = css; 
module.exports = {
css,
dev,
imagenes,
versionWebp,
default: series( imagenes,versionWebp, css)
}