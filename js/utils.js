window.utils = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('templates/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },
    showAlert: function(title, text, className) {
        $('.container').append('<div class=\"alert\" style=\"display:none; width:200px;\"/>');
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(className);
        $('.alert').html('<button type="button" class="close" data-dismiss="alert">&times;</button><h4>' + title + '</h4> ' + text);
        $('.alert').show();
    }
};