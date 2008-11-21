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
//     $("#color_form,#symbol_form,#size_form").empty();                   
   $("#ex2").animate({width:'380',height:'325'},"slow");
     var selected_genus=new Array();
   var submit=iframe.contents().find("#submit");  //submit is the id of the "submit" button in the iframe
  // var options=$('#categorySelect option:selected'
   submit.click(
   function(){

     //  $(".restart").click(function() {
//$(".ex2trigger").trigger("click");

//                $("iframe#info").fadeIn("slow").not("iframe#info").fadeOut();
 //	$("#color_form,#symbol_form,#size_form").empty();                   
  /*    
           for (i=1;i<(10);i++)
           {
               xpath="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Size/ogc:Literal";
 xpath2="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:WellKnownName";            xpath3="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:Fill/sld:CssParameter[@name='fill']/ogc:Literal";
SizeNode=config.objects.mySLD.doc.selectSingleNode(""+xpath+"").firstChild;
 SymbolNode=config.objects.mySLD.doc.selectSingleNode(""+xpath2+"").firstChild;    ColorNode=config.objects.mySLD.doc.selectSingleNode(""+xpath3+"").firstChild;
SymbolNode.nodeValue="square";
SizeNode.nodeValue="3";
 ColorNode.nodeValue="#f5ee89";
           }
           config.objects.mySLD.saveModel(config.objects.mySLD); //saveModel in ModelBase.js
           config.objects.mainMap.setParam("refresh")

       });
  */     

    var submit=iframe.contents().find('#categorySelect option:selected');
    
    var genus_size=iframe.contents().find('#categorySelect option').size();
	// var inputs = [];
	var htm="<form style='width: 180px;'><div id='picker' style='position:absolute;left:185px'></div><table  style='position:relative;left:0px;top:0px;background-color:transparent'>";
	submit.each( function() {	  
          
    //        var selected_genus2=iframe.contents().find('#categorySelect option:selected').val();
            selected_genus.push(parseInt(this.value)); //this.value donarà 0,1,2...o Bubas,Caccobius...????
          //  console.log(selected_genus);
            // si 2ª... submit.each( function(index,data) {selected_genus.push(index)}; -->NO NECESSARI!
        //    $.each(selected_genus,function(index,data))
		htm+="<tr style='width: 178px;'><td style='width: 100px;font-size:8pt'>"+escape(this.text)+"</td><td style='width: 78px;'><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td></tr>";
//		$("#symbol_form").append(option);
		});
	htm+="</form></table>";
	
	$("#color_form").append(htm);
	
    htm2="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
    submit.each( function() {	  
    	htm2+="<tr><td align='center' style='font-size:8pt'>"+escape(this.text)+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value='circle'>Circle</option><option value='square'>square</option></select></td></tr>";
	});
	htm2+="</table></form>";
	$("#symbol_form").append(htm2);
	
	 htm="<form  action='' style='width: 180px;'><table style='background-color:transparent'>";
	submit.each( function() {	  
    	htm+="<tr><td align='center' style='font-size:8pt'>"+escape(this.text)+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>";
          });
         htm+="</table></form>"
        $("#size_form").append(htm);
//        $("#ex2").animate({width:'390',height:'235'},"slow");
 $("#ex2").animate({width:'390',height:'235'},"slow");
       
		  $('iframe#info').slideUp("slow");
		  $("#informacio,#restart").show();
		  $("#info").hide(); //l'iframe
		  
//		  var home=$('#symbol_form a')[0];
		  //home.click(function(){})
		  var to_size=$('#symbol_form a')[0];
		  var back_color=$('#symbol_form a')[1];
$("#informacio,.restart").click(function(){$('#informacio').hide();$('#color_form').show(); 

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
//console.info(selected_genus);
Size=[];
//count podria ser a qualsevol camp (donaria igual resultat)
//count=$('#symbol_form option:selected').size();
count=$('#symbol_form option').size();
Symbol=[];
$("#symbol_form option:selected").each (function()
{
Symbol.push(this.value);

});
//fconsole.info(Symbol);
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



var to_original_SLD=function ()
{ 

for (i=1;i<(10);i++)
{
    xpath="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Size/ogc:Literal";
    //console.log(xpath); 
      xpath2="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:WellKnownName";
 xpath3="//sld:Rule["+i+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:Fill/sld:CssParameter[@name='fill']/ogc:Literal";

//SizeNode2=config.objects.mySLD.doc.selectSingleNode(""+xpath+"");
    //console.dirxml(SizeNode2); //modifica lo ja existent però no del NO_BORRAR.sld sinò del que s'acaba de crear
   SizeNode=config.objects.mySLD.doc.selectSingleNode(""+xpath+"").firstChild;
    //console.log(SizeNode);  
     SymbolNode=config.objects.mySLD.doc.selectSingleNode(""+xpath2+"").firstChild;    ColorNode=config.objects.mySLD.doc.selectSingleNode(""+xpath3+"").firstChild;
//console.dirxml(SymbolNode);

SymbolNode.nodeValue="square";
SizeNode.nodeValue="3";
ColorNode.nodeValue="#f5ee89";
}
config.objects.mySLD.saveModel(config.objects.mySLD); //saveModel in ModelBase.js
config.objects.mainMap.setParam("refresh")
}

//console.info(selected_genus);
/*
$.each(selected_genus,function(index,data)
{
    console.log(index+'----'+data);
});
*/
//console.warn(selected_genus);
//selected_genus=parseInt(selected_genus);
//console.warn(selected_genus);
$.each(selected_genus,function(n,info)

{
//    console.warn(info);
    var info=(info+1);
  //  console.warn(info);
    
xpath="//sld:Rule["+info+"]/sld:PointSymbolizer/sld:Graphic/sld:Size/ogc:Literal";
//console.log(xpath);
xpath2="//sld:Rule["+info+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:WellKnownName";

xpath3="//sld:Rule["+info+"]/sld:PointSymbolizer/sld:Graphic/sld:Mark/sld:Fill/sld:CssParameter[@name='fill']/ogc:Literal";

//console.info(Sizers);
SizeNode2=config.objects.mySLD.doc.selectSingleNode(""+xpath+"");
//console.dirxml(SizeNode2); //modifica lo ja existent però no del NO_BORRAR.sld sinò del que s'acaba de crear
SizeNode=config.objects.mySLD.doc.selectSingleNode(""+xpath+"").firstChild;
//console.log(SizeNode);
SymbolNode=config.objects.mySLD.doc.selectSingleNode(""+xpath2+"").firstChild;
ColorNode=config.objects.mySLD.doc.selectSingleNode(""+xpath3+"").firstChild;
//console.info(ColorNode);
SymbolNode.nodeValue=Symbols[n];
SizeNode.nodeValue=Sizers[n];
ColorNode.nodeValue=Colors[n];

});
//console.dirxml(config.objects.mySLD.doc);
config.objects.mySLD.saveModel(config.objects.mySLD); //saveModel in ModelBase.js
config.objects.mainMap.setParam("refresh")
$('#llegenda').slideDown()	
	});
    }); 
	};

    var text='Data symbolization (click here and drag me)';

    var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" class="jqmdX jqmClose"/><iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.csic.es/edit_geo/prototype/formularis/select_formulari.html" frameBorder=0 width=380 height=300; background-color=#D7DBDF"></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!<br><br><strong> Click here to Continue the symbolization</strong></div><div id="color_form"><a>Edit symbol</a></div><div id="symbol_form"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></div><div id="size_form"><a>Back to edit symbol</a></div><button id="send" value="symbolize it!">Symbolize it!</button>';

    $('#ex2').append(jq);
    bindFrameActions();
	$('#ex2').show();
		
$('#ex2')
   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
	});
