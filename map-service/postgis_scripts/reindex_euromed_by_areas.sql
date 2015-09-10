UPDATE euromed_2013 SET gid=subquery.gidtmp from ( SELECT ( SELECT count(*) + 1
           FROM euromed_2013 b
          WHERE st_area(b.the_geom) < st_area(a.the_geom)) AS gidtmp, gid, a.emarea, a.emlevel, a.parent, a.the_geom
   FROM euromed_2013 a) as subquery where euromed_2013.gid=subquery.gid;