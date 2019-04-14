//Copyright 2019 Ladybug Tools authors. MIT License
/* globals FIL */
/* jshint esversion: 6 */
/* jshint loopfunc: true */


const TMP = { "release": "1.0.0", "date": "2019-04-13" };


TMP.description =
	`
		template
	`;

TMP.currentStatus =
	`
		<h3>Template(TMP) R${ TMP.release } ~ ${ TMP.date }</h3>

		<p>
			${ TMP.description }.
		</p>

		<p>
			Wish List / To do:<br>
			<ul>

			</ul>
		</p>

		<details>
			<summary>Change log</summary>
			<ul>
				<li>2019-04-13 ~ First commit</li>
			</ul>
		</details>
	`;




TMP.getMenuTemplate = function() {

	const htm =
		`
			<details ontoggle="TMPdivSurface.innerHTML=TMP.getTemplate();" >

				<summary id=TMPsumSurfaces class=sumHeader >Template
					<a id=TMPsum class=helpItem href="JavaScript:MNU.setPopupShowHide(TMPsum,TMP.currentStatus);" >&nbsp; ? &nbsp;</a>
				</summary>

				<div id=TMPdivSurface ></div>

				<div id=TMPdivSurfaceData ></div>

			</details>

		`;

	return htm;

};



TMP.getTemplate = function() {

	const timeStart = performance.now();


	const htm =
	`
		<p><i>Template</i></p>

		<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>

		<p>Time to check: ${ ( performance.now() - timeStart ).toLocaleString() } ms</p>

		<hr>

	`;

	return htm;

};

