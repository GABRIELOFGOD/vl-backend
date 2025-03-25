import { Router } from "express";
import { getAllSurah, postSurah } from "../controller/surah.controller";
import { userAuth } from "../middleware/adminAuth.middleware";

const surahRoute = Router();

surahRoute.get("/", getAllSurah);

surahRoute.use(userAuth)
surahRoute.post("/", postSurah);

surahRoute.get("/:id", (req, res) => {res.send(`Get Surah with id ${req.params.id}`)});

surahRoute.patch("/:id", (req, res) => {res.send(`Update Surah with id ${req.params.id}`)});

surahRoute.delete("/:id", (req, res) => {res.send(`Delete Surah with id ${req.params.id}`)})

export default surahRoute;
