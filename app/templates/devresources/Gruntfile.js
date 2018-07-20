'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		libraryName: '<%= libraryName %>',

		dir: {
			src: 'src',
			test: 'test',
			dist: 'dist',
			bower_components: 'bower_components',
		},

		connect: {
			options: {
				port: 8080,
				hostname: '*',
			},
			src: {},
			dist: {},
		},

		openui5_connect: {
			src: {
				options: {
					resources: [
						'<%%= dir.bower_components %%>/openui5-sap.ui.core/resources',
						'<%%= dir.bower_components %%>/openui5-sap.m/resources',
						'<%%= dir.bower_components %%>/openui5-sap.ui.layout/resources',
						'<%%= dir.bower_components %%>/openui5-themelib_sap_belize/resources',
						'<%%= dir.src %%>',
					],
					testresources: [
						'<%%= dir.bower_components %%>/openui5-sap.ui.core/test-resources',
						'<%%= dir.bower_components %%>/openui5-sap.m/test-resources',
						'<%%= dir.test %%>',
					],
				},
			},
			dist: {
				options: {
					resources: [
						'<%%= dir.bower_components %%>/openui5-sap.ui.core/resources',
						'<%%= dir.bower_components %%>/openui5-sap.m/resources',
						'<%%= dir.bower_components %%>/openui5-sap.ui.layout/resources',
						'<%%= dir.bower_components %%>/openui5-themelib_sap_belize/resources',
						'<%%= dir.dist %%>/resources',
					],
					testresources: [
						'<%%= dir.bower_components %%>/openui5-sap.ui.core/test-resources',
						'<%%= dir.bower_components %%>/openui5-sap.m/test-resources',
						'<%%= dir.bower_components %%>/openui5-sap.ui.layout/test-resources',
						'<%%= dir.bower_components %%>/openui5-themelib_sap_belize/test-resources',
						'<%%= dir.dist %%>/test-resources',
					],
				},
			},
		},

		openui5_theme: {
			theme: {
				files: [
					{
						expand: true,
						cwd: '<%%= dir.src %%>',
						src: '**/themes/*/library.source.less',
						dest: '<%%= dir.dist %%>/resources',
					},
				],
				options: {
					rootPaths: [
						'<%%= dir.bower_components %%>/openui5-sap.ui.core/resources',
						'<%%= dir.bower_components %%>/openui5-themelib_sap_belize/resources',
						'<%%= dir.src %%>',
					],
					library: {
						name: '<%%= libraryName %%>',
					},
				},
			},
		},

		openui5_preload: {
			library: {
				options: {
					resources: '<%%= dir.src %%>',
					dest: '<%%= dir.dist %%>/resources',
				},
				libraries: true,
			},
		},

		clean: {
			dist: '<%%= dir.dist %%>/',
		},



        open: {
            root: {
                path: 'http://localhost:8080/resources/demo.html',
                options: {
                    delay: 500
                }
            }
        },

		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%%= dir.src %%>',
						src: ['**'],
						dest: '<%%= dir.dist %%>/resources',
					},
					{
						expand: true,
						cwd: '<%%= dir.test %%>',
						src: ['demo.html'],
						dest: '<%%= dir.dist %%>/resources',
					},
					/*{
						expand: true,
						cwd: '<%%= dir.test %%>',
						src: ['**'],
						dest: '<%%= dir.dist %%>/test-resources',
					},*/
				],
			},
		},

		eslint: {
			src: ['<%%= dir.src %%>'],
			test: ['<%%= dir.test %%>'],
			gruntfile: ['Gruntfile.js'],
		},
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks("grunt-open");

	// Server task
	grunt.registerTask('serve', function(target) {
		grunt.task.run('openui5_connect:' + (target || 'src') + ':keepalive');
	});

	// Linting task
	grunt.registerTask('lint', ['eslint']);

	// Build task
	grunt.registerTask('build', ['openui5_theme', 'openui5_preload', 'copy']);

	// Default task
	grunt.registerTask('default', ['lint', 'clean', 'build', 'open', 'serve:dist']);
};
