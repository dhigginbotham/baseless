var path = require('path'),
    conf = require('./config'),
    tasks = conf.tasks;

module.exports = function(grunt) {
  
  grunt.config.merge(tasks.kss.opts);
  grunt.config.merge(tasks.kss.less.opts);

  // init grunt tasks
  grunt.initConfig({
    less: {
      styleguide: {
        options: tasks.less.opts,
        files: {
          src: conf.less,
          dest: tasks.less.dest.path + '/' + tasks.less.dest.file
        }
      },
      dist: {
        options: tasks.less.opts,
        files: {
          src: conf.less,
          dest: tasks.dist.dest.path + tasks.less.dest.file
        }
      }
    },
    cssmin: {
      dist: {
        files: [{
          dest: tasks.dist.dest.path + tasks.dist.dest.file,
          src: [tasks.dist.dest.path + tasks.less.dest.file]
        }]
      }
    },
    clean: {
      src: tasks.clean.src
    },
    copy: {
      readme: {
        src: tasks.readme.src,
        dest: path.resolve(tasks.readme.dest.path + tasks.readme.dest.file)
      }
    },
    shell: {
      kss: {
        command: grunt.config.process(tasks.kss.exec)
      },
      less: {
        command: grunt.config.process(tasks.kss.less.exec)
      }
    }
  });

  // load in grunt tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');

  // register grunt task
  grunt.registerTask('default', ['less:dist', 'less:styleguide', 'cssmin:dist']);
  grunt.registerTask(tasks.clean.name, ['clean']);
  grunt.registerTask(tasks.readme.name, ['copy:readme']);
  grunt.registerTask(tasks.kss.name, ['shell:kss']);
  grunt.registerTask(tasks.kss.less.name, ['shell:less']);
};