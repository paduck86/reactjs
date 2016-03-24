module.exports = function (grunt) {
	grunt.registerTask('build', [
    'webpack:build',
    'sails-linker:prodJs',
    'sails-linker:prodStyles'
	]);
};
