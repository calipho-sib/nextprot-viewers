# Peptide-viewer
This peptide viewer show detailed informations of the peptide covering of a specific human protein given in the url.
You can see a live demo here :
* http://calipho-sib.github.io/sequence-viewer/demo/

This viewer, as those on the neXtProt-viewer repository, is based on the neXtProt API (https://api.nextprot.org), which can be access through the javascript library nextprot-js (see https://github.com/calipho-sib/nextprot-js). 
Take a look to create your own application with the human protein data from neXtProt !

##Development

If you want to custom this viewer :

1. Download the project

2. make sure you have Node installed (v.10 +)

3. 
```
npm install
```

```
bower_components/bin/bower install
```

##Code modification

This project can be used with grunt. To be able to see live modification of your new code on the page (localhost:9000) :
```
bower_components/bin/grunt serve
```

To create a bundle (dependencies.js) : 
```
bower_components/bin/grunt
```

Or to merge different templates with HandleBars into a js file : 
(auto with grunt serve running)
```
bower_components/bin/grunt hbs
```

