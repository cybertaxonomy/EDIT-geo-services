<?php
/**
 * Recordset to XML
 * Accepts and ADODB recordset, converts it to XML, and returns the result.
 *
 * @param 		object 		$rs 		record set object
 * @return 		string		$xml		resulting xml
 * @version 	v1.0  15 October 2007
 * @author 		Tobin Bradley
 * @license 	http://opensource.org/licenses/gpl-license.php GNU Public License
 * @package 	xml.inc.php
 */

function rs2xml($rs)
{
	if (!$rs) {
		trigger_error("Caught Exception: bad recordset passed to rs2xml function.", E_USER_ERROR);
		return false;
	}

	$xml = '';
	$totalRows = 0;

	$totalRows = $rs->numrows();
		
	$domxml = new DOMDocument('1.0', 'utf-8');
	$root = $domxml->appendChild($domxml->createElement('rows'));
	$root->setAttribute('total-rows', $totalRows);
	
	$row_count = 1;
	while($line = $rs->fetchRow())
	{
		$row = $root->appendChild($domxml->createElement('row'));

		foreach ($line as $col_key => $col_val)
		{
			$col = $row->appendChild($domxml->createElement('column'));
			$col->setAttribute('name', strtolower($col_key));
			$col->appendChild($domxml->createTextNode(trim($col_val)));
		}
		$row_count++;	
	}	
	$domxml->formatOutput = true;
	$xml = $domxml->saveXML();
	$domxml = null;	

	return $xml;		
}


?>
