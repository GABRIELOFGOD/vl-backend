import { Router } from "express";
import { registerUser } from "../controller/user.controller";

const userRouter = Router();

userRouter.post("/", registerUser);

userRouter.get("/", (req, res) => {
  res.send("Gell all user");
});

userRouter.get("/:id", (req, res) => {
  res.send(`Get user with id ${req.params.id}`);
});

userRouter.patch("/:id", (req, res) => {
  res.send(`Update user with id ${req.params.id}`);
});

userRouter.delete("/:id", (req, res) => {
  res.send(`Delete user with id ${req.params.id}`);
});

export default userRouter;
