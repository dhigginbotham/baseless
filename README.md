# [BASELESS](http://dhigginbotham.github.io/baseless)
[BASELESS](https://github.com/dhigginbotham/baseless) (`"bs"` for short) is a small (`~23k`) modular ui framework for any modern website. The idea behind bs was to create a living styleguide for your website, with pre assembled common use components. You'll find a lot of familiarity between this framework and 
many other popular frameworks, as a huge fan of [`@mdo`](https://twitter.com/mdo) and of his ideas I take a lot of naming  conventions found in 
[`twbs`](https://github.com/twbs/bootstrap), this is namely just to help anyone else on a team pickup a basic naming convention, have you not one 
of your own.

##  Components
`bs` components are all modular, so you can include only the components you need.

  - **alerts.less** - ever feel the need to get your point across, use me.
  - **buttons.less** - dynamic buttons, can morph their colors in the time it takes you to mouseup
  - **forms.less** - ...
  - **grid.less** - highly experimental, mostly volatile and will be refactored 12 column grids
  - **labels.less** - from price tags to ctas to push notifications, labels wont let you down
  - **lists.less** - gives you a little more control over the display of your list items
  - **panels.less** - panels are an everyday item from dashboard ui's to user profiles, get 'em
  - **shapes.less** - ...
  - **tables.less** - very, very simple table styling, there's still a time and place for tables
  - **wells.less** - wells also double as utility-boxs very easily, what you'd expect

## Folder Structure
while `bs` is small it *may* have some confusing parts. Here's how it's all layed out:

```js
.
├── bower.json
├── config.js
├── dist
│   ├── bs-stats.md
│   ├── style.css
│   ├── style.css.map
│   ├── style.min.css
│   └── style.min.css.gz
├── gruntfile.js
├── gulpfile.js
├── less
│   ├── _base.less
│   ├── components
│   │   ├── _alerts.less
│   │   ├── _buttons.less
│   │   ├── docs
│   │   │   ├── alerts.hbs
│   │   │   ├── buttons.hbs
│   │   │   ├── forms.hbs
│   │   │   ├── grid.hbs
│   │   │   ├── includes
│   │   │   │   ├── form-label.hbs
│   │   │   │   ├── form-label-select.hbs
│   │   │   │   ├── form-label-textarea.hbs
│   │   │   │   ├── form-label-text-input.hbs
│   │   │   │   └── form-label-text-input--inline.hbs
│   │   │   ├── labels.hbs
│   │   │   ├── lists.hbs
│   │   │   ├── panels.hbs
│   │   │   ├── shapes.hbs
│   │   │   ├── tables.hbs
│   │   │   └── wells.hbs
│   │   ├── _forms.less
│   │   ├── _grid.less
│   │   ├── _labels.less
│   │   ├── _lists.less
│   │   ├── _panels.less
│   │   ├── _shapes.less
│   │   ├── _tables.less
│   │   └── _wells.less
│   ├── _constants.less
│   ├── _helpers.less
│   ├── _mixins.less
│   ├── _normalize.less
│   ├── _print.less
│   ├── styleguide.md
│   ├── style.less
│   └── template
│       ├── helpers
│       │   └── cssPrefix.js
│       ├── index.html
│       ├── less
│       │   └── style.less
│       ├── package.json
│       ├── public
│       │   ├── kss.css
│       │   ├── kss.js
│       │   ├── less.js
│       │   ├── prettify.js
│       │   ├── style.css
│       │   └── style.css.map
│       └── template_config.js
├── LICENSE
├── package.json
├── README.md
└── styleguide
    ├── index.html
    ├── public
    │   ├── kss.css
    │   ├── kss.js
    │   ├── less.js
    │   ├── prettify.js
    │   ├── style.css
    │   └── style.css.map
    ├── section-1.html
    └── section-2.html
```
  
## Tasks
bs uses [`gulp`](https://github.com/gulpjs/gulp) or [`grunt`](#) under the hood to do all the compilation and build steps. With that said I'm not unnecessarily forcing you to download devDependencies for both of them. For whichever
task runner you'd want to use included you'll find an `npm` script: `npm run gulp-init` or `npm run grunt-init`. :neckbeard:

#### Available Tasks

| Task | Desc
| --- | --- |
| `default` | Runs watching task that does all of the tasks needed for active development on file change
| `styleguide` | Runs all the tasks to create updated styleguide, moves files and compiles less
| `styleguide:clean` | Runs task to clean output directories for releases
| `styleguide:dist` | Runs task to compile basless less dist
| `styleguide:less` | Runs task to compile baseless styleguide less
| `styleguide:kss` | Runs task to compiles styleguide with [kss-node](https://github.com/kss-node/kss-node)
| `styleguide:kss:less` | Runs task to compile styleguide less
| `styleguide:readme` | Runs task to compile and copy the readme file to the styleguides index page
| `styleguide:parker` | Runs task to compile the [parker](https://github.com/katiefenn/parker) report for our selectors
| `styleguide:ghpages` | Runs task to update github pages html with the latest styleguide files
| `styleguide:screenshots` | Runs task to take screenshots of the components in various screen widths