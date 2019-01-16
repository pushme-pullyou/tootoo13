<span style=display:none; >[You are now in a GitHub source code view - click this link to view the home page]( https://pushme-pullyou.github.io/tootoo13/index.html#pages/coding-style.md "View file as a web page." ) </span>

<div><input type=button  class="btn btn-secondary btn-sm" onclick=window.location.href='https://github.com/pushme-pullyou/tootoo13/blob/master/pages/coding-style.md';
value='You are now in the home page view - Click this button to view the read me file and the source code' ></div>

<br>

#  Coding Style

## Mission

<!-- * Fabricate free, fast, fun fantasies -->
* Write cookbook scripts that are ready to use, cut and paste
* Build engineering tools built to solve specific problems
* Develop skills you can use everywhere
* You can download a script easily and when you click it, it should just work.
	* Everything you need to know about a script is in one place and written in the same way.
* Ready to use, cut and paste scripts
* Built to solve specific problems in a single programming language - JavaScript
* Small easy-to-understand scripts that you can use to hack your own apps
* All written in JavaScript
	* Even the HTML and CSS is created and edited using JavaScript.
	* Experimental techniques designed to get you coding faster but documented
* Built to fork edit and share - all FOSS in GitHub
* For STEM peeps - not 'full-stack programmers'
* Explore new ways of visualizing in 3D - use the graphics processing units (GPUs ) to their maximum


For much more detail about the coding style you can have a look at the [Jaanga Practice Notes]( http://jaanga.github.io/documents/jaanga-practice-notes/#code-mission-vision-r1.md )
Some of the notes there could come here as and when there is agreement on the good styles for this effort.

<!--
### Vision

* If the mundane engineering tasks become easy, inexpensive and swift to carry out,
then possibilities arise for the more complex, sophisticated and even extravagant ideas to turn into realities
* RIP Zaha Hadid. Let us continue to design with your disruptive yet always elegant spirit
-->

<!--
Everything is in between two `<script>` tags and written JavaScript

What does mean?

There are no black boxes - with things in other places - that you never look at.

Instead of a huge file of opaque CSS rules that are mostly never invoked, there's half a dozen rules just for the script in play

-->


### Cookbook Format

Otherwise known as 'Cut and Paste' coding

The code herein is:

* Made up of individual HTML files
	* Each file contains all the styling and JavaScript it requires
* Minimal external dependencies
	* Only Three.js and ShowDown
	* Can copy and paste code into a file on your computer, hit `enter` and it runs
* Designed for students and non-programmers
	* Any script can be 'digested' in less than an hour


##@ Client-side not Server-side

* Scripts must access a GPU
	* 'Cause no GPU then no 3D'
	* Can be edited and run on any device
* Means can be hosted on static servers
	* Such as GitHub, DropBox or GDrive
	* So penniless kids around the world can play and experiment


## Everything in Git plus more

* Everything gitted in GitHub
* But code in older releases is not just viewable BUT also runnable
	* You can see the evolution of the design process
	* Think of an artist and a sketchbook

## 3D is not 2D

* 3D is its own special world
	* You get, say, 18 milliseconds about 60 times a second
	* You need to multiply, say, a 1000x1000 matrix by 0x456789
	* jQuery, React, Go whatever are of no use at all here - and mostly just get in the way
* Communicate to the 2D world using iframes
	* Just aboutt every script here has been tested in an iframe
	* 3D Scripts in iframes are happy having ongoing dialogs with their 2D parents


## Links of interest

### Cookbook Meaning

* http://english.stackexchange.com/questions/70799/meaning-of-cookbook-in-title-of-instructional-book
* https://en.wikipedia.org/wiki/Cookbook#Usage_outside_the_world_of_food
* https://en.wikibooks.org/wiki/Coding_Cookbook
* https://www.quora.com/Computer-Programming-How-should-I-study-the-OReilly-cookbook-books-I-dont-feel-I-internalize-much-just-by-reading-them-as-Im-a-very-hands-on-learner

Examples of coding styles similar to the one use here:

* [Three.js Examples]( http://threejs.org/examples/ )
* [Stemkoski]( http://stemkoski.github.io/Three.js/ )
* [Dirksen ]( http://www.smartjava.org/content/all-109-examples-my-book-threejs-threejs-version-r63 )
* [Parisi]( https://github.com/tparisi/WebGLBook )

See also

* [Mr.doob's Code Style™]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 )


## To Do

* 2018-07-19 ~ Theo ~ Decide which repo has canonical version
* 2018-07-19 ~ Build bookmark folder with links to how to summarize technology efforts
	* links from 'my column C'
* 2018-07-19 ~ Theo ~ Create/Fork our owm summary checklist
* 2018-07-19 ~ Theo create cms based on checklist
* 2018-07-19 ~ Theo ~ fill in the lines
