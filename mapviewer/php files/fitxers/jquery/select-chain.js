(function ($) {
  //$.fn: A shorthand for $(document).ready(), allowing you to bind a function to be executed when the DOM document has finished loading.  
    //$.fn.load
	
	$.fn.selectChain = function (options,param) {
        var defaults = {
            key: "id",
            value: "nose"
        };
        //Extend one object with one or more others, returning the original, modified, object. This is a great utility for simple inheritance.
		/*
		var settings = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
jQuery.extend(settings, options);
settings == { validate: true, limit: 5, name: "bar" }

Merge defaults and options, without modifying the defaults

var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };
var settings = jQuery.extend({}, defaults, options);
settings == { validate: true, limit: 5, name: "bar" }
*/
        var settings = $.extend({}, options, defaults);
        //alert(eval(settings));
        if (!(settings.target instanceof $)) settings.target = $(settings.target);
		if (param="load")
		{
/*Execute a function within the context of every matched element. This means that every time the passed-in function is executed (which is once for every element matched) the 'this' keyword points to the specific element.
Additionally, the function, when executed, is passed a single argument representing the position of the element in the matched set. 
$("img").each(function(i){
  this.src = "test" + i + ".jpg";
});
*/    

//cada vegada que cridem a la funcio selectChain...
        return this.each(function () {
            var $$ = $(this);
            //   $$.change(function () {
           
			$$.ready(function () {
                var data = null;
                if (typeof settings.data == 'string') {
                    data = settings.data + '&' + this.name + '=' + $$.val();
					alert("string");
                } else if (typeof settings.data == 'object') {
                    data = settings.data;
					//alert("object");
                    data[this.name] = $$.val();
                }
                
               settings.target.empty();
                
                $.ajax({
                    url: settings.url,
                    data: data,
                    type: (settings.type || 'get'),
                    dataType: 'json',
                    success: function (j) {
                        var options = [], i = 0;
                        
                        for (i = 0; i < j.length; i++) {
                            if (typeof j[i] == 'object') {
                                options.push('<option value="' + j[i][settings.key] + '">' + j[i][settings.value] + '</option>'); 
                            } else if (typeof j[i] == 'string') {
                                options.push('<option value="' + j[i] + '">' + j[i] + '</option>');
							
                            }
                        }

                        settings.target.html(options.join(''));
                           //$("#elementSelect")
						   

			// hand control back to browser for a moment
			setTimeout(function () {
			    settings.target
                                .find('option:first')
                                .attr('selected', 'selected')
                                .parent('select')
                                .trigger('change');
			}, 0);
                    },
                    error: function (xhr, desc, er) {
                        // add whatever debug you want here.
			alert("an error occurred");
                    }
					//function ({ alert("nova funcio a executar");});
					
                });
            });
        });
    }
	else { alert ("no paraaam");}
	};
})(jQuery);
