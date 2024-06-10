
export class Routes {

    constructor(router: Router = new Router()){}

    
}

router.get("/", (req, res) => {
  res.json("We are live on /api.");
});


const ClientRoutes = require("./clients.routes.js");
router.use("/client", ClientRoutes);
router.use("/auth", require("./auth.routes.js"));
router.use("/figma", require("./figma.routes.js"));
router.use("/brand", require("./brand.routes.js"));
router.use(isAuthenticated);

router.use("/designs", require("./designs.routes.js"));
