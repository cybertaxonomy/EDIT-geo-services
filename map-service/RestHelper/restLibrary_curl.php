<?php
//require_once("restLibrary_curl.php");

//A)
//class doing the HTTP POST connection via cURL.
//3rd and 4th parameters of the contructor  are optional (define them only if here is a proxy between your server and the REST services)

 /**
 * backbone of the code based on "A sample class to read HTTP headers"
 * @author Geoffray Warnants - http://www.geoffray.be 
 *(lines added by F Theeten for POST and Proxy connection)
 */

 class HTTPReaderCURLEDIT {
 protected $_url = null;
 protected $_headers = array();
 protected $_body = '';

 public function __construct($url, $fields, $proxy_url='', $proxy_login='') 
 {
		 
	 $this->_url = curl_init($url);
	 curl_setopt($this->_url, CURLOPT_RETURNTRANSFER, true);
	 if(strlen($proxy_url)>0)
	 {
	 	curl_setopt($this->_url, CURLOPT_PROXY, $proxy_url);
	 }
	 if(strlen($proxy_login)>0)
	 {	
	    curl_setopt($this->_url, CURLOPT_PROXYUSERPWD, $proxy_login);
	 }
	    curl_setopt($this->_url, CURLOPT_HEADER, true);
	  	curl_setopt($this->_url, CURLOPT_POST, true);
	  	curl_setopt($this->_url, CURLOPT_POSTFIELDS, $fields);
	  	curl_setopt($this->_url, CURLOPT_HEADERFUNCTION, array($this, 'readHeaders'));

 }
 
 
 public function __destruct() {
 curl_close($this->_url);
 }
 
 // this must be called from outside function to do the connection
 public function getHeaders() {
 $this->_body = curl_exec($this->_url);
 return $this->_headers;
 }
 
 public function getBody() {
 return $this->_body;
 }
 
 protected function readHeaders($url, $str) {
 if (strlen($str) > 0) {
	 $this->_headers[] = $str;
 }

 return strlen($str);
 }
 }

//B
//function doing the connection and returning the result
function rest_helper($url, $params = null, $verb = 'GET', $format = 'json', $headerPOST='Content-type: application/x-www-form-urlencoded')
{

	//mention your proxy parameters there in 3rd and 4th position (if needed)  
	$myObj=new HTTPReaderCURLEDIT($url,$params);
	$myObj->getHeaders();
	$content = $myObj->getBody();
	$arrayContent=explode("\r\n\r\n", $content);
	
	if(count($arrayContent)>=2)
	{
		$res=$arrayContent[2];
			
		  switch ($format) {
		    case 'json':
		  
		    $r = json_decode($res);
		      if ($r === null) {
		        throw new Exception("failed to decode $res as json");
		      }
		 
		      return $r;
		
		    case 'xml':
		      $r = simplexml_load_string($res);
		      if ($r === null) {
		        throw new Exception("failed to decode $res as xml");
		      }
		      return $r;
		
			case 'raw':
				return $res;
			case 'jsontoarray':
						return json_decode($res);
		  }
		  	  return $res;
		  	  
	}	  	  
}

?>