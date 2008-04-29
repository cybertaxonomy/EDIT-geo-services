(function ($) {
    
    $.fn.loading = function (options) {
        var defaults = {
            key: "id",
            value: "nose"
        };
        
        var settings = $.extend({}, options, defaults);
        //alert(eval(settings));
        if (!(settings.target instanceof $)) settings.target = $(settings.target);
        
        return this.each(function () {
            var $$ = $(this);
            
            $$.change(function () {
                var data = null;
                if (typeof settings.data == 'string') {
                    data = settings.data + '&' + this.name + '=' + $$.val();
                } else if (typeof settings.data == 'object') {
                    data = settings.data;
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

                        settings.target
                            .html(options.join(''))

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
                });
            });
        });
    };
})(jQuery);
