# [BASELESS](http://dhigginbotham.github.io/baseless)
[BASELESS](https://github.com/dhigginbotham/baseless) (`"bs"` for short) is a tiny (`~6k`) ui framework for any modern website. The idea behind bs was to 
create a living styleguide for your website, with pre assembled common use components. You'll find a lot of familiarity between this framework and 
many other popular frameworks, as a huge fan of [`@mdo`](https://twitter.com/mdo) and of his ideas I take a lot of naming  conventions found in 
[`twbs`](https://github.com/twbs/bootstrap), this is namely just to help anyone else on a team pickup a basic naming convention, have you not one 
of your own.

## Tasks
bs uses [`gulp`](https://github.com/gulpjs/gulp) or [`grunt`](#) under the hood to do all the compilation and build steps. With that said I'm not unnecessarily forcing you to download devDependencies for both of them. For whichever
task runner you'd want to use included you'll find an `npm` script: `npm run gulp-init` or `npm run grunt-init`. :neckbeard:

## Available Tasks

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

## Folder Structure
while `bs` is tiny it *may* have some confusing parts. Here's how it's all layed out:

```js
|- less/
|
|--- components/
|----- _alerts.less - ever feel the need to get your point across, use me.
|----- _buttons.less - dynamic buttons, can morph their colors in the time it takes you to mouseup
|----- _forms.less - ...
|----- _grid.less - highly experimental, mostly volatile and will be refactored 12 column grids
|----- _labels.less - from price tags to ctas to push notifications, labels wont let you down
|----- _lists.less - gives you a little more control over the display of your list items
|----- _panels.less - panels are an everyday item from dashboard ui's to user profiles, get 'em
|----- _tables.less - very, very simple table styling, there's still a time and place for tables
|----- _wells.less - wells also double as utility-boxs very easily, what you'd expect
|
|--- template/ - styleguide template
|----- helpers/ - handlebars helpers, kss-node has a wiki on registeringHerlpers in kss
|------- cssPrefis.js - adds {{cssPrefix}} to handlebars compiler in time to compile the html
|----- less/ - less stylesheets for styleguide template
|------- style.less - kss less file for styling your styleguide
|----- public/ - binary images, js, css
|----- index.html - template for your styleguide, w/ handlebars
|----- template_config.js - configuration file for kss-node generator
|
|- _base.less - bas[e|ic] file, keep it basic, mobile, and awesome.
|- _constants.less - the holy grail of your style, *keep it secret, keep it safe*
|- _helpers.less - general use helper classes
|- _mixins.less - mixins that touch all the things
|- _normalize.less - normalize.css because every developer I know wanna reinvent wheels, <3
|- style.less - @import style file
|- styleguide.md - automated copy of ./README.md
```