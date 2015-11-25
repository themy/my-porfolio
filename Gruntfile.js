module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - built on <%= grunt.template.today("dd-mm-yyyy") %> */\n',
            views: 'source/views/',
            assets: 'source/assets/',
            build: 'public/',
            doc: 'document/'
        },
        jade: {
            compile: {
                options: {
                    pretty: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.views %>',
                        src: ['**/*.jade', '!blocks/**', '!layouts/**', '!mixins/**'],
                        dest: '<%= meta.build %>',
                        ext: '.html'
                    }
                ]
            }
        },
//        less: {
//            build: {
//                options: {
//                    compress: false
//                },
//                files: [
//                    {
//                        '<%= meta.build %>css/libs.css': '<%= meta.assets %>css/libs.less',
//                        '<%= meta.build %>css/style.css': '<%= meta.assets %>css/style.less',
//                        '<%= meta.build %>css/ie.css': '<%= meta.assets %>css/ie.less',
//                        '<%= meta.build %>css/print.css': '<%= meta.assets %>css/print.less'
//                    }
//                ]
//            }
//        },
        sass: {
            build: {
                options: {
                    compress: false
                },
                files: [
                    {
                       '<%= meta.build %>css/libs.css': '<%= meta.assets %>css/libs.scss',
                       '<%= meta.build %>css/style.css': '<%= meta.assets %>css/style.scss',
                       '<%= meta.build %>css/ie.css': '<%= meta.assets %>css/ie.scss',
                       '<%= meta.build %>css/print.css': '<%= meta.assets %>css/print.scss'
                    }
                ]
            }
        },
        concat: {
            dist: {
                files: [
                    {
                        '<%= meta.build %>js/modernizr.js': ['<%= meta.assets %>js/libs/modernizr.2.8.3.js', '<%= meta.assets %>js/libs/detectizr.js'],
                        '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-2.1.3.js', '<%= meta.assets %>js/libs/handlebars-v3.0.3.js', '<%= meta.assets %>js/libs/plugins/*.js', 'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js', 'bower_components/slick-carousel/slick/slick.js', 'bower_components/isotope/dist/isotope.pkgd.js', 'bower_components/html5shiv/dist/html5shiv.js'],
                        '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
                        '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/*.js']
                    }
                ]
            }
        },
        copy: {
            data: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.views %>data/',
                        src: ['**', '!*.jade'],
                        dest: '<%= meta.build %>data/'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.assets %>fonts/',
                        src: '**',
                        dest: '<%= meta.build %>fonts/'
                    }
                ]
            },
            icons: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.assets %>icons/',
                        src: '**',
                        dest: '<%= meta.build %>'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.assets %>images/',
                        src: '**',
                        dest: '<%= meta.build %>images/'
                    }
                ]
            },
            media: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.assets %>media/',
                        src: '**',
                        dest: '<%= meta.build %>media/'
                    }
                ]
            },
            htaccess: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.assets %>tmp/',
                        src: '.htaccess',
                        dest: '<%= meta.build %>'
                    }
                ]
            }
        },
//        jshint: {
//            options: {
//                jshintrc: '.jshintrc'
//            },
//            files: ['<%= meta.assets %>js/plugins/*.js']
//        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            files: ['<%= meta.build %>css/style.css']
        },
        htmlhint: {
            options: {
                htmlhintrc: '.htmlhintrc'
            },
            files: ['<%= meta.build %>*.html']
        },
        watch: {
            options: {
                spawn: false,
                interrupt: true,
                livereload: true
            },
            js: {
                files: ['<%= meta.assets %>js/plugins/*.js', '<%= meta.assets %>js/*.js'],
                tasks: ['concat']
            },
            jade: {
                files: ['<%= meta.views %>**/*.jade'],
                tasks: ['jade', 'htmlhint']
            },
            data: {
                files: ['<%= meta.views %>data/**'],
                tasks: ['copy:data']
            },
            sass: {
                files: ['<%= meta.assets %>css**/*.scss'],
                tasks: ['sass', 'autoprefixer', 'csslint']
            },
            fonts: {
                files: ['<%= meta.assets %>fonts/**'],
                tasks: ['copy:fonts']
            },
            icons: {
                files: ['<%= meta.assets %>icons/**'],
                tasks: ['copy:icons']
            },
            images: {
                files: ['<%= meta.assets %>images/**'],
                tasks: ['copy:images']
            },
            media: {
                files: ['<%= meta.assets %>media/**'],
                tasks: ['copy:media']
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= meta.build %>images/',
                        src: '**/*.{png,jpg,gif}',
                        dest: '<%= meta.build %>images/'
                    }
                ]
            }
        },
        cssmin: {
            options: {
                advanced: false,
                keepSpecialComments: false,
                compatibility: 'ie8'
            },
            compress: {
                files: [
                    {
                        '<%= meta.build %>css/libs.css': '<%= meta.build %>css/libs.css',
                        '<%= meta.build %>css/style.css': '<%= meta.build %>css/style.css',
                        '<%= meta.build %>css/ie.css': '<%= meta.build %>css/ie.css',
                        '<%= meta.build %>css/print.css': '<%= meta.build %>css/print.css'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true
                },
                files: [
                    {
                        '<%= meta.build %>404.html': '<%= meta.build %>404.html',
                        '<%= meta.build %>sitemap.html': '<%= meta.build %>sitemap.html',
                        '<%= meta.build %>index.html': '<%= meta.build %>index.html'
                    }
                ]
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>',
                compress: true,
                beautify: false,
                preserveComments: false
            },
            dist: {
                files: [
                    {
                        '<%= meta.build %>js/modernizr.js': ['<%= meta.assets %>js/libs/modernizr.2.8.3.js', '<%= meta.assets %>js/libs/detectizr.js'],
                        '<%= meta.build %>js/libs.js': ['<%= meta.assets %>js/libs/jquery-2.1.3.js', '<%= meta.assets %>js/libs/handlebars-v3.0.3.js', '<%= meta.assets %>js/libs/plugins/*.js'],
                        '<%= meta.build %>js/l10n.js': '<%= meta.assets %>js/l10n.js',
                        '<%= meta.build %>js/script.js': ['<%= meta.assets %>js/site.js', '<%= meta.assets %>js/plugins/*.js']
                    }
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 3 versions']
            },
            files: {
                expand: true,
                src: '<%= meta.build %>css/*.css'
            }
        },
        markdownpdf: {
            files: {
                src: ['*.md'],
                dest: '<%= meta.doc %>'
            }
        },
        nodemon: {
            options: {
                ignore: ['node_modules/**', '<%= meta.assets %>js/**'],
                ext: 'js'
            },
            dev: {
                script: 'source/server.js'
            }
        },
        concurrent: {
            options: {
                limit: 2
            },
            dev: {
                tasks: ['nodemon:dev', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        qunit: {
            all: ['test/**/*.html']
        },
        clean: {
            options: {
                force: true
            },
            build: ['public']
        }
    });
    grunt.file.expand('./node_modules/grunt-*/tasks').forEach(grunt.loadTasks);
    require('time-grunt')(grunt);
    grunt.registerTask('build', ['clean', 'concat', 'sass', 'jade', 'copy', 'autoprefixer', 'htmlhint', 'csslint']);
    grunt.registerTask('default', ['build', 'concurrent:dev']);
    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('doc', ['markdownpdf']);
    grunt.registerTask('release', ['build', 'test', 'imagemin', 'uglify', 'cssmin', 'htmlmin']);
};
