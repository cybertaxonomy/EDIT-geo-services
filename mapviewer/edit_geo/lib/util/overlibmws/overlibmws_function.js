OLloaded=0;
OLregCmds('function');
if(OLud('function'))var ol_function=null;
var o3_function=null;
function OLloadFunction(){
OLload('function');
}
function OLparseFunction(pf,i,ar){
var k=i,v=null;
if(k<ar.length){
if(ar[k]==FUNCTION){if(pf=='ol_'){if(typeof ar[k+1]!='number'){v=ar[++k];
ol_function=(typeof v=='function'?v:null);}}
else{OLudf=0;v=null;if(typeof ar[k+1]!='number')v=ar[++k];OLoptFUNCTION(v);}return k;}}
return-1;
}
function OLoptFUNCTION(callme){
o3_text=(callme?(typeof callme=='string'?(/.+\(.*\)/.test(callme)?eval(callme):
callme):callme()):(o3_function?o3_function():'No Function'));
return 0;
}
OLregRunTimeFunc(OLloadFunction);
OLregCmdLineFunc(OLparseFunction);
OLfunctionPI=1;
OLloaded=1;
