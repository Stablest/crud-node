import express from "express";
import { userModel } from "../models/User";
import { IUser } from "../interfaces/IUser";

async function getAllUsers(req: express.Request, res: express.Response) {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({ users: allUsers });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}

async function createUser(
  req: express.Request<any, any, IUser>,
  res: express.Response
) {
  try {
    const newUser = await userModel.create({ ...req.body });
    res.status(201).json({ newUser });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}

async function getUser(req: express.Request, res: express.Response) {
  try {
    const userFound = await userModel.find({ _id: req.params.id });
    return res.status(200).json({ user: userFound });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
}

async function updateUser(req: express.Request, res: express.Response) {
  try {
    const updatedUser = await userModel.updateOne(
      { _id: req.params.id },
      { ...req.body }
    );
    return res.status(200).json({ user: updatedUser });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
}

async function deleteUser(req: express.Request, res: express.Response) {
  try {
    const deletedUser = await userModel.deleteOne({ _id: req.params.id });
    return res.status(200).json({ user: deletedUser });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
}

export { getAllUsers, createUser, getUser, updateUser, deleteUser };
