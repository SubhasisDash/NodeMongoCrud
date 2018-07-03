const mongoose=require('mongoose');

const BookSchema = mongoose.Schema(
    {
        bookId:Number,
        title:String,
        author:String,
        pages:Number
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model('Book',BookSchema);