module.exports = {
    sirTrevor: {
        expand: true,
        cwd: 'bower_components/sir-trevor-js/',
        src: ['sir-trevor.min.js'],
        dest: 'assets/dist/scripts/vendors/sir-trevor/'
    },
    admin: {
    expand: true,
        cwd: 'assets/dist/',
        src: ['**', '*'],
        dest: '../../../www/assets/admin/'
    }
};
