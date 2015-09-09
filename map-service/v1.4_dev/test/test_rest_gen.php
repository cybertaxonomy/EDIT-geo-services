<?php

error_reporting(0);

require_once(dirname(__FILE__)."/"."../path_index.php");
require_once(dirname(__FILE__)."/"."../function_lib_rest_dev_full.php");



fct_rest_gen(
$_SERVER["REQUEST_URI"],
NULL,
"background_gis:y,tdwg3:x",
"vmap0_afsa_elev_contour_ls:f_code:z:%||vmap0_afsa_hydro_inland_water_prm_only_a:nam:w:%||tdwg3:x_nf:%",
"a:000000|y:FFFFFF|z:D0D0D0,D0D0D0|x:,000000|x_nf:FF000000,000000|w:FFFFFF,FFFFFF",
"500,500",
"29,-13,31,8",
"1:-2.5,29.25|-2.43333333333333,29.2333333333333|0.35,29.7833333333333|-3.05,28.4333333333333|-2.95,28.8166666666667|-2.25,28.6833333333333|-2.38333333333333,28.6666666666667|-1.4,29.6|-3.6,29.5|-3.0,29.55|-3.95,29.6166666666667",
"1:c/ffffff/10/noLabel",
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL,
NULL
);



?>
