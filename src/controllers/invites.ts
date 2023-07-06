import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from "../errors/authorization-error";
import { BadRequestError } from "../errors/bad-request";
import { inviteModel } from "../models/Invites";
import { IInviteModel } from "../utils/interfaces/IInvite";
import { IOrganizationInstance } from "../utils/interfaces/IOrganization";
import mongoose from "mongoose";
import { UnknownError } from "../errors/unknown-error";
import { OrganizationRemoveFromArray } from "../utils/enums/Organization";

async function getAllOrgInvites(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const invites = (await org.populate("invites")).invites;
    return res.status(200).json(invites);
  } catch (err) {
    next(err);
  }
}

async function createNewInvite(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { title, message } = req.body;
    if (!message) throw new BadRequestError("Please provide a message");
    if (!(org.invites.length <= 5))
      throw new AuthorizationError("Max invites reached");
    const newInvite: IInviteModel = {
      title: title,
      org: org._id,
      message: message,
      createdAt: new Date(),
      createdBy: new mongoose.Types.ObjectId(res.locals.user.id),
    };
    const invite = await inviteModel.create(newInvite);
    const updatedOrg = await org.updateOne({ $push: { invites: invite._id } });
    return res.status(200).json(invite);
  } catch (err) {
    next(err);
  }
}

async function updateInvite(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { inviteId } = req.params;
    if (!inviteId)
      throw new BadRequestError("Please provie a valid inviteId parameter");
    const { title, message } = req.body;
    const newUpdateInvite: IInviteModel = {
      title: title,
      org: org._id,
      message: message,
      createdAt: new Date(),
      createdBy: new mongoose.Types.ObjectId(res.locals.user.id),
    };
    const updatedInvite = await inviteModel.findByIdAndUpdate(
      inviteId,
      newUpdateInvite,
      { new: true }
    );
    if (!updatedInvite) throw new UnknownError();
    return res.status(200).json(updatedInvite);
  } catch (err) {
    next(err);
  }
}

async function deleteInvite(req: Request, res: Response, next: NextFunction) {
  try {
    const org: IOrganizationInstance = res.locals.orgDoc;
    const { inviteId } = req.params;
    if (!inviteId)
      throw new BadRequestError("Please provide a valid inviteId parameter");
    const wasRemoved = await org.removeFromArray(
      OrganizationRemoveFromArray.INVITES,
      inviteId
    );
    if (!wasRemoved) throw new UnknownError();
    const deletedInvite = await inviteModel.findByIdAndDelete(inviteId);
    if (!deletedInvite)
      throw new BadRequestError("Invite already deleted or doesn't exist");
    return res.status(200).json(deletedInvite);
  } catch (err) {
    next(err);
  }
}

export { getAllOrgInvites, createNewInvite, deleteInvite, updateInvite };
