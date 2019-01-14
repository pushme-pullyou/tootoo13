
<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://pushme-pullyou.github.io/tootoo13/#cookbook/mnu-menu/README.md "View file as a web page." ) </span>

<div><input type=button class = "btn btn-secondary btn-sm" onclick=window.location.href="https://github.com/pushme-pullyou/tootoo13/blob/master/cookbook/mnu-menu/README.md"
value="You are now in a GitHub web page view - Click this button to view this read me file as source code" ></div>

<br>

# [MNU Menu Test Read Me]( #cookbook/mnu-menu/README.md )


<iframe src=https://pushme-pullyou.github.io/tootoo13/cookbook/mnu-menu/mnu-menu.html width=100% height=500px >Iframes are not viewable in GitHub source code views</iframe>
_<small>MNU Menu Test</small>_

## Full Screen: [MNU Menu Test]( https://pushme-pullyou.github.io/tootoo13/cookbook/mnu-menu/mnu-menu.html )


## Concept

### Mission
* To setup standard menu components with a minimum of fuss
* To provide a user interface that feels normal and natural
* To provide a UI that works well on any device
* To provide templates that may be applied to other apps

### Vision

* You open the app on any device and you immediately know what to do

### mnu-menu.js - Main Menu Functions and their Features

Most of the code here should be fairly easy to read.
Getting the menu sliding process to work in all configurations will be an ongoing process


MNU.description
* Provides boilerplate text to be used here and elsewhere
* Default description that can be used when TooToo is embedded
* Use descriptionTooToo.md in this folder to edit the description in Markdown, then open with TooToo and copy HTML to the source


MNU.getNavHeader
* Creates default menu header menu
* Breadcrumbs provide links to parent folders or repos
* Title is also link to reload the app
* Displays the app description

MNU.getNavFooter
* Creates footer menu content and code
* Variable enables easy linking to local or global files
* Links update location hash only
	* Requires a location hash event monitor to operate

MNU.setPopupShowHide
* Provides code to toggle pop-up window display visibility


MNU.onTouchStart
MNU.onTouchMove
MNU.toggleNavLeft
* Provides code for hamburger sliding menu
	* Enables operation on computer, tablet or phone
	* Supports both pointing device and touch support
	* Resizes both menu and content panels
* Getting all this to work seamlessly is an an ongoing effort


Style.css
* Items are more compressed then you usually see them. So it goes
* Items are sorted by tag, class and ID then in alphabetical order


## To Do / Wish List

* 2019-01-10 ~ Theo ~ Better updates when switching between portrait and landscape mode


## Issues


## Things you can do using this script

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the Octocat icon to view or edit the source code on GitHub
* Click on title to reload
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Links of Interest



## Change Log

### 2019-01-11 ~ Theo

* Add MNUdetFooter id and set to open in test HTML


### 2019-01-10 ~ Theo

* Add text to read me
* Add index.html to folder

Getter better
* 2019-01-10 ~ Theo ~ Click anywhere to close pop-up

### 2019-01-06 ~ Theo

* First commit


***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>

