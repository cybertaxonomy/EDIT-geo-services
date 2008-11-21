$(document).ready(function(){

var bindFrameActions=function() {
//alert("binding from symbology");
$('#ex2').jqm({
    overlay: 30
})

$('div[@id*="_form"]').hide();
$("#send").hide();
$("#informacio").hide();
	//$("#send").hide();
	//$("#informacio").hide();
   var iframe=$('iframe#info'); 

msie=($.browser.msie==true)?true:false; 
if (msie)
{
    $('input.jqmdX').css('background','url(http://edit.csic.es/edit_geo/prototype/images/close_icon.png) no-repeat').css('width','15px')
}
else {
$('input.jqmdX').css('background','url(http://edit.csic.es/edit_geo/prototype/JQ_win_files/close.gif) no-repeat top left;');
 }
   $('input.jqmdX').hover(function(){
       $(this).addClass('jqmdXFocus')},function(){        $(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex2').hide()});

 /*
 $('input.jqmdX')
   .hover(
     function(){ $(this).addClass('jqmdXFocus'); }, 
     function(){ $(this).removeClass('jqmdXFocus'); })
   .focus( 
     function(){ this.hideFocus=true; $(this).addClass('jqmdXFocus'); })
   .blur( 
     function(){ $(this).removeClass('jqmdXFocus'); });
 */
 iframe.load (function()
   {
   $("#ex2").animate({width:'380',height:'325'},"slow");
   var submit=iframe.contents().find("#submit");  //submit is the id of the "submit" button in the iframe
  // var options=$('#categorySelect option:selected'
   submit.click(
   function(){
  
//    style="width:390;height:230;"
    var submit=iframe.contents().find('#categorySelect option:selected');
console.log(submit);
	// var inputs = [];
	var htm="<form style='width: 180px;'><div id='picker' style='position:absolute;left:185px'></div><table  style='position:relative;left:0px;top:0px;background-color:transparent'>";
	submit.each( function() {	  
//console.log(this.value);
//new genus();
		htm+="<tr style='width: 178px;'><td style='width: 100px;'>"+escape(this.value)+"</td><td style='width: 78px;'><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
//		$("#symbol_form").append(option);
		});
	htm+="</form></table>";
	
	$("#color_form").append(htm);
	
    htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
    submit.each( function() {	  
    	htm+="<tr><td align='center'>"+escape(this.value)+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value=circle'>Circle</option><option value='square'>square</option></select></td></tr>";
	});
	htm+="</table></form>";
	$("#symbol_form").append(htm);
	
	 htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
	submit.each( function() {	  
    	htm+="<tr><td align='center'>"+escape(this.value)+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
          });
         htm+="</table></form>"
        $("#size_form").append(htm);
//        $("#ex2").animate({width:'390',height:'235'},"slow");
 $("#ex2").animate({width:'390',height:'235'},"slow");
       
		  $('iframe#info').slideUp("slow");
		  $("#informacio").show();
		  $("#info").hide(); //l'iframe
		  
		  var to_size=$('#symbol_form a')[0];
		  var back_color=$('#symbol_form a')[1];
$("#informacio").click(function(){$('#informacio').hide();$('#color_form').show(); 

var form_height=$('#color_form').height() ;
msie=($.browser.msie==true)?true:false; 
//$("#send").show():alert("not msie");
//TO DO !!!   var adapt=function (target,param)
//
if (msie)
{
   $("#send").show();
//   alert("msie");
   $("#ex2").animate({height:form_height},"slow");
   $("#color_form").fadeIn("slow");
}
else {
    height=(form_height > '235')?$("#color_form").fadeIn("slow"):$("#color_form").animate({height:'190'},"slow");
    $("#send").show();   

}
});
//alert("mes de 10"):alert("menor de 10")
//$("#color_form").animate({height:'190'},"slow");


$('#color_form a').click(function(){$('#color_form').slideUp("quick");

//var form_height=$('#color_form').height() ;
//height=(form_height >'235')?$("#symbol_form").fadeIn("slow"):$("#symbol_form").animate({height:'215'},"slow");
//alert("mes de 10"):alert("menor de 10")

//$('#symbol_form').show();
var form_width=$('#symbol_form').width() ;
$("#ex2").animate({width: form_width}, "slow");

 $("#symbol_form").animate({height:'190'},"slow");
});$(to_size).click(function(){$('#symbol_form').slideUp("quick");
$('#size_form').show();
var size_width=$('#size_form').width();
$('#size_form').show();
 $("#ex2").animate({width: size_width}, "slow");});
 
 $(back_color).click(function(){$('#symbol_form').slideUp("quick");
 $('#color_form').show();
  $("#ex2").animate({width: "365"}, "slow");
  });
$("#size_form a").click(function(){$('#size_form').slideUp("quick");$('#symbol_form').show();})
	
	var f = $.farbtastic('#picker');
    var p = $('#picker').css('opacity', 0.25);
    var selected;
    $('.colorwell')
      .each(function () { f.linkTo(this); $(this).css('opacity', 0.75); })
      .focus(function() {
        if (selected) {
          $(selected).css('opacity', 0.75).removeClass('colorwell-selected');
        }
        f.linkTo(this);
        p.css('opacity', 1);
        $(selected = this).css('opacity', 1).addClass('colorwell-selected');
      });
		  /*
	 var f = $.farbtastic('#picker');
    var p = $('#picker').css('opacity', 0.25);
    var selected;
    $('.colorwell')
      .each(function () { f.linkTo(this); $(this).css('opacity', 0.75); })
	  .focus(function() {$('#picker').show();})
      .focus(function() {
        if (selected) {
          $(selected).css('opacity', 0.75).removeClass('colorwell-selected');
        }
        f.linkTo(this);
        p.css('opacity', 1);
        $(selected = this).css('opacity', 1).addClass('colorwell-selected');
      });*/ 
	});	  

$("#send").click(function()
	{
Size=[];
//count podria ser a qualsevol camp (donaria igual resultat)
count=$('#symbol_form option:selected').size();

Symbol=[];
$("#symbol_form option:selected").each (function()
{
Symbol.push(this.value);
});
//console.info(Symbol);
Sizers=[];
$("#size_form option:selected").each (function(index)
{
Sizers.push(this.value);

});

Symbols=[];
$("#symbol_form option:selected").each (function(index)
{
Symbols.push(this.value);
});

Colors=[];
$("#color_form input").each (function(index)
{
Colors.push(this.value);
});
/*
for (i=1;i<(count+1);i++)
{
xpath="//wmc:Rule["+i+"]/wmc:PointSymbolizer/wmc:Graphic/wmc:Size";
xpath2="//wmc:Rule["+i+"]/wmc:PointSymbolizer/wmc:Graphic/wmc:Mark/wmc:WellKnownName";
xpath3="//wmc:Rule["+i+"]/wmc:PointSymbolizer/wmc:Graphic/wmc:Mark/wmc:Fill/wmc:CssParameter[@name='fill']/wmc:Literal";

SizeNode=config.objects.mainMap.doc.selectSingleNode(""+xpath+"").firstChild;
SymbolNode=config.objects.mainMap.doc.selectSingleNode(""+xpath2+"").firstChild;
ColorNode=config.objects.mainMap.doc.selectSingleNode(""+xpath3+"").firstChild;
//console.dirxml(SymbolNode);
z=i-1;

SymbolNode.nodeValue=Symbols[z];
SizeNode.nodeValue=Sizers[z];
ColorNode.nodeValue=Colors[z];
}

config.objects.mainMap.setParam("refresh");
*/
/*for (var count=0;count<array.length;count++)
{
    
}*/
for (i=1;i<(count+1);i++)
{
//xpath="//sld:Rule"
xpath="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Size/ogc:Literal";

xpath2="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:WellKnownName";

xpath3="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:Fill/sld:CssParameter[@name='fill']/ogc:Literal";
SizeNode=config.objects.mySLD.doc.selectSingleNode(""+xpath+"").firstChild;
SymbolNode=config.objects.mySLD.doc.selectSingleNode(""+xpath2+"").firstChild;
ColorNode=config.objects.mySLD.doc.selectSingleNode(""+xpath3+"").firstChild;

z=i-1;
SymbolNode.nodeValue=Symbols[z];
SizeNode.nodeValue=Sizers[z];
ColorNode.nodeValue=Colors[z];
}
config.objects.mySLD.saveModel(config.objects.mySLD);
config.objects.mainMap.setParam("refresh")
$('#llegenda').slideDown()	
	});
    }); 
	};

    var text='Data symbolization (click here and drag me)';

    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/><iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.csic.es/edit_geo/prototype/formularis/select_formulari.html" frameBorder=0 width=380 height=300; background-color=#D7DBDF"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!<br><br><strong> Click here to Continue</strong></div><div id="color_form"><a>Edit symbol</a></div><div id="symbol_form"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form"><a>Back to edit symbol</a></div><button id="send" value="symbolize it!">Symbolize it!</button>';
    

/*
//jq+='<div> hola hola manola</div>';

jq+='<iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.csic.es/edit_geo/prototype/formularis/select_formulari.html" frameBorder=0 width=330 height=250></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div><form id="color_form" action="" style="width: 370px;"><a>Edit symbol</a><div id="picker" style="float: right;"></div></form><form id="symbol_form" action="" style="width: 350px;"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></form><form id="size_form" action="" style="width: 350px;"><a>Back to edit symbol</a></form><button id="send" value="symbolize it!">Symbolize it!</button>';

jq+='<iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.csic.es/edit_geo/prototype/formularis/select_formulari.html" frameBorder=0 width=330 height=250></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div><form id="color_form" action="" style="width: 370px;"><a>Edit symbol2</a><div id="picker" style="float: right;"></div></form><form id="symbol_form" action="" style="width: 350px;"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></form><form id="size_form" action="" style="width: 350px;"><a>Back to edit symbol</a></form><button id="send" value="symbolize it!">Symbolize it!</button></div></div>';
*/
    $('#ex2').append(jq);
    bindFrameActions();
	$('#ex2').show();
		
$('#ex2')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
	});
