

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
         "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>GBIF Iphone Demo</title>
<meta name="viewport" content="width=320; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;"/>
<style type="text/css" media="screen">@import "iui/iui.css";</style>
<script type="text/javascript" src="../mapviewer/jquery-1.3.2.js"></script>
<script type="application/x-javascript" src="iui/iui.js"></script>

<script>
$(document).ready(function(){
//console.log('hello');
//$("ul li a").click(function() {alert("clickiiin")});

});
</script>



<!--
<script type="application/x-javascript" src="http://10.0.1.2:1840/ibug.js"></script>
-->
<link rel="apple-touch-icon" href="gbifIcon.png" />
<style type="text/css">

body  > ul > li > a {
    padding-left: 34px;
    padding-right: 40px;
    min-height: 34px;
}

li .detail {
	display: block;
	position: absolute;
	margin: 0;
	left: 6px;
	top: 7px;
	text-align: center;
	font-size: 100%;
	color: #93883F;
	font-weight: bold;
	text-decoration: none;
	width: 25px;
	height: 10px;
	padding: 0px 0 0 0;
	background: url(shade-compact.gif) no-repeat;
}
.style1 {
	font-size: 14px;
	
}
.style2 {
	font-size: 9px;
	font-style: italic;
	background-color: #DBFCC5;
	font-weight: normal;
}
</style>
</head>

<body>
    <div class="toolbar">
        <h1 id="pageTitle"></h1>
        <a id="backButton" class="button" href="#"></a>
        <a class="button" href="#searchForm">Search</a>
    </div>
  
    <ul id="home" title="GBIF Mobile" selected="true">
            <li><a href="tq.php">Species2</a></li>
            <li><a href="cq.php">Countries</a></li>
            <li><a href="#unavailable">Datasets</a></li>
            <li><a href="generalStats.php">Stats</a></li>
            <li><a href="#settings">Settings</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="http://www.gbif.org" target="_self">GBIF website <img src="gbifLogoMini.png" alt="" width="21" height="21" border="0" align="top" /></a></li>
    </ul>
    
    
<div id="unavailable" class="panel" title="Not ready!">
        <h2>Sorry, this page is still not available.</h2>
    </div>
    
    <div id="settings" class="panel" title="Settings">
        <h2>Settings</h2>
        <fieldset> 
             <div class="row"><label>outputUnconfirmed</label>
             <div class="toggle" onclick="SetCookie('outputUnconfirmed',this.getAttribute('toggled'));window.alert('The GBIF API currently does not support changing this setting.');SetCookie('outputUnconfirmed',this.getAttribute('toggled'));" toggled="true"><span class="thumb"></span><span class="toggleOn">ON</span><span class="toggleOff">OFF</span></div></div>

             <div class="row"><label>Taxonomy Provider</label>
             <select name="taxonomyProvider" onchange="SetCookie('taxonomyProvider',this.getValue);">
               <option value="1" selected="selected">GBIF</option>
               <option value="2">CoL</option>
               <option value="3">IPNI</option>
             </select>
             </div>
         </fieldset>
    </div>
    
    
    <div id="about" class="panel" title="About">
    	<h2>About</h2>
        <fieldset>
        	<div class="textRow"><p>This mashup has been created by <a href="mailto:jatorre@gmail.com">Javier de la Torre</a> & Dave Martin while playing with their new Ipod Touchs.</p>
		</div>
      </fieldset>
        <h2>Contact</h2>
        <fieldset>
        	<div class="textRow">
        	  <p>Remember this is just a prototype and that we dont accept any responsability for the use of this app. If you have any question or just want to say hi contact me at <a href="mailto:jatorre@gmail.com">jatorre@gmail.com</a></p>
       	</div>
      </fieldset>
        <h2>Technical details</h2>
        <fieldset>
        <div class="textRow">
                <table width="100%" border="0" align="left" cellpadding="5" cellspacing="5">
                  <tr>
                    <td width="11%"><strong><a href="http://code.google.com/p/iui/" target="_self">IuI</a></strong></td>
                    <td width="89%"><div align="left">A javascript, CSS library to create Iphone web applications</div></td>
                  </tr>
                  <tr>
                    <td><strong><a href="http://www.php.net/" target="_self">PHP</a></strong></td>
                    <td><div align="left">Scripting language to connect to GBIF Data API and transform it into HTML</div></td>
                  </tr>
                  <tr>
                    <td><strong><a href="http://code.google.com/apis/chart/" target="_self">Google Charts</a></strong></td>
                    <td><div align="left">To create charts on he fly. Very cool!</div></td>
                  </tr>
                  <tr>
                    <td><strong><a href="http://wiki.gbif.org/dadiwiki/wikka.php?wakka=DeveloperAPIs" target="_self">GBIF Data API</a></strong></td>
                    <td><div align="left">GBIF services are very cool. Mainly we use the JSON services as they are much easier to use and faster to process.</div></td>
                  </tr>
                </table>
                <p>&nbsp;</p>
        </div>
        </fieldset>
    </div>    
    
    <form action="ts.php" method="post" class="dialog" id="searchForm" >
        <fieldset>
            <h1>Search GBIF</h1>
            <a class="button leftButton" type="cancel">Cancel</a>
            <a class="button blueButton" type="submit">Search</a>
            <label>Name:</label>
            <input type="text" name="speciesName"/>
        </fieldset>
    </form>
    <script type="text/javascript">
    var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
    document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
    var pageTracker = _gat._getTracker("UA-3825986-3");
    pageTracker._initData();
    pageTracker._trackPageview();
    </script>
<div id="data"/>
</body>
</html>
