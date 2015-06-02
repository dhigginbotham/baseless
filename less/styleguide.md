# [BASELESS](http://dhigginbotham.github.io/baseless)
[BASELESS](https://github.com/dhigginbotham/baseless) (`"bs"` for short) is a tiny (`~820b`) ui framework for any modern website. The idea behind bs was to 
create a living styleguide for your website, with pre assembled common use components. You'll find a lot of familiarity between this framework and 
many other popular frameworks, as a huge fan of [`@mdo`](https://twitter.com/mdo) and of his ideas I take a lot of naming  conventions found in 
[`twbs`](https://github.com/twbs/bootstrap), this is namely just to help anyone else on a team pickup a basic naming convention, have you not one 
of your own.

## Tasks
bs uses [`gulp`](https://github.com/gulpjs/gulp) under the hood to do all the compilation and build steps, here's a list of them currently:

| Task | Desc
| --- | --- |
| `default` | Runs watching task that does all of the tasks needed for active development on file change
| `styleguide` | Runs all the tasks to create updated styleguide, moves files and compiles less
| `styleguide:clean` | Runs task to clean output directories for releases
| `styleguide:less` | Runs task to compile baseless less dist
| `styleguide:kss` | Runs task to compiles styleguide with [kss-node](https://github.com/kss-node/kss-node)
| `styleguide:kss:less` | Runs task to compile styleguide less
| `styleguide:readme` | Runs task to compile and copy the readme file to the styleguides index page
| `styleguide:parker` | Runs task to compile the [parker](https://github.com/katiefenn/parker) report for our selectors
| `styleguide:ghpages` | Runs task to update github pages html with the latest styleguide files
| `styleguide:screenshots` | Runs task to take screenshots of the components in various screen widths