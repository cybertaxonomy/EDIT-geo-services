<?php
/**
 * Database Include
 * Handles all database functions required by the REST web services.
 *
 * @version 	v1.0  15 October 2007
 * @author 		Tobin Bradley
 * @license 	http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package 	database.inc.php
 */

# Note: Change line 23 to your PostgreSQL/PostGIS Server. 



/**
 * Return postgres data connection
 * @return 		object		- adodb data connection
 *
 * Note! Change $conn->PConnect to your PostgreSQL/PostGIS server. The format is (<server>,<user name>,<passoword>,<database>).
 */
function pgConnection() {
	require_once("adodb5/adodb.inc.php");
	$conn = ADONewConnection('postgres8'); 
	$conn->PConnect('localhost','postgres','Edit3.dsa','gbif3');
	$conn->SetFetchMode(ADODB_FETCH_ASSOC);
	return $conn;
}


?>