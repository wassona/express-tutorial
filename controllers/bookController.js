var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/bookinstance');

exports.index = function(req, res) {   
    
    Promise.all([
        Book.count(),
        BookInstance.count(),
        BookInstance.count({status:'Available'}),
        Author.count(),
        Genre.count(),
    ]).then(function(results) {
        let data = {
            book_count: results[0],
            book_instance_count: results[1],
            book_instance_available_count: results[2],
            author_count: results[3],
            genre_count: results[4]
        }
        res.render('index', { title: 'Local Library Home', data: data });
    }).catch(function(){
        res.render('index', { title: 'Local Library Home', error: true });
    });
};

// Display list of all Books.
exports.book_list = function(req, res, next) {

  Book.find({}, 'title author')
    .populate('author')
    .exec(function (err, list_books) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('book_list', { title: 'Book List', book_list: list_books });
    });
    
};

// Display detail page for a specific book.
exports.book_detail = function(req, res, next) {

    Promise.all([
            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(),
            BookInstance.find({'book': req.params.id})
                .exec()
        ]).then(function(results){
            if (results[0]==null) { // No results.
                var err = new Error('Book not found');
                err.status = 404;
                return next(err);
            }
            // Successful, so render.
            res.render('book_detail', { title: 'Title', book: results[0], book_instances: results[1] } );
        })
        
};

// Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create GET');
};

// Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book create POST');
};

// Display book delete form on GET.
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete GET');
};

// Handle book delete on POST.
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book delete POST');
};

// Display book update form on GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update GET');
};

// Handle book update on POST.
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Book update POST');
};