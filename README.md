# WebLibsync

<br><br>

## Getting Started

1. Install Grunt-cli with ```npm install -g grunt-cli```.

2. Install the other npm packages with ```npm install```.

3. Run Grunt with ```grunt```.
<br><br>

## Starting the Grunt/Sass watch process

Running ```grunt``` from the command line, will...

1. jsLint the app.js
2. Uglify the app.js into app.min.js (referenced in index.html)
3. Start watching the Sass (.scss) file for changes.
4. Compile the .scss, then exit.


Be sure the only CSS you edit is in the "/Sass/main.scss" file.  
These compiled changes will overwrite the contents of "/public/css/main.css".


Or, running ```grunt dev``` from the command line, will...

1. jsLint the app.js
2. Uglify the app.js into app.min.js
3. Concurrently run the Watch process with the Serve process, until you exit (ex. with ctrl-c).
<br><br>

## Launch only the local server
Run ```grunt start:dev``` or ```grunt start:dist``` from the command line (or even ```npm start```).
<br><br>


## Visit the Live Site
Available [here](http://weblipsync.herokuapp.com/)!  <br><br>
Thanks!<br>
~P
