// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */



const TMP = { "release": "R13.2", "date": "2019-01-13" };

TMP.description = document.head.querySelector( "[ name=description ]" ).content;

TMP.currentStatus =
	`
		<h3> TooToo Template ${ TMP.release} ~ ${ TMP.date }</h3>

		<p>
			${ TMP.description }
		</p>
		<p>
		Concept
			<ul>
				<li>Provides default description text template</li>
				<li>Provides default current status text template</li>
				<li>Includes basic code to toggle display of current status</li>
				<li>Provides sample content to help with examining CSS effects</li>
				<!-- <li></li> -->
			</ul>
		</p>
		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/tmp-template/" target="_blank" >
				TooToo Template Read Me
			</a>
		</p>
		<p>
			Change log
			<ul>
				<li>2019-01-13 ~ Add link to source code</li>
				<li>2019-01-12 ~ Add cookbook HTML test script and read me file</li>
				<!-- <li></li> -->
			</ul>
		</p>

	`;



TMP.getMenuTemplate = function() {

	const htm =
	`
		<details >

			<summary>TooToo Template
				<a id=tmpSum class=helpItem href="JavaScript:MNU.setPopupShowHide(tmpSum,TMP.currentStatus);" >&nbsp; ? &nbsp;</a>
			</summary>

			<div>

				<p><a href="" >breadcrumb</a> &raquo; </p>

				<h2><a href="" >Title H2</a></h2>

				<div id=divRowButtonsStyle ></div>

				<p><i>111 222 333 444 555</i></p>

				<div>
					text in a div aaa bbb ccc ddd eee fff
				</div>

				<p>
					<label><b>Last Name</b></label>
					<input type="text" style=width:100px; >
				</p>

				<p><button >button 1</button></p>

				<p><button >button 2</button></p>

				<select size=3 >
					<option value="" disabled selected>Choose your option</option>
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
					<option value="3">Option 3</option>
				</select>

				<p>
					lorem ipsum, <a href="https://example.com" target="_blank">quia dolor sit</a>, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?
				</p>

			</div>

		</details>
	`;

	return htm;

};
