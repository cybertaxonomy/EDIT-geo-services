<?

session_start();
$sessionid=session_id();

   $conn = pg_connect("host=localhost port=5432 password=Edit3.dsa user=postgres dbname=gbif3");
if (pg_ErrorMessage($conn)) { 
	 echo "<p><b>Ocurrio un error conectando a la base de datos: .</b></p>"; 
	 }
	 
	 $usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='$sessionid'");
	//$usuario_result = pg_exec ($conn, "select usuario from user_table where session_data='l59r32286o4vcughufkb8hnm96'");
	$data = pg_fetch_array ($usuario_result, 0, PGSQL_NUM);
	$usuario=$data[0];

	 $borra_result=pg_exec("delete from test_csvimportgispoints2 where userid='".$usuario."'");
	 $borra_result2=pg_exec("delete from test_csvimportpk where userid='".$usuario."'");
	 $borra_result3=pg_exec("delete from user_table where usuario='".$usuario."'");
   	$vacuum=pg_exec("vacuum  analyze test_csvimportgispoints2");
	$vacuum2=pg_exec("vacuum analyze test_csvimportpk");
     
 ?>






