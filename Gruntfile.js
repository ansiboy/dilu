module.exports = function (grunt) {
    grunt.initConfig({
        connect: {
            examples: {
                options: {
                    // 服务器端口号
                    port: 8041,
                    // 服务器地址(可以使用主机名localhost，也能使用IP)
                    hostname: 'localhost',
                    keepalive: true,
                    // livereload: 35729,
                    // 物理路径(默认为. 即根目录) 注：使用'.'或'..'为路径的时，可能会返回403 Forbidden. 此时将该值改为相对路径 如：/grunt/reloard。
                    base: 'examples',
                    open: true//,hashchange
                }
            }
        },
        shell: {
            src: {
                command: `tsc -p src`
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect')
    grunt.loadNpmTasks('grunt-shell');
    grunt.registerTask('build', ['shell']);
    grunt.registerTask('default', ['build', 'copy', 'connect'])

}