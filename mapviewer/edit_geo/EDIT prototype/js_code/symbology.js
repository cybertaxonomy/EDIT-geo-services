$(document).ready(function(){

var bindFrameActions=function() {
$('form[@id*="_form"]').hide();
$("#send").hide();
$("#informacio").hide();
	//$("#send").hide();
	//$("#informacio").hide();
   var iframe=$('iframe#info'); 
   $('input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){$(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#ex2').hide()});
 iframe.load (function()
   {

   var submit=iframe.contents().find("#submit");  //submit is the id of the "submit" button in the iframe
  // var options=$('#categorySelect option:selected'
   submit.click(
   function()
   {
    var submit=iframe.contents().find('#categorySelect option:selected');
	// var inputs = [];
	submit.each( function() {	  
	//inputs.push(escape(this.value));
	$("#color_form").append("<tr><td>"+escape(this.value)+"</td><td><input type='text' id='color1' name='color1' class='colorwell' value='#123456' /></td><tr>");
	$("#symbol_form").append("<tr><td align='center'>"+escape(this.value)+"</td><td><select id='symbol' class='symbology'><option value='Star'>Star</option><option value='cross'>Cross</option><option value='triangle'>Triangle</option><option value=circle'>Circle</option><option value='square'>square</option></select></td></tr>");
	$("#size_form").append("<tr><td align='center'>"+escape(this.value)+"</td><td><select id='size' class='size'><option value='5'>5</option><option value='7'>7</option><option value='12'>12</option><option value='20'>20</option></select></td></tr>");
	// $("#generos table").append("<tr>"+escape(this.value)+"<td id='color'>color</td></tr>");	 
          })
		  $('iframe#info').slideUp("slow");
		  $("#informacio").show();
		  
		  
		  var to_size=$('#symbol_form a')[0];
		  var back_color=$('#symbol_form a')[1];
$("#informacio").click(function(){$('#color_form').show();$("#informacio").hide();$("#send").show()});$('#color_form a').click(function(){$('#color_form').slideUp("quick");$('#symbol_form').show()});$(to_size).click(function(){$('#symbol_form').slideUp("quick");$('#size_form').show()});$(back_color).click(function(){$('#symbol_form').slideUp("quick");$('#color_form').show();});
$("#size_form a").click(function(){$('#size_form').slideUp("quick");$('#symbol_form').show();})
		  
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
      }); 
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

	});
	
    }); 
	};

var text='Data symbolization (click here and drag me)';

var jq='<div class="jqmdTL" style="background-size: 40%; z-index: 300;"><div class="jqmdTR"><div class="jqmdTC jqDrag">'+text+'</div><input type="image" src="JQ_win_files/close.gif" class="jqmdX jqmClose" /></div></div>';
jq+='<iframe id="info" name="nom_iframe" class="jqDrag" marginWidth=0 marginHeight=0 src="http://edit.csic.es/edit_geo/prototype/select_formulari.html" frameBorder=0 width=330 height=250></iframe><div id="informacio">Now you can Select the symbology. Press the button only after you have chosen all possibilities!</div><form id="color_form" action="" style="width: 370px;"><a>Edit symbol</a><div id="picker" style="float: right;"></div></form><form id="symbol_form" action="" style="width: 350px;"><a>Edit size</a><div style="float:center;"><a>Back to edit color</a></div></form><form id="size_form" action="" style="width: 350px;"><a>Back to edit symbol</a></form><button id="send" value="symbolize it!">Symbolize it!</button></div></div>';

    $('#ex2').html(jq);
    bindFrameActions();
	$('#ex2').show();
		
$('#ex2')

   .jqDrag('.jqDrag')
   .jqResize('.jqResize') ;	
	});
