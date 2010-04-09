<?php include('getGbifStats.php') ?>
    <div id="stats" class="panel" title="Stats">
       	<h2>Occurrences per country</h2>
        <fieldset>
        	<div class="textRow"><p>
        	<img src="<?php echo(ocurrencesPerCountry()); ?>" \>
            </p>
            <p><span class="style1">Scrapped from <a href="http://www.gbif.org/DataProviders/totalslist?sortby=records">http://www.gbif.org/DataProviders/totalslist?sortby=records</a></span></p>
            </div>
      </fieldset>
      
            	<h2>...per collection</h2>
        <fieldset>
        	<div class="textRow"><p>
            <img src="<?php echo(ocurrencesPerCountry()); ?>" \></p>
            <p><span class="style1">Scrapped from <a href="http://www.gbif.org/DataProviders/totalslist?sortby=records">http://www.gbif.org/DataProviders/totalslist?sortby=records</a></span></p>
            </div>
      </fieldset>
      
                  	<h2>...per provider</h2>
        <fieldset>
        	<div class="textRow"><p>
            <img src="<?php echo(ocurrencesPerCountry()); ?>" \></p>
            <p><span class="style1">Scrapped from <a href="http://www.gbif.org/DataProviders/totalslist?sortby=records">http://www.gbif.org/DataProviders/totalslist?sortby=records</a></span></p>
            </div>
      </fieldset>
        
    </div>
