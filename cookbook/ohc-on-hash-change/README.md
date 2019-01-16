
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/tootoo13/#cookbook/ohc-on-hash-change/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/pushme-pullyou/tootoo13/blob/master/cookbook/ohc-on-hash-change/README.md"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

# [TooToo On Hash Change (OHC) Read Me]( #cookbook/ohc-on-hash-change/README.md )

<!--
<iframe src=https://pushme-pullyou.github.io/tootoo13/cookbook/ohc-on-hash-change/ohc-on-hash-change.html width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_<small>TooToo On Hash Change (OHC)</small>_
-->

## Full Screen: [TooToo On Hash Change (OHC) Test]( https://pushme-pullyou.github.io/tootoo13/cookbook/ohc-on-hash-change/ohc-on-hash-change.html )


## Concept / Issue or problem to solve

### Mission

* Adds a JavaScript event listener to monitor the status of the current [location hash]( https://developer.mozilla.org/en-US/docs/Web/API/Window/location ) of the current page
* Given a URL in a location hash, uses the [GitHub Developer API]( https://developer.github.com/v3/repos/contents/#get-contents ) to obtain lists of folders and files in a repository
* Creates the HTML for a tree menu with single click access to each item
	* Folder items are links to display the contents of the folder
	* File items have three links: source, vuew item in TooTo, view item in new tab
* Creates a navigable breadcrumb bar
* Enables a [RESTful API]( https://en.wikipedia.org/wiki/Representational_state_transfer ) using HTML location hash updates
* Provides support for use of a [GitHub Access Token]( https://developer.github.com/v3/#authentication ) for use that goes over the standard GitHub rate limit of 60 requests in a short time


### Vision

* Develop software with plain vanilla JavaScript hosted on a static server


### ohc-on-hash-change.js - Features of the Functions

Parent object name: OHC

OHC.currentStatus

* Informative content to be displayed in a pop-up help context
* Description of the goal or concept of the function
* List of features
* Link to source code
* Change log


OHC.currentStatusAccessToken

* Content that describes the need and use of GitGub API access tokens


OHC.getMenuRepoFilesFolders

	* Initialize variables that may have been updated in the parent HTML file
	* Add needed event handlers
	* Initialize access token if available
	* Generate and return HTML user interface for menu module


OHC.setGitHubAccessToken
* If entered, save access token to local storage


OHC.onHashChange
* Two goals: get & display file and update menu
	1. Parse file name for URL file type and direct result to the suitable callback function: OHC.requestFile
	2. Send URL to menu update function: OHC.setMenuGitHubPathFileNames


OHC.requestFile


OHC.callbackMarkdown


OHC.callbackOtherToTextarea



OHC.setMenuGitHubPathFileNames

* Create access token suffix
* Request the names of the files and folders given a path to a folder in a GitHub repository
* Request the breadcrumbs string


OHC.callbackGitHubPathFileNames

* This function is one of the most interesting functions in this project
* Uses the GitHub Developer API to obtain the list of folders and files in the current given path
* The list is used to generate a menu with links using relative paths
* Relative paths may be used to get files on GitHub Pages or locally
* Obtaining the list from GitHuB overcomes the limitation that JavaScript cannot do a 'dir' on local files
* On occasion the local list may be out of sync with GitHub but a simple fetch can resolve the differences

Previous version of this function obtained the list of every file and folder in a repository. It turned out that parsing the list, creating a tree, and keeping track of the current position in the tree was doable but quite complicated.

In this version, GitHub is scanned with every request. It makes the code quite simple but does require that the script is connected to the Internet



OHC.getFoldersFromContents

* Parse the contents, look for 'dir' objects, ignore some of the folders, return suitable HTML

OHC.getFilesFromContents

* Parse the contents, look for file items, ignore some of the files, return suitable HTML


OHC.setBreadcrumbs

* Given a path, create the HTML breadcrumbs
* Interesting code but still too complicated


### ohc-on-hash-change.html - Features

* Basic HTML to call and display the template menu
* Includes basic code to toggle display of current status HTML content



## To Do / Wish List

* 2019-01-14 ~ Theo ~ Simple routine that calls for repository contents just once
	* 2019-01-04 ~ Theo ~ make GitHub API request only once and triage the JSON thereafter
* 2019-01-06 ~ Theo ~ toggle 'active' class on menu items


## Issues


## Things you can do using this script

### Using the Script
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


## ohc-on-hash-change.js Change Log

### 2019-01-14 ~ Theo

* Add text content here and here
* ix broken links

### 2019-01-13 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

