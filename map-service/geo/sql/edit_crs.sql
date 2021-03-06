--
-- PostgreSQL database dump
--

SET client_encoding = 'UTF8';
SET standard_conforming_strings = off;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET escape_string_warning = off;

SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = true;

--
-- Name: edit_crs; Type: TABLE; Schema: public; Owner: postgres_user; Tablespace: 
--

CREATE TABLE edit_crs (
    area text NOT NULL,
    crs_type text,
    lat_lon text,
    proj_bbox text,
    name text,
    code integer
);


ALTER TABLE public.edit_crs OWNER TO postgres_user;

--
-- Data for Name: edit_crs; Type: TABLE DATA; Schema: public; Owner: postgres_user
--

INSERT INTO edit_crs VALUES ('South America', 'utm', '-84.0,0.0,-78.0,16.0', ' 166021.4431, 0.0000, 833978.5569, 1771254.0182', 'SIRGAS 2000 / UTM zone 17N', 31971);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-84.0,-10.4,-78.0,0.0', ' 166021.4431, 8848807.9368, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 17S', 31977);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-78.0,0.0,-72.0,11.5', ' 166021.4431, 0.0000, 833978.5569, 1272975.0968', 'SIRGAS 2000 / UTM zone 18N', 31972);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-78.0,-54.799999999999997,-72.0,0.0', ' 166021.4431, 3923337.2742, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 18S', 31978);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-72.0,0.0,-66.0,13.0', ' 166021.4431, 0.0000, 833978.5569, 1439053.7041', 'SIRGAS 2000 / UTM zone 19N', 31973);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-72.0,-56.149999999999999,-66.0,0.0', ' 166021.4431, 3773172.5039, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 19S', 31979);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-66.0,0.0,-60.0,11.199999999999999', ' 166021.4431, 0.0000, 833978.5569, 1239760.9081', 'SIRGAS 2000 / UTM zone 20N', 31974);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-66.0,-55.329999999999998,-60.0,0.0', ' 166021.4431, 3864386.5912, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 20S', 31980);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-60.0,0.0,-54.0,8.5600000000000005', ' 166021.4431, 0.0000, 833978.5569, 947495.4615', 'SIRGAS 2000 / UTM zone 21N', 31975);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-60.0,-38.899999999999999,-54.0,0.0', ' 166021.4431, 5690041.1137, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 21S', 31981);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-54.0,0.0,-48.0,5.75', ' 166021.4431, 0.0000, 833978.5569, 636441.3630', 'SIRGAS 2000 / UTM zone 22N', 31976);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-54.0,-34.600000000000001,-48.0,0.0', ' 166021.4431, 6167221.6843, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 22S', 31982);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-48.0,-26.300000000000001,-42.0,0.0', ' 166021.4431, 7087615.6178, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 23S', 31983);
INSERT INTO edit_crs VALUES ('South America', 'utm', '-42.0,-23.0,-36.0,0.0', ' 166021.4431, 7453332.3202, 833978.5569, 10000000.0000', 'SIRGAS 2000 / UTM zone 24S ', 31984);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-78.0,33.829999999999998,-72.0,83.200000000000003', ' 222357.2382, 3747355.8896, 777642.7618, 9239816.3278', 'NAD83 / UTM zone 18N', 26918);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-72.0,40.799999999999997,-66.0,83.200000000000003', ' 246917.1854, 4520887.0540, 753082.8146, 9239816.3278', 'NAD83 / UTM zone 19N', 26919);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-66.0,43.329999999999998,-60.0,83.0', ' 256780.9806, 4801833.2103, 743219.0194, 9217519.4415', 'NAD83 / UTM zone 20N', 26920);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-60.0,46.710000000000001,-54.0,55.5', ' 270698.2865, 5177309.8448, 729301.7135, 6154522.9130', 'NAD83 / UTM zone 21N', 26921);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-132.0,49.0,-126.0,71.0', ' 280586.2987, 5431792.8644, 719413.7013, 7880094.9205', 'NAD83 / UTM zone 9N', 26909);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-132.0,49.0,-126.0,71.0', ' 280586.2987, 5431792.8644, 719413.7013, 7880094.9205', 'NAD83 / UTM zone 9N', 26909);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-126.0,34.399999999999999,-120.0,77.0', ' 224215.8977, 3810589.9220, 775784.1023, 8548694.5500', 'NAD83 / UTM zone 10N', 26910);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-126.0,34.399999999999999,-120.0,77.0', ' 224215.8977, 3810589.9220, 775784.1023, 8548694.5500', 'NAD83 / UTM zone 10N', 26910);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-120.0,27.0,-114.0,78.329999999999998', ' 202273.9130, 2989975.9668, 797726.0870, 8696934.7173', 'NAD83 / UTM zone 11N', 26911);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-120.0,27.0,-114.0,78.329999999999998', ' 202273.9130, 2989975.9668, 797726.0870, 8696934.7173', 'NAD83 / UTM zone 11N', 26911);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-114.0,24.829999999999998,-108.0,79.25', ' 196765.3486, 2749459.8086, 803234.6514, 8799482.7282', 'NAD83 / UTM zone 12N', 26912);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-114.0,24.829999999999998,-108.0,79.25', ' 196765.3486, 2749459.8086, 803234.6514, 8799482.7282', 'NAD83 / UTM zone 12N', 26912);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-108.0,17.829999999999998,-102.0,80.099999999999994', ' 181990.3402, 1973928.4370, 818009.6598, 8894232.1322', 'NAD83 / UTM zone 13N', 26913);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-108.0,17.829999999999998,-102.0,80.099999999999994', ' 181990.3402, 1973928.4370, 818009.6598, 8894232.1322', 'NAD83 / UTM zone 13N', 26913);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-102.0,15.5,-96.0,81.0', ' 178112.3068, 1715882.9463, 821887.6932, 8994558.8477', 'NAD83 / UTM zone 14N', 26914);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-102.0,15.5,-96.0,81.0', ' 178112.3068, 1715882.9463, 821887.6932, 8994558.8477', 'NAD83 / UTM zone 14N', 26914);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-96.0,14.25,-90.0,82.0', ' 176250.0589, 1577463.0797, 823749.9411, 9106037.1690', 'NAD83 / UTM zone 15N', 26915);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-96.0,14.25,-90.0,82.0', ' 176250.0589, 1577463.0797, 823749.9411, 9106037.1690', 'NAD83 / UTM zone 15N', 26915);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-90.0,17.699999999999999,-84.0,82.5', ' 181760.0998, 1959529.9227, 818239.9002, 9161777.8414', 'NAD83 / UTM zone 16N', 26916);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-90.0,17.699999999999999,-84.0,82.5', ' 181760.0998, 1959529.9227, 818239.9002, 9161777.8414', 'NAD83 / UTM zone 16N', 26916);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-84.0,24.0,-78.0,83.0', ' 194772.8107, 2657478.7094, 805227.1893, 9217519.4415', 'NAD83 / UTM zone 17N', 26917);
INSERT INTO edit_crs VALUES ('North America', 'utm', '-84.0,24.0,-78.0,83.0', ' 194772.8107, 2657478.7094, 805227.1893, 9217519.4415', 'NAD83 / UTM zone 17N ', 26917);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '-18.0,0.0,-12.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 28N', 32628);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '-18.0,27.600000000000001,-12.0,60.0', ' 203860.0925, 3056530.4101, 796139.9075, 6655361.1880', 'UTM zone 28N', 23028);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '-12.0,36.149999999999999,-6.0,60.0', ' 230080.3265, 4004820.9359, 769919.6735, 6655361.1880', 'UTM zone 29N', 23029);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '-6.0,35.950000000000003,0.0,63.950000000000003', ' 229395.8528, 3982627.8377, 770604.1472, 7095075.2268', 'UTM zone 30N', 23030);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '0.0,38.600000000000001,6.0,67.0', ' 238730.0252, 4276730.7754, 761269.9748, 7434723.1222', 'UTM zone 31N', 23031);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '6.0,38.850000000000001,12.0,79.849999999999994', ' 239639.8447, 4304481.3362, 760360.1553, 8866626.5826', 'UTM zone 32N', 23032);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '12.0,35.5,18.0,80.049999999999997', ' 227867.8767, 3932695.3439, 772132.1233, 8888922.0027', 'UTM zone 33N', 23033);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '18.0,34.75,24.0,80.049999999999997', ' 225358.6605, 3849480.5700, 774641.3395, 8888922.0027', 'UTM zone 34N', 23034);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '24.0,34.75,30.0,80.049999999999997', ' 225358.6605, 3849480.5700, 774641.3395, 8888922.0027', 'UTM zone 35N', 23035);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '30.0,31.0,36.0,43.299999999999997', ' 213527.5672, 3433517.5368, 786472.4328, 4798588.2736', 'UTM zone 36N', 23036);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '36.0,35.829999999999998,42.0,43.299999999999997', ' 228986.7536, 3969312.2387, 771013.2464, 4798588.2736', 'UTM zone 37N', 23037);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '42.0,37.0,48.0,41.649999999999999', ' 233026.0015, 4099147.6709, 766973.9985, 4615347.4315', 'UTM zone 38N ', 23038);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '48.0,0.0,54.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 39N', 32639);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '54.0,0.0,60.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 40N', 32640);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '60.0,0.0,66.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 41N', 32641);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '66.0,0.0,72.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 42N', 32642);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '72.0,0.0,78.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 43N', 32643);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '78.0,0.0,84.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 44N', 32644);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '84.0,0.0,90.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 45N', 32645);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '90.0,0.0,96.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 46N', 32646);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '96.0,0.0,102.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 47N', 32647);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '102.0,0.0,108.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 48N', 32648);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '108.0,0.0,114.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 49N', 32649);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '114.0,0.0,120.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 50N', 32650);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '120.0,0.0,126.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 51N', 32651);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '126.0,0.0,132.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 52N', 32652);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '132.0,0.0,138.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 53N', 32653);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '138.0,0.0,144.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 54N', 32654);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '144.0,0.0,150.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 55N', 32655);
INSERT INTO edit_crs VALUES ('Asia', 'utm', '150.0,0.0,156.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 56N', 32656);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '-12.0,0.0,-6.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 29N', 32629);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '-12.0,0.0,-6.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 29N', 32629);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '-6.0,0.0,0.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 30N', 32630);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '-6.0,0.0,0.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 30N', 32630);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '0.0,0.0,6.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 31N', 32631);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '0.0,0.0,6.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 31N', 32631);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '6.0,0.0,12.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 32N', 32632);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '6.0,0.0,12.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 32N', 32632);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '6.0,-80.0,12.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 32S', 32732);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '12.0,0.0,18.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 33N', 32633);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '12.0,0.0,18.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 33N', 32633);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '12.0,-80.0,18.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 33S', 32733);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '18.0,0.0,24.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 34N', 32634);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '18.0,0.0,24.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 34N', 32634);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '18.0,-80.0,24.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 34S', 32734);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '24.0,0.0,30.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 35N', 32635);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '24.0,0.0,30.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 35N', 32635);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '24.0,-80.0,30.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 35S', 32735);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '30.0,0.0,36.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 36N', 32636);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '30.0,0.0,36.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 36N', 32636);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '30.0,-80.0,36.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 36S', 32736);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '36.0,0.0,42.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 37N', 32637);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '36.0,0.0,42.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 37N', 32637);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '36.0,-80.0,42.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 37S', 32737);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '42.0,0.0,48.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 38N', 32638);
INSERT INTO edit_crs VALUES ('Europe', 'utm', '42.0,0.0,48.0,84.0', ' 166021.4431, 0.0000, 833978.5569, 9329005.1825', 'UTM zone 38N', 32638);
INSERT INTO edit_crs VALUES ('Africa', 'utm', '42.0,-80.0,48.0,0.0', ' 166021.4431, 1116915.0440, 833978.5569, 10000000.0000', 'UTM zone 38S', 32738);
INSERT INTO edit_crs VALUES ('North America', 'Lambert Equal Area', '-66.019999999999996,15.32,168.33000000000001,74.790000000000006', ' -8040784.5135, -2577524.9210, 3668901.4484, 4785105.1096', ' US National Atlas Equal Area', 2163);
INSERT INTO edit_crs VALUES ('North America', 'Lambert Equal Area', '-66.019999999999996,15.32,168.33000000000001,74.790000000000006', ' -8040784.5135, -2577524.9210, 3668901.4484, 4785105.1096', ' US National Atlas Equal Area', 2163);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-129.99000000000001,51.350000000000001,172.40000000000001,71.349999999999994', ' -7401605.9114, 1476348.1002, 5402130.8135, 8782951.2026', ' Alaska Albers', 2964);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-129.99000000000001,51.350000000000001,172.40000000000001,71.349999999999994', ' -7401605.9114, 1476348.1002, 5402130.8135, 8782951.2026', ' Alaska Albers', 2964);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-139.05000000000001,48.299999999999997,-114.03,60.0', ' 35043.6538, 440006.8768, 1885895.3117, 1735643.8497', ' British Columbia Albers', 3005);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-139.05000000000001,48.299999999999997,-114.03,60.0', ' 35043.6538, 440006.8768, 1885895.3117, 1735643.8497', ' British Columbia Albers', 3005);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-10.67,34.5,31.550000000000001,71.049999999999997', ' 2426378.0132, 1528101.2618, 6293974.6215, 5446513.5222', ' ETRS89 / ETRS-LAEA', 3035);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-10.67,34.5,31.550000000000001,71.049999999999997', ' 2426378.0132, 1528101.2618, 6293974.6215, 5446513.5222', ' ETRS89 / ETRS-LAEA', 3035);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-106.63,25.829999999999998,-93.510000000000005,36.5', ' 834201.3127, 6876876.0013, 2151755.8814, 8059431.4713', ' Texas Centric Albers Equal Area', 3083);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-106.63,25.829999999999998,-93.510000000000005,36.5', ' 834201.3127, 6876876.0013, 2151755.8814, 8059431.4713', ' Texas Centric Albers Equal Area', 3083);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-106.63,25.829999999999998,-93.510000000000005,36.5', ' 834201.3127, 6876876.0013, 2151755.8814, 8059431.4713', ' Texas Centric Albers Equal Area', 3085);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-106.63,25.829999999999998,-93.510000000000005,36.5', ' 834201.3127, 6876876.0013, 2151755.8814, 8059431.4713', ' Texas Centric Albers Equal Area', 3085);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-87.640000000000001,24.43,-80.019999999999996,31.0', ' 31083.3054, 53083.4785, 803364.4915, 782982.7933', ' Florida GDL Albers', 3086);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-87.640000000000001,24.43,-80.019999999999996,31.0', ' 31083.3054, 53083.4785, 803364.4915, 782982.7933', ' Florida GDL Albers', 3086);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-87.640000000000001,24.43,-80.019999999999996,31.0', ' 31083.3054, 53083.4785, 803364.4915, 782982.7933', ' Florida GDL Albers', 3087);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-87.640000000000001,24.43,-80.019999999999996,31.0', ' 31083.3054, 53083.4785, 803364.4915, 782982.7933', ' Florida GDL Albers', 3087);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-139.05000000000001,48.299999999999997,-114.03,60.0', ' 35043.6538, 440006.8768, 1885895.3117, 1735643.8497', ' BC Albers', 3153);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-139.05000000000001,48.299999999999997,-114.03,60.0', ' 35043.6538, 440006.8768, 1885895.3117, 1735643.8497', ' BC Albers', 3153);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-93.209999999999994,40.399999999999999,-74.5,50.740000000000002', ' 256770.6700, 466013.4226, 1844782.3430, 1618810.9375', ' Great Lakes Albers', 3174);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-93.209999999999994,40.399999999999999,-74.5,50.740000000000002', ' 256770.6700, 466013.4226, 1844782.3430, 1618810.9375', ' Great Lakes Albers', 3174);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-93.209999999999994,40.399999999999999,-73.290000000000006,50.740000000000002', ' 154760.2844, 477914.4184, 1845007.9063, 1618858.3184', ' Great Lakes and St Lawrence Albers', 3175);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-93.209999999999994,40.399999999999999,-73.290000000000006,50.740000000000002', ' 154760.2844, 477914.4184, 1845007.9063, 1618858.3184', ' Great Lakes and St Lawrence Albers', 3175);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415897.0535, -601758.5526, 552181.0547, 457319.2271', ' California Albers', 3309);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415897.0535, -601758.5526, 552181.0547, 457319.2271', ' California Albers', 3309);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415888.0930, -601592.7037, 552169.1580, 457509.0195', ' California Albers', 3310);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415888.0930, -601592.7037, 552169.1580, 457509.0195', ' California Albers', 3310);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415888.0930, -601592.7037, 552169.1580, 457509.0195', ' California Albers', 3311);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415888.0930, -601592.7037, 552169.1580, 457509.0195', ' California Albers', 3311);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-129.99000000000001,51.350000000000001,172.40000000000001,71.349999999999994', ' -2255938.4795, 449981.1884, 1646517.6368, 2676986.5642', ' Alaska Albers', 3338);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-129.99000000000001,51.350000000000001,172.40000000000001,71.349999999999994', ' -2255938.4795, 449981.1884, 1646517.6368, 2676986.5642', ' Alaska Albers', 3338);
INSERT INTO edit_crs VALUES (' World', 'Lambert Equal Area', '-180.0,0.0,180.0,90.0', ' -0.0000, 0.0000, 0.0000, 9010277.0466', ' NSIDC EASE-Grid North', 3408);
INSERT INTO edit_crs VALUES (' World', 'Lambert Equal Area', '-180.0,0.0,180.0,90.0', ' -0.0000, 0.0000, 0.0000, 9010277.0466', ' NSIDC EASE-Grid North', 3408);
INSERT INTO edit_crs VALUES (' World', 'Lambert Equal Area', '-180.0,-90.0,180.0,0.0', ' -0.0000, -9010277.0466, 0.0000, -0.0000', ' NSIDC EASE-Grid South', 3409);
INSERT INTO edit_crs VALUES (' World', 'Lambert Equal Area', '-180.0,-90.0,180.0,0.0', ' -0.0000, -9010277.0466, 0.0000, -0.0000', ' NSIDC EASE-Grid South', 3409);
INSERT INTO edit_crs VALUES (' World', 'Lambert Equal Area', '-180.0,-86.0,180.0,86.0', ' Gridding and small scale and digital mapping for environmental sciences, including EASE-Grid, in mid- and low latitudes.', ' NSIDC EASE-Grid Global', 3410);
INSERT INTO edit_crs VALUES (' World', 'Lambert Equal Area', '-180.0,-86.0,180.0,86.0', ' Gridding and small scale and digital mapping for environmental sciences, including EASE-Grid, in mid- and low latitudes.', ' NSIDC EASE-Grid Global', 3410);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-129.99000000000001,51.350000000000001,172.40000000000001,71.349999999999994', ' -2255938.4795, 449981.1884, 1646517.6368, 2676986.5642', ' NAD83(NSRS2007) / Alaska Albers', 3467);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-129.99000000000001,51.350000000000001,172.40000000000001,71.349999999999994', ' -2255938.4795, 449981.1884, 1646517.6368, 2676986.5642', ' NAD83(NSRS2007) / Alaska Albers', 3467);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415888.0930, -601592.7037, 552169.1580, 457509.0195', ' NAD83(NSRS2007) / California Albers', 3488);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-124.42,32.509999999999998,-114.13,42.0', ' -415888.0930, -601592.7037, 552169.1580, 457509.0195', ' NAD83(NSRS2007) / California Albers', 3488);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-87.640000000000001,24.43,-80.019999999999996,31.0', ' 31083.3054, 53083.4785, 803364.4915, 782982.7933', ' NAD83(NSRS2007) / Florida GDL Albers', 3513);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-87.640000000000001,24.43,-80.019999999999996,31.0', ' 31083.3054, 53083.4785, 803364.4915, 782982.7933', ' NAD83(NSRS2007) / Florida GDL Albers', 3513);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -0.0000, -4889334.8030, 0.0000, 0.0000', ' WGS 84 / North Pole LAEA Bering Sea', 3571);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -0.0000, -4889334.8030, 0.0000, 0.0000', ' WGS 84 / North Pole LAEA Bering Sea', 3571);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -2444667.4015, -4234288.1470, 0.0000, 0.0000', ' WGS 84 / North Pole LAEA Alaska', 3572);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -2444667.4015, -4234288.1470, 0.0000, 0.0000', ' WGS 84 / North Pole LAEA Alaska', 3572);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -4815054.8210, -849024.0785, 0.0000, 0.0000', ' WGS 84 / North Pole LAEA Canada', 3573);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -4815054.8210, -849024.0785, 0.0000, 0.0000', ' WGS 84 / North Pole LAEA Canada', 3573);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -3142803.8309, 0.0000, 0.0000, 3745447.7564', ' WGS 84 / North Pole LAEA Atlantic', 3574);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' -3142803.8309, 0.0000, 0.0000, 3745447.7564', ' WGS 84 / North Pole LAEA Atlantic', 3574);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' 0.0000, 0.0000, 849024.0785, 4815054.8210', ' WGS 84 / North Pole LAEA Europe', 3575);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' 0.0000, 0.0000, 849024.0785, 4815054.8210', ' WGS 84 / North Pole LAEA Europe', 3575);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' 0.0000, -0.0000, 4889334.8030, 0.0000', ' WGS 84 / North Pole LAEA Russia', 3576);
INSERT INTO edit_crs VALUES (' North Pole', 'Lambert Equal Area', '-180.0,45.0,180.0,90.0', ' 0.0000, -0.0000, 4889334.8030, 0.0000', ' WGS 84 / North Pole LAEA Russia', 3576);
INSERT INTO edit_crs VALUES (' Oceania', 'Lambert Equal Area', '108.0,-45.0,155.0,-10.0', ' -2690013.3995, -5098960.4467, 2579169.8548, -1281018.4757', ' GDA94 / Australian Albers', 3577);
INSERT INTO edit_crs VALUES (' Oceania', 'Lambert Equal Area', '108.0,-45.0,155.0,-10.0', ' -2690013.3995, -5098960.4467, 2579169.8548, -1281018.4757', ' GDA94 / Australian Albers', 3577);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-141.0,60.0,-123.81999999999999,69.650000000000006', ' 26301.4186, 642942.0344, 983667.7511, 1710455.0365', ' NAD83 / Yukon Albers', 3578);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-141.0,60.0,-123.81999999999999,69.650000000000006', ' 26301.4186, 642942.0344, 983667.7511, 1710455.0365', ' NAD83 / Yukon Albers', 3578);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-141.0,60.0,-123.81999999999999,69.650000000000006', ' 26301.4186, 642942.0344, 983667.7511, 1710455.0365', ' NAD83(CSRS) / Yukon Albers', 3579);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-141.0,60.0,-123.81999999999999,69.650000000000006', ' 26301.4186, 642942.0344, 983667.7511, 1710455.0365', ' NAD83(CSRS) / Yukon Albers', 3579);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-106.63,25.829999999999998,-93.510000000000005,36.5', ' 834201.3127, 6876876.0013, 2151755.8814, 8059431.4713', ' NAD83(NSRS2007) / Texas Centric Albers Equal Area ', 3665);
INSERT INTO edit_crs VALUES (' North America', 'Lambert Equal Area', '-106.63,25.829999999999998,-93.510000000000005,36.5', ' 834201.3127, 6876876.0013, 2151755.8814, 8059431.4713', ' NAD83(NSRS2007) / Texas Centric Albers Equal Area ', 3665);


--
-- PostgreSQL database dump complete
--

