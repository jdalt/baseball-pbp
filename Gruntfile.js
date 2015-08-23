module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    includeSource: {
      options: {
        basePath: "public",
        baseUrl: "/"
      },
      templates: {
        html: {
          js: '<script src="{filePath}"></script>'
        }
      },
      target: {
        files: {
          'public/index.html': './index.tmpl.html'
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-include-source')

  grunt.registerTask('default', ['includeSource'])

}
