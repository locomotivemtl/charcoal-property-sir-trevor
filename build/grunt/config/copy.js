module.exports = {
    vendor: {
        files: [
            {
                expand: true,
                cwd: 'node_modules/sir-trevor/build/',
                src: [ 'sir-trevor.min.js' ],
                dest: 'assets/dist/scripts/vendors/'
            },
            {
                expand: true,
                flatten: true,
                filter: 'isFile',
                cwd: 'node_modules/sir-trevor/public/images/icons/src/',
                src: [ '*.svg' ],
                dest: 'assets/dist/images/sir-trevor/'
            },
            {
                expand: true,
                cwd: 'node_modules/sir-trevor/build/',
                src: [ 'sir-trevor-icons.svg' ],
                dest: 'assets/dist/images/'
            }
        ]
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
