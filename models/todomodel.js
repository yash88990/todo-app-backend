const mongoose = require('mongoose')

const todoschema = new mongoose.Schema({
    title:{
        type: String,
        require : true
    },
    description:{
        type: String,
        require: true,
    }
});


const Todo = mongoose.model('Todo' , todoschema);
module.exports = Todo;