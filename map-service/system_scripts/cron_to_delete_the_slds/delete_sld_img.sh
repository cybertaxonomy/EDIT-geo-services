#!/bin/sh
find /var/www/synthesys/www/v1/sld /var/www/synthesys/www/v1/img /var/www/synthesys/www/v1.4/sld /var/www/synthesys/www/v1.4/img -type f -mtime +1 -exec rm {} + 
