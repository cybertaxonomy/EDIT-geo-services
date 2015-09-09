(function($){function Plot(z,A,B){var C=[];var D={colors:["#edc240","#afd8f8","#cb4b4b","#4da74d","#9440ed"],legend:{show:true,noColumns:1,labelFormatter:null,labelBoxBorderColor:"#ccc",container:null,position:"ne",margin:5,backgroundColor:null,backgroundOpacity:0.85},xaxis:{mode:null,min:null,max:null,autoscaleMargin:null,ticks:null,tickFormatter:null,tickDecimals:null,tickSize:null,minTickSize:null,monthNames:null,timeformat:null},yaxis:{autoscaleMargin:0.02},points:{show:false,radius:3,lineWidth:2,fill:true,fillColor:"#ffffff"},lines:{show:false,lineWidth:2,fill:false,fillColor:null},bars:{show:false,lineWidth:2,barWidth:1,fill:true,fillColor:null},grid:{color:"#545454",backgroundColor:null,tickColor:"#dddddd",labelMargin:3,borderWidth:2,clickable:null,coloredAreas:null,coloredAreasColor:"#f4f4f4"},selection:{mode:null,color:"#e8cfac"},shadowSize:4};var E=null,overlay=null,eventHolder=null,ctx=null,octx=null,target=z,xaxis={},yaxis={},plotOffset={left:0,right:0,top:0,bottom:0},yLabelMaxWidth=0,yLabelMaxHeight=0,xLabelBoxWidth=0,canvasWidth=0,canvasHeight=0,plotWidth=0,plotHeight=0,hozScale=0,vertScale=0,workarounds={};this.setData=setData;this.setupGrid=setupGrid;this.draw=draw;this.clearSelection=clearSelection;this.setSelection=setSelection;this.getCanvas=function(){return E};this.getPlotOffset=function(){return plotOffset};this.getData=function(){return C};this.getAxes=function(){return{xaxis:xaxis,yaxis:yaxis}};parseOptions(B);setData(A);constructCanvas();setupGrid();draw();function setData(d){C=parseData(d);fillInSeriesOptions();processData()}function parseData(d){var a=[];for(var i=0;i<d.length;++i){var s;if(d[i].data){s={};for(var v in d[i])s[v]=d[i][v]}else{s={data:d[i]}}a.push(s)}return a}function parseOptions(o){$.extend(true,D,o);if(D.xaxis.noTicks&&D.xaxis.ticks==null)D.xaxis.ticks=D.xaxis.noTicks;if(D.yaxis.noTicks&&D.yaxis.ticks==null)D.yaxis.ticks=D.yaxis.noTicks}function fillInSeriesOptions(){var i;var a=C.length;var b=[];var d=[];for(i=0;i<C.length;++i){var e=C[i].color;if(e!=null){--a;if(typeof e=="number")d.push(e);else b.push(parseColor(C[i].color))}}for(i=0;i<d.length;++i){a=Math.max(a,d[i]+1)}var f=[];var g=0;i=0;while(f.length<a){var c;if(D.colors.length==i)c=new Color(100,100,100);else c=parseColor(D.colors[i]);var h=g%2==1?-1:1;var j=1+h*Math.ceil(g/2)*0.2;c.scale(j,j,j);f.push(c);++i;if(i>=D.colors.length){i=0;++g}}var k=0,s;for(i=0;i<C.length;++i){s=C[i];if(s.color==null){s.color=f[k].toString();++k}else if(typeof s.color=="number")s.color=f[s.color].toString();s.lines=$.extend(true,{},D.lines,s.lines);s.points=$.extend(true,{},D.points,s.points);s.bars=$.extend(true,{},D.bars,s.bars);if(s.shadowSize==null)s.shadowSize=D.shadowSize}}function processData(){xaxis.datamin=yaxis.datamin=Number.MAX_VALUE;xaxis.datamax=yaxis.datamax=Number.MIN_VALUE;for(var i=0;i<C.length;++i){var a=C[i].data;for(var j=0;j<a.length;++j){if(a[j]==null)continue;var x=a[j][0],y=a[j][1];if(x==null||y==null||isNaN(x=+x)||isNaN(y=+y)){a[j]=null;continue}if(x<xaxis.datamin)xaxis.datamin=x;if(x>xaxis.datamax)xaxis.datamax=x;if(y<yaxis.datamin)yaxis.datamin=y;if(y>yaxis.datamax)yaxis.datamax=y}}if(xaxis.datamin==Number.MAX_VALUE)xaxis.datamin=0;if(yaxis.datamin==Number.MAX_VALUE)yaxis.datamin=0;if(xaxis.datamax==Number.MIN_VALUE)xaxis.datamax=1;if(yaxis.datamax==Number.MIN_VALUE)yaxis.datamax=1}function constructCanvas(){canvasWidth=target.width();canvasHeight=target.height();target.html("");target.css("position","relative");if(canvasWidth<=0||canvasHeight<=0)throw"Invalid dimensions for plot, width = "+canvasWidth+", height = "+canvasHeight;E=$('<canvas width="'+canvasWidth+'" height="'+canvasHeight+'"></canvas>').appendTo(target).get(0);if($.browser.msie)E=window.G_vmlCanvasManager.initElement(E);ctx=E.getContext("2d");overlay=$('<canvas style="position:absolute;left:0px;top:0px;" width="'+canvasWidth+'" height="'+canvasHeight+'"></canvas>').appendTo(target).get(0);if($.browser.msie)overlay=window.G_vmlCanvasManager.initElement(overlay);octx=overlay.getContext("2d");eventHolder=$([overlay,E]);if(D.selection.mode!=null){eventHolder.mousedown(onMouseDown);eventHolder.each(function(){this.onmousemove=onMouseMove})}if(D.grid.clickable)eventHolder.click(onClick)}function setupGrid(){setRange(xaxis,D.xaxis);prepareTickGeneration(xaxis,D.xaxis);setTicks(xaxis,D.xaxis);extendXRangeIfNeededByBar();setRange(yaxis,D.yaxis);prepareTickGeneration(yaxis,D.yaxis);setTicks(yaxis,D.yaxis);setSpacing();insertLabels();insertLegend()}function setRange(a,b){var c=b.min!=null?b.min:a.datamin;var d=b.max!=null?b.max:a.datamax;if(d-c==0.0){var e;if(d==0.0)e=1.0;else e=0.01;c-=e;d+=e}else{var f=b.autoscaleMargin;if(f!=null){if(b.min==null){c-=(d-c)*f;if(c<0&&a.datamin>=0)c=0}if(b.max==null){d+=(d-c)*f;if(d>0&&a.datamax<=0)d=0}}}a.min=c;a.max=d}function prepareTickGeneration(h,j){var k;if(typeof j.ticks=="number"&&j.ticks>0)k=j.ticks;else if(h==xaxis)k=canvasWidth/100;else k=canvasHeight/60;var l=(h.max-h.min)/k;var m,generator,unit,formatter,i,magn,norm;if(j.mode=="time"){function formatDate(d,a,b){var e=function(n){n=""+n;return n.length==1?"0"+n:n};var r=[];var f=false;if(b==null)b=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];for(var i=0;i<a.length;++i){var c=a.charAt(i);if(f){switch(c){case'h':c=""+d.getHours();break;case'H':c=e(d.getHours());break;case'M':c=e(d.getMinutes());break;case'S':c=e(d.getSeconds());break;case'd':c=""+d.getDate();break;case'm':c=""+(d.getMonth()+1);break;case'y':c=""+d.getFullYear();break;case'b':c=""+b[d.getMonth()];break}r.push(c);f=false}else{if(c=="%")f=true;else r.push(c)}}return r.join("")}var o={"second":1000,"minute":60*1000,"hour":60*60*1000,"day":24*60*60*1000,"month":30*24*60*60*1000,"year":365.2425*24*60*60*1000};var p=[[1,"second"],[2,"second"],[5,"second"],[10,"second"],[30,"second"],[1,"minute"],[2,"minute"],[5,"minute"],[10,"minute"],[30,"minute"],[1,"hour"],[2,"hour"],[4,"hour"],[8,"hour"],[12,"hour"],[1,"day"],[2,"day"],[3,"day"],[0.25,"month"],[0.5,"month"],[1,"month"],[2,"month"],[3,"month"],[6,"month"],[1,"year"]];var q=0;if(j.minTickSize!=null){if(typeof j.tickSize=="number")q=j.tickSize;else q=j.minTickSize[0]*o[j.minTickSize[1]]}for(i=0;i<p.length-1;++i)if(l<(p[i][0]*o[p[i][1]]+p[i+1][0]*o[p[i+1][1]])/2&&p[i][0]*o[p[i][1]]>=q)break;m=p[i][0];unit=p[i][1];if(unit=="year"){magn=Math.pow(10,Math.floor(Math.log(l/o.year)/Math.LN10));norm=(l/o.year)/magn;if(norm<1.5)m=1;else if(norm<3)m=2;else if(norm<7.5)m=5;else m=10;m*=magn}if(j.tickSize){m=j.tickSize[0];unit=j.tickSize[1]}generator=function(a){var b=[],tickSize=a.tickSize[0],unit=a.tickSize[1],d=new Date(a.min);var c=tickSize*o[unit];if(unit=="second")d.setSeconds(floorInBase(d.getSeconds(),tickSize));if(unit=="minute")d.setMinutes(floorInBase(d.getMinutes(),tickSize));if(unit=="hour")d.setHours(floorInBase(d.getHours(),tickSize));if(unit=="month")d.setMonth(floorInBase(d.getMonth(),tickSize));if(unit=="year")d.setFullYear(floorInBase(d.getFullYear(),tickSize));d.setMilliseconds(0);if(c>=o.minute)d.setSeconds(0);if(c>=o.hour)d.setMinutes(0);if(c>=o.day)d.setHours(0);if(c>=o.day*4)d.setDate(1);if(c>=o.year)d.setMonth(0);var e=0,v;do{v=d.getTime();b.push({v:v,label:a.tickFormatter(v,a)});if(unit=="month"){if(tickSize<1){d.setDate(1);var f=d.getTime();d.setMonth(d.getMonth()+1);var g=d.getTime();d.setTime(v+e*o.hour+(g-f)*tickSize);e=d.getHours();d.setHours(0)}else d.setMonth(d.getMonth()+tickSize)}else if(unit=="year"){d.setFullYear(d.getFullYear()+tickSize)}else d.setTime(v+c)}while(v<a.max);return b};formatter=function(v,a){var d=new Date(v);if(j.timeformat!=null)return formatDate(d,j.timeformat,j.monthNames);var t=a.tickSize[0]*o[a.tickSize[1]];var b=a.max-a.min;if(t<o.minute)fmt="%h:%M:%S";else if(t<o.day){if(b<2*o.day)fmt="%h:%M";else fmt="%b %d %h:%M"}else if(t<o.month)fmt="%b %d";else if(t<o.year){if(b<o.year)fmt="%b";else fmt="%b %y"}else fmt="%y";return formatDate(d,fmt,j.monthNames)}}else{var s=j.tickDecimals;var u=-Math.floor(Math.log(l)/Math.LN10);if(s!=null&&u>s)u=s;magn=Math.pow(10,-u);norm=l/magn;if(norm<1.5)m=1;else if(norm<3){m=2;if(norm>2.25&&(s==null||u+1<=s)){m=2.5;++u}}else if(norm<7.5)m=5;else m=10;m*=magn;if(j.minTickSize!=null&&m<j.minTickSize)m=j.minTickSize;if(j.tickSize!=null)m=j.tickSize;h.tickDecimals=Math.max(0,(s!=null)?s:u);generator=function(a){var b=[];var c=floorInBase(a.min,a.tickSize);var i=0,v;do{v=c+i*a.tickSize;b.push({v:v,label:a.tickFormatter(v,a)});++i}while(v<a.max);return b};formatter=function(v,a){return v.toFixed(a.tickDecimals)}}h.tickSize=unit?[m,unit]:m;h.tickGenerator=generator;if($.isFunction(j.tickFormatter))h.tickFormatter=function(v,a){return""+j.tickFormatter(v,a)};else h.tickFormatter=formatter}function extendXRangeIfNeededByBar(){if(D.xaxis.max==null){var a=xaxis.max;for(var i=0;i<C.length;++i)if(C[i].bars.show&&C[i].bars.barWidth+xaxis.datamax>a)a=xaxis.datamax+C[i].bars.barWidth;xaxis.max=a}}function setTicks(a,b){a.ticks=[];if(b.ticks==null)a.ticks=a.tickGenerator(a);else if(typeof b.ticks=="number"){if(b.ticks>0)a.ticks=a.tickGenerator(a)}else if(b.ticks){var c=b.ticks;if($.isFunction(c))c=c({min:a.min,max:a.max});var i,v;for(i=0;i<c.length;++i){var d=null;var t=c[i];if(typeof t=="object"){v=t[0];if(t.length>1)d=t[1]}else v=t;if(d==null)d=a.tickFormatter(v,a);a.ticks[i]={v:v,label:d}}}if(b.autoscaleMargin!=null&&a.ticks.length>0){if(b.min==null)a.min=Math.min(a.min,a.ticks[0].v);if(b.max==null&&a.ticks.length>1)a.max=Math.min(a.max,a.ticks[a.ticks.length-1].v)}}function setSpacing(){var i,labels=[],l;for(i=0;i<yaxis.ticks.length;++i){l=yaxis.ticks[i].label;if(l)labels.push('<div class="tickLabel">'+l+'</div>')}if(labels.length>0){var a=$('<div style="position:absolute;top:-10000px;font-size:smaller">'+labels.join("")+'</div>').appendTo(target);yLabelMaxWidth=a.width();yLabelMaxHeight=a.find("div").height();a.remove()}var b=D.grid.borderWidth;if(D.points.show)b=Math.max(b,D.points.radius+D.points.lineWidth/2);for(i=0;i<C.length;++i){if(C[i].points.show)b=Math.max(b,C[i].points.radius+C[i].points.lineWidth/2)}plotOffset.left=plotOffset.right=plotOffset.top=plotOffset.bottom=b;plotOffset.left+=yLabelMaxWidth+D.grid.labelMargin;plotWidth=canvasWidth-plotOffset.left-plotOffset.right;xLabelBoxWidth=plotWidth/6;labels=[];for(i=0;i<xaxis.ticks.length;++i){l=xaxis.ticks[i].label;if(l)labels.push('<span class="tickLabel" width="'+xLabelBoxWidth+'">'+l+'</span>')}var c=0;if(labels.length>0){var a=$('<div style="position:absolute;top:-10000px;font-size:smaller">'+labels.join("")+'</div>').appendTo(target);c=a.height();a.remove()}plotOffset.bottom+=c+D.grid.labelMargin;plotHeight=canvasHeight-plotOffset.bottom-plotOffset.top;hozScale=plotWidth/(xaxis.max-xaxis.min);vertScale=plotHeight/(yaxis.max-yaxis.min)}function draw(){drawGrid();for(var i=0;i<C.length;i++){drawSeries(C[i])}}function tHoz(x){return(x-xaxis.min)*hozScale}function tVert(y){return plotHeight-(y-yaxis.min)*vertScale}function drawGrid(){var i;ctx.save();ctx.clearRect(0,0,canvasWidth,canvasHeight);ctx.translate(plotOffset.left,plotOffset.top);if(D.grid.backgroundColor!=null){ctx.fillStyle=D.grid.backgroundColor;ctx.fillRect(0,0,plotWidth,plotHeight)}if(D.grid.coloredAreas){var b=D.grid.coloredAreas;if($.isFunction(b))b=b({xmin:xaxis.min,xmax:xaxis.max,ymin:yaxis.min,ymax:yaxis.max});for(i=0;i<b.length;++i){var a=b[i];if(a.x1==null||a.x1<xaxis.min)a.x1=xaxis.min;if(a.x2==null||a.x2>xaxis.max)a.x2=xaxis.max;if(a.y1==null||a.y1<yaxis.min)a.y1=yaxis.min;if(a.y2==null||a.y2>yaxis.max)a.y2=yaxis.max;var c;if(a.x1>a.x2){c=a.x1;a.x1=a.x2;a.x2=c}if(a.y1>a.y2){c=a.y1;a.y1=a.y2;a.y2=c}if(a.x1>=xaxis.max||a.x2<=xaxis.min||a.x1==a.x2||a.y1>=yaxis.max||a.y2<=yaxis.min||a.y1==a.y2)continue;ctx.fillStyle=a.color||D.grid.coloredAreasColor;ctx.fillRect(Math.floor(tHoz(a.x1)),Math.floor(tVert(a.y2)),Math.floor(tHoz(a.x2)-tHoz(a.x1)),Math.floor(tVert(a.y1)-tVert(a.y2)))}}ctx.lineWidth=1;ctx.strokeStyle=D.grid.tickColor;ctx.beginPath();var v;for(i=0;i<xaxis.ticks.length;++i){v=xaxis.ticks[i].v;if(v<=xaxis.min||v>=xaxis.max)continue;ctx.moveTo(Math.floor(tHoz(v))+ctx.lineWidth/2,0);ctx.lineTo(Math.floor(tHoz(v))+ctx.lineWidth/2,plotHeight)}for(i=0;i<yaxis.ticks.length;++i){v=yaxis.ticks[i].v;if(v<=yaxis.min||v>=yaxis.max)continue;ctx.moveTo(0,Math.floor(tVert(v))+ctx.lineWidth/2);ctx.lineTo(plotWidth,Math.floor(tVert(v))+ctx.lineWidth/2)}ctx.stroke();if(D.grid.borderWidth){ctx.lineWidth=D.grid.borderWidth;ctx.strokeStyle=D.grid.color;ctx.lineJoin="round";ctx.strokeRect(0,0,plotWidth,plotHeight);ctx.restore()}}function insertLabels(){target.find(".tickLabels").remove();var i,tick;var a='<div class="tickLabels" style="font-size:smaller;color:'+D.grid.color+'">';for(i=0;i<xaxis.ticks.length;++i){tick=xaxis.ticks[i];if(!tick.label||tick.v<xaxis.min||tick.v>xaxis.max)continue;a+='<div style="position:absolute;top:'+(plotOffset.top+plotHeight+D.grid.labelMargin)+'px;left:'+(plotOffset.left+tHoz(tick.v)-xLabelBoxWidth/2)+'px;width:'+xLabelBoxWidth+'px;text-align:center" class="tickLabel">'+tick.label+"</div>"}for(i=0;i<yaxis.ticks.length;++i){tick=yaxis.ticks[i];if(!tick.label||tick.v<yaxis.min||tick.v>yaxis.max)continue;a+='<div style="position:absolute;top:'+(plotOffset.top+tVert(tick.v)-yLabelMaxHeight/2)+'px;left:0;width:'+yLabelMaxWidth+'px;text-align:right" class="tickLabel">'+tick.label+"</div>"}a+='</div>';target.append(a)}function drawSeries(a){if(a.lines.show||(!a.bars.show&&!a.points.show))drawSeriesLines(a);if(a.bars.show)drawSeriesBars(a);if(a.points.show)drawSeriesPoints(a)}function drawSeriesLines(h){function plotLine(a,b){var c,cur=null,drawx=null,drawy=null;ctx.beginPath();for(var i=0;i<a.length;++i){c=cur;cur=a[i];if(c==null||cur==null)continue;var d=c[0],y1=c[1],x2=cur[0],y2=cur[1];if(y1<=y2&&y1<yaxis.min){if(y2<yaxis.min)continue;d=(yaxis.min-y1)/(y2-y1)*(x2-d)+d;y1=yaxis.min}else if(y2<=y1&&y2<yaxis.min){if(y1<yaxis.min)continue;x2=(yaxis.min-y1)/(y2-y1)*(x2-d)+d;y2=yaxis.min}if(y1>=y2&&y1>yaxis.max){if(y2>yaxis.max)continue;d=(yaxis.max-y1)/(y2-y1)*(x2-d)+d;y1=yaxis.max}else if(y2>=y1&&y2>yaxis.max){if(y1>yaxis.max)continue;x2=(yaxis.max-y1)/(y2-y1)*(x2-d)+d;y2=yaxis.max}if(d<=x2&&d<xaxis.min){if(x2<xaxis.min)continue;y1=(xaxis.min-d)/(x2-d)*(y2-y1)+y1;d=xaxis.min}else if(x2<=d&&x2<xaxis.min){if(d<xaxis.min)continue;y2=(xaxis.min-d)/(x2-d)*(y2-y1)+y1;x2=xaxis.min}if(d>=x2&&d>xaxis.max){if(x2>xaxis.max)continue;y1=(xaxis.max-d)/(x2-d)*(y2-y1)+y1;d=xaxis.max}else if(x2>=d&&x2>xaxis.max){if(d>xaxis.max)continue;y2=(xaxis.max-d)/(x2-d)*(y2-y1)+y1;x2=xaxis.max}if(drawx!=tHoz(d)||drawy!=tVert(y1)+b)ctx.moveTo(tHoz(d),tVert(y1)+b);drawx=tHoz(x2);drawy=tVert(y2)+b;ctx.lineTo(drawx,drawy)}ctx.stroke()}function plotLineArea(a){var b,cur=null;var c=Math.min(Math.max(0,yaxis.min),yaxis.max);var d,lastX=0;var e=false;for(var i=0;i<a.length;++i){b=cur;cur=a[i];if(e&&b!=null&&cur==null){ctx.lineTo(tHoz(lastX),tVert(c));ctx.fill();e=false;continue}if(b==null||cur==null)continue;var f=b[0],y1=b[1],x2=cur[0],y2=cur[1];if(f<=x2&&f<xaxis.min){if(x2<xaxis.min)continue;y1=(xaxis.min-f)/(x2-f)*(y2-y1)+y1;f=xaxis.min}else if(x2<=f&&x2<xaxis.min){if(f<xaxis.min)continue;y2=(xaxis.min-f)/(x2-f)*(y2-y1)+y1;x2=xaxis.min}if(f>=x2&&f>xaxis.max){if(x2>xaxis.max)continue;y1=(xaxis.max-f)/(x2-f)*(y2-y1)+y1;f=xaxis.max}else if(x2>=f&&x2>xaxis.max){if(f>xaxis.max)continue;y2=(xaxis.max-f)/(x2-f)*(y2-y1)+y1;x2=xaxis.max}if(!e){ctx.beginPath();ctx.moveTo(tHoz(f),tVert(c));e=true}if(y1>=yaxis.max&&y2>=yaxis.max){ctx.lineTo(tHoz(f),tVert(yaxis.max));ctx.lineTo(tHoz(x2),tVert(yaxis.max));continue}else if(y1<=yaxis.min&&y2<=yaxis.min){ctx.lineTo(tHoz(f),tVert(yaxis.min));ctx.lineTo(tHoz(x2),tVert(yaxis.min));continue}var g=f,x2old=x2;if(y1<=y2&&y1<yaxis.min&&y2>=yaxis.min){f=(yaxis.min-y1)/(y2-y1)*(x2-f)+f;y1=yaxis.min}else if(y2<=y1&&y2<yaxis.min&&y1>=yaxis.min){x2=(yaxis.min-y1)/(y2-y1)*(x2-f)+f;y2=yaxis.min}if(y1>=y2&&y1>yaxis.max&&y2<=yaxis.max){f=(yaxis.max-y1)/(y2-y1)*(x2-f)+f;y1=yaxis.max}else if(y2>=y1&&y2>yaxis.max&&y1<=yaxis.max){x2=(yaxis.max-y1)/(y2-y1)*(x2-f)+f;y2=yaxis.max}if(f!=g){if(y1<=yaxis.min)d=yaxis.min;else d=yaxis.max;ctx.lineTo(tHoz(g),tVert(d));ctx.lineTo(tHoz(f),tVert(d))}ctx.lineTo(tHoz(f),tVert(y1));ctx.lineTo(tHoz(x2),tVert(y2));if(x2!=x2old){if(y2<=yaxis.min)d=yaxis.min;else d=yaxis.max;ctx.lineTo(tHoz(x2old),tVert(d));ctx.lineTo(tHoz(x2),tVert(d))}lastX=Math.max(x2,x2old)}if(e){ctx.lineTo(tHoz(lastX),tVert(c));ctx.fill()}}ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.lineJoin="round";var j=h.lines.lineWidth;var k=h.shadowSize;if(k>0){ctx.lineWidth=k/2;ctx.strokeStyle="rgba(0,0,0,0.1)";plotLine(h.data,j/2+k/2+ctx.lineWidth/2);ctx.lineWidth=k/2;ctx.strokeStyle="rgba(0,0,0,0.2)";plotLine(h.data,j/2+ctx.lineWidth/2)}ctx.lineWidth=j;ctx.strokeStyle=h.color;if(h.lines.fill){ctx.fillStyle=h.lines.fillColor!=null?h.lines.fillColor:parseColor(h.color).scale(null,null,null,0.4).toString();plotLineArea(h.data,0)}plotLine(h.data,0);ctx.restore()}function drawSeriesPoints(d){function plotPoints(a,b,c){for(var i=0;i<a.length;++i){if(a[i]==null)continue;var x=a[i][0],y=a[i][1];if(x<xaxis.min||x>xaxis.max||y<yaxis.min||y>yaxis.max)continue;ctx.beginPath();ctx.arc(tHoz(x),tVert(y),b,0,2*Math.PI,true);if(c)ctx.fill();ctx.stroke()}}function plotPointShadows(a,b,c){for(var i=0;i<a.length;++i){if(a[i]==null)continue;var x=a[i][0],y=a[i][1];if(x<xaxis.min||x>xaxis.max||y<yaxis.min||y>yaxis.max)continue;ctx.beginPath();ctx.arc(tHoz(x),tVert(y)+b,c,0,Math.PI,false);ctx.stroke()}}ctx.save();ctx.translate(plotOffset.left,plotOffset.top);var e=d.lines.lineWidth;var f=d.shadowSize;if(f>0){ctx.lineWidth=f/2;ctx.strokeStyle="rgba(0,0,0,0.1)";plotPointShadows(d.data,f/2+ctx.lineWidth/2,d.points.radius);ctx.lineWidth=f/2;ctx.strokeStyle="rgba(0,0,0,0.2)";plotPointShadows(d.data,ctx.lineWidth/2,d.points.radius)}ctx.lineWidth=d.points.lineWidth;ctx.strokeStyle=d.color;ctx.fillStyle=d.points.fillColor!=null?d.points.fillColor:d.color;plotPoints(d.data,d.points.radius,d.points.fill);ctx.restore()}function drawSeriesBars(g){function plotBars(a,b,c,d){for(var i=0;i<a.length;i++){if(a[i]==null)continue;var x=a[i][0],y=a[i][1];var e=true,drawTop=true,drawRight=true;var f=x,right=x+b,bottom=0,top=y;if(right<xaxis.min||f>xaxis.max||top<yaxis.min||bottom>yaxis.max)continue;if(f<xaxis.min){f=xaxis.min;e=false}if(right>xaxis.max){right=xaxis.max;drawRight=false}if(bottom<yaxis.min)bottom=yaxis.min;if(top>yaxis.max){top=yaxis.max;drawTop=false}if(d){ctx.beginPath();ctx.moveTo(tHoz(f),tVert(bottom)+c);ctx.lineTo(tHoz(f),tVert(top)+c);ctx.lineTo(tHoz(right),tVert(top)+c);ctx.lineTo(tHoz(right),tVert(bottom)+c);ctx.fill()}if(e||drawRight||drawTop){ctx.beginPath();ctx.moveTo(tHoz(f),tVert(bottom)+c);if(e)ctx.lineTo(tHoz(f),tVert(top)+c);else ctx.moveTo(tHoz(f),tVert(top)+c);if(drawTop)ctx.lineTo(tHoz(right),tVert(top)+c);else ctx.moveTo(tHoz(right),tVert(top)+c);if(drawRight)ctx.lineTo(tHoz(right),tVert(bottom)+c);else ctx.moveTo(tHoz(right),tVert(bottom)+c);ctx.stroke()}}}ctx.save();ctx.translate(plotOffset.left,plotOffset.top);ctx.lineJoin="round";var h=g.bars.barWidth;var j=Math.min(g.bars.lineWidth,h);ctx.lineWidth=j;ctx.strokeStyle=g.color;if(g.bars.fill){ctx.fillStyle=g.bars.fillColor!=null?g.bars.fillColor:parseColor(g.color).scale(null,null,null,0.4).toString()}plotBars(g.data,h,0,g.bars.fill);ctx.restore()}function insertLegend(){target.find(".legend").remove();if(!D.legend.show)return;var a=[];var b=false;for(i=0;i<C.length;++i){if(!C[i].label)continue;if(i%D.legend.noColumns==0){if(b)a.push('</tr>');a.push('<tr>');b=true}var d=C[i].label;if(D.legend.labelFormatter!=null)d=D.legend.labelFormatter(d);a.push('<td class="legendColorBox"><div style="border:1px solid '+D.legend.labelBoxBorderColor+';padding:1px"><div style="width:14px;height:10px;background-color:'+C[i].color+';overflow:hidden"></div></div></td>'+'<td class="legendLabel">'+d+'</td>')}if(b)a.push('</tr>');if(a.length>0){var e='<table style="font-size:smaller;color:'+D.grid.color+'">'+a.join("")+'</table>';if(D.legend.container!=null)D.legend.container.append(e);else{var f="";var p=D.legend.position,m=D.legend.margin;if(p.charAt(0)=="n")f+='top:'+(m+plotOffset.top)+'px;';else if(p.charAt(0)=="s")f+='bottom:'+(m+plotOffset.bottom)+'px;';if(p.charAt(1)=="e")f+='right:'+(m+plotOffset.right)+'px;';else if(p.charAt(1)=="w")f+='left:'+(m+plotOffset.bottom)+'px;';var g=$('<div class="legend">'+e.replace('style="','style="position:absolute;'+f+';')+'</div>').appendTo(target);if(D.legend.backgroundOpacity!=0.0){var c=D.legend.backgroundColor;if(c==null){var h;if(D.grid.backgroundColor!=null)h=D.grid.backgroundColor;else h=extractColor(g);c=parseColor(h).adjust(null,null,null,1).toString()}var j=g.children();$('<div style="position:absolute;width:'+j.width()+'px;height:'+j.height()+'px;'+f+'background-color:'+c+';"> </div>').prependTo(g).css('opacity',D.legend.backgroundOpacity)}}}}var F={pageX:null,pageY:null};var G={first:{x:-1,y:-1},second:{x:-1,y:-1}};var H=null;var I=null;var J=false;function onMouseMove(a){var e=a||window.event;if(e.pageX==null&&e.clientX!=null){var c=document.documentElement,b=document.body;F.pageX=e.clientX+(c&&c.scrollLeft||b.scrollLeft||0);F.pageY=e.clientY+(c&&c.scrollTop||b.scrollTop||0)}else{F.pageX=e.pageX;F.pageY=e.pageY}}function onMouseDown(e){if(e.which!=1)return;document.body.focus();if(document.onselectstart!==undefined&&workarounds.onselectstart==null){workarounds.onselectstart=document.onselectstart;document.onselectstart=function(){return false}}if(document.ondrag!==undefined&&workarounds.ondrag==null){workarounds.ondrag=document.ondrag;document.ondrag=function(){return false}}setSelectionPos(G.first,e);if(I!=null)clearInterval(I);F.pageX=null;I=setInterval(updateSelectionOnMouseMove,200);$(document).one("mouseup",onSelectionMouseUp)}function onClick(e){if(J){J=false;return}var a=eventHolder.offset();var b={};b.x=e.pageX-a.left-plotOffset.left;b.x=xaxis.min+b.x/hozScale;b.y=e.pageY-a.top-plotOffset.top;b.y=yaxis.max-b.y/vertScale;target.trigger("plotclick",[b])}function triggerSelectedEvent(){var a,x2,y1,y2;if(G.first.x<=G.second.x){a=G.first.x;x2=G.second.x}else{a=G.second.x;x2=G.first.x}if(G.first.y>=G.second.y){y1=G.first.y;y2=G.second.y}else{y1=G.second.y;y2=G.first.y}a=xaxis.min+a/hozScale;x2=xaxis.min+x2/hozScale;y1=yaxis.max-y1/vertScale;y2=yaxis.max-y2/vertScale;target.trigger("selected",[{x1:a,y1:y1,x2:x2,y2:y2}])}function onSelectionMouseUp(e){if(document.onselectstart!==undefined)document.onselectstart=workarounds.onselectstart;if(document.ondrag!==undefined)document.ondrag=workarounds.ondrag;if(I!=null){clearInterval(I);I=null}setSelectionPos(G.second,e);clearSelection();if(!selectionIsSane()||e.which!=1)return false;drawSelection();triggerSelectedEvent();J=true;return false}function setSelectionPos(a,e){var b=$(overlay).offset();if(D.selection.mode=="y"){if(a==G.first)a.x=0;else a.x=plotWidth}else{a.x=e.pageX-b.left-plotOffset.left;a.x=Math.min(Math.max(0,a.x),plotWidth)}if(D.selection.mode=="x"){if(a==G.first)a.y=0;else a.y=plotHeight}else{a.y=e.pageY-b.top-plotOffset.top;a.y=Math.min(Math.max(0,a.y),plotHeight)}}function updateSelectionOnMouseMove(){if(F.pageX==null)return;setSelectionPos(G.second,F);clearSelection();if(selectionIsSane())drawSelection()}function clearSelection(){if(H==null)return;var x=Math.min(H.first.x,H.second.x),y=Math.min(H.first.y,H.second.y),w=Math.abs(H.second.x-H.first.x),h=Math.abs(H.second.y-H.first.y);octx.clearRect(x+plotOffset.left-octx.lineWidth,y+plotOffset.top-octx.lineWidth,w+octx.lineWidth*2,h+octx.lineWidth*2);H=null}function setSelection(a){clearSelection();if(D.selection.mode=="x"){G.first.y=0;G.second.y=plotHeight}else{G.first.y=(yaxis.max-a.y1)*vertScale;G.second.y=(yaxis.max-a.y2)*vertScale}if(D.selection.mode=="y"){G.first.x=0;G.second.x=plotWidth}else{G.first.x=(a.x1-xaxis.min)*hozScale;G.second.x=(a.x2-xaxis.min)*hozScale}drawSelection();triggerSelectedEvent()}function drawSelection(){if(H!=null&&G.first.x==H.first.x&&G.first.y==H.first.y&&G.second.x==H.second.x&&G.second.y==H.second.y)return;octx.strokeStyle=parseColor(D.selection.color).scale(null,null,null,0.8).toString();octx.lineWidth=1;ctx.lineJoin="round";octx.fillStyle=parseColor(D.selection.color).scale(null,null,null,0.4).toString();H={first:{x:G.first.x,y:G.first.y},second:{x:G.second.x,y:G.second.y}};var x=Math.min(G.first.x,G.second.x),y=Math.min(G.first.y,G.second.y),w=Math.abs(G.second.x-G.first.x),h=Math.abs(G.second.y-G.first.y);octx.fillRect(x+plotOffset.left,y+plotOffset.top,w,h);octx.strokeRect(x+plotOffset.left,y+plotOffset.top,w,h)}function selectionIsSane(){var a=5;return Math.abs(G.second.x-G.first.x)>=a&&Math.abs(G.second.y-G.first.y)>=a}}$.plot=function(a,b,c){var d=new Plot(a,b,c);return d};function floorInBase(n,a){return a*Math.floor(n/a)}function Color(r,g,b,a){var e=['r','g','b','a'];var x=4;while(-1<--x){this[e[x]]=arguments[x]||((x==3)?1.0:0)}this.toString=function(){if(this.a>=1.0){return"rgb("+[this.r,this.g,this.b].join(",")+")"}else{return"rgba("+[this.r,this.g,this.b,this.a].join(",")+")"}};this.scale=function(a,b,c,d){x=4;while(-1<--x){if(arguments[x]!=null)this[e[x]]*=arguments[x]}return this.normalize()};this.adjust=function(a,b,c,d){x=4;while(-1<--x){if(arguments[x]!=null)this[e[x]]+=arguments[x]}return this.normalize()};this.clone=function(){return new Color(this.r,this.b,this.g,this.a)};var f=function(a,b,c){return Math.max(Math.min(a,c),b)};this.normalize=function(){this.r=f(parseInt(this.r),0,255);this.g=f(parseInt(this.g),0,255);this.b=f(parseInt(this.b),0,255);this.a=f(this.a,0,1);return this};this.normalize()}var K={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0]};function extractColor(a){var b,elem=a;do{b=elem.css("background-color").toLowerCase();if(b!=''&&b!='transparent')break;elem=elem.parent()}while(!$.nodeName(elem.get(0),"body"));if(b=="rgba(0, 0, 0, 0)")return"transparent";return b}function parseColor(a){var b;if(b=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a))return new Color(parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10));if(b=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a))return new Color(parseInt(b[1],10),parseInt(b[2],10),parseInt(b[3],10),parseFloat(b[4]));if(b=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(a))return new Color(parseFloat(b[1])*2.55,parseFloat(b[2])*2.55,parseFloat(b[3])*2.55);if(b=/rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(a))return new Color(parseFloat(b[1])*2.55,parseFloat(b[2])*2.55,parseFloat(b[3])*2.55,parseFloat(b[4]));if(b=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a))return new Color(parseInt(b[1],16),parseInt(b[2],16),parseInt(b[3],16));if(b=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(a))return new Color(parseInt(b[1]+b[1],16),parseInt(b[2]+b[2],16),parseInt(b[3]+b[3],16));var c=$.trim(a).toLowerCase();if(c=="transparent")return new Color(255,255,255,0);else{b=K[c];return new Color(b[0],b[1],b[2])}}})(jQuery);
