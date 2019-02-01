// Copyright 2019 pushMe pullYou authors. MIT License
// jshint esversion: 6
/* globals showdown, navMenu, divContents, uriDefaultFile, urlGitHubPage, OHCTdivMenuItems, OHCTdivBreadcrumbs

*/

const OHCT = { "release": "R13.0", "date": "2019-01-31" };


OHCT.uriDefaultFile = "README.md";
OHCT.user = 'pushme-pullyou';
OHCT.repo = 'tootoo13';
OHCT.pathRepo = '';
OHCT.branch = '/master/';
OHCT.urlGitHubPage = "../../";

OHCT.urlSourceCode = `https://github.com/${ OHCT.user}/${ OHCT.repo }/`;
OHCT.urlSourceCodeImage = "https://status.github.com/images/invertocat.png";
OHCT.iconInfo = `<img src="${ OHCT.urlSourceCodeImage }" height=18 >`;

OHCT.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules
OHCT.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
OHCT.regexHtml = /\.(htm?l)$/i;
OHCT.regexStl = /\.(stl)$/i;

OHCT.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;

OHCT.description =
	`
		Create menus using location hash and GitHub API to
		select, load and display files hosted on GitHub branches or GitHub pages
	`;

OHCT.currentStatus =
	`
		<h3>TooToo On Hash Change Tree (OHCT) ${ OHCT.release} ~ ${ OHCT.date }</h3>

		<p>
			${ OHCT.description }
		</p>

		<p>
			Concept
			<ul>
				<li>Obtains lists files and folders in a repository uses the GitHub Developer API</li>
				<li>Opens and displays contents of file</li>
				<li>Creates and update the HTML for a tree menu and breadcrumbs</li>
				<li>Provides a simple API for all of the above</li>
				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/ohc-on-hash-change/" target="_blank" >
				TooToo On Hash Change (OHCT) Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-01-15 ~ Update OHCT.description content and related code</li>
				<li>2019-01-14 ~ Add text here and there / fix broken links</li>
				<li>2019-01-13 ~ Add link to source code and more status content</li>
				<li>2019-01-12 ~ Add cookbook HTML test script and read me file</li>
				<!-- <li></li> -->
			</ul>
		</p>
	`;



OHCT.currentStatusAccessToken =
	`
		<h3>GitHub API Access Token</h3>

		<p>This script uses the GitHub API to obtain the names of folders and files displayed in this menu.</p>

		<p>
			In rare circumstances your usage may push the requests over the sixty requests per hour limit,
			no list of files will appear and this script will display an error message.
			After an or so so, the rates limit is automatically reset and menus will again display as expected.
		</p>

		<p>
			If you are testing or building new menus or whatever,
			you may obtain access tokens from GitHub at no charge and enter the token into the text box.
			This will raise your limit to 5,000 requests per hour.
		</p>
		<p>
			See <a href="https://developer.github.com/v3/#rate-limiting" target="_blank">developer.github.com/v3</a>.
		</p>
		<p>
			<button onclick=OHCT.requestFile("https://api.github.com/rate_limit",OHCT.callbackRateLimits); title='If files and folder stop appearing, it is likely due to too many API calls' >
				View GitHub API rate limits</button>
		</p>
	`;



OHCT.getMenuRepoFilesFolders = function() {

	OHCT.divContents = divContents;
	OHCT.urlGitHubSource = "https://github.com/" + OHCT.user + "/" + OHCT.repo;
	//OHCT.urlGitHubApiContents = 'https://api.github.com/repos/' + OHCT.user + "/" + OHCT.repo + '/contents/' + OHCT.pathRepo;
	//OHCT.urlGitHubApiContents = "https://api.github.com/repos/" + OHCT.user + "/" + OHCT.repo + "git/trees/master?recursive=1";

	OHCT.urlGitHubApiContents = "https://api.github.com/repos/" + OHCT.user + "/" + OHCT.repo + "/git/trees/master?recursive=1";

	OHCT.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	// https://api.github.com/repos/nasa/NASA-3D-Resources/git/trees/master?recursive=1

	OHCT.setMenuGitHubPathFileNames();

	window.addEventListener ( 'hashchange', OHCT.onHashChange, false );

	const htm =
	`
		<details open >

			<summary>All files and folders
				<a id=ohcSum class=helpItem href="JavaScript:MNU.setPopupShowHide(ohcSum,OHCT.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div id = "stats" ></div>

			<div id = "nasa3DModels" ></div>

			<div id = "nasa3DPrinting" ></div>

			<details>

				<summary>GitHub API Access Token
					<a id=ohcToken class=helpItem href="JavaScript:MNU.setPopupShowHide(ohcToken,OHCT.currentStatusAccessToken);" >&nbsp; ? &nbsp;</a>
				</summary>

				<p>
					Access token
					<input value="${ OHCT.accessToken }" id=OHCTinpGitHubApiKey  onclick=this.select(); onblur=OHCT.setGitHubAccessToken(this.value); title="Obtain API Access Token" >
				</p>

			</details>

		</details>

	`;

	return htm;

};



OHCT.setGitHubAccessToken = function( accessToken ) {

	console.log( 'accessToken', accessToken );

	localStorage.setItem( "githubAccessToken", accessToken );

	OHCT.accessToken = accessToken;

};



OHCT.onHashChange = function() {

	const url = !location.hash ? OHCT.uriDefaultFile : location.hash.slice( 1 );

	const ulc = url.toLowerCase();

	if ( ulc.endsWith( ".md" ) ) {

		OHCT.requestFile( url, OHCT.callbackMarkdown );

	} else if ( OHCT.regexHtml.test( ulc ) ) {

		divContents.innerHTML = `<iframe src=${ url } style="${ OHCT.contentsCss }" ></iframe>`;

	} else if ( OHCT.regexImages.test( ulc )  ) {

		divContents.innerHTML = `<img src=${ url } >`;

	} else if ( OHCT.regexStl.test( ulc )  ) {

		console.log( 'ulc', ulc );

		loadSTLFileByURL( url );

	} else {

		OHCT.requestFile( url, OHCT.callbackOtherToTextarea );

	}

};



function loadSTLFileByURL( fileName ) {

	//fileName = "https://cdn.jsdelivr.net/gh/nasa/NASA-3D-Resources@master/3D%20Printing/Voyager%20(2017)/Stand.stl"
	console.log( 'fileName', fileName );

	let loader = new THREE.STLLoader();
	loader.crossOrigin = 'anonymous';
	loader.load( fileName, function ( geometry ) {

		addMesh( geometry );

		//contents.innerHTML = 'File name: ' + fileName.split('/').pop() + '<br>' + '';

	} );

}


function addMesh( geometry ) {

	//console.log( 'geometry', geometry );

	//			geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.center();
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	let material = new THREE.MeshNormalMaterial();

	THR.scene.remove( mesh );
	mesh = new THREE.Mesh( geometry, material );
	THR.scene.add( mesh );

	zoomExtents( mesh );

}



function zoomExtents( mesh ) {

	mesh.geometry.computeBoundingSphere();

	let bs = mesh.geometry.boundingSphere;

	THR.controls.target = bs.center;

	THR.camera.position.set( bs.center.x + bs.radius, bs.center.y + bs.radius, bs.center.z + bs.radius );
	THR.camera.far = 3 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	THRU.axisHelper.scale.set( bs.radius, bs.radius, bs.radius );

}



OHCT.requestFile = function( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	xhr.onload = callback;
	xhr.send( null );

};


////////// same as FOB


OHCT.callbackRateLimits = function( xhr ) {

	divPopUpData.innerHTML=
		`
		<h3>Current GitHub rate limits</h3>

		<p>See <a href="https://developer.github.com/v3/#rate-limiting" target="_blank">developer.github.com/v3</a>.</p>

		<pre> ${ xhr.target.response } </pre>

		`;

}



OHCT.callbackMarkdown = function( xhr ) {

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( xhr.target.response );

	OHCT.divContents.innerHTML = html;
	window.scrollTo( 0, 0 );

};



OHCT.callbackOtherToTextarea = function( xhr ){

	OHCT.divContents.innerHTML = `<textarea style="${ OHCT.contentsCss }" >${ xhr.target.response }</textarea>`;

};



//////////

OHCT.setMenuGitHubPathFileNames = function() {

	//console.log( 'path', path );

	const str = OHCT.accessToken ? "&access_token=" + OHCT.accessToken : "";

	const url = OHCT.urlGitHubApiContents + str;

	OHCT.requestFile( url, OHCT.callbackGitHubPathFileNames ); // to do: make request only once and triage thereafter

};



OHCT.callbackGitHubPathFileNames = function( xhr ) {

	const response = xhr.target.response;
	const items = JSON.parse( response );
	console.log( 'items', items );
	//OHCT.menuItems = items;

	//if ( items.message !== "Not Found" ) { alert( items.message ); return; }
	if ( items.message ) { console.log( 'error', items.message ); return; } //breadcrumbs??

	const lines = response.split(/\r\n|\n/);
	let textModels = '';
	let textPrinting = '';
	let mods = 0;
	let prints = 0;

	for ( let i = 0; i < lines.length; i++ ) {

		if ( lines[ i ].indexOf( '.stl' ) > -1 ) {

			const line = lines[ i ];
			const start = line.indexOf( '/' );
			const fname =  line.substr( start ).replace( '",','' );

			elements = lines[ i ].split('/' );

			if ( line.indexOf( '3D Models' ) > - 1 ) {

				textModels += '<p><a href="#https://cdn.jsdelivr.net/gh/nasa/NASA-3D-Resources@master/3D Models' + fname + '" >' +
				fname + '</a></p>';
				mods++;

				// https://cdn.jsdelivr.net/gh/nasa/NASA-3D-Resources@master/3D%20Models/Apollo%2011%20-%20Landing%20Site/Apollo_11.stl
			} else

				textPrinting += '<p><a href="#https://rawgit.com/nasa/NASA-3D-Resources/master/3D Printing/' + fname + '" >' +
				fname + '</a></p>';
				prints++;
		}

	}

	nasa3DModels.innerHTML += textModels;
	nasa3DPrinting.innerHTML += textPrinting;
	stats.innerHTML = `<p>3D Model files: ${ mods }<br>3D Printer files: ${ prints }`;

	//onHashChange();

};
