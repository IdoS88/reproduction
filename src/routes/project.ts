import router from "express"

const appRouter = router();

appRouter.get("/", (req, res) => {
  res.send('<h1>Projects List!</h1>');
});

appRouter.get("/:id", (req, res) => {
  res.send(`<h1>Project Number - ${req.params.id}!</h1> for now.....`);
});

export default appRouter;