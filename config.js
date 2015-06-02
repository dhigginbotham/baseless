//
// Configuration file for your styleguide, by keeping these values dry
// and reusable we'll hopefully be able to make quicker, more sweeping
// changes to our task runner[s]. 
//

var path = require('path');

var config = {
  cssPrefix: 'bs-',
  title: 'BASELESS',
  globs: {
    dist: './dist/**/*',
    sg: './styleguide/**/*',
    screens: 'screenshots/**/*'
  }
};

var tasks = {
  clean: {
    name: 'styleguide:clean',
    src: [config.globs.dist, config.globs.sg, config.globs.screens]
  },
  readme: {
    name: 'styleguide:readme',
    src: './README.md',
    dest: {
      path: 'less/',
      file: 'styleguide.md'
    }
  },
  kss: {
    name: 'styleguide:kss',
    exec: 'kss-node <%= source %> <%= destination %> --template <%= template %> --css <%= css %> --title "<%= title %>" --cssPrefix "<%= cssPrefix %>" --helpers "<%= helpers %>" --placeholder "<%= placeholder %>',
    opts: {
      source: path.join(__dirname, 'less'),
      destination: path.join(__dirname, 'styleguide'),
      template: path.join(__dirname, 'less', 'templates', 'styleguide'),
      css: 'public/style.css',
      title: config.title,
      helpers: path.join(__dirname, 'less', 'templates', 'styleguide', 'helpers'),
      placeholder: 'default',
      cssPrefix: config.cssPrefix
    },
    less: {
      name: 'styleguide:kss:less',
      exec: 'lessc --verbose <%= src %> <%= dest %>',
      opts: {
        src: path.join(__dirname, 'less', 'templates', 'styleguide', 'public', 'kss.less'),
        dest: path.join(__dirname, 'less', 'templates', 'styleguide', 'public', 'kss.css')
      }
    }
  },
  less: {
    name: 'styleguide:less',
    src: 'less/style.less',
    dest: {
      sg: {
        path: 'less/templates/styleguide/public',
        file: 'style.css'
      },
      dist: {
        path: 'dist/',
        file: 'style.min.css'
      }
    },
    opts: {
      globalVars: {
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
    output: './dist/.' + config.cssPrefix + 'stats.md',
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
};

module.exports = tasks;