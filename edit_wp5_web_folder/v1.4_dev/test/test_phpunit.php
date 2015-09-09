<?php
	require_once(dirname(__FILE__)."/"."test_rest_gen.php");	

	class TestRestServices extends PHPUnit_Framework_TestCase
	{
		public function testEastAfrica_RiftImageExists()
		{
			$this->assertFileEquals(do_testEastAfrica_Rift(), "the retrieved images is different as the expected one");
		}
		
		public function testEastAfrica_RiftImageEquals()
		{
			$this->assertFileEquals(dirname(__FILE__)."/images/"."EasternAfricaRift.png", do_testEastAfrica_Rift(), "the retrieved images is different as the expected one");
		}
	}

?>
