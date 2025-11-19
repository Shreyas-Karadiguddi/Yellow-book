import express from "express";
import * as db from "../../db/db.js";
import { jwtVerification } from "../../utils/auth.js";
import { checkRequiredField } from "../../utils/validation.js";
import * as usersController from "../../db/controllers/users.controller.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const token = await db.authenticateUser(userName, password);
    res.status(200).json({ message: "success", token: token });
  } catch (error) {
    error instanceof Error
      ? res.status(401).json(error.message)
      : res.status(500).json("error");
  }
});

router.get("/getusers", jwtVerification, async (req, res) => {
  const users = await usersController.getAllUsers();
  return res.status(200).send(users);
});

router.post("/createuser", jwtVerification, async (req, res) => {
  try {
    const { user_name, password, role, contact } = checkRequiredField(
      req.body,
      ["user_name", "password", "role", "contact"]
    );

    await db.createUser(user_name, password, role, contact, req.token.userId);
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.post("/resetpassword/admin", jwtVerification, async (req, res) => {
  try {
    const { id } = req.body;
    const { new_password } = checkRequiredField(req.body, ["new_password"]);
    console.log(id, new_password);
    await db.resetPasswordByAdmin(id, new_password);
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.post("/resetpassword/user", async (req, res) => {
  try {
    const data = checkRequiredField(req.body, [
      "userName",
      "oldPassword",
      "newPassword",
    ]);
    await db.resetPasswordByUser(
      data.userName,
      data.oldPassword,
      data.newPassword
    );
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.post("/updateuser", async (req, res) => {
  try {
    const { id } = req.body;
    const { user_name, contact, role } = checkRequiredField(req.body, [
      "user_name",
      "contact",
      "role",
    ]);

    await db.updateUser(id, user_name, contact, role);
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.delete("/deleteuser/:userid", async (req, res) => {
  try {
    const user_id = req.params.userid;
    await db.deleteUser(user_id);
    return res.status(200).send("success");
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

router.get("/getuserinfo/:userid", async (req, res) => {
  try {
    const id = req.params.userid;
    const userInfo = await db.getUserInfoById(id);
    return res.status(200).send(userInfo);
  } catch (error) {
    error instanceof Error
      ? res.status(409).send(error.message)
      : res.status(500).send("error");
  }
});

export { router };
