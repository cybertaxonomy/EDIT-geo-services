<?php
	//these constants added by ftheeten 04/03/2010
	

	define("POSTGIS_CS", 'host=localhost port=5432 password=********* user=********** dbname=edit_geo_mirror');
	define("URL_GEOSERVER", "http://edit.africamuseum.be/geoserver/wms");
	define("URL_SITE", "http://edit.africamuseum.be");
	define("V1_IMG","/var/www/synthesys/www/v1.4/img/");
	define("V1_URL",URL_SITE."/synthesys/www/v1.4/img");
	define("V1_SLD_URL", "http://edit.africamuseum.be/synthesys/www/v1.4/sld");
	define("LEGEND_URL", "http://edit.africamuseum.be/synthesys/www/v1.4/sld");//added ftheeten 16/06/2010
	define("V1_SLD_PATH", "/var/www/synthesys/www/v1.4/sld");
	define("EXC_001", "Error 01: some geographical point data are not numeric (image and/or map cannot be generated for the complete subset)");
?>
