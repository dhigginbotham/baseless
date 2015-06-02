//
// Configuration file for your styleguide, by keeping these values dry
// and reusable we'll hopefully be able to make quicker, more sweeping
// changes to our task runner[s]. 
//

var path = require('path');

var config = {
  cssPrefix: 'bs-',
  title: 'BASELESS',
  less: 'less/style.less',
  globs: {
    dist: './dist/**/*',
    sg: './styleguide/**/*',
    screens: './screenshots/**/*'
  }
};

var tasks = {
  clean: {
    name: 'styleguide:clean',
    src: [config.globs.dist, config.globs.sg, config.globs.screens]
  },
  dist: {
    name: 'styleguide:dist',
    src: config.less,
    dest: {
      path: 'dist/',
      file: 'style.min.css'
    }
  },
  readme: {
    name: 'styleguide:readme',
    src: './README.md',
    dest: {
      path: 'less/',
      file: 'styleguide.md'
    }
  },
  ghpages: {
    name: 'styleguide:ghpages',
    src: config.globs.sg
  },
  kss: {
    name: 'styleguide:kss',
    exec: 'kss-node <%= source %> <%= destination %> --template <%= template %> --css <%= css %> --title "<%= title %>" --helpers "<%= helpers %>" --placeholder "<%= placeholder %>"',
    opts: {
      source: path.join(__dirname, 'less'),
      destination: path.join(__dirname, 'styleguide'),
      template: path.join(__dirname, 'less', 'template'),
      css: 'public/style.css',
      title: config.title,
      helpers: path.join(__dirname, 'less', 'template', 'helpers'),
      placeholder: 'default'
    },
    less: {
      name: 'styleguide:kss:less',
      exec: 'lessc --verbose <%= src %> <%= dest %>',
      opts: {
        src: path.join(__dirname, 'less', 'template', 'less', 'style.less'),
        dest: path.join(__dirname, 'less', 'template', 'public', 'kss.css')
      }
    }
  },
  less: {
    name: 'styleguide:less',
    src: config.less,
    dest: {
      path: 'less/template/public',
      file: 'style.css'
    },
    opts: {
      modifyVars: {
        'css-prefix': config.cssPrefix
      }
    }
  },
  screens: {
    name: 'styleguide:screenshots',
    src: config.globs.sg + '.html',
    opts: {
      width: ['1280', '1024', '768', '600', '480', '320'],
      folder: 'screenshots/',
      path: 'styleguide/',
      type: 'png'
    }
  },
  parker: {
    name: 'styleguide:parker',
    src: './dist/style.min.css',
    opts: {
      file: './dist/' + config.cssPrefix + 'stats.md',
      metrics: [
        'TotalStylesheets',
        'TotalStylesheetSize',
        'TotalRules',
        'TotalSelectors',
        'TotalIdentifiers',
        'TotalDeclarations',
        'SelectorsPerRule',
        'IdentifiersPerSelector',
        'SpecificityPerSelector',
        'TopSelectorSpecificity',
        'TopSelectorSpecificitySelector',
        'TotalIdSelectors',
        'TotalUniqueColours',
        'TotalImportantKeywords',
        'TotalMediaQueries'
      ]
    }
  }
};

module.exports = config;
module.exports.tasks = tasks;