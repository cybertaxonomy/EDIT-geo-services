$(document).ready(function(){
var bindBehaviors=function(){$(document).ready(function()
{

msie=($.browser.msie==true)?true:false; 
if (msie)
{

 $('input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif)  no-repeat top left').css('width','14px');
}
else 
{
$('input.jqmdX').css('background','url(http://taxonomicindex.africamuseum.be/edit_wp5/geo/mapviewer/img/close.gif) no-repeat top left');
}

$('#query_result input.jqmdX').hover(function(){$(this).addClass('jqmdXFocus')},function(){$(this).removeClass('jqmdXFocus')}).focus(function(){this.hideFocus=true;$(this).addClass('jqmdXFocus')}).blur(function(){$(this).removeClass('jqmdXFocus')}).click(function(){$('#query_result').hide()});
	$('#query_result').jqDrag('.jqDrag').jqResize('.jqResize');
	$("#query_result").show();	
	
$('#query_result table.paginated').each(function(){var currentPage=0;var numPerPage=10;
var $table=$(this);
$table.bind('repaginate',function(){$table.find('tbody tr').show().slice(0,currentPage*numPerPage).hide().end().slice((currentPage+1)*numPerPage-1).hide().end()});
var numRows=$table.find('tbody tr').length;
;var numPages=Math.ceil(numRows/numPerPage);var $pager=$('<div class="pager"></div>');for(var page=0;page<numPages;page++){$('<span class="page-number">'+(page+1)+'</span>').bind('click',{'newPage':page},function(event){currentPage=event.data['newPage'];$table.trigger('repaginate');$(this).addClass('active').siblings().removeClass('active')}).appendTo($pager).addClass('clickable')}$pager.find('span.page-number:first').addClass('active');$pager.insertBefore($table);$table.trigger('repaginate')})});



$.fn.alternateRowColors=function(){$('tbody tr:odd',this).removeClass('even').addClass('odd');$('tbody tr:even',this).removeClass('odd').addClass('even');return this};

$('table.sortable').each(function(){
var $table=$(this);$table.alternateRowColors();$table.find('th').each(function(column){var findSortKey;if($(this).is('.sort-alpha')){findSortKey=function($cell){return $cell.find('.sort-key').text().toUpperCase()+' '+$cell.text().toUpperCase()}}else if($(this).is('.sort-numeric')){findSortKey=function($cell){var key=parseFloat($cell.text().replace(/^[^\d.]*/,''));return isNaN(key)?0:key}}else if($(this).is('.sort-date')){findSortKey=function($cell){return Date.parse('1 '+$cell.text())}}if(findSortKey){$(this).addClass('clickable').hover(function(){$(this).addClass('hover')},function(){$(this).removeClass('hover')}).click(function(){var newDirection=1;if($(this).is('.sorted-asc')){newDirection=-1}var rows=$table.find('tbody > tr').get();$.each(rows,function(index,row){row.sortKey=findSortKey($(row).children('td').eq(column))});rows.sort(function(a,b){if(a.sortKey<b.sortKey)return-newDirection;if(a.sortKey>b.sortKey)return newDirection;return 0});$.each(rows,function(index,row){$table.children('tbody').append(row);row.sortKey=null});$table.find('th').removeClass('sorted-asc').removeClass('sorted-desc');var $sortHead=$table.find('th').filter(':nth-child('+(column+1)+')');if(newDirection==1){$sortHead.addClass('sorted-asc')}else{$sortHead.addClass('sorted-desc')}$table.find('td').removeClass('sorted').filter(':nth-child('+(column+1)+')').addClass('sorted');$table.alternateRowColors().trigger('repaginate')})}})
})


}; //fi de funcion BindBehaviours

$('#content').remove();

	 $.get('http://taxonomicindex.africamuseum.be/edit_wp5/geo/queries/polygon_query_sld_adaptat.php', {param: polygon,user:userid }, function(data) {$("#query_container").append(data); bindBehaviors(data);$("#repaginate2").show()});


});