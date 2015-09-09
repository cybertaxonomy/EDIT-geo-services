<?php
	//these constants added by ftheeten 04/03/2010

	define("DIR_PLATFORM", "/var/www/edit_wp5"); // /var/www/edit/edit_wp5, /var/www/edit/synthesys/www
	define("POSTGIS_CS", 'host=localhost port=5432 password= user= dbname=');
	define("URL_GEOSERVER", "http://193.190.116.6:8080/geoserver/wms");
	define("URL_SITE", "http://edit.br.fgov.be");
	define("DIR_SLD_EXT", "/var/www/edit_wp5/synthesys/www");
	define("SLD_DIR", DIR_SLD_EXT."/fitxers/sld_mapviewer");
	define("SLD_DIR2", DIR_PLATFORM."/geo/sld");
	define("SLD_DIR3",DIR_SLD_EXT."/fitxers/sld");
	define("UPLOAD_DIR", DIR_PLATFORM."/geo/loaded_CSVs/");	
	define("SLD_URL1", URL_SITE."/synthesys/www/fitxers/sld_mapviewer/");
	define("SLD_URL2", URL_SITE."/edit_wp5/geo/sld");		
	define("SLD_URL3", URL_SITE."/synthesys/www/fitxers/sld");
	define("PATH_JSON", DIR_PLATFORM."/geo/mapviewer/json_simple/user_json");
	define("DATA_UPLOAD_DIR",  DIR_PLATFORM."/geo/loaded_CSVs");
	define("LEG_IMG_REL","images/download/legends");	
	define("V1_IMG","var/www/edit_wp5/v1/img");
	define("V1_SLD","var/www/edit_wp5/v1/sld");
	define("V1_SLD_URL", "http://edit.br.fgov.be/synthesys/www/v1/sld");
	define("FONT_DIRECTORY","/var/www/edit/synthesys/Data_Directory/Fonts");
	define("IMG_DOWNLOAD", "images/download");//? used in "general_legend.php" + relative path (check folder permissions)
	define("PHP_XSL", "php_xsl");
	define("KEYMAP_DIR", "/var/www/html/geo/images/download/keymaps");
	define("URL_IMG", URL_SITE."/edit_wp5/geo/images");
	define("IMAGE_DL_FOLDER","/var/www/edit/edit_wp5/geo/images/download"); 
	define("LEGEND_URL", "http://edit.br.fgov.be/synthesys/www/v1/sld");//added ftheeten 16/06/2010
?>
