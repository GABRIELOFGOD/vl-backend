import { Router } from "express";
import { getGeneralSettings, updateSetting } from "../controller/general.controller";
import { userAuth } from "../middleware/adminAuth.middleware";

const generalRoute = Router();

// generalRoute.post("/", (req: Request, res: Response) => {
//   res.send("Post General settings");
// });

generalRoute.get("/", getGeneralSettings);

// generalRoute.get("/:id", (req: Request, res: Response) => {
//   res.send(`Get settings with id ${req.params.id}`);
// });

generalRoute.use(userAuth);
generalRoute.patch("/", updateSetting);

// generalRoute.delete("/:id", (req: Request, res: Response) => {
//   res.send(`Deleted data settings with id ${req.params.id}`);
// });

export default generalRoute;
