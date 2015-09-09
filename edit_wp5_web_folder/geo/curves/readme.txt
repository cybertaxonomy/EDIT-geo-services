REST Web Serivce Framework v1.1
Author: Tobin Bradley (tobin.bradley@gmail.com)
License: GNU GPL (http://www.gnu.org/copyleft/gpl.html)
Home Page: http://maps.co.mecklenburg.nc.us/ft/?page_id=223

Summary
The REST Web Service Framework is a PHP based web service framework designed to provide a series of spatial analysis web services via a PostgreSQL/PostGIS back end, as provide a framework for creating additional web services, both spatial and non-spatial. The included web services are fully documented and include services that will:

    * Perform attribute queries
    * Buffer points
    * Buffer features
    * Perform point overlays
    * Perform feature overlays
    * List layers
    * List fields
    * Get feature extents
    * Project coordinates

Output is user specified as part of the REST call and can be either XML, JSON, or JSONP. The code is released under the GNU GPL. You are free to use it and modify it as you wish. A readme file is included in the download.

Folder Layout
The documentation is in the docs folder, with a ws_template.htm template help document should you want to add your own services. It’s a pretty straight-forward format, with all of the styling done elsewhere. Just put a pointer to any new documentation in the navigation.htm file and you’re all set. You’ll find documentation is just as important as, and will probably take longer than, creating the actual REST web services.

The inc folder has some includes, with one you will have to change to get anywhere. The database.inc.php file holds database connections and has a connection set for PostgreSQL/PostGIS. You just need to put in your connection information and all of the web services will start working. For security reasons, you will want to use a Postgres login with read-only permission to the database tables. Also in there are includes for rendering XML or JSON (you can output either from the services), a security include, an error handler that can email you error information from the service if you go in and edit it with your SMTP server information, and the phpmailer and adodb libraries.

Now we get to the v1 folder, which holds the actual web services. The ‘1' designator is important. Once you roll out your services, you can almost never change them without breaking somebody’s stuff. If you have a service you want to change, put the changed service in a v2 folder, change your docs and point it there for the next projects that come along, and leave the v1 version alone. Messing about with established web services will spell doom for your service oriented architecture.

The script, style, and image folders are what they sound like. I’m using a little jQuery to load some of the documentation (party foul for gratuitous use of Javascript), and I’m using Blueprint CSS for basic styling. Nothing important there for web services - that’s all for the documentation.

That’s about it. There is nothing in the services that is database schema specific - you pass it the table names, fields, parameters, etc., that you want, so it should work for any PostGIS environment. There are examples in the documentation for connecting to the services from PHP, .NET, and jQuery, and in my organization there are people using VB 6 to connect to the services via the Internet Transfer Control. You specify the output you want for each request via the format option - XML or JSON - and the output format is consistent across the services.

Download
REST Web Services v1.1

Version History
1.1
Added JSONP capabilities to the json.inc.php json processor
Fixed a bug in the buffer code
1.0
Initial release



