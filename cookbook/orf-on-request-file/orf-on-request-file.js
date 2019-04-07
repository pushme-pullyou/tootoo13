// Copyright 2019 pushMe pullYou authors. MIT License
/* globals navMenu, showdown, divContents, FOPRsecFileOpenBasic */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const FOPR = { "release": "R13.0", "date": "2019-04-04" };

FOPR.description =
	`
		TooToo File Open Prior (FOPR) provides HTML and JavaScript to
		select, open and display local files using the file dialog box, drag and drop or URL.
	`;

FOPR.currentStatus =
	`
		<h3>TooToo File Open Basic (FOPR) ${ FOPR.release} - ${ FOPR.date }</h3>

		<p>
			${ FOPR.description }
		</p>
		<p>
			Concept
			<ul>
				<li>Creates the HTML for the user interface</li>
				<li>Opens local files with JavaScript FileReader() or XMLHttpRequest() objects</li>
				<li>Converts Markdown to HTML</li>
				<li>Provides default current status text template</li>
				<li></li>
				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/fob-file-open-basic/" target="_blank" >
				TooToo File Open Basic (FOPR) Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-02-07 ~ Simplify: remove content editable / save file - will re-add elsewhere</li>
				<li>2019-01-15 ~ Add FOPR.description variable and text</li>
				<li>2019-01-15 ~ Add display FOPR.description in pop-up and in test file</li>
				<li>2019-01-14 ~ Add text here and there</li>
				<li>2019-01-13 ~ Add link to status</li>
				<li>2019-01-12 ~ Add cookbook HTML test script and read me file</li>
				<!-- <li></li>
				-->
			</ul>
		</p>
	`;


FOPR.reader = new FileReader();
FOPR.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules
FOPR.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FOPR.regexHtml = /\.(htm?l)$/i;
FOPR.regexXml = /\.(xml)$/i;
FOPR.regexZip = /\.(zip)$/i;

FOPR.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;



FOPR.getMenuFileOpenBasic = function( target = divContents ) {  // called from main HTML file

	FOPR.target = target;

	FOPRsecFileOpenBasic.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
	FOPRsecFileOpenBasic.addEventListener( 'drop', FOPR.drop, false );

	const htm =
	`
		<details id=FOPRdetFileOpen class=detSubMenu open >

			<summary>Open file
				<a id=filSum class=helpItem href="JavaScript:MNU.setPopupShowHide(filSum,FOPR.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div class="dragDropArea" >

				<p>
					<input type=file id=inpOpenFile onchange=FOPR.onLoadReader(this);  >
					or drag & drop files here
				</p>

			</div>

			<p id=FOPRdivProgress ></p>

		</details>
	`;

	return htm;

};



FOPR.onRequestFile = function( url ) { // from a button
	//console.log( 'url', url );

	const name = url.split( '/').pop();

	//if ( FOPR.regexHtml.test( url ) ) {

	if ( name.match( FOPR.regexHtml ) ) {

		FOPR.target.innerHTML = `<iframe src=${ url } style="${ FOPR.contentsCss }" ></iframe>`;

	//} else if ( FOPR.regexImages.test( url )  ) {

	} else if ( name.match( FOPR.regexImages ) ) {

		FOPR.target.innerHTML = `<img src=${ url } >`;

	} else if ( name.match( FOPR.regexXml ) ) {

		let event = new Event( "onRequestXml", {"bubbles": true, "cancelable": false, detail: true } );

		//	window.addEventListener( "bingo", addAvatar );
		//	window.addEventListener( "bingo", addControls, false );

		window.dispatchEvent( event );

	} else if ( name.match( FOPR.regexZip ) ) {

		let event = new Event( "onRequestZip", {"bubbles": true, "cancelable": false, detail: true } );

		window.dispatchEvent( event );

	} else { // assume text or markdown file

		FOPR.requestFile( url );

	}

};



FOPR.onLoadReader = function( files ) {

	const file = files.files[ 0 ];

	FOPR.reader.onload = function( event ) {
		//console.log( 'FOPR.reader', FOPR.reader );

		const name = file.name.toLowerCase();

		if ( name.endsWith( '.md' ) ) {

			FOPR.callbackMarkdown( FOPR.reader.result );

		} else if ( FOPR.regexImages.test( file.name )  ) {

			FOPR.target.innerHTML = `<img src=${ FOPR.reader.result } >`;

		} else if ( FOPR.regexHtml.test( file.name ) ) { // html mucks things up

			FOPR.target.innerHTML = `<iframe srcdoc="${ FOPR.reader.result }" style="${ FOPR.contentsCss }" ></iframe>`;

		} else {

			FOPR.callbackOtherToTextarea( FOPR.reader.result );

		}

	};

	if ( FOPR.regexImages.test( file.name ) ) {

		FOPR.reader.readAsDataURL( file );

	} else {

		FOPR.reader.readAsText( file );

	}

		//function onRequestFileProgress( event ) {

			//divLog.innerHTML =
			//	fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
			//	//( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			//'';

		//}

};



FOPR.onDrop = function( event ) {

	const dropUrl = event.dataTransfer.getData( 'URL' );

	if ( dropUrl ) {

		FOPR.onRequestFile( dropUrl );

	} else {

		FOPR.onLoadReader( event.dataTransfer );

	}

	event.preventDefault();

};



//////////


FOPR.requestFile = function( url ) {

	FOPR.xhr.open( 'GET', url, true );
	FOPR.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	FOPR.xhr.onload = FOPR.callbackDecider;
	FOPR.xhr.send( null );

}


//////////

FOPR.callbackDecider = function ( xhr ) {
	//console.log( 'xhr', xhr );

	const ulc = xhr.target.responseURL.toLowerCase();

	if ( ulc.endsWith( '.md' ) ) {

		FOPR.callbackMarkdown( xhr.target.response );

	} else {

		FOPR.callbackOtherToTextarea( xhr.target.response );

	}

};



FOPR.callbackMarkdown = function( markdown ) {

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( markdown );

	FOPR.target.innerHTML = html;
	window.scrollTo( 0, 0 );

};



FOPR.callbackOtherToTextarea = function( text ){

	FOPR.target.innerHTML = `<textarea style="${ FOPR.contentsCss }" >${ text }</textarea>`;

};
