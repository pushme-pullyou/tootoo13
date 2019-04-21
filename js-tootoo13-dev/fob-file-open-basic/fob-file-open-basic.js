// Copyright 2019 pushMe pullYou authors. MIT License
// jshint esversion: 6
/* globals navMenu, showdown, divContents, FOBsecFileOpenBasic */

const FOB = { "release": "R1.0.0", "date": "2019-04-13" };

FOB.description =
	`
		TooToo File Open Basic (FOB) provides HTML and JavaScript to
		select, open and display local files using the file dialog box, drag and drop or URL.
	`;


FOB.reader = new FileReader();
FOB.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules

FOB.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
FOB.regexHtml = /\.(htm?l)$/i;

FOB.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;



FOB.getMenuFileOpenBasic = function( target = divContents ) {  // called from main HTML file

	FOB.target = target;

	window.addEventListener ( 'hashchange', FOB.onHashChange, false );

	FOBsecFileOpenBasic.addEventListener( "dragover", function( event ){ event.preventDefault(); }, true );
	FOBsecFileOpenBasic.addEventListener( 'drop', FOB.onDrop, false );

	FOB.xhr.addEventListener( 'load', FOB.callbackDecider, false );
	FOB.reader.addEventListener( 'load', FOB.onReaderResult, false );
	document.body.addEventListener( 'onZipFileParse', FOB.onFileZipLoad, false );

	const htm =
	`
		<details id=FOBdetFileOpen class=detSubMenu open >

			<summary>Open file
				<a id=FOBsum class=helpItem href="JavaScript:MNU.setPopupShowHide(FOBsum);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div class="dragDropArea" >

				<p>
					<input type=file id=inpOpenFile onchange=FOB.onInputFileOpen(this);  >
				</p>
				<p>
					<button onclick=FOB.reloadFile(); >reload file</button>
				</p>
				<p>
					or drag & drop files here
					or enter a default file path <a class=helpItem href=https://www.ladybug.tools/spider/#pages/file-open.md title="Learn how to speed up your testing" target=-blank >?</a>
					<!--
						try this: 	https://www.ladybug.tools/spider/gbxml-sample-files/bristol-clifton-downs-broken.xml
					-->
					<input id=FOBinpFilePath onchange=FOB.updateDefaultFilePath(); style=width:95%; title='paste a file path or URL here then press Enter' >
				</p>

			</div>

			<details open >

				<summary>File open statistics</summary>

				<div id=FOBdivProgress ></div>

			</details>

		</details>
	`;

	return htm;

};



FOB.onHashChange = function() {

	const url = !location.hash ? FOB.urlDefaultFile : location.hash.slice( 1 );
	//console.log( 'url', url );

	FOB.requestFile( url );

};




FOB.requestFile = function( url ) { // from a button
	//console.log( 'url', url );

	FOB.name = url.split( '/').pop();

	aViewSource.href = MNU.urlSourceCode + "blob/master/" + url;

	if ( FOB.regexHtml.test( url ) ) {

		FOB.target.innerHTML = `<iframe src=${ url } style="${ FOB.contentsCss }" ></iframe>`;

	} else if ( FOB.regexImages.test( url )  ) {

		FOB.target.innerHTML = `<img src=${ url } >`;

	} else if ( FOB.name.toLowerCase().endsWith( '.xml' ) ) {

		FOB.requestFileText( url );

	} else if ( FOB.name.toLowerCase().endsWith( '.zip' )) {

		FOB.xhrRequestFileZip( url, FOB.callbackUrlUtf16 );

	} else {

		FOB.requestFileText( url );

/* 		FOB.xhr.open( 'GET', url, true );
		FOB.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		FOB.xhr.onload = FOB.callbackDecider;
		FOB.xhr.send( null ); */

	}

};



FOB.requestFileText = function( url ) {

	FOB.timeStart = performance.now();

	FOB.xhr.open( 'GET', url, true );
	FOB.xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	FOB.xhr.onprogress = function( xhr ) { FOB.onProgress( xhr.loaded, FOB.note ); };
	FOB.xhr.onload = function( xhr ) { FOB.onProgress( xhr.loaded ); };
	FOB.xhr.send( null );

};



FOB.onInputFileOpen = function( files ) {

	FOB.files = files;
	FOB.timeStart = performance.now();

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



FOB.reloadFile = function() {

	FOB.onInputFileOpen( FOB.files );

};



FOB.onDrop = function( event ) {

	console.log( '', event );

	const dropUrl = event.dataTransfer.getData( 'URL' );

	if ( dropUrl ) {

		FOB.requestFile( dropUrl );

	} else {

		FOB.openFile( event.dataTransfer );

	}

	event.preventDefault();

};




FOB.onProgress = function( size = 0, note = '' ) {


	const timeToLoad = ( performance.now() - FOB.timeStart ).toLocaleString();

	let htm =
	`
		<div style="padding: 1rem 0;" >
			<div style=padding:0; >File name:</div>
			<div style=color:blue;padding:0; >${ FOB.name }</div>
			<div style=padding:0; >bytes loaded: ${ size.toLocaleString() }</div>
			<div style=padding:0; >time to load: ${ timeToLoad }ms</div>
			${ note }
		</div>
	`;

	FOBdivProgress.innerHTML = htm;

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


FOB.updateDefaultFilePath = function() {

	location.hash = FOBinpFilePath.value;

	const thrFilePath = FOBinpFilePath.value;
	localStorage.setItem( 'thrFilePath', thrFilePath );

};