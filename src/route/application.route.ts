import { Router } from "express";
import { getApplicationWithApplicationId, postApplication } from "../controller/application.controller";
import { userAuth } from "../middleware/adminAuth.middleware";

const applicationRoute = Router();

applicationRoute.post("/", postApplication);

applicationRoute.get("/application/:applicationId", getApplicationWithApplicationId)

applicationRoute.patch("/:id", (req, res) => {res.send(`Updating application with id ${req.params.id}`)});

applicationRoute.use(userAuth);
applicationRoute.get("/all", (req, res) => {res.send("Gennting all applications")});
applicationRoute.put("/:id", (req, res) => {res.send(`Updating application with id ${req.params.id}`)});
applicationRoute.get("/:id", (req, res) => {res.send(`getting application with id ${req.params.id}`)});

export default applicationRoute;