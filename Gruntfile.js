module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    includeSource: {
      options: {
        basePath: "public"
      },
      target: {
        files: {
          'public/index.html': './index.tmpl.html'
        }
      }
    },
    watch: {
      files: ['index.tmpl.html'],
      tasks: ['includeSource']
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-include-source')

  grunt.registerTask('default', ['watch'])

}
