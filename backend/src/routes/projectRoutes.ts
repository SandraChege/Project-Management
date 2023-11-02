import Router from "express";
import { assignProject, deleteProject, getAllProjects, singleProject } from "../controllers/projectControllers";



const project_router = Router()

project_router.post('/assignProject',assignProject)
project_router.delete('/deleteProject',deleteProject)
project_router.get('/',getAllProjects)
project_router.get('/singleProject',singleProject)


export default project_router