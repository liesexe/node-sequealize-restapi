import { Task } from "../models/Task.js";

export const getTasks = async (req, res) =>{
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getTask = async (req, res) =>{
    const { id } = req.params;
    try {
        const task = await Task.findOne({
            where: {id},
            //attributes: ['name']
        });
        res.json(task);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const createTask = async (req, res) =>{
    try{
        const { name, done, projectId } = req.body;
        const newTask = await Task.create({
            name,
            done,
            projectId
        });
        console.log(newTask);
        res.json(newTask);
    }catch (error){
        return res.status(500).json({message: error.message});    
    }
}

export const updateTask = async (req, res) => {    
    try {
        const { id } = req.params;
        const task = await Task.findOne({
            where: {id},
        });
        task.set(req.body);
        await task.save();
        return res.json(task);
    } catch (error) {
        return res.status(500).json({message: error.message});        
    }
}

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {        
        await Task.destroy({
            where: {id}
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({message: error.message});   
    }
}