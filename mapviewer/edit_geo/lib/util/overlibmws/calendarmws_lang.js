var ggPosX=-1;
var ggPosY=-1;
var ggOnChange=null;
var ggLang='eng';
var ggWinContent="";
var weekend=[0,6];
var weekendColor="#e0e0e0";
var fontface="Verdana";
var fontsize=8; 
var calmsg=new Array();
var datFormat=new Array();
var CalendarMonths=new Array();
var CalendarWeekdays=new Array();
calmsg["eng"]=new Array;
calmsg["eng"][0]="One year backward";
calmsg["eng"][1]="One year forward";
calmsg["eng"][2]="One month backward";
calmsg["eng"][3]="One month forward";
calmsg["eng"][4]="Set date";
calmsg["eng"][5]="Select date";
calmsg["eng"][6]="Your Browser does NOT support this feature. Update asap, please!<br />";
calmsg["eng"][7]="Year";
calmsg["eng"][8]="Click to close";
datFormat["eng"]="MM/DD/YYYY";
CalendarMonths["eng"]=new Array("January","February","March","April","May","June",
"July","August","September","October","November","December");
CalendarWeekdays["eng"]=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
calmsg["ger"]=new Array;
calmsg["ger"][0]="Ein Jahr zur&uuml;ck";
calmsg["ger"][1]="Ein Jahr vorw&auml;rts";
calmsg["ger"][2]="Einen Monat zur&uuml;ck";
calmsg["ger"][3]="Einen Monat vorw&auml;rts";
calmsg["ger"][4]="Datum setzen";
calmsg["ger"][5]="Datum w&auml;hlen";
calmsg["ger"][6]="Leider unterst&uuml;tzt Ihr Browser dieses Feature nicht. "
+"Bitte updaten!<br />";
calmsg["ger"][7]="Jahr";
calmsg["ger"][8]="Zum schlie&szlig;en klicken";
datFormat["ger"]="DD.MM.YYYY";
CalendarMonths["ger"]=new Array("Januar","Februar","M&auml;rz","April","Mai","Juni",
"Juli","August","September","Oktober","November","Dezember");
CalendarWeekdays["ger"]=new Array("So","Mo","Di","Mi","Do","Fr","Sa");
calmsg["esp"]=new Array;
calmsg["esp"][0]="Un año atras";
calmsg["esp"][1]="Un año adelante";
calmsg["esp"][2]="Un mes atras";
calmsg["esp"][3]="Un mes adelante";
calmsg["esp"][4]="Fije la fecha";
calmsg["esp"][5]="Seleccione la fecha";
calmsg["esp"][6]="Su browser no apoya esta característica. ¡Actualización cuanto antes, "
+"por favor!<br />";
calmsg["esp"][7]="Año";
calmsg["esp"][8]="Tecleo a cerrarse";
datFormat["esp"]="DD.MM.YYYY";
CalendarMonths["esp"]=new Array("Enero","Febrero","Marcha","Abril","Puede","Junio",
"Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
CalendarWeekdays["esp"]=new Array("Do","Lu","Ma","Mi","Ju","Vi","Sa");
calmsg["dut"]=new Array;
calmsg["dut"][0]="Één jaar achteruit";
calmsg["dut"][1]="Één jaar voorwaarts";
calmsg["dut"][2]="Één maand achteruit";
calmsg["dut"][3]="Één maand voorwaarts";
calmsg["dut"][4]="Overname datum";
calmsg["dut"][5]="Selecteer datum";
calmsg["dut"][6]="Uw Browser steunt deze eigenschap niet. Update zo vlug mogelijk, "
+"tevreden!<br />";
calmsg["dut"][7]="Jaar";
calmsg["dut"][8]="klik aan het sluiten";
datFormat["dut"]="DD.MM.YYYY";
CalendarMonths["dut"]=new Array("Januari","Februari","Maart","April","Mei","Juni",
"Juli","Augustus","September","Oktober","November","December");
CalendarWeekdays["dut"]=new Array("Zo","Ma","Di","Wo","Do","Vr","Za");
var gNow=new Date();
Calendar.CellWidth=["14%","14%","14%","14%","14%","14%","16%"];
Calendar.DOMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
Calendar.lDOMonth=[31,29,31,30,31,30,31,31,30,31,30,31];
function Calendar(p_item,p_month,p_year,p_format){
if((p_month==null)&&(p_year==null))return;
if(p_month==null){
this.gMonthName=null;
this.gMonth=null;
this.gYearly=true;
}else{
this.gMonthName=Calendar.get_month(p_month);
this.gMonth=new Number(p_month);
this.gYearly=false;
}
this.gYear=p_year;
this.gFormat=p_format;
this.gBGColor="white";
this.gFGColor="black";
this.gTextColor="black";
this.gHeaderColor="black";
this.gReturnItem=p_item;
}
Calendar.get_month=Calendar_get_month;
Calendar.get_daysofmonth=Calendar_get_daysofmonth;
Calendar.calc_month_year=Calendar_calc_month_year;
function Calendar_get_month(monthNo){
return Calendar.Months[monthNo];
}
function Calendar_get_daysofmonth(monthNo,p_year){
if((p_year%4)==0){
if((p_year%100)==0&&(p_year%400)!=0)
return Calendar.DOMonth[monthNo];
return Calendar.lDOMonth[monthNo];
}else
return Calendar.DOMonth[monthNo];
}
function Calendar_calc_month_year(p_Month,p_Year,incr){
var ret_arr=new Array();
if(incr==-1){
if(p_Month==0){
ret_arr[0]=11;
ret_arr[1]=parseInt(p_Year)-1;
}else{
ret_arr[0]=parseInt(p_Month)-1;
ret_arr[1]=parseInt(p_Year);
}
}else if(incr==1){
if(p_Month==11){
ret_arr[0]=0;
ret_arr[1]=parseInt(p_Year)+1;
}else{
ret_arr[0]=parseInt(p_Month)+1;
ret_arr[1]=parseInt(p_Year);
}
}
return ret_arr;
}
function Calendar_calc_month_year(p_Month,p_Year,incr){
var ret_arr=new Array();
if(incr==-1){
if(p_Month==0){
ret_arr[0]=11;
ret_arr[1]=parseInt(p_Year)-1;
}else{
ret_arr[0]=parseInt(p_Month)-1;
ret_arr[1]=parseInt(p_Year);
}
}else if(incr==1){
if(p_Month==11){
ret_arr[0]=0;
ret_arr[1]=parseInt(p_Year)+1;
}else{
ret_arr[0]=parseInt(p_Month)+1;
ret_arr[1]=parseInt(p_Year);
}
}
return ret_arr;
}
new Calendar();
Calendar.prototype.getMonthlyCalendarCode=function(){
var vCode="";
var vHeader_Code="";
var vData_Code="";
vCode+=('<div align="center"><table border="1" bgcolor="'+this.gBGColor
+'" style="font-size:'+fontsize+'pt;">');
vHeader_Code=this.cal_header();
vData_Code=this.cal_data();
vCode+=(vHeader_Code+vData_Code);
vCode+='</table></div>';
return vCode;
}
Calendar.prototype.show=function(){
var vCode="";
ggWinContent+=sprintf('<div style="font-family:\'%s\';font-weight:bold;'
+'font-size:%spt;text-align:center;">%s %s</div>',
fontface,fontsize,this.gMonthName,this.gYear);
var prevMMYYYY=Calendar.calc_month_year(this.gMonth,this.gYear,-1);
var prevMM=prevMMYYYY[0];
var prevYYYY=prevMMYYYY[1];
var nextMMYYYY=Calendar.calc_month_year(this.gMonth,this.gYear,1);
var nextMM=nextMMYYYY[0];
var nextYYYY=nextMMYYYY[1];
var nav_cell='<td align="%s">&nbsp;[<a href="javascript:void(0);" title="%s" '
+'onmouseover="window.status=\'%s\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\'%s\',\'%s\',\'%s\',\'%s\');">%s%s%s<\/a>]&nbsp;</td>';
ggWinContent+='<table width="100%" border="0" cellspacing="0" cellpadding="0" '
+'bgcolor="#e0e0e0" style="font-size:'+fontsize+'pt;">';
ggWinContent+='<tr>';
ggWinContent+=sprintf(nav_cell, 
'left',calmsg[ggLang][0],calmsg[ggLang][0],
this.gReturnItem,this.gMonth,(parseInt(this.gYear)-1),this.gFormat,
'&lt;&lt;',(parseInt(this.gYear)-1),'');
ggWinContent+=sprintf(nav_cell, 
'right',calmsg[ggLang][1],calmsg[ggLang][1],
this.gReturnItem,this.gMonth,(parseInt(this.gYear)+1),this.gFormat,
'',(parseInt(this.gYear)+1),'&gt;&gt;');
ggWinContent+='</tr><tr>';
ggWinContent+=sprintf(nav_cell, 
'left',calmsg[ggLang][2],calmsg[ggLang][2],
this.gReturnItem,prevMM,prevYYYY,this.gFormat,'&lt;',
Calendar.Months[prevMM],'');
ggWinContent+=sprintf(nav_cell, 
'right',calmsg[ggLang][3],calmsg[ggLang][3],
this.gReturnItem,nextMM,nextYYYY,this.gFormat,'',
Calendar.Months[nextMM],'&gt;');
ggWinContent+='</tr></table><div style="font-size:3px;">&nbsp;</div>';
vCode=this.getMonthlyCalendarCode();
ggWinContent+=vCode;
}
Calendar.prototype.showY=function(){
var vCode="";
var i;
ggWinContent+=sprintf(
'<div style="font-family:\'%s\';font-weight:bold;font-size:%spt;'
+'text-align:center;">%s</div>',fontface,fontsize+1,this.gYear);
var prevYYYY=parseInt(this.gYear)-1;
var nextYYYY=parseInt(this.gYear)+1;
ggWinContent+='<table width="100%" '+sprintf(
'border="1" cellspacing="0" cellpadding="0" bgcolor="%s" '
+'style="font-size:%spt;">','#e0e0e0',fontsize);
ggWinContent+='<tr>';
ggWinContent+=sprintf(
'<td align="center">[<a href="javascript:void(0);" title="%s" '
+'onmouseover="window.status=\'%s\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\'%s\', null, \'%s\', \'%s\');">&lt;&lt;%s</a>]</td>',
calmsg[ggLang][0],calmsg[ggLang][0],this.gReturnItem,
prevYYYY,this.gFormat,(parseInt(this.gYear)-1));
ggWinContent+='<td align="center">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>';
ggWinContent+=sprintf(
'<td align="center">[<a href="javascript:void(0);" title="%s" '
+'onmouseover="window.status=\'%s\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\'%s\', null, \'%s\', \'%s\');">%s&gt;&gt;</a>]</td>',
calmsg[ggLang][1],calmsg[ggLang][1],this.gReturnItem,
nextYYYY,this.gFormat,(parseInt(this.gYear)+1));
ggWinContent+='</tr></table>';
ggWinContent+='<table width="100%" border="0" cellspacing="0" cellpadding="2" '
+'style="font-size:'+fontsize+'pt;"><tr>';
for(i=0;i<12;i++){
ggWinContent+='<td align="center" valign="top">';
this.gMonth=i;
this.gMonthName=Calendar.get_month(this.gMonth);
vCode=this.getMonthlyCalendarCode();
ggWinContent+=(this.gMonthName+'/'+this.gYear+'<div '
+'style="font-size:2px;">&nbsp;</div>');
ggWinContent+=vCode;
ggWinContent+='</td>';
if(i==3||i==7)ggWinContent+='</tr><tr>';
}
ggWinContent+='</tr></table>';
}
Calendar.prototype.cal_header=function(){
var vCode='<tr>';
for(i=0;i<7;i++){vCode+=sprintf(
'<td width="%s" style="font-family:\'%s\';font-weight:bold;color:%s; '
+'text-align:center;">%s</td>',
Calendar.CellWidth[i],fontface,this.gHeaderColor,Calendar.Weekdays[i]);
}
return(vCode+'</tr>');
}
Calendar.prototype.cal_data=function(){
var vDate=new Date();
vDate.setDate(1);
vDate.setMonth(this.gMonth);
vDate.setFullYear(this.gYear);
var vFirstDay=vDate.getDay();
var vDay=1;
var vLastDay=Calendar.get_daysofmonth(this.gMonth,this.gYear);
var vOnLastDay=0;
var vCode='<tr>';
var i,j,k,m;
var orig=eval("document."+this.gReturnItem+".value").toString();
for(i=0;i<vFirstDay;i++){vCode+=sprintf(
'<td width="%s" %s style="font-family:\'%s\';text-align:center;">&nbsp;</td>',
Calendar.CellWidth[0],this.write_weekend_string(i),fontface);
}
for(j=vFirstDay;j<7;j++){vCode+=sprintf(
'<td width="%s" %s style="font-family:\'%s\';text-align:center;"><a '
+'href="javascript:void(0);" title="%s: %s" '
+'onmouselver="window.status=\'%s: %s\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="document.%s.value=\'%s\';ggPosX= -1;ggPosY= -1;%scClick();'
+'if((ggOnChange)&&(document.%s.value!=\'%s\'))ggOnChange();">%s</a></td>',
Calendar.CellWidth[j+1],this.write_weekend_string(j),fontface,
calmsg[ggLang][4],this.format_data(vDay),calmsg[ggLang][4],
this.format_data(vDay),this.gReturnItem,this.format_data(vDay),OLfnRef,
this.gReturnItem,orig,this.format_day(vDay));
vDay+=1;
}
vCode+='</tr>';
for(k=2;k<7;k++){
vCode+='<tr>';
for(j=0;j<7;j++){vCode+=sprintf(
'<td width="%s" %s style="font-family:\'%s\';text-align:center;"><a '
+'href="javascript:void(0);" title="%s: %s" '
+'onmouseover="window.status=\'%s: %s\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="document.%s.value=\'%s\';ggPosX= -1;ggPosY= -1;%scClick();if'
+'((ggOnChange)&&(document.%s.value!=\'%s\'))ggOnChange();">%s</a></td>',
Calendar.CellWidth[j+1],this.write_weekend_string(j),fontface,
calmsg[ggLang][4],this.format_data(vDay),calmsg[ggLang][4],
this.format_data(vDay),this.gReturnItem,this.format_data(vDay),
OLfnRef,this.gReturnItem,orig,this.format_day(vDay));
vDay+=1;
if(vDay>vLastDay){
vOnLastDay=1;
break;
}
}
if(j==6)vCode+='</tr>';
if(vOnLastDay==1)break;
}
for(m=1;m<(7-j);m++){vCode+=sprintf(
'<td width="%s" %s style="font-family:\'%s\';color:gray;text-align:center;"'
+'>&nbsp;</td>',
Calendar.CellWidth[m+1],this.write_weekend_string(j+m),fontface);
}
return vCode;
}
Calendar.prototype.format_day=function(vday){
var vNowDay=gNow.getDate();
var vNowMonth=gNow.getMonth();
var vNowYear=gNow.getFullYear();
if(vday==vNowDay&&this.gMonth==vNowMonth&&this.gYear==vNowYear)
return('<span style="color:red;font-weight:bold;">'+vday+'</span>');
else
return(vday);
}
Calendar.prototype.write_weekend_string=function(vday){
var i;
for(i=0;i<weekend.length;i++){
if(vday==weekend[i])
return(' bgcolor="'+weekendColor+'"');
}
return "";
}
Calendar.prototype.format_data=function(p_day){
var vData;
var vMonth=1+this.gMonth;
vMonth=(vMonth.toString().length<2)?"0"+vMonth:vMonth;
var vMon=Calendar.get_month(this.gMonth).substr(0,3).toUpperCase();
var vFMon=Calendar.get_month(this.gMonth).toUpperCase();
var vY4=new String(this.gYear);
var vY2=new String(this.gYear.substr(2,2));
var vDD=(p_day.toString().length<2)?"0"+p_day:p_day;
switch(this.gFormat){
case "MM\/DD\/YYYY":
vData=vMonth+"\/"+vDD+"\/"+vY4;
break;
case "MM\/DD\/YY":
vData=vMonth+"\/"+vDD+"\/"+vY2;
break;
case "MM-DD-YYYY":
vData=vMonth+"-"+vDD+"-"+vY4;
break;
case "YYYY-MM-DD":
vData=vY4+"-"+vMonth+"-"+vDD;
break;
case "MM-DD-YY":
vData=vMonth+"-"+vDD+"-"+vY2;
break;
case "DD\/MON\/YYYY":
vData=vDD+"\/"+vMon+"\/"+vY4;
break;
case "DD\/MON\/YY":
vData=vDD+"\/"+vMon+"\/"+vY2;
break;
case "DD-MON-YYYY":
vData=vDD+"-"+vMon+"-"+vY4;
break;
case "DD-MON-YY":
vData=vDD+"-"+vMon+"-"+vY2;
break;
case "DD\/MONTH\/YYYY":
vData=vDD+"\/"+vFMon+"\/"+vY4;
break;
case "DD\/MONTH\/YY":
vData=vDD+"\/"+vFMon+"\/"+vY2;
break;
case "DD-MONTH-YYYY":
vData=vDD+"-"+vFMon+"-"+vY4;
break;
case "DD-MONTH-YY":
vData=vDD+"-"+vFMon+"-"+vY2;
break;
case "DD\/MM\/YYYY":
vData=vDD+"\/"+vMonth+"\/"+vY4;
break;
case "DD\/MM\/YY":
vData=vDD+"\/"+vMonth+"\/"+vY2;
break;
case "DD-MM-YYYY":
vData=vDD+"-"+vMonth+"-"+vY4;
break;
case "DD-MM-YY":
vData=vDD+"-"+vMonth+"-"+vY2;
break;
case "DD.MM.YYYY":
vData=vDD+"."+vMonth+"."+vY4;
break;
case "DD.MM.YY":
vData=vDD+"."+vMonth+"."+vY2;
break;
default:
vData=vMonth+"\/"+vDD+"\/"+vY4;
}
return vData;
}
function Build(p_item,p_month,p_year,p_format){
var gCal=new Calendar(p_item,p_month,p_year,p_format);
gCal.gBGColor="white";
gCal.gLinkColor="black";
gCal.gTextColor="black";
gCal.gHeaderColor="darkgreen";
ggWinContent="";
if(typeof ol_draggable=='undefined')DRAGGABLE=DONOTHING;
if(gCal.gYearly){
if(OLns6){
if(ggPosX==-1)ggPosX=20;
if(ggPosY==-1)ggPosY=10;
}
if(fontsize==8)fontsize=6;
gCal.showY();
}else{
if(fontsize==6)fontsize=8;
gCal.show();
}
o3_exclusive=0;
if(ggPosX==-1&&ggPosY==-1){
overlib(ggWinContent,AUTOSTATUSCAP,STICKY,EXCLUSIVE,DRAGGABLE,
CLOSECLICK,TEXTSIZE,'8pt',CAPTIONSIZE,'8pt',CLOSESIZE,'8pt',
CAPTION,calmsg[ggLang][5],CLOSETITLE,calmsg[ggLang][8],CLOSETEXT,
'<span style="background:#e0e0e0;color:#000000;text-decoration:none;'
+'font-weight:bold;">&nbsp;X&nbsp;</span>',MIDX,0,RELY,10);
}else{
var X=((ggPosX<10)?0:ggPosX-10),Y=((ggPosY<10)?0:ggPosY-10);
window.scroll(X,Y);
overlib(ggWinContent,AUTOSTATUSCAP,STICKY,EXCLUSIVE,DRAGGABLE,
CLOSECLICK,TEXTSIZE,'8pt',CAPTIONSIZE,'8pt',CLOSESIZE,'8pt',
CAPTION,calmsg[ggLang][5],CLOSETITLE,calmsg[ggLang][8],CLOSETEXT,
'<span style="background:#e0e0e0;color:#000000;text-decoration:none;'
+'font-weight:bold;">&nbsp;X&nbsp;</span>',FIXX,ggPosX,FIXY,ggPosY);
ggPosX=-1;ggPosY=-1;
}
}
function show_calendar(){
var p_item var p_month var p_year var p_format fontsize=8;
Calendar.Months=CalendarMonths[ggLang];
Calendar.Weekdays=CalendarWeekdays[ggLang];
p_item=arguments[0];
if(arguments[1]==""||arguments[1]==null||arguments[1]=='12')
p_month=new String(gNow.getMonth());
else
p_month=arguments[1];
if(arguments[2]==""||arguments[2]==null)
p_year=new String(gNow.getFullYear().toString());
else
p_year=arguments[2];
if(arguments[3]==""||arguments[3]==null)
p_format=datFormat[ggLang];
else
p_format=arguments[3];
if(OLns4)return overlib(calmsg[ggLang][6]+p_format,
FGCOLOR,'#ffffcc',TEXTSIZE,2,STICKY,NOCLOSE,OFFSETX,-10,OFFSETY,-10,
WIDTH,110,BASE,2);
Build(p_item,p_month,p_year,p_format);
}
function show_yearly_calendar(){
var p_item var p_year var p_format 
Calendar.Months=CalendarMonths[ggLang];
Calendar.Weekdays=CalendarWeekdays[ggLang];
p_item=arguments[0];
if(arguments[1]==""||arguments[1]==null)
p_year=new String(gNow.getFullYear().toString());
else
p_year=arguments[1];
if(arguments[2]==""||arguments[2]==null)
p_format=datFormat[ggLang];
else
p_format=arguments[2];
if(OLns4)return overlib(calmsg[ggLang][6]+p_format,
FGCOLOR,'#ffffcc',TEXTSIZE,2,STICKY,NOCLOSE,OFFSETX,-10,OFFSETY,-10,
WIDTH,110,BASE,2);
Build(p_item,null,p_year,p_format);
}
