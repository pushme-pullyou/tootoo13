// Copyright 2019 pushMe pullYou authors. MIT License
// jshint esversion: 6
/* globals showdown, navMenu, divContents, uriDefaultFile, urlGitHubPage, OHCdivMenuItems, OHCdivBreadcrumbs

*/

const OHC = { "release": "R13.0", "date": "2019-01-04" };

OHC.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules
OHC.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
OHC.regexHtml = /\.(htm?l)$/i;
OHC.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;


OHC.currentStatus =
	`
		<h3>OHC ${ OHC.release} status ${ OHC.date }</h3>

		<p>OHC On Hash Change</p>

		<p>Lists files and folders in a repo in a menu</p>
	`;



OHC.getMenuRepoFilesFolders = function() {

	window.addEventListener ( 'hashchange', OHC.onHashChange, false );

	OHC.divContents = divContents;

	//const urlGitHubPage = location.href.includes( '/' + user + '.github.io' ) ? '' : 'https://rawgit.com/' + user + repo + branch;
	//const urlGitHubPage = location.href.includes( repo ) ? '' : 'https://rawgit.com/' + user + repo + branch;
	OHC.urlGitHubPage  = 'https://rawgit.com/' + OHC.user + OHC.repo + OHC.branch;
	//console.log( 'urlGitHubPage', urlGitHubPage );

	OHC.urlGitHubSource = 'https://github.com/' + OHC.user + OHC.repo;
	OHC.urlGitHubApiContents = 'https://api.github.com/repos/' + OHC.user + OHC.repo + '/contents/' + OHC.pathRepo;

	const htm =
	`
		<details open >

			<summary>All files and folders
				<a id=ohcSum class=helpItem href="JavaScript:MNU.setPopupShowHide(ohcSum,OHC.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div id = "OHCdivBreadcrumbs" ></div>

			<div id = "OHCdivMenuItems" ></div>

			<p>
				GitHub API Access Token
				<input id=OHCinpGitHubApiKey onblur=console.log('',23); title="Obtain API Access Token" >
			</p>

		</details>

	`;

	return htm;

};



OHC.onHashChange = function() {

	const url = !location.hash ? uriDefaultFile : location.hash.slice( 1 );
	const ulc = url.toLowerCase();

	const crumbs = url.slice( OHC.urlGitHubPage.length );
	const pathCurrent = crumbs.lastIndexOf( '/' ) > 0 ? crumbs.slice( 0, crumbs.lastIndexOf( '/' ) ) : '';
	//console.log( 'pathCurrent',  pathCurrent );

	OHC.setMenuGitHubPathFileNames( pathCurrent );

	if ( ulc.endsWith( ".md" ) ) {

		OHC.requestFile( url, OHC.callbackMarkdown );

	} else if ( OHC.regexHtml.test( ulc ) ) {

		divContents.innerHTML = `<iframe src=${ url } style="${ OHC.contentsCss }" ></iframe>`;

	} else if ( OHC.regexImages.test( ulc )  ) {

		divContents.innerHTML = `<img src=${ url } >`;

	} else {

		OHC.requestFile( url, OHC.callbackOtherToTextarea );

	}

};



OHC.requestFile = function( url, callback ) {

	const xhr = new XMLHttpRequest();
	xhr.crossOrigin = 'anonymous';
	xhr.open( 'GET', url, true );
	xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
	//xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
	xhr.onload = callback;
	xhr.send( null );

};


////////// same as OHC


OHC.callbackMarkdown = function( xhr ) {

	showdown.setFlavor('github');
	const converter = new showdown.Converter();
	const html = converter.makeHtml( xhr.target.response );

	OHC.divContents.innerHTML = html;
	window.scrollTo( 0, 0 );

};



OHC.callbackOtherToTextarea = function( xhr ){

	OHC.divContents.innerHTML = `<textarea style="${ OHC.contentsCss }" >${ xhr.target.response }</textarea>`;

};



//////////

OHC.setMenuGitHubPathFileNames = function( path = '' ) {

	const url = OHC.urlGitHubApiContents + path;

	OHC.requestFile( url, OHC.callbackGitHubPathFileNames ); // to do: make request only once and triage thereafter

	OHC.setBreadcrumbs( path );

};



OHC.callbackGitHubPathFileNames = function( xhr ) {

	const response = xhr.target.response;
	const items = JSON.parse( response );
	const len = OHC.pathRepo.length;

	let txt = "";

	if ( items.message ) { console.log( items.message ); return; }

	const ignoreFolders = [ "data" ]; //, "plugins"

	for ( let item of items ) {

		if ( item.type === "dir" ) {

			if ( ignoreFolders.includes( item.name ) ) { continue; }

			txt +=
			`
				<div style=margin-bottom:8px; >
					<a href=JavaScript:OHC.setMenuGitHubPathFileNames("${ item.path.slice( len ) }"); >
						&#x1f4c1; ${ item.name }
					</a>
				</div>
			`;

		}

	}

	const ignoreFiles = [ ".gitattributes", ".gitignore", "404.html" ];

	for ( let item of items ) {

		if ( item.type === "file" ) {

			if ( ignoreFiles.includes( item.name ) ) { continue; }

			const itemPath = encodeURI( item.path.slice( len ) );

			txt += // try grid or flexbox??
			`
				<table><tr>
					<td>
						<a href="${ OHC.urlGitHubSource }/blob${ OHC.branch }${ itemPath }" target=_top >
							${ OHC.iconInfo }
						</a>
					</td>
					<td>
						<a href=#${ OHC.urlGitHubPage }${ OHC.pathRepo }${ itemPath } title="${ item.size.toLocaleString() } bytes" >
							${ item.name }
							</a>
						${ ( item.path.endsWith( "html" ) ? "<a href=${ OHC.urlGitHubPage }${ OHC.pathRepo }${ itemPath } >&#x2750;</a>" : "" ) }
					</td>
				</tr></table>
			`;

			// simplify
			if (  !location.hash || location.hash.toLowerCase().endsWith( 'readme.md' )

				&& ( item.name.toLowerCase() === 'readme.md' ) ) {

				location.hash = OHC.urlGitHubPage + OHC.pathRepo + itemPath;

			}

		}

	}

	OHCdivMenuItems.innerHTML = txt;

};



OHC.setBreadcrumbs = function( path ) {

	let txt =
	`
		<b>
			<a href=JavaScript:OHC.setMenuGitHubPathFileNames(); title="home folder" >
				${ ( OHC.pathRepo ? OHC.pathRepo : "<span style=font-size:28px >&#x2302</span>" ) }
			</a> &raquo;
		</b>
	`;

	const folders = path ? path.split( '/' ) : [] ;

	let str = ``;

	for ( let folder of folders ) {

		str += `${ folder }/`;

		txt += `<b><a href=JavaScript:OHC.setMenuGitHubPathFileNames("${ str.slice( 0, -1 ) }"); >${ folder }</a> &raquo; </b>`;

	}

	OHCdivBreadcrumbs.innerHTML = txt;

};
