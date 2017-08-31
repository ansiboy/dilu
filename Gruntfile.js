module.exports = function (grunt) {
    grunt.initConfig({
        shell: {
            src: {
                command: `tsc -p src`
            }
        }
    });
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('build', ['shell']);
    
}