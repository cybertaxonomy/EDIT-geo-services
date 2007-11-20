function GoogleMapTools(){
this.zoomTo=function(model,point,deltaZoom){
gmap=model.getParam("gmap");
p=new GLatLng(point[1],point[0]);
z=gmap.getZoom();
gmap.setCenter(p,z+deltaZoom);
this.useGoogleMapExtent(model);
}
this.useGoogleMapExtent=function(model){
gmap=model.getParam("gmap");
bbox=gmap.getBounds();
swLng=bbox.getSouthWest().lng();
swLat=bbox.getSouthWest().lat();
neLng=bbox.getNorthEast().lng();
neLat=bbox.getNorthEast().lat();
if(swLng>neLng)swLng-=360;
if(swLat>neLat)swLat-=180;
model.setBoundingBox(new Array(swLng,swLat,neLng,neLat));
}
this.centerAndZoom=function(model){
this.centerAndZoomToBox(model,model.getBoundingBox());
}
this.setGmapExtent=function(model,bbox){
this.centerAndZoomToBox(model,bbox);
this.useGoogleMapExtent(model);
}
this.centerAndZoomToBox=function(model,bbox){
pxWidth=model.getWindowWidth();
pxHeight=model.getWindowHeight();
degWidth=Math.abs(bbox[2]-bbox[0]);
degHeight=Math.abs(bbox[3]-bbox[1]);
zoomLevel=this.getZoomLevel(pxWidth,degWidth);
gmap=model.getParam("gmap");
gmap.setCenter(
new GLatLng(
(bbox[3]+bbox[1])/2,
(bbox[2]+bbox[0])/2),
zoomLevel);
}
this.getZoomLevel=function(pxWidth,degWidth){
zoomLevel=Math.floor(Math.log(1.46025*pxWidth/degWidth)/Math.log(2));
return zoomLevel;
}
this.getPixelsFromLatLong=function(coords){
gmap=config.objects.gmap;
var west=gmap.getBounds().getSouthWest().lng();
var north=gmap.getBounds().getNorthEast().lat();
var nwpoint=gmap.getCurrentMapType().getProjection().fromLatLngToPixel(new GLatLng(north,west),gmap.getZoom()); 
var gLatLng=new GLatLng(coords[1],coords[0]); 
var pixel=gmap.getCurrentMapType().getProjection().fromLatLngToPixel(gLatLng,gmap.getZoom());
var x=pixel.x-nwpoint.x;
var y=pixel.y-nwpoint.y;
return new Array(x,y);
}
this.getLatLongFromPixels=function(coords){
gmap=config.objects.gmap;
var x=coords[0];
var y=coords[1];
neLat=gmap.getBounds().getNorthEast().lat();
neLng=gmap.getBounds().getSouthWest().lng();
var newPoint=gmap.getCurrentMapType().getProjection().fromPixelToLatLng(new GPoint(0,0),gmap.getZoom()); 
var gPoint=new GPoint(x,y);
var gLatLng=gmap.getCurrentMapType().getProjection().fromPixelToLatLng(gPoint,gmap.getZoom(),false);
var lat=gLatLng.lat()-newPoint.lat()-neLat;
var lng=gLatLng.lng()-newPoint.lng()-neLng;
return new Array(lng,lat);
}
}
