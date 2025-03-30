import { Router } from "express";
import { getProfile, loginUser, registerUser, rejectBirthCertificate, rejectHafizCertificate, rejectProfilePhoto } from "../controller/user.controller";
import { userAuth } from "../middleware/adminAuth.middleware";

const userRouter = Router();

userRouter.post("/login", loginUser);

userRouter.use(userAuth)
userRouter.post("/", registerUser);

// ========== REJECTIONS ============ //
userRouter.patch("/reject/passport", rejectProfilePhoto);
userRouter.patch("/reject/birthcert", rejectBirthCertificate);
userRouter.patch("/reject/hafizcert", rejectHafizCertificate);
// ========== REJECTIONS ============ //

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
