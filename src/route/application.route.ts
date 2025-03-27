import { Router } from "express";
import { completeApplication, continueApplication, getApplicationWithApplicationId, postApplication, uploadProfilePhoto } from "../controller/application.controller";
import { userAuth } from "../middleware/adminAuth.middleware";
import multer from "multer";
import { applicationAuth } from "../middleware/application.middleware";

const applicationRoute = Router();

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

applicationRoute.post("/", postApplication);

applicationRoute.get("/application/:applicationId", getApplicationWithApplicationId);

applicationRoute.patch("/profile-photo", applicationAuth, upload.single("avatar"), uploadProfilePhoto); 

applicationRoute.patch("/:id", (req, res) => {res.send(`Updating application with id ${req.params.id}`)});

applicationRoute.post("/complete", completeApplication);

applicationRoute.post("/continue", continueApplication);

applicationRoute.use(userAuth);
applicationRoute.get("/all", (req, res) => {res.send("Gennting all applications")});
applicationRoute.put("/:id", (req, res) => {res.send(`Updating application with id ${req.params.id}`)});
applicationRoute.get("/:id", (req, res) => {res.send(`getting application with id ${req.params.id}`)});

export default applicationRoute;