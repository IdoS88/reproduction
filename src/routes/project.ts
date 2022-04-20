import router from "express"

const appRouter = router();

appRouter.get("/", (req, res) => {
  res.send('<h1>Projects List!</h1>');
});

export default appRouter;