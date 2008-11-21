<?

include('print/fpdf.php');
$bbox= $_GET['bbox'];
$legend= $_GET['legend'];
$edit_raster= $_GET['edit_raster'];
$edit_vectorial= $_GET['edit_vectorial'];
$edit_sld= $_GET['edit_sld'];

$format=$_GET['format'];
$remote_layers=$_GET['remote_layers'];

$url= "http://edit.csic.es/fitxers/images/pdf_images2.php?edit_vectorial=".$edit_vectorial."&edit_raster=".$edit_raster."&edit_sld=".$edit_sld."&format=".$format."&bbox=".$bbox;

if (!empty($remote_layers))
{
$url.="&remote_layers=".urlencode($remote_layers);
}

$pdf=new FPDF();
$pdf->AddPage("L");
$pdf->SetFont('Arial','B',9);
$pdf->Cell(47, 2,'', 0,1);
$pdf->Cell(3.5);
$pdf->Cell(147, 3.5,'EDIT Testing...', 1,1,'C');
$pdf->Cell(3.5);
$pdf->SetFont('Courier','B',12);
$pdf->Cell(47, 7.5,'It was done using EDIT MapViewer)', 0,1);
//$pdf->SetFont('Arial','B',14);
//$pdf->Cell(3.5);
//$pdf->SetFont('Arial','B',12);
$pdf->Cell(47,5," ".date("d.m.Y"), 0,1,'C');

//$pdf->Rect(13,39,(90+2),((90*(4/3))+2));

// (és "jpeg" EL NOM DEl LINK que hem creat a la imatge...
//$pdf->Image("windrose.png", 90, 3, 0, 14, "png");
//$pdf->SetFillColor(255, 255, 255);

$pdf->Cell(55, 1,'', 0,1);// Erste leere Zeile

switch ($format)
{
case "image/jpeg":
{
global $sld_legend;
global $url;
global $legend;

$sld_legend="http://edit3.csic.es/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/jpeg&WIDTH=25&HEIGHT=20&LAYER=topp:test_csvimportgispoints2&sld=".$legend;

$pdf->Image($url, 13, 39, 150 , 80, "jpeg");
//$pdf->Cell(190, 30,'Your legend', 0,2);
$pdf->Image($sld_legend, 190, 39, 30 , 70, "jpeg");
//$pdf->Cell(47, 0,'It was done using EDIT MapViewer)', 0,1);
$pdf->Output('download/SLD.pdf','F');
//this URL will be the src of the hidden iframe (check print.js). It will generate a new PDF to download
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=pdf";
break;
}
case "image/png":
{
global $legend;
global $url;
$sld_legend="http://edit3.csic.es/geoserver/wms/GetLegendGraphic?VERSION=1.0.0&FORMAT=image/jpeg&WIDTH=25&HEIGHT=20&LAYER=topp:test_csvimportgispoints2&sld=".$legend;
$pdf->Image($url, 13, 39, 150 , 80, "png");
$pdf->Image($sld_legend, 143, 39, 30 , 70, "jpeg");
$pdf->Output('download/SLD.pdf','F');
//this URL will be the src of the hidden iframe (check print.js). It will generate a new PDF to download
echo "http://edit.csic.es/fitxers/images/edit_images.php?format=pdf";
break;
}
/*
UNSUPPORTED IMAGE TYPE in fpdf
case "image/gif":
{
global $url;
global $sld_legend;
$pdf->Image($url, 13, 39, 160 , 80, "gif");
$pdf->Image($sld_legend, 80, 39, 50 , 90, "gif");
$pdf->Output('definitius_gif.pdf','F');
break;
}
*/
};

?>