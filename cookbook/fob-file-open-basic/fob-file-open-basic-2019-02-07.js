// Copyright 2019 pushMe pullYou authors. MIT License
// jshint esversion: 6
/* globals navMenu, showdown, divContents, FOBsecFileOpenBasic */

const FOB = { "release": "R13.4", "date": "2019-01-15" };

FOB.description =
	`
		TooToo File Open Basic (FOB) provides HTML and JavaScript to
		select, open and display local files using the file dialog box, drag and drop or URL.
	`;

FOB.currentStatus =
	`
		<h3>TooToo File Open Basic (FOB) ${ FOB.release} - ${ FOB.date }</h3>

		<p>
			${ FOB.description }
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
				TooToo File Open Basic (FOB) Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-01-15 ~ Add FOB.description variable and text</li>
				<li>2019-01-15 ~ Add display FOB.description in pop-up and in test file</li>
				<li>2019-01-14 ~ Add text here and there</li>
				<li>2019-01-13 ~ Add link to status</li>
				<li>2019-01-12 ~ Add cookbook HTML test script and read me file</li>
				<!-- <li></li> -->
			</ul>
		</p>
	`;


FOB.reader = new FileReader();
FOB.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules
FOB.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FOB.regexHtml = /\.(htm?l)$/i;
FOB.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;



FOB.getMenuFileOpenBasic = function( target = divContents ) {  // called from main HTML file

	FOB.target = target;

	FOBsecFileOpenBasic.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
	FOBsecFileOpenBasic.addEventListener( 'drop', FOB.drop, false );

	const htm =
	`
		<details id=FOBdetFileOpen open >

			<summary>Open file
				<a id=filSum class=helpItem href="JavaScript:MNU.setPopupShowHide(filSum,FOB.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div class="dragDropArea" >

				<p>
					<input type=file id=inpOpenFile onchange=FOB.openFile(this);  >
					or drag & drop files here
				</p>

			</div>

			<p id=FOBdivProgress ></p>

		</details>
	`;

	return htm;

};



FOB.requestFile = function( url ) { // from a button
	//console.log( 'url', url );

	if ( FOB.regexHtml.test( url ) ) {

		FOB.target.innerHTML = `<iframe src=${ url } style="${ FOB.contentsCss }" ></iframe>`;

	} else if ( FOB.regexImages.test( url )  ) {

		FOB.target.innerHTML = `<img src=${ url } >`;

	} else {

		FOB.xhr.open( 'GET', url, true );
		FOB.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		FOB.xhr.onload = FOB.callbackDecider;
		FOB.xhr.send( null );

	}

};



FOB.openFile = function( files ) {

	const file = files.files[ 0 ];

	FOB.reader.onload = function( event ) {
		//console.log( 'FOB.reader', FOB.reader );

		const name = file.name.toLowerCase();

		if ( name.endsWith('.md' ) ) {

			FOB.callbackMarkdown( FOB.reader.result );

		} else if ( FOB.regexImages.test( file.name )  ) {

			FOB.target.innerHTML = `<img src=${ FOB.reader.result } >`;

		} else if ( FOB.regexHtml.test( file.name ) ) { // html mucks things up

			FOB.target.innerHTML = `<iframe srcdoc="${ FOB.reader.result }" style=${ FOB.contentsCss } ></iframe>`;

		} else {

			FOB.callbackOtherToTextarea( FOB.reader.result );

		}

	};

	if ( FOB.regexImages.test( file.name ) ) {

		FOB.reader.readAsDataURL( file );

	} else {

		FOB.reader.readAsText( file );

	}

		//function onRequestFileProgress( event ) {

			//divLog.innerHTML =
			//	fileAttributes.name + ' bytes loaded: ' + event.loaded.toLocaleString() +
			//	//( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			//'';

		//}

};



FOB.onDrop = function( event ) {

	const dropUrl = event.dataTransfer.getData( 'URL' );

	if ( dropUrl ) {

		FOB.requestFile( dropUrl );

	} else {

		FOB.openFile( event.dataTransfer );

	}

	event.preventDefault();

};



//////////

FOB.callbackDecider = function ( xhr ) {
	//console.log( 'xhr', xhr );

	const ulc = xhr.target.responseURL.toLowerCase();

	if ( ulc.endsWith( '.md' ) ) {

		FOB.callbackMarkdown( xhr.target.response );

	} else {

		FOB.callbackOtherToTextarea( xhr.target.response );

	}

};



FOB.callbackMarkdown = function( markdown ) {

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( markdown );

	FOB.target.innerHTML = html;
	window.scrollTo( 0, 0 );

};



FOB.callbackOtherToTextarea = function( text ){

	FOB.target.innerHTML = `<textarea style="${ FOB.contentsCss }" >${ text }</textarea>`;

};



//////////


FOB.getMenuEditSaveBasic = function( target = divContents ) {  // called from main HTML file

	const htm =
	`
		<details id=FOBdetEditSave open >

			<summary>Edit and save file
				<a id=filSum class=helpItem href="JavaScript:MNU.setPopupShowHide(filSum,FOB.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<p>
				<input type=checkbox onclick=FOB.setEditable(this) >contentEditable </button>
			</p>

			<p><button onclick=FOB.saveFile(divContents); >save file</button></p>

			<hr>

		</details>
	`;

	return htm;
}


FOB.setEditable = function( checkbox ) {

	var n = document.getElementById( "divContents" );

	//n.contentEditable = true;

	divContents.contentEditable = checkbox.checked

	/* save */
	var s = function(){ localStorage.setItem( "FOBdivContents", n.innerHTML ); }

	/* retrieve (only on page load) */
	if ( window.localStorage ){ n.innerHTML = localStorage.getItem( "FOBdivContents" ); }

	/* autosave onchange and every 500ms and when you close the window */
	n.onchange = s();

	setInterval( s, 500 );

	window.onunload = s();

}

FOB.saveFile = function( target ) {

	let blob = new Blob( [ target.innerHTML ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = 'hello-world.html';
	a.click();
	//		delete a;
	a = null;

}