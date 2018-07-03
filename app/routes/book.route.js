module.exports = (app) => {
    const books = require('../controllers/book.controller.js');

    //Creating a new book entry
    app.post('/addBook',books.create);

    //retrive all books
    app.get('/getBook',books.findAll);

    //Retrive single book with book id
    app.get('/getBook/:bookId',books.findOne);

    //Update single book with book id
    app.put('/getBook/:bookId',books.update);

    //Update single book with book id
    app.delete('/getBook/:bookId',books.delete);
}