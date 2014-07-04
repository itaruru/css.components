module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-styleguide');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          config: 'config.rb',
          environment: 'production',
          bundleExec: true
        }
      }
    },

    styleguide: {
      styledocco: {
        options: {
          name: 'Project-IO CSS Components',
          framework: {
            name: 'styledocco',
            options: {
              preprocessor: 'bundle exec sass --compass'
            }
          },
          template: {
            include: []
          }
        },
        src: [
          'sass/**/*.scss',
          '!ie.scss',
          '!print.scss',
          '!screen.scss'
        ],
        dest: 'doc'
      }
    },
    clean: {
      styleguide: [
        '<%= styleguide.styledocco.dest %>',
        'dist',
        '.sass-cache'
      ]
    }
  });

  grunt.registerTask('default', [
    'clean',
    'styleguide',
    'compass:dist'
  ]);
};
