<?php
/**
 * Security Modules
 * Sanitizes SQL requests for injections and holds any block lists, etc. Voodoo. 
 * Currently does no voodoo - add your own to suit your needs.
 *
 * @version 	V1.0  15 October 2007
 * @author 		Tobin Bradley
 * @license 	http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package 	Security.inc
 */


/**
 * Sanitize SQL
 * Sanitize SQL statements for ';--' etc.
 * @param 		string	$sql	the SQL to be sanitized 
 * @return 		string			cleaned sql string
 */
function sanitizeSQL ($sql) {
	return $sql;
}

/**
 * Block List
 * This is the area to do white or block lists for security, implement a keycode, and related crap.
 */

?>