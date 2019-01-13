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

    var build_dir = 'out';
    var release_dir = 'dist';
    let lib_name = 'dilu'
    let lib_js_banner = `
    ${license}
    (function(factory) { 
        if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') { 
            // [1] CommonJS/Node.js 
            var target = module['exports'] || exports;
            var ${lib_name} = factory(target, require);
            Object.assign(target, ${lib_name});
        } else if (typeof define === 'function' && define['amd']) {
            define(factory); 
        } else { 
            factory();
        } 
    })(function() {
    `;
    let lib_js_footer =
        `\n\window[\'${lib_name}\'] = window[\'${lib_name}\'] || ${lib_name} \n\
                                \n return ${lib_name};\n\
                });`

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
                    base: 'example',
                    open: true//,hashchange
                }
            }
        },
        babel: {
            source: {
                options: {
                    sourceMap: false,
                    presets: ["es2015"],
                },
                files: [{
                    src: [`${build_dir}/${lib_name}.js`],
                    dest: `${release_dir}/${lib_name}.es5.js`
                }]
            }
        },
        concat: {
            lib_es6: {
                options: {
                    banner: lib_js_banner,
                    footer: lib_js_footer,
                },
                src: [`${build_dir}/${lib_name}.js`],
                dest: `${release_dir}/${lib_name}.js`
            },
            declare: {
                options: {
                    banner: `
/// <reference path="../out/${lib_name}.d.ts"/>

declare module "maishu-${lib_name}" { 
    export = ${lib_name}; 
}
                 
`,
                },
                src: [],
                dest: `${release_dir}/${lib_name}.d.ts`
            },
        },
        copy: {
            out: {
                files: [{
                    src: `${release_dir}/${lib_name}.js`,
                    dest: `example/js/${lib_name}.js`
                }, {
                    src: `${release_dir}/${lib_name}.d.ts`,
                    dest: `example/js/${lib_name}.d.ts`
                }]
            }
        },
        shell: {
            src: {
                command: `tsc -p src`
            }
        },
        uglify: {
            out: {
                options: {
                    mangle: false
                },
                files: [{
                    src: `${release_dir}/${lib_name}.es5.js`,
                    dest: `${release_dir}/${lib_name}.min.js`
                }]
            }
        },
    });

    grunt.registerTask('default', ['shell', 'concat', 'babel', 'uglify', 'copy']);
}