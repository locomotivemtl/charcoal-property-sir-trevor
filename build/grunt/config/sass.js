module.exports = {
    options: {
        sourceMap: false
    },
    app: {
        files: {
            'assets/dist/styles/charcoal.admin.css': 'assets/src/styles/**/charcoal.admin.scss'
        }
    },
    main: {
        files: {
            'assets/dist/styles/main.css': 'assets/src/styles/**/main.scss'
        }
    }

};
