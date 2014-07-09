module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-kss');

  grunt.initConfig({
    watch: {
      src: {
        files: 'sass/{,*/}*.scss',
        tasks: ['devl'],
      }
    },

    compass: {
      devl: {
        options: {
          config: 'config.rb',
          environment: 'development',
          bundleExec: true
        }
      },
      dist: {
        options: {
          config: 'config.rb',
          environment: 'production',
          bundleExec: true
        }
      }
    },

    concat: {
      dist: {
        src: [
          'dist/stylesheets/*.css'
        ],
        dest: '.tmp/style.css',
      },      
    },

    kss: {
      options: {
        template: 'helpers/kss_template',
        includeType: 'css',
        includePath: '.tmp/style.css'
      },
      dist: {
        files: {
          'doc/main': 'sass'
        }
      }
    },

    clean: {
      dist: [
        'doc/main',
        'dist',
        '.sass-cache'
      ],
      after: [
        '.tmp'
      ]
    }
  });

  grunt.registerTask('devl', [
    'clean:dist',
    'compass:devl',
    'concat',
    'kss',
    'clean:after'
  ]);

  grunt.registerTask('default', [
    'clean:dist',
    'compass:dist',
    'concat',
    'kss',
    'clean:after'
  ]);
};
