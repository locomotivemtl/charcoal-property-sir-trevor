module.exports = {
    notify_hooks: {
        options: {
            enabled  : true,
            success  : true,
            duration : 3,
            title    : '<%= package.name %>',
            max_jshint_notifications : 5
        }
    },
    build: {
        options: {
            message: 'Everything is ready to go!'
        }
    },
    javascript: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'JavaScript is linted and cleaned up'
        }
    },
    json: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'JSON is linted'
        }
    },
    php: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'PHP linted and cleaned up'
        }
    },
    sass: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'Sass compiled to CSS.'
        }
    },
    svg: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'SVG is now concatenated'
        }
    },
    copy: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'Admin assets are copied'
        }
    },
    watch: {
        options: {
            // title: '<%= pkg.title %>',
            message: 'Keeping an eye out, Chief!'
        }
    }
};
