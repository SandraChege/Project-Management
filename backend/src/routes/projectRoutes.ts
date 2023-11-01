import Router from "express";
import { assignProject, deleteProject } from "../controllers/projectControllers";



const project_router = Router()

project_router.post('/assignProject',assignProject)
project_router.delete('/deleteProject',deleteProject)


export default project_router