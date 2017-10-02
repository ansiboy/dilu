module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            out: {
                files: [{
                    src: 'out/dilu.js',
                    dest: 'example/dilu.js'
                }]
            }
        },
        shell: {
            src: {
                command: `tsc -p src`
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('build', ['shell']);

}