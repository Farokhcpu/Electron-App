module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-ts');
	grunt.loadNpmTasks('grunt-auto-install');
	grunt.loadNpmTasks('grunt-electron');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		config: {
			distPath: 'dist',
			srcPath: 'src'
		},
		pkg: grunt.file.readJSON('package.json'),
			
		auto_install: {
			dist: {
				options: {
					cwd: './dist/',
					stdout: true,
					stderr: true,
					failOnError: true,
					npm: '--production'
				}
			}
		},
		electron: {
			osx64: {
				options: {
					name: 'Electron-App',
					dir: 'dist/',
					out: 'dist/apps',
					version: '1.0.0',
					platform: 'mas',
					arch: 'x64'
				}
			},
			win64: {
				options: {
					name: 'Electron-App',
					dir: 'dist/',
					out: 'dist/apps',
					version: '1.0.0',
					platform: 'win32',
					arch: 'x64'
				}
			}

		},
		copy:{
			resources: {
				files: [
					{
						expand: true,
						cwd: '<%=config.srcPath%>',
						src: '**',
						dest: '<%=config.distPath%>',
						filter: 'isFile'
					}
				]
			}
		}
	});

	grunt.registerTask('default', ['electron']);
	grunt.registerTask('dist', ['copy:resources', 'auto_install:dist']);
};



