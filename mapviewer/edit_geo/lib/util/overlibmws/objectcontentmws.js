function OLobjectContent(data,width,height,name){
return('<object data="'+data+'" width="'+width+'" height="'+height+'"'
+(name?' name="'+name+'" id="'+name+'"':'')+' type="text/html">'
+'<div>[object not supported]</div></object>');
}
