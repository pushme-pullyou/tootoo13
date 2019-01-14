// Copyright 2019 pushMe pullYou authors. MIT License
// jshint esversion: 6
/* globals showdown, navMenu, divContents, uriDefaultFile, urlGitHubPage, OHCdivMenuItems, OHCdivBreadcrumbs

*/

const OHC = { "release": "R13.4", "date": "2019-01-14" };


OHC.uriDefaultFile = "README.md";
OHC.user = 'pushme-pullyou';
OHC.repo = 'tootoo13';
OHC.pathRepo = '';
OHC.branch = '/master/';
OHC.urlGitHubPage = "../../";

OHC.urlSourceCode = `https://github.com/${ OHC.user}/${ OHC.repo }/`;
OHC.urlSourceCodeImage = "https://status.github.com/images/invertocat.png";
OHC.iconInfo = `<img src="${ OHC.urlSourceCodeImage }" height=18 >`;

OHC.xhr = new XMLHttpRequest(); // declare now to load event listeners in other modules
OHC.regexImages = /\.(jpe?g|png|gif|webp|ico|svg|bmp)$/i;
OHC.regexHtml = /\.(htm?l)$/i;

OHC.contentsCss = `box-sizing: border-box; border: 1px solid #888; height: ${ window.innerHeight - 4 }px; margin: 0; padding:0; width:100%;`;


OHC.currentStatus =
	`
		<h3>OHC ${ OHC.release} status ${ OHC.date }</h3>

		<p>TooToo On Hash Change (OHC)</p>
		<p>
			This script obtains lists files and folders in a repo uses the GitHub API.
			Once the names have been read, the script display the items in the menu
		</p>

		<p>
			Concept
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/ohc-on-hash-change/" target="_blank" >
				TooToo On Hash Change (OHC) Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-01-14 ~ Add text here and there / fix broken links</li>
				<li>2019-01-13 ~ Add link to source code and more status content</li>
				<li>2019-01-12 ~ Add cookbook HTML test script and read me file</li>
				<!-- <li></li> -->
			</ul>
		</p>
	`;



OHC.currentStatusAccessToken =
	`
		<h3>GitHub API Access Token</h3>

		<p>This script uses the GitHub API to obtain the names of folders and files displayed in this menu.</p>

		<p>
			In rare circumstances usage may push the requests over the sixty requests per hour limit,
			no list of files will appear and this script will display an error message.
			After an or so so, the rates limit is automatically reset and menus will dis[lay as expected.
		</p>

		<p>
			If you are testing or building new menus or whatever,
			you may obtain at no charge an access token from GitHub and enter the token into the text box.
			This will raise the limit to 5,000 requests per hour. See <a href="https://developer.github.com/v3/#rate-limiting" target="_blank">developer.github.com/v3</a>.
		</p>
	`;



OHC.getMenuRepoFilesFolders = function() {

	OHC.divContents = divContents;
	OHC.urlGitHubSource = "https://github.com/" + OHC.user + "/" + OHC.repo;
	OHC.urlGitHubApiContents = 'https://api.github.com/repos/' + OHC.user + "/" + OHC.repo + '/contents/' + OHC.pathRepo;
	OHC.accessToken = localStorage.getItem( 'githubAccessToken' ) || '';

	window.addEventListener ( 'hashchange', OHC.onHashChange, false );

	const htm =
	`
		<details open >

			<summary>All files and folders
				<a id=ohcSum class=helpItem href="JavaScript:MNU.setPopupShowHide(ohcSum,OHC.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div id = "OHCdivBreadcrumbs" ></div>

			<div id = "OHCdivMenuItems" ></div>

			<details>

				<summary>GitHub API Access Token
					<a id=ohcToken class=helpItem href="JavaScript:MNU.setPopupShowHide(ohcToken,OHC.currentStatusAccessToken);" >&nbsp; ? &nbsp;</a>
				</summary>

				<p>
					Access token
					<input value="${ OHC.accessToken }" id=OHCinpGitHubApiKey  onclick=this.select(); onblur=OHC.setGitHubAccessToken(this.value); title="Obtain API Access Token" >
				</p>

			</details>

		</details>

	`;

	return htm;

};



OHC.setGitHubAccessToken = function( accessToken ) {

	console.log( 'accessToken', accessToken );

	localStorage.setItem( "githubAccessToken", accessToken );

	OHC.accessToken = accessToken;

};



OHC.onHashChange = function() {

	const url = !location.hash ? OHC.uriDefaultFile : location.hash.slice( 1 );

	const ulc = url.toLowerCase();

	const crumbs = url.slice( OHC.urlGitHubPage.length );
	let pathCurrent = crumbs.lastIndexOf( '/' ) > 0 ? crumbs.slice( 0, crumbs.lastIndexOf( '/' ) ) : '';

	// note two requests...

	// if new !== old
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


////////// same as FOB


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

	//console.log( 'path', path );

	const str = OHC.accessToken ? "?access_token=" + OHC.accessToken : "";

	OHC.urlGitHubApiContents = `https://api.github.com/repos/${ OHC.user }/${ OHC.repo }/contents/${OHC.pathRepo }`;

	const url = OHC.urlGitHubApiContents + path + str;

	OHC.requestFile( url, OHC.callbackGitHubPathFileNames ); // to do: make request only once and triage thereafter

	OHC.setBreadcrumbs( path );

};



OHC.callbackGitHubPathFileNames = function( xhr ) {

	const response = xhr.target.response;
	const items = JSON.parse( response );
	//OHC.menuItems = items;

	//if ( items.message !== "Not Found" ) { alert( items.message ); return; }
	if ( items.message ) { console.log( 'error', items.message ); return; } //breadcrumbs??

	const htmFolders = OHC.getFoldersFromContents( items );

	const htmFiles = OHC.getFilesFromContents( items );

	OHCdivMenuItems.innerHTML = htmFolders + htmFiles;

};



OHC.getFoldersFromContents = function( items ) {

	let htm = "";

	const len = OHC.pathRepo.length;

	const ignoreFolders = [ "data" ];

	for ( let item of items ) {

		if ( item.type === "dir" && !ignoreFolders.includes( item.name ) ) {

			// why does this not work? item.path.split( "/" ).pop()
			htm +=
			`
				<div style=margin-bottom:8px; >
					<a href=JavaScript:OHC.setMenuGitHubPathFileNames("${ item.path.slice( len ) }"); >
						&#x1f4c1; ${ item.name }
					</a>
				</div>
			`;

		}

	}

	return htm;

}



OHC.getFilesFromContents = function( items ) {

	let htm = "";

	const len = OHC.pathRepo.length;

	const ignoreFiles = [ ".gitattributes", ".gitignore", "404.html" ];

	for ( let item of items ) {

		if ( item.type === "file" && !ignoreFiles.includes( item.name ) ) {

			const itemPath = encodeURI( item.path.slice( len ) );

			const str = item.path.endsWith( "html" ) ? `<a href="${ OHC.urlGitHubPage }${ OHC.pathRepo }${ itemPath }" >&#x2750;</a>` : "";

			htm += // try grid or flexbox??
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
						${ str }
					</td>
				</tr></table>
			`;

			// how to simplify
			if ( ( !location.hash || location.hash.toLowerCase().endsWith( 'readme.md' ) )

				&& ( item.name.toLowerCase() === 'readme.md' ) ) {

				location.hash = OHC.urlGitHubPage + OHC.pathRepo + itemPath;

			}

		}

	}

	return htm;

};



OHC.setBreadcrumbs = function( path ) {
	//console.log( 'path', path );

	const htmHome =
	`
		<b>
			<a href=JavaScript:OHC.setMenuGitHubPathFileNames(); title="home folder" >
				${ ( OHC.pathRepo ? OHC.pathRepo : "<span style=font-size:28px >&#x2302</span>" ) }
			</a> &raquo;
		</b>
	`;

	const folders = path ? path.split( '/' ) : [] ;

	let htmFolders = "";
	let str = "";

	for ( let folder of folders ) {

		str += `${ folder }/`;

		htmFolders += `<b><a href=JavaScript:OHC.setMenuGitHubPathFileNames("${ str.slice( 0, -1 ) }"); >${ folder }</a> &raquo; </b>`;

	}

	OHCdivBreadcrumbs.innerHTML = htmHome + htmFolders;

};
