module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    let pkg = grunt.file.readJSON('package.json');

    let license = `
/*!
 * DILU v${pkg.version}
 * https://github.com/ansiboy/dilu
 *
 * Copyright (c) 2016-2018, shu mai <ansiboy@163.com>
 * Licensed under the MIT License.
 *
 */`;

    grunt.initConfig({
        browserify: {
            dist: {
                files: {
                    'dist/index.js': ['out/index.js']
                }
            },
            options: {
                browserifyOptions: {
                    standalone: 'dilu',
                },
                banner: license
            },
        },
        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'out', src: ['**/*.d.ts'], dest: 'dist/', filter: 'isFile' },
                ]
            }
        },
        shell: {
            src: {
                command: `tsc -p src`
            }
        }
    });

    grunt.registerTask('default', ['shell', 'browserify', 'copy']);
}