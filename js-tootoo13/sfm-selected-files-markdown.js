// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */



const SFM = { "release": "R13.0", "date": "2019-01-15" };

SFM.description =
	`
		TooToo Selected Files Markdown (SFM) provides HTML and JavaScript to
		open and read a Markdown file given an URL, convert the markdown to HTML
		and return the result to the calling function

	`;



SFM.currentStatus =
	`
		<h3> TooToo Selected Files Markdown (SFM) ${ SFM.release} ~ ${ SFM.date }</h3>

		<p>
			${ SFM.description }
		</p>
		<p>
		Concept
			<ul>
				<li>Provides default current status text Selected Files Markdown</li>
				<li>Provides default description text Selected Files Markdown</li>
				<li>Includes JavaScript code to generate an HTML menu</li>
				<li>Includes JavaScript code to open, read and convert a Markdwon file and return HTML
				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/sfm-selected-files-markdown/" target="_blank" >
				TooToo Selected Files Markdown Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-01-15 ~ Add typical Markdown file: sfrm-selected-files-markdown</li>
				<li>2019-01-15 ~ Add code to open and convert Markdown to HTML using Showdown/li>
				<li>2019-01-15 ~ First commit</li>
				<!-- <li></li> -->
			</ul>
		</p>

	`;



SFM.getMenuSelectedFilesMarkdown = function() {

	const htm =
	`
		<details >

			<summary>Selected Files Markdown
				<a id=SFMSum class=helpItem href="JavaScript:MNU.setPopupShowHide(SFMSum,SFM.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div id=SFMdivContents > </div>

		</details>
	`;

	return htm;

};



SFM.getMarkdownFileContents = function( url, target ) {

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	xhr.onload = callback;
	xhr.send( null );


		function callback( xhr ) {

			showdown.setFlavor('github');
			const converter = new showdown.Converter();
			const html = converter.makeHtml( xhr.target.response );

			target.innerHTML = html;
			window.scrollTo( 0, 0 );

		}

};
