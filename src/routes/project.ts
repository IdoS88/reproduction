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

appRouter.post("/:id", (req, res) => {
  res.send(`<h1>Project Number - ${req.params.id}!</h1> for now.....`);
});

export default appRouter;