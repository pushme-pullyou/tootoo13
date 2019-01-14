// Copyright 2019 pushMe-pullYou authors. MIT License
/* global THREE * /
/* jshint esversion: 6 */


const MNU = { "release": "R13.5", "date": "2019-01-14" };

MNU.description = document.head.querySelector( "[ name=description ]" ).content;

////////// currentStatus items are fir th question marks in the main HTML document


	MNU.currentStatusMenu =
	`
		<h3>TooToo Menu ${ MNU.release} ~ ${ MNU.date }</h3>

		<p>Generates HTML menu content from variables in the index.html file.</p>

		<p>
			Concept
			<ul>
				<li>Creates default menu header and footer content and code</li>
				<li>Code for hamburger sliding menu</li>
				<li>Code for pop-up window</li>
				<li>Code to add and select and load theme stylesheets</li>
			</ul>

		</p>

		<p>This module is ready for light testing.</p>

		<p><a href="https://github.com/pushme-pullyou/pushme-pullyou.github.io/tree/master/tootoo13/cookbook/mnu-menu/" target="_blank" >TooToo Menu Read Me</a></p>

		<p>
			Change log
			<ul>
				<li>2019-01-14 ~ Update text content</li>
				<li>2019-01-12 ~ Add MNUdetFooter id and set to open in test HTML</li>
				<li>2019-01-11 ~ Add close button to status pop-up and improve pop-up toggling</li>
				<li>2019-01-09 ~ Content update and minor code fixes</li>
				<li>2019-01-09 ~ Add vars: MNU.descriptionTooToo, MNU.footerUrl, MNU.footerTarget, MNU.footerIssues</li>
				<li>2018-12-29 ~ Add helpItem class</li>
				<li>2018-12-28 ~ Current Status link changed to question mark</li>
				<li>2018-12-28 ~ Content displayed in the Pop-Up</li>
				<li>2018-12-22 ~ Themes added</li>
				<li>2018-12-22 ~ Update subtext</li>
				<!-- <li></li> -->
			</ul>
		</p>
	`;


////////// boilerplate for downstream users

MNU.descriptionTooToo =
	`
		<h3>
			<a href="https://pushme-pullyou.github.io#tootoo13/README.md" target="_blank">
				TooToo13 Read Me
			</a>
		</h3>

		<p>
			<ul>
				<li>TooToo is a collection of JavaScript scripts to help you browse and view the contents of many files on <a href="https://github.com">GitHub</a> with remarkable ease</li>
				<li>View HTML, <a href="https://en.wikipedia.org/wiki/Markdown">Markdown</a>, images and many other file types as rendered web pages or as source code</li>
				<li>Traverse a tree menu, select and display folder and file names in  with single clicks</li>
				<li>Open local files with OS file dialog or by drag and drop and open remote files with a URL</li>
				<li>Access files quickly and then edit and commit changes to source using the GitHub interface</li>
				<li>Web app with sliding menu that works on computer, tablet or phone</li>
				<li>Written in plain-vanilla JavaScript / Uses the <a href="https://developer.github.com/v3/">GitHub Developer API</a> / Hosting with <a href="https://pages.github.com/">GitHub Pages</a> / Simple CSS theme selection</li>
			</ul>
		</p>

		<p>TooToo is is one of several apps in the <a href="https://pushme-pullyou.github.io" target="_blank">pushMe-pullYou</a> GitHub organization</p>
	`;


MNU.currentStatusCore =
	`
		<h3>MNU.currentStatusCore</h3>

		<p>This web page is built with:</p>

		${ MNU.descriptionTooToo }
	`;


//MNU.urlSourceCode = "https://github.com/pushme-pullyou/pushme-pullyou.github.io/tree/master/tootoo-templates/hamburger-theme-cms";


// For main menu header
MNU.homeText = "homeText";
MNU.homeTitle = "homeTitle";
MNU.homeUrl = "";

MNU.repoText = "repoText";
MNU.repoTitle = "repoTitle";
MNU.repoUrl = "";

MNU.appText = "appText";
MNU.appTitle = "appTitle";
MNU.appUrl = "";

MNU.urlSourceCodeImage = "https://status.github.com/images/invertocat.png";
MNU.urlSourceCodeIcon = `<img src="${ MNU.urlSourceCodeImage }" height=18 >`;
MNU.urlSourceCodeUrl = "https://github.com/pushme-pullyou/pushme-pullyou.github.io/tree/master/tootoo13/cookbook/mnu-menu";

MNU.footerUrl = "#";
MNU.footerTarget = ""; //"target=_blank";
MNU.footerIssues = "https://github.com/pushme-pullyou/pushme-pullyou.github.io/issues";

MNU.statusId = null;

MNU.xDown = null;
MNU.yDown = null;

//////////


MNU.getNavHeader = function() {

	// Swipe events
	document.addEventListener( 'touchstart', MNU.onTouchStart, false );
	document.addEventListener( 'touchmove', MNU.onTouchMove, false );

	const htm  =
	`
		<h3>
		<a href="${ MNU.homeUrl }" title="${ MNU.homeTitle }" target="_top">
		${ MNU.homeText }
		</a>
		${ MNU.homeUrl ? '&raquo;' : '' }
		<a href="${ MNU.repoUrl }" title="${ MNU.repoTitle }" target="_top">
		${ MNU.repoText }
		</a>
		${ MNU.repoUrl ? '&raquo;' : '' }
		<a href="${ MNU.appUrl }" title="${ MNU.appTitle }" >
		${ MNU.appText }
		</a>
		${ MNU.appUrl ? '&raquo;' : '' }
		</h3>
		<h2>
			<a href=${ MNU.urlSourceCodeUrl } ${ MNU.footerTarget } title="Source code on GitHub" >
			${ MNU.urlSourceCodeIcon }
			</a>
			<a href="" title="Click to reload this page" >${ document.title }</a>

			<a id=mnuCore class=helpItem href="JavaScript:MNU.setPopupShowHide(mnuCore,MNU.currentStatusCore);"
				title="Current status: core module" >&nbsp; ? &nbsp;
			</a>
		</h3>

		<div>
			${ MNU.description } <a id=mnuHead class=helpItem href="JavaScript:MNU.setPopupShowHide(mnuHead,MNU.currentStatusMenu);"
				title="Current status" >&nbsp; ? &nbsp;
			</a>
		</div>
	`;

	return htm;

};



MNU.getNavFooter = function() {

	const htm  =
	`
		<details id=MNUdetFooter >

			<summary>Footer / Help
				<a id=mnuFoot class=helpItem href="JavaScript:MNU.setPopupShowHide(mnuFoot,MNU.currentStatusMenu);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div style=margin-top:1rem; title='What is this stuff?' ><a href=${ MNU.footerUrl }pages/coding-style.md ${ MNU.footerTarget } >Coding style</a></div>
			<div title='many thanks!' ><a href=${ MNU.footerUrl }pages/credits.md ${ MNU.footerTarget } >Credits</a></div>
			<div><a href=${ MNU.footerUrl }pages/code-of-conduct.md ${ MNU.footerTarget } >Code of conduct</a></div>
			<div><a href=${ MNU.footerUrl }pages/contributing.md ${ MNU.footerTarget } >Contributing via GitHub</a></div>
			<div><a href=${ MNU.footerUrl }pages/license.md ${ MNU.footerTarget } >MIT License</a></div>
			<div><a href=${ MNU.footerUrl }pages/markdown-help.md ${ MNU.footerTarget } >Markdown help</a></div>
			<div><a href=${ MNU.footerUrl }pages/themes.md ${ MNU.footerTarget } >Themes help</a></div>
			<div>&raquo; <a title='Need help' href=${ MNU.footerIssues } target=_blank >GitHub Issues</a></div>
			<div>! <a href="javascript:( function(){ var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://rawgit.com/mrdoob/stats.js/master/build/stats.min.js';document.head.appendChild(script);})()" title="Mr.doob's Stats.js appear in top left corner" >Show frames/second statistics</a></div>
			<div>&raquo; <a href="https://api.github.com/rate_limit" title='If files and folder stop appearing, it is likely due to too many API calls' target=_blank >View GitHub API rate limits</a></div>

			<hr>

		</details>
	`;

	return htm;

};



//////////

MNU.setPopupShowHide = function( id, text ) {
	//console.log( 'id', id );

	MNU.statusId = id;

	id.classList.toggle( "active" );

	const closer = `<div style=text-align:right; ><button onclick=MNU.setPopupShowHide(MNU.statusId,""); >X</button></div>`;

	divPopUpData.innerHTML = id.classList.contains( 'active' ) ? closer + text : '';

};



//////////

MNU.onTouchStart = function( event ) {

	MNU.xDown = event.touches[ 0 ].clientX;
	MNU.yDown = event.touches[ 0 ].clientY;

};



MNU.onTouchMove = function(event) {

	// if ( ! MNU.xDown || ! MNU.yDown ) { return; }

	const xUp = event.touches[ 0 ].clientX;
	const yUp = event.touches[ 0 ].clientY;

	const xDiff = MNU.xDown - xUp;
	const yDiff = MNU.yDown - yUp;

	if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {// most significant

		if ( xDiff > 0 ) {

			MNU.toggleNavLeft();
			//console.log( 'left swipe' );

		} else {

			MNU.toggleNavLeft();
			console.log( 'right swipe' );

		}

	} else {

		if ( yDiff > 0 ) {

			console.log( 'up swipe' );

		} else {

			console.log( 'down swipe' );

		}

	}

	MNU.xDown = null;
	MNU.yDown = null;

};


MNU.toggleNavLeft = function() {

	width = getComputedStyle(document.documentElement).getPropertyValue( '--mnu-width' ).trim();

	//console.log( 'width', width );
	//console.log( 'navMenu.style.width', navMenu.style.width );

	if ( navMenu.style.width === "0px" ) { // invisible

		navMenu.style.width = width;
		navMenu.style.padding = '1rem';
		butHamburger.style.left = 'var( --mnu-width )';
		divContainer.style.marginLeft = width;

	} else {

		navMenu.style.width = "0px";
		navMenu.style.padding = '0';
		butHamburger.style.left = '-3rem';
		divContainer.style.marginLeft = "0px";

	}

}
