module.exports = {
    vendor: {
        expand: true,
        cwd: 'bower_components/sir-trevor-js/',
        src: ['sir-trevor.min.js'],
        dest: 'assets/dist/scripts/vendors/sir-trevor/'
    },
    charcoal: {
        src: 'assets/src/scripts/charcoal/admin/property/input/sir-trevor.js',
        dest: 'assets/dist/scripts/charcoal.property.sir-trevor.js'
    },
    css: {
        src: 'assets/dist/styles/main.css',
        dest: 'assets/dist/styles/charcoal.property.sir-trevor.css'
    },
    admin: {
        expand: true,
        cwd: 'assets/dist/',
        src: ['**', '*'],
        dest: '../../../www/assets/admin/'
    }
};
