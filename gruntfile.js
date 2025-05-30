module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    'dev/styles/main.css':'src/styles/main.less'
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css':'src/styles/main.less'
                }
            }
        },
        watch: {
            less: {
                files:['src/styles/**/*.less'],
                tasks:['less:development']
            },
            html:{
                files:['src/index.html'],
                tasks:['replace:dev']
            },
            scripts: {
                files: ['src/scripts/**/*.js'],
                tasks: ['replace:dev']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/img/',         
                    src: ['**/*.{png,jpg,gif,svg}'], 
                    dest: 'dist/img/',     
                }]
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.css'
                            },
                            {
                                match: 'ENDERECO_DO_JS',
                                replacement: '../src/scripts/main.js'
                            },
                            {
                                match: /src="img\/([^"]+)"/g,
                                replacement: 'src="../src/img/$1"'
                            }
                        ]
                },
                files:[{
                    expand: true,
                    flatten: true,
                    src:['src/index.html'],
                    dest:'dev/'
                }]
            },
            dist: {
                options: {
                    patterns: [
                            {
                                match: 'ENDERECO_DO_CSS',
                                replacement: './styles/main.min.css'
                            },
                            {
                                match: 'ENDERECO_DO_JS',
                                replacement: './scripts/main.min.js'
                            },
                            {
                                match: /src="img\/([^"]+)"/g,
                                replacement: 'src="img/$1"'
                            }
                        ]
                },
                files:[{
                    expand: true,
                    flatten: true,
                    src:['prebuild/index.html'],
                    dest:'dist/'
                }]
            }
        },
    htmlmin: {
        dist:{
            options:{
                removeComments: true,
                collapseWhitespace: true,
            },
            files:{
                'prebuild/index.html':'src/index.html'
            }
        }
    },
    copy: {
        dev: {
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'dev/img/'
            }]
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'src/img/',
                src: ['**/*.{png,jpg,gif,svg}'],
                dest: 'dist/img/'
            }]
        }
    },
    clean:['prebuild'],

    uglify: {
        target: {
            files:{
                'dist/scripts/main.min.js':'src/scripts/main.js'
            }
        }
    }

    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['watch']);
    grunt.registerTask('build',['less:production','htmlmin:dist','clean','replace:dist','copy:dist','uglify']); 
}
