module.exports = function (grunt) {
	grunt.registerTask('prod', [
		'webpack:build',
		'sails-linker:prodJs',
		'sails-linker:prodStyles'
	]);
};
