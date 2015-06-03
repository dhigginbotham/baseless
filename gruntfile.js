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
    },
    parker: {
      options: tasks.parker.opts,
      src: [tasks.parker.src]
    },
    'gh-pages': {
      options: {
        base: 'styleguide/'
      },
      src: ['**']
    }
  });

  // load in grunt tasks
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-parker');
  grunt.loadNpmTasks('grunt-gh-pages');

  // register grunt task
  grunt.registerTask(tasks.clean.name, ['clean']);
  grunt.registerTask(tasks.dist.name, ['less:dist', 'cssmin:dist']);
  grunt.registerTask(tasks.less.name, ['less:styleguide']);
  grunt.registerTask(tasks.readme.name, ['copy:readme']);
  grunt.registerTask(tasks.kss.name, ['shell:kss']);
  grunt.registerTask(tasks.kss.less.name, ['shell:less']);
  grunt.registerTask(tasks.parker.name, ['parker']);
  grunt.registerTask(tasks.ghpages.name, ['gh-pages']);
  grunt.registerTask('default', [tasks.clean.name, tasks.dist.name, tasks.less.name, tasks.kss.name]);
  grunt.registerTask('styleguide', [tasks.dist.name, tasks.less.name, tasks.readme.name, tasks.kss.name]);
};