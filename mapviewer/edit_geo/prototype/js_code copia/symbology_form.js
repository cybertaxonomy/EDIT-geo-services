(function($){
	
$.fn.selectChain=function(options,param){
//	console.warn("executing selectChain");
	var defaults={key:"id",value:"nose"};var settings=$.extend({},options,defaults);if(!(settings.target instanceof $))settings.target=$(settings.target);if(param="load"){return this.each(function(){var $$=$(this);$$.ready(function(){var data=null;if(typeof settings.data=='string'){data=settings.data+'&'+this.name+'='+$$.val()}else if(typeof settings.data=='object'){
		data=settings.data;data[this.name]=$$.val();}settings.target.empty();$.ajax({url:settings.url,data:data,type:(settings.type||'get'),dataType:'json',success:function(j){var options=[],i=0;for(i=0;i<j.length;i++){if(typeof j[i]=='object'){
    
options.push('<option value="'+j[i][settings.key]+'">'+j[i][settings.value]+'</option>')}else if(typeof j[i]=='string'){
         options.push('<option value="'+i+'">'+j[i]+'</option>')}}settings.target.html(options.join(''));setTimeout(function(){settings.target.find('option:first').attr('selected','selected').parent('select').trigger('change')},0)},error:function(xhr,desc,er){alert("an error occurred")}})})})}else{alert("no paraaam")}};

$.fn.selects=function(options,param){
	var defaults={key:"id",value:"nose"};
	var settings=$.extend({},options,defaults);
	if(!(settings.target instanceof $))settings.target=$(settings.target); 
//this=$('#categorySelect  option:selected');
return this.each(function(){var $$=$(this);
//console.log($$);
$$.change(function(){var data=null;if(typeof settings.data=='string'){data=settings.data+'&'+this.name+'='+$$.val()}else if(typeof settings.data=='object'){//console.info("dealing with objects");
data=settings.data; 
data[this.name]=$('#categorySelect  option:selected').text();
//data[genus]="Copris"
}settings.target.empty();$.ajax({url:settings.url,data:data,type:(settings.type||'get'),dataType:'json',success:function(j){var options=[],i=0;for(i=0;i<j.length;i++){if(typeof j[i]=='object'){    options.push('<option value="'+j[i][settings.key]+'">'+j[i][settings.value]+'</option>')}else if(typeof j[i]=='string'){options.push('<option value="'+j[i]+'">'+j[i]+'</option>')}}settings.target.html(options.join(''));setTimeout(function(){settings.target.find('option:first').attr('selected','selected').parent('select').trigger('change')},0)},error:function(xhr,desc,er){alert("an error occurred")}})})})}})(jQuery);