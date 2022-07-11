import { Project } from '../models/Project.js'

export const getProjects = async (req, res) =>{
    try {
        const projects = await Project.findAll()
        res.json(projects)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProject = async (req, res) =>{
    try {
        const {id} = req.params; 
        const project = await Project.findByPk(id);               

        if(!project) return res.status(404).json({"message":"Project does not exist"});
        res.json(project)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const createProject = async (req, res) =>{
    const {name, priority, description} = req.body  

    try {
        const newProject = await Project.create({
            name,
            priority,
            description
        })
    
        res.json(newProject)
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, priority, description } = req.body;

        const project = await Project.findByPk(id);
        project.name = name;
        project.priority = priority;
        project.description = description;

        await project.save();

        res.json(project);
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const deleteProject = async (req, res) => {
    const {id} = req.params;
    try {
        await Project.destroy({
            where:{
                id,
            }
        });
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}