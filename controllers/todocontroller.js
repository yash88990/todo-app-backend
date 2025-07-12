const Todo = require('../models/todomodel')

const createdtodo = async(req , res)=>{
    try{
        const {title , description} = req.body;
        if(!title || !description){
            return res.status(500).json({message : 'all field required'})
        }
        const newtodo = new Todo({title , description});
        await newtodo.save();
        return res.status(200).json({message: 'todo created' , newtodo});


    }catch(error){
        console.error('error during add task' , error);
        res.status(500).json({message: 'Internal server error'});
    }
}



const getalltodos = async(req,res)=>{
    try{
        const todos = await Todo.find();
        return res.status(200).json(todos);


    }catch(error){
        console.error('error during get all todos' , error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const updatetodo= async(req,res)=>{
    try{
        const {id} = req.params;
        const {title , description} = req.body;
        if(!title || !description){
            return res.status(500).json({message: 'title and desc required'})
        }
        const updatetodobyid = await Todo.findByIdAndUpdate(id , {title , description} , {new : true});

        if(!updatetodobyid){
            return res.status(404).json({message: 'todo not found'})
        }
        return res.status(200).json({message : 'updated' , updatetodobyid})

    }catch(error){
        console.error('error during update todo' , error);
        res.status(500).json({message: 'Internal server error'});
    }
}


const deletetodo= async(req, res)=>{
    try{
        const {id} = req.params;
        const deletetodobyid = await Todo.findByIdAndDelete(id);
        if(!deletetodobyid){
            return res.status(404).json({message: 'todo not found'})
        }
        return res.status(200).json({message: 'deleted' , deletetodobyid})

    }catch(error){
        console.error('error during deleting todo' , error);
        res.status(500).json({message: 'Internal server error'});
    }
}


module.exports = {
    createdtodo, getalltodos , updatetodo , deletetodo
}