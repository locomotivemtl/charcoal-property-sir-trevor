module.exports = {
    vendor: {
        expand: true,
        cwd: 'node_modules/sir-trevor/',
        src: [ 'sir-trevor.min.js' ],
        dest: 'assets/dist/scripts/vendors/'
    },
    icons: {
        expand: true,
        cwd: 'node_modules/sir-trevor/',
        src: [ 'sir-trevor-icons.svg' ],
        dest: 'assets/dist/images/'
    },
    charcoal: {
        src: 'assets/src/scripts/charcoal/admin/property/input/sir-trevor.js',
        dest: 'assets/dist/scripts/charcoal.property.sir-trevor.js'
    },
    admin: {
        expand: true,
        cwd: 'assets/dist/',
        src: [ '**', '*' ],
        dest: '../../../www/assets/admin/'
    }
};
