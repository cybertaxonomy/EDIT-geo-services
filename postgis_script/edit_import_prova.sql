/*
This is the original plpgsql from Franck Teethen (Royal Museum of Central Africa) modified by Pere Roca in order to:

*/
/*1) Table "test_csvimportpk" (main data table)

This table contains 50 columns + fields for the user making the importation and the date of importation at the end

This is the original plpgsql from Franck Teethen (Royal Museum of Central Africa) modified by Pere Roca in order to:

-allow the insertion of userid in test_csvimportpk (user data)( userid is used later as a filter to test_csvimportgistpoints2)
-field3 and field04 from test_csviportpk will (should) be Genus,Specie in test_csvimportgispoints2
*/
 CREATE TABLE test_csvimportpk
 (
  pk serial NOT NULL,
  field01 character varying,
  field02 character varying,
  field03 character varying,
  field04 character varying,
  field05 character varying,
  field06 character varying,
  field07 character varying,
  field08 character varying,
  field09 character varying,
  field10 character varying,
  field11 character varying,
  field12 character varying,
  field13 character varying,
  field14 character varying,
  field15 character varying,
  field16 character varying,
  field17 character varying,
  field18 character varying,
  field19 character varying,
  field20 character varying,
  field21 character varying,
  field22 character varying,
  field23 character varying,
  field24 character varying,
  field25 character varying,
  field26 character varying,
  field27 character varying,
  field28 character varying,
  field29 character varying,
  field30 character varying,
  field31 character varying,
  field32 character varying,
  field33 character varying,
  field34 character varying,
  field35 character varying,
  field36 character varying,
  field37 character varying,
  field38 character varying,
  field39 character varying,
  field40 character varying,
  field41 character varying,
  field42 character varying,
  field43 character varying,
  field44 character varying,
  field45 character varying,
  field46 character varying,
  field47 character varying,
  field48 character varying,
  field49 character varying,
  field50 character varying,
  userid character varying,
  importationdate timestamp without time zone,
  CONSTRAINT test_csvimportpk_pk PRIMARY KEY (pk)
 ) 
 WITH OIDS;
 ALTER TABLE test_csvimportpk OWNER TO postgres;


--2) Table test_"csvimportgispoints2" 
--(table containing the geometry field, genus,specie,userid and codigo (code; this field will be updated
--and used on later point-in-polygon operations), all referencing "test_csvimportpk")

CREATE TABLE test_csvimportgispoints2
(
  pk serial NOT NULL,
  fk_toimportpk integer,
  the_geom geometry,
  genus character varying,
  specie character varying,
  userid character varying,
  codigo character varying
)
WITH OIDS;
ALTER TABLE test_csvimportgispoints2 OWNER TO postgres;

 
--3) sequences for the primary keys of the 2 tables
 
 --uncomment these lines if sequence is not automatically made by the serial data type,  or made by another name
 --CREATE SEQUENCE test_csvimportgispoints_pk_seq
 --  INCREMENT 1
 --  MINVALUE 1
 --  MAXVALUE 9223372036854775807
 --  START 1
 --  CACHE 1;
 --ALTER TABLE test_csvimportgispoints_pk_seq OWNER TO postgres;
  
 
 --CREATE SEQUENCE test_csvimportpk_pk_seq
 --  INCREMENT 1
 --  MINVALUE 1
 --  MAXVALUE 9223372036854775807
 --  START 1
 --  CACHE 1;
 --ALTER TABLE test_csvimportpk_pk_seq OWNER TO postgres;
 
--4) Script of the pl/pgsql function
  
CREATE OR REPLACE FUNCTION edit_import_prova(filename character varying, nbcolumns integer, positionx integer, positiony integer, datumid integer, csvdelimiter character varying, userid character varying, currentdate timestamp with time zone)
  RETURNS integer AS
$BODY$
/*author: franck theeten 16/09/2007*/
DECLARE
--version with user code
 --flag for returned value
 returnedint int;
 --for loop counting columns in the source document
 currentCol int;
 --to append a leading0 to column name when number of columns is below 10
 currentColStr varchar;
 --statement which creae a temporary SQL table
 createtabstr varchar;
 --statement which replicates values from the temporary table to 'test_csvImport' (part 1)
 tmpcolsinsert varchar;
 --statement which replicates values from the temporary table to 'test_csvImport' (part 2)
 tmpvalsinsert varchar;
 --statement which replicates values from the temporary table to 'test_csvImport' (part 3)
 inserttabstr varchar;
 --statement which COPY the csv into the temporary table
 copytabstr varchar;
 --statement which DROP the destination table
 droptabstr varchar;
 
 --statement which replicates vlues from the temporary table to 'test_csvImportGISPoint' (part 1)
 tmpcolsGISinsert varchar;
 --statement which replicates vlues from the temporary table to 'test_csvImportGISPoint' (part 2)
 tmpvalsGISinsert varchar;
 --statement which replicates vlues from the temporary table to 'test_csvImportGISPoint' (part 3)
 insertGIStabstr varchar;
 --name of the column containing the x (longitude)
 xgiscol varchar;
 --name of the column containing the y (latitude)
 ygiscol varchar; 
 
 
BEGIN
 
 returnedint:=0;
 --intialize loop on columns
 currentCol:=1;
 
 --create dynamically temporary table (with  as much columns as the original CSV)
 tmpcolsinsert:='';
 tmpvalsinsert:='';
 createtabstr:='CREATE TABLE tmp_import (';
 
 LOOP
  --exit loop when all columns browsed
  IF currentCol>nbcolumns THEN
   EXIT;
  END IF;
   IF currentcol>1 then
   --comma for CREATE TABLE (col1,col2 , etc...
   createtabstr:= createtabstr||', ';
   --comma fr temporary insert statement -'column' part
   tmpcolsinsert:=tmpcolsinsert||', ';
   --comma for temporary insert statement - SELECT col1, col2 part..
   tmpvalsinsert:=tmpvalsinsert||', ';
   END IF;
   --add leading O in coluln name when column index <0: '1'->'01'
   currentColStr:=TRIM(both from currentCol::varchar);
   IF currentcol<10 THEN
    currentColStr:='0'||currentColStr;
   END IF;
   --CREATE TABLE
   createtabstr:= createtabstr||' tmpcol'||currentColStr||' varchar';
   --INSERT statement: INSERT INTO test_csvimport (col1, col2, etc...)
   tmpcolsinsert:=tmpcolsinsert||' field'||currentColStr;
   --INSERT STATEMENT: INSERT INTO test_csvimport ... SELECT col1, col2, etc... FROM tmp_import;
   tmpvalsinsert:=tmpvalsinsert||' tmpcol'||currentColStr;   
   
   --capturing column name for X Y Fields (from 'test_csvImport'!)
   IF currentCol=positionx THEN
    xgiscol:='field'||currentColStr;
   END IF;
   IF currentCol=positiony THEN
    ygiscol:='field'||currentColStr;
   END IF;
 
   --increment for loop
   currentCol:=currentCol+1;
 END LOOP;
 ----Last column is for usercode
 --currentColStr:=TRIM(both from currentCol::varchar);
 --IF currentcol<10 THEN
 -- currentColStr:='0'||currentColStr;
 --END IF;
 --tmpcolsinsert:=tmpcolsinsert||', field'||currentColStr;
 ----value for user code
 --tmpvalsinsert:=tmpvalsinsert||', '''||usercode||'''';   
 
 --terminate SQL statement for creation of temporary table
 createtabstr:= createtabstr||');';
 --SQL statement for copying the CSV;
 copytabstr:='COPY tmp_import FROM E'''||filename||''' WITH CSV HEADER ';
 --IF csvdelimiter!=',' THEN
  copytabstr:=copytabstr||' DELIMITER AS '''||csvdelimiter||'''';
 --END IF;
 copytabstr:=copytabstr||';';
 --replace '\' by 'E\' (for the escape of slashes in filepath)
copytabstr=REPLACE(copytabstr, E'\\', E'\\\\');
 
 --SQL statement copying the temorary table to test_csvimport
 inserttabstr:='INSERT INTO test_csvimportpk (pk, '||tmpcolsinsert||', userid, importationdate) SELECT nextval(''test_csvimportpk_pk_seq''), '||tmpvalsinsert||', '''||userid::varchar||''', '''||currentdate||''' FROM tmp_import;';

 
//userid as a filter!
 insertGIStabstr:='INSERT INTO test_csvimportgispoints2 (pk, fk_toimportpk,the_geom,genus, specie,userid) SELECT nextval(''test_csvimportgispoints2_pk_seq''), pk,  POINTFROMTEXT(''POINT(''||'||xgiscol||'||'' ''||'||ygiscol||'||'')'','||datumid::varchar||' ),field03,field04,userid FROM test_csvimportpk where userid='''||userid::varchar||''';';

 --SQL statemet dropping the temporary table 
 droptabstr:= 'DROP TABLE tmp_import;';
 
 
   --create temp table
   EXECUTE createtabstr;
   --copy CSV into temp table
   EXECUTE copytabstr;
   --copy temp table into test_csvImport
   EXECUTE inserttabstr;
   --copy points into gis table
   EXECUTE insertGIStabstr;
   --drop teemporary table
   EXECUTE droptabstr;
 
 RETURN returnedint;
 
END;
$BODY$
  LANGUAGE 'plpgsql' VOLATILE;
ALTER FUNCTION edit_import_prova(character varying, integer, integer, integer, integer, character varying, character varying, timestamp with time zone) OWNER TO postgres;