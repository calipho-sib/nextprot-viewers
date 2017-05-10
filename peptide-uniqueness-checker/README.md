# proteotypicity-checker

> A simple interface to analyse peptide proteotypicity

Enter your peptide(s) in the textarea, separated by a coma, space or line breaks, then click on submit.

## Development

`git clone https://github.com/calipho-sib/nextprot-viewers.git` 

`cd nextprot-viewers/peptide-uniqueness-checker`  (get to the specific folder)

`npm install`  (will install the development dependencies)

`bower install`  (will install the browser dependencies)

...make your changes and modifications...

`./node_modules/.bin/grunt hbs`  (create a compiled template)

`./node_modules/.bin/grunt prod`  (Create bundle with dependencies & minify)

`./node_modules/.bin/grunt serve`  (Create local web server at localhost:9000)

`git push origin develop` (will push to git repository) 

`grunt bump` (will push and add a new release)
