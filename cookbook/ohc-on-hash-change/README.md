
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/#cookbook/ohc-on-hash-change/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/pushme-pullyou/pushme-pullyou.github.io/blob/master/cookbook/ohc-on-hash-change/README.md"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

# [TooToo On Hash Change (OHC) Read Me]( #cookbook/ohc-on-hash-change/README.md )

<!--
<iframe src=https://pushme-pullyou.github.io/cookbook/ohc-on-hash-change/cookbook/ohc-on-hash-change.html width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_<small>TooToo On Hash Change (OHC)</small>_

## Full Screen: [TooToo On Hash Change (OHC)]( https://pushme-pullyou.github.io/cookbook/ohc-on-hash-change/cookbook/ohc-on-hash-change.html )
-->


## Concept

## Functions

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
	* Generate and return HTML user inter face for menu module


OHC.setGitHubAccessToken
* If entered, save access token to local storage


OHC.onHashChange
* Two goals: get & display file and update menu
* Parse for URL file type and direct to suitable function
* Send URL to menu update function


OHC.requestFile


OHC.callbackMarkdown


OHC.callbackOtherToTextarea



OHC.setMenuGitHubPathFileNames

* Create access token suffix
* Request the names of the files and folders given a path to a folder in a GitHub repository
* Request the breadcrumbs string


OHC.callbackGitHubPathFileNames
* One of the most interesting functions in this project
* Uses the GitHub API to obtain the list of folders and files in the current given path
* The list is used to generate a menu with links using relative paths
* Relative paths may be used to get files on GitHub pages or locally
* Obtaining the list from GitHun overcomes the limitation that JavaScript cannot do a 'dir' on local files
* On occasion the local list may be out of sync with GitHub bat a simple fetch can resolve the differences


OHC.getFoldersFromContents


OHC.getFilesFromContents



OHC.setBreadcrumbs
* Given a path, create the HTML breadcrumbs
* Interesting but too complicated


## To Do / Wish List

* 2019-01-06 ~ Theo ~ toggle 'active' class on menu items

## Issues


## Things you can do using this script

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the Octocat icon to view or edit the source code on GitHub
* Click on title to reload
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Links of Interest



## Change Log

### 2019-01-13 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

