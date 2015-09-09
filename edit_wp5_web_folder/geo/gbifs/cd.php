<?php
$countryName = $_REQUEST['name'];
$countryId = $_REQUEST['id'];


?>

<div class="panel" title="<?php echo($countryName) ?>">
    <h2><img src="http://data.gbif.org/images/flags/<?php echo(strtolower($countryId)); ?>.gif" /><?php echo($countryName) ?> (<?php echo($countryId) ?>)</h2>
    <fieldset>
      	<div class="row">
            <label>Occurrences: <span class="notbold">1,505,679 records</span></label>
          </div>
        	<div class="row">
              <label>Georeferenced: <span class="notbold">505,679 records</span></label>
            </div>
    </fieldset>
    
    <h2>Occurrences map</h2>
    <fieldset>
        <div class="textRow">
            <p><img src="http://geoserver.gbif.org/wms?bbox=-180,-90,180,90&styles=,&Format=image/png&request=GetMap&layers=gbif:countries,gbif:gbifDensityLayer&width=300&height=163&srs=EPSG:4326&FILTER=(%20)(%3CFilter%3E%3CAnd%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Etype%3C/PropertyName%3E%3CLiteral%3E2%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3CPropertyIsEqualTo%3E%3CPropertyName%3Econcept%3C/PropertyName%3E%3CLiteral%3E<?php echo($countryId); ?>%3C/Literal%3E%3C/PropertyIsEqualTo%3E%3C/And%3E%3C/Filter%3E)&bgcolor=0x7391AD" /></p>
        </div>
    </fieldset>
</div>