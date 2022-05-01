import router from "express"
import ProjectController from "../controllers/ProjectsControllers";
import { ProjectRepositoryMySql } from "../data-access/ProjectRepository";
import ProjectService from "../services/ProjectService";

const appRouter = router();
const projectService = new ProjectService(new ProjectRepositoryMySql());
const projectController = new ProjectController(projectService);

appRouter.get("/", async (req, res) => {
  let projects = await projectController.GetAllProjects().catch((err) => {
    res.status(500).send(err);
  });
  res.json(projects);
});

appRouter.get("/:id",async (req, res) => {
  let project = await projectController.GetProjectById(parseInt(req.params.id)).catch((err) => {
    res.status(500).send(err);
  });
  res.json(project);
  // res.send(`project id - ${req.params.id}`);
});

export default appRouter;