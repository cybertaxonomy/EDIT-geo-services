function vpos_convert(d){if(d==0){d=LEFT;}else{if(d==1){d=RIGHT;}else{d=CENTER;}}return d;}
function dts(d,text){o3_hpos=vpos_convert(d);overlib(text,o3_hpos,CAPTION,"");}
function dtc(d,text,title){o3_hpos=vpos_convert(d);overlib(text,CAPTION,title,o3_hpos);}
function stc(d,text,title){o3_hpos=vpos_convert(d);overlib(text,CAPTION,title,o3_hpos,STICKY);}
function drs(text){dts(1,text);}
function drc(text,title){dtc(1,text,title);}
function src(text,title){stc(1,text,title);}
function dls(text){dts(0,text);}
function dlc(text,title){dtc(0,text,title);}
function slc(text,title){stc(0,text,title);}
function dcs(text){dts(2,text);}
function dcc(text,title){dtc(2,text,title);}
function scc(text,title){stc(2,text,title);}
