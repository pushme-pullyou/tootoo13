// Copyright 2019 pushMe-pullYou authors. MIT License
/* global  * /
/* jshint esversion: 6 */
/* jshint loopfunc: true */



const TMP = { "release": "R13.1.0", "date": "2019-02-12" };

TMP.description =
	`
		TooToo Template (TMP) provides HTML and JavaScript 'boilerplate' to create a typical TooToo menu.
	`;

TMP.currentStatus =
	`
		<h3> TooToo Template (TMP) ${ TMP.release} ~ ${ TMP.date }</h3>

		<p>
			${ TMP.description }
		</p>

		<p>
			Concept
			<ul>
				<li>Provides default current status text template</li>
				<li>Provides default description text template</li>
				<li>Includes JavaScript code to generate an HTML menu</li>
				<!-- <li></li> -->
			</ul>
		</p>

		<p>
			<a href="https://github.com/pushme-pullyou/tootoo13/tree/master/cookbook/tmp-template/" target="_blank" >
				TooToo Template Read Me
			</a>
		</p>

		<details>

			<summary>Change log</summary>

			<ul>
				<li>2019-02-12 ~ Minor fixes</li>
				<li>2019-01-15 ~ Add text content to JavaScript and read me</li>
				<li>2019-01-15 ~ Add TMP.description variable and text</li>
				<li>2019-01-15 ~ Add display TMP.description in pop-up and in test file</li>
				<li>2019-01-13 ~ Add link to source code</li>
				<li>2019-01-12 ~ Add cookbook HTML test script and read me file</li>
				<!-- <li></li>
				-->
			</ul>

			</details>
	`;



TMP.getMenuTemplate = function() {

	const htm =
	`
		<details class=detSubMenu >

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
