<?php

function do_post_request($url, $data, $optional_headers = null)
{
  $params = array('http' => array(
              'method' => 'POST',
              'content' => $data
            ));
  if ($optional_headers !== null) {
    $params['http']['header'] = $optional_headers;
  }
  $ctx = stream_context_create($params);
  $fp = @fopen($url, 'rb', false, $ctx);
  if (!$fp) {
    throw new Exception("Problem with $url, $php_errormsg");
  }
  $response = @stream_get_contents($fp);
  if ($response === false) {
    throw new Exception("Problem reading data from $url, $php_errormsg");
  }
  return $response;
}


function rest_helper($url, $params = null, $verb = 'GET', $format = 'json', $headerPOST='Content-type: application/x-www-form-urlencoded')
{
  $cparams = array(
    'http' => array(
      'method' => $verb,
      'ignore_errors' => true,
    )
  );
  if ($params !== null) {
    $params = http_build_query($params);
    if ($verb == 'POST') {
	  $cparams['http']['header'] = $headerPOST;
      $cparams['http']['content'] = $params;
    } else {
      $url .= '?' . $params;
    }
  }

  $context = stream_context_create($cparams);
  $fp = fopen($url, 'rb', false, $context);
  if (!$fp) {
    $res = false;
  } else {
    // If you're trying to troubleshoot problems, try uncommenting the
    // next two lines; it will show you the HTTP response headers across
    // all the redirects:
    // $meta = stream_get_meta_data($fp);
    // var_dump($meta['wrapper_data']);
    $res = stream_get_contents($fp);
    //print(fgets($fp));
  }

  if ($res === false) {
    throw new Exception("$verb $url failed: $php_errormsg");
  }

  switch ($format) {
    case 'json':
    	//print('json');  
    	//print($res);
    $r = json_decode($res);
      if ($r === null) {
        throw new Exception("failed to decode $res as json");
      }
      //print('display json');
      //print_r($r);
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
		//print_r($res);
		return json_decode($res);
  }
  return $res;
}



?>