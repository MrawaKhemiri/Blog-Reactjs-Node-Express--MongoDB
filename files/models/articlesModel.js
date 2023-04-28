import mongoose from 'mongoose'

const commentschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    postedAt: {
        type: String,
        default: new Date(toString())
    }
});
const articleschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    postedAt: {
        type: String,
        default: new Date(toString())
    },
    image:'',
    comment: [commentschema],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }

});

const article = mongoose.model('Article', articleschema)
export default article