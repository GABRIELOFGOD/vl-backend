import { Router } from "express";
import { getProfile, loginUser, registerUser } from "../controller/user.controller";
import { userAuth } from "../middleware/adminAuth.middleware";

const userRouter = Router();

userRouter.post("/login", loginUser);

userRouter.use(userAuth)
userRouter.post("/", registerUser);

userRouter.get("/", (req, res) => {
  res.send("Gell all user");
});

userRouter.get("/profile", getProfile);

userRouter.patch("/:id", (req, res) => {
  res.send(`Update user with id ${req.params.id}`);
});

userRouter.delete("/:id", (req, res) => {
  res.send(`Delete user with id ${req.params.id}`);
});

export default userRouter;
