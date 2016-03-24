module.exports = function (grunt) {
	grunt.registerTask('default', [
    'webpack:build',
		'sails-linker:prodJs',
		'sails-linker:prodStyles'
	]);
};
