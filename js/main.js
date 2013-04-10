window.Book = Backbone.Model.extend({
urlRoot:"api/book",
idAttribute:"id"
});

window.BooksCollection = Backbone.Collection.extend({
model:Book,
url:"api/books"
});


window.BookListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var books = this.model.models;

        $(this.el).html('<ul class="thumbnails"></ul>');

		
		_.each(this.model.models, function (Book) {
            $('.thumbnails').append(new BookListItemView({model:Book}).render().el);
        }, this);
        return this;
    }
});

window.BookListItemView = Backbone.View.extend({

    tagName: "li",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});


window.BookView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        $('.content').html(this.template(this.model.toJSON()));
        return this;
    },

    events: {
        "change"        : "change"
    },

    change: function (event) {

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
        console.log('test2424');

        
    }

});


var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "list",
        "book/:id"         : "bookDetails"
    },
	list: function(page) {
        if(!window.booksList){
            $('.spinner').show();
            window.booksList = new BooksCollection();
            window.booksList.fetch({success: function(){
                $('.spinner').fadeOut(0);
                new BookListView({model: window.booksList});
            }});
        } else {
            $('.thumbnail').fadeIn(0);
            $('.content').fadeOut(0);
        }
        
    },

    bookDetails: function (id) {
        book = new Book({id: id});
        book.fetch({success: function(){
            $('.thumbnail').fadeOut(0);
            new BookView({model: book});
            $('.content').fadeIn(0);
        },
        error:function(){
            $('.thumbnail').fadeIn(0);
            $('.content').html('');
            utils.showAlert('Error!','Failed to load resource!','alert-error');}
        });
    }
});

utils.loadTemplate(['BookListItemView', 'BookView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});