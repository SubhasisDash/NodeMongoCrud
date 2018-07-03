const Book=require('../models/book.model');

exports.create = (req,res)=>{
    if(!req.body.title && !req.body.bookId){
        return res.status(400).send({
            message:"book title and id cannot be empty"
        })
    }
    const book= new Book({
        bookId : req.body.bookId,
        title : req.body.title,
        author: req.body.author,
        pages: req.body.pages
    });

    book.save().then(
        data =>{
            res.send(data);
        }
    ).catch(err=>{
        res.status(500).send({
            message: err.message || "some error occured while creating book."
        });
    });
};

exports.findAll = (req,res)=>{
    Book.find()
    .then(books=>{
        res.send(books);
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "some error occured while fetching book data."
        });
    })
    

};


exports.findOne = (req,res)=>{
    Book.findById(req.params.bookId).then(book=>{
        if(!book){
            return res.status(404).send({
                message: "book not found for id " + req.params.bookId
            });
        }
        res.send(book);
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "book not found for id " + req.params.bookId
            });
        }

        return res.status(500).send({
            message: "error retriving book with id " + req.params.bookId
        });
    });
};


exports.update = (req,res)=>{
    if(!req.body.title && !req.body.bookId){
        return res.status(400).send({
            message:"book title and id cannot be empty"
        })
    }
    Book.findByIdAndUpdate(req.body.bookId,{
        bookId : req.body.bookId,
        title : req.body.title,
        author: req.body.author,
        pages: req.body.pages
    },{new:true}).then(book=>{
        if(!book){
            return res.status(404).send({
                message: "book not found for id " + req.params.bookId
            });
        }
        res.send(book);
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "book not found for id " + req.params.bookId
            });
        }

        return res.status(500).send({
            message: "error retriving book with id " + req.params.bookId
        });
    });
};

exports.delete = (req,res)=>{
    Book.findByIdAndRemove(req.params.bookId).then(book=>{
        if(!book){
            return res.status(404).send({
                message: "book not found for id " + req.params.bookId
            });
        }
        res.send({
                message:"book deleted successfully"
        });
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "book not found for id " + req.params.bookId
            });
        }

        return res.status(500).send({
            message: "error deleting book with id " + req.params.bookId
        });
    });
};