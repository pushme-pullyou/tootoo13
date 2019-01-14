
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/tootoo13/#cookbook/fob-file-open-basic/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/pushme-pullyou/tootoo13/blob/master/cookbook/fob-file-open-basic/README.md"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

# [TooToo File Open Basic Test Read Me]( #cookbook/fob-file-open-basic/README.md )

<!--
<iframe src=https://pushme-pullyou.github.io/cookbook/fob-file-open-basic/fob-file-open-basic.html width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_<small>TooToo File Open Basic Test</small>_
-->

## Full Screen: [TooToo File Open Basic Test]( https://pushme-pullyou.github.io/tootoo13/cookbook/fob-file-open-basic/fob-file-open-basic.html )


## Concept

### Mission
* Creates the HTML for the user interface
* Open local files given:
	* URL
	* FileReader() object
	* XMLHttpRequest() object
* Parses the file if necessary
* Displays and renders results in a target ```<div>```

This is a generic function. forks have been used to open XML, RAD and other file types

### Vision

* Opening files from anywhere and of any type is easy-peasy


### fob-file-open-basic.js - Features of the Functions

FOB.currentStatus

* Provides default current status text template


FOB.getMenuFileOpenBasic

* Creates the HTML for a file open menu panel
* Add event listeners


FOB.requestFile
* Responds to an event such as a button call that sends a URL as a parameter
* Queries the URL to see if it is a HTML, image, Markdown or other type of file
* Requests the date from the URL and, upon a response, sends the data to the target DIV
* As appropriate, sends data to an iframe, image tag, text area, or converts Markdown to HTML and displays this in the target

The possibilities for extending the capabilities of this function are kind of limitless. Files that have been '[wrangled]( https://www.dictionary.com/browse/wrangler )' include:

* gbXML, .RAD, .DXF, .STL, .OBJ, .BVH, JSON and more


FOB.openFile

* Responds to an event such as a button call that sends a FileReader object
* Queries the name of the file to see if it is a HTML, image, Markdown or other type of file
* As appropriate, sends data to an iframe, image tag, text area, or converts Markdown to HTML and displays this in the target


FOB.onDrop

* Sends dropped FileReader objects to FOB.openFile


FOB.callbackDecider

* If url ends with ".MD" send it to FOB.callbackMarkdown else to FOB.callbackOtherToTextarea



FOB.callbackMarkdown

* Convert the Markdown to HTML and send to the target DIV


FOB.callbackOtherToTextarea

* We don't know this file type therefore, fingers-crossed, we can display its data in an HTML Textarea


## To Do / Wish List

* 2019-01-12 ~ Theo ~ Add load progress indication
* 2019-01-12 ~ Theo ~ Add ZIP file reading
* 2019-01-12 ~ Theo ~ Add reusable file info - as seen in Spider gbXML Viewer


## Issues


## Things you can do using this script

### Using the Script
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the Octocat icon to view or edit the source code on GitHub
* Click on title to reload
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors

### Enhancing the script

* If you have used the FileReader and XMLHttpRequest() objects before then most of the code should feel quite familiar
	* If not, then you should acquire a bit more knowledge because this is not purely beginner level stuff
* Try adding another file type. Example: read a .CSV ile and display as a table

## Links of Interest

The following are links of interest regarding the JavaScript libraries and objects called by FOB

### Showdown.js

> A bidirectional Markdown to HTML to Markdown converter written in Javascript

* https://github.com/showdownjs/showdown
* http://showdownjs.com/


### FileReader() Object

> The FileReader object lets web applications asynchronously read the contents of files (or raw data buffers) stored on the user's computer, using File or Blob objects to specify the file or data to read.
>
> File objects may be obtained from a FileList object returned as a result of a user selecting files using the ```<input>``` element, from a drag and drop operation's DataTransfer object, or from the mozGetAsFile() API on an HTMLCanvasElement.

* https://developer.mozilla.org/en-US/docs/Web/API/FileReader


### XMLHttpRequest() / Ajax

> Use XMLHttpRequest (XHR) objects to interact with servers. You can retrieve data from a URL without having to do a full page refresh. This enables a Web page to update just part of a page without disrupting what the user is doing. XMLHttpRequest is used heavily in AJAX programming.
>
> Despite its name, XMLHttpRequest can be used to retrieve any type of data, not just XML, and it supports protocols other than HTTP (including file and ftp).

* https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest


### JavaScript Regular Expressions

> Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects. These patterns are used with the exec and test methods of RegExp, and with the match, replace, search, and split methods of String.

* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions


## fob-file-open-basic.js Change Log

### 2019-01-14 ~ Theo

* Add text here and there

### 2019-01-12 ~ Theo

* First commit of test HTML
* Add content and links to read me


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

