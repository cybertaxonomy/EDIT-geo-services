var ggPosX=-1;
var ggPosY=-1;
var ggOnChange=null;
var ggWinContent="";
var weekend=[0,6];
var weekendColor="#e0e0e0";
var fontface="Verdana";
var fontsize=8; 
var gNow=new Date();
Calendar.Months=["January","February","March","April","May","June",
"July","August","September","October","November","December"];
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
vCode+=('<div align="center"><table border="1" bgcolor="'+this.gBGColor+
"\" style='font-size:"+fontsize+"pt;'>");
vHeader_Code=this.cal_header();
vData_Code=this.cal_data();
vCode+=(vHeader_Code+vData_Code);
vCode+='</table></div>';
return vCode;
}
Calendar.prototype.show=function(){
var vCode="";
ggWinContent+=('<div style="font-family:\''+fontface+'\';font-weight:bold;'
+'font-size:'+fontsize+'pt;text-align:center;">');
ggWinContent+=(this.gMonthName+' '+this.gYear);
ggWinContent+='</div>';
var prevMMYYYY=Calendar.calc_month_year(this.gMonth,this.gYear,-1);
var prevMM=prevMMYYYY[0];
var prevYYYY=prevMMYYYY[1];
var nextMMYYYY=Calendar.calc_month_year(this.gMonth,this.gYear,1);
var nextMM=nextMMYYYY[0];
var nextYYYY=nextMMYYYY[1];
ggWinContent+=('<table width="100%" border="1" cellspacing="0" cellpadding="0" '
+'bgcolor="#e0e0e0" style="font-size:'+fontsize
+'pt;"><tr><td align="center">');
ggWinContent+=('[<a href="javascript:void(0);" '
+'title="Go back one year" '
+'onmouseover="window.status=\'Go back one year\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\''+this.gReturnItem+'\', \''+this.gMonth+'\', \''
+(parseInt(this.gYear)-1)+'\', \''+this.gFormat+'\');"'
+'>&lt;&lt;Year</a>]</td><td align="center">');
ggWinContent+=('[<a href="javascript:void(0);" '
+'title="Go back one month" '
+'onmouseover="window.status=\'Go back one month\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\''+this.gReturnItem+'\', \''+prevMM+'\', \''
+prevYYYY+'\', \''+this.gFormat+'\');"'
+'>&lt;Mon</a>]</td><td align="center">');
ggWinContent+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td align="center">';
ggWinContent+=('[<a href="javascript:void(0);" '
+'title="Go forward one month" '
+'onmouseover="window.status=\'Go forward one month\'; return true;" '
+'onmouseput="window.status=\'\'; return true;" '
+'onclick="Build(\''+this.gReturnItem+'\', \''+nextMM+'\', \''
+nextYYYY+'\', \''+this.gFormat+'\');"'
+'>Mon&gt;</a>]</td><td align="center">');
ggWinContent+=('[<a href="javascript:void(0);" '
+'title="Go forward one year" '
+'onmouseover="window.status=\'Go forward one year\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onClick="Build(\''+this.gReturnItem+'\', \''+this.gMonth+'\', \''
+(parseInt(this.gYear)+1)+'\', \''+this.gFormat+'\');"'
+'>Year&gt;&gt;</a>]</td></tr></table><div style="font-size:3px;">'
+'&nbsp;</div>');
vCode=this.getMonthlyCalendarCode();
ggWinContent+=vCode;
}
Calendar.prototype.showY=function(){
var vCode="";
var i;
ggWinContent+=('<div style="font-family:\''+fontface+'\';font-weight:bold;'
+'font-size:'+(fontsize+1)+'pt;text-align:center;">'+this.gYear+'</div>');
var prevYYYY=parseInt(this.gYear)-1;
var nextYYYY=parseInt(this.gYear)+1;
ggWinContent+=('<table width="100%" border="1" cellspacing="0" cellpadding="0" '
+'bgcolor="#e0e0e0" style="font-size:'+fontsize+'pt;"><tr><td '
+'align="center">');
ggWinContent+=('[<a href="javascript:void(0);" '
+'title="Go back one year" '
+'onmouseover="window.status=\'Go back one year\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\''+this.gReturnItem+'\', null, \''+prevYYYY+'\', \''
+this.gFormat+'\');">&lt;&lt;Year</a>]</td><td align="center">');
ggWinContent+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td align="center">';
ggWinContent+=('[<a href="javascript:void(0);" '
+'title="Go forward one year" '
+'onmouseover="window.status=\'Go forward one year\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="Build(\''+this.gReturnItem+'\', null, \''+nextYYYY+'\', \''
+this.gFormat+'\');">Year&gt;&gt;</a>]</td></tr></table>');
ggWinContent+=('<table width="100%" border="0" cellspacing="0" cellpadding="2" '
+'style="font-size:'+fontsize+'pt;"><tr>');
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
vCode+=('<td width="14%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Sun</td>');
vCode+=('<td width="14%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Mon</td>');
vCode+=('<td width="14%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Tue</td>');
vCode+=('<td width="14%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Wed</td>');
vCode+=('<td width="14%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Thu</td>');
vCode+=('<td width="14%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Fri</td>');
vCode+=('<td width="16%" style="font-family:'+fontface+';color:'
+this.gHeaderColor+';font-weight:bold;">Sat</td>');
vCode+='</tr>';
return vCode;
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
for(i=0;i<vFirstDay;i++){vCode+=
('<td width="14%"'+this.write_weekend_string(i)
+'style="font-family:\''+fontface+'\';text-align:center;">&nbsp;</td>');
}
for(j=vFirstDay;j<7;j++){vCode+=
('<td width="14%"'+this.write_weekend_string(j)+'style="font-family:\''
+fontface+'\';text-align:center;"><a href="javascript:void(0);" '
+'title="set date to '+this.format_data(vDay)+'" '
+'onmouseover="window.status=\'set date to '+this.format_data(vDay)+'\'; '
+'return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="document.'+this.gReturnItem+'.value=\''+this.format_data(vDay)
+'\';ggPosX= -1;ggPosY= -1;'+OLfnRef+'cClick();'
+'if((ggOnChange)&&(document.'+this.gReturnItem+'.value!=\''+orig
+'\'))ggOnChange();">'+this.format_day(vDay)+'</a></td>');
vDay+=1;
}
vCode+='</tr>';
for(k=2;k<7;k++){
vCode+='<tr>';
for(j=0;j<7;j++){vCode+=
('<td width="14%"'+this.write_weekend_string(j)
+'style="font-family:\''+fontface+'\';text-align:center;"><a '
+'href="javascript:void(0);" '
+'title="set date to '+this.format_data(vDay)+'" '
+'onmouseover="window.status=\'set date to '+this.format_data(vDay)
+'\'; return true;" '
+'onmouseout="window.status=\'\'; return true;" '
+'onclick="document.'+this.gReturnItem+'.value=\''
+this.format_data(vDay)+'\';ggPosX= -1;ggPosY= -1;'
+OLfnRef+'cClick();'
+'if((ggOnChange)&&(document.'+this.gReturnItem+'.value!=\''
+orig+'\'))ggOnChange();">'+this.format_day(vDay)+'</a></td>');
vDay+=1;
if(vDay>vLastDay){
vOnLastDay=1;
break;
}
}
if(j==6)vCode+='</tr>';
if(vOnLastDay==1)break;
}
for(m=1;m<(7-j);m++){vCode+=
('<td width="14%"'+this.write_weekend_string(j+m)+'style="font-family:\''
+fontface+'\';color:gray;text-align:center;">&nbsp;</td>');
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
CAPTION,'Select a date',MIDX,0,RELY,10);
}else{
var X=((ggPosX<10)?0:ggPosX-10),Y=((ggPosY<10)?0:ggPosY-10);
window.scroll(X,Y);
overlib(ggWinContent,AUTOSTATUSCAP,STICKY,EXCLUSIVE,DRAGGABLE,
CLOSECLICK,TEXTSIZE,'8pt',CAPTIONSIZE,'8pt',CLOSESIZE,'8pt',
CAPTION,'Select a date',FIXX,ggPosX,FIXY,ggPosY);
ggPosX=-1;ggPosY=-1;
}
}
function show_calendar(){
var p_item var p_month var p_year var p_format fontsize=8;
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
p_format="YYYY-MM-DD";
else
p_format=arguments[3];
if(OLns4)return overlib('Sorry, your browser does not support this feature. '
+'Manually enter<br>'+p_format,
FGCOLOR,'#ffffcc',TEXTSIZE,2,STICKY,NOCLOSE,OFFSETX,-10,OFFSETY,-10,
WIDTH,110,BASE,2);
Build(p_item,p_month,p_year,p_format);
}
function show_yearly_calendar(){
var p_item var p_year var p_format 
p_item=arguments[0];
if(arguments[1]==""||arguments[1]==null)
p_year=new String(gNow.getFullYear().toString());
else
p_year=arguments[1];
if(arguments[2]==""||arguments[2]==null)
p_format="YYYY-MM-DD";
else
p_format=arguments[2];
if(OLns4)return overlib('Sorry, your browser does not support this feature. '
+'Manually enter<br>'+p_format,
FGCOLOR,'#ffffcc',TEXTSIZE,2,STICKY,NOCLOSE,OFFSETX,-10,OFFSETY,-10,
WIDTH,110,BASE,2);
Build(p_item,null,p_year,p_format);
}
