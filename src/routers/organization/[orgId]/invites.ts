import { Router, Request, Response } from "express";
import {
  createNewInvite,
  deleteInvite,
  getAllOrgInvites,
  updateInvite,
} from "../../../controllers/invites";
import { validateOrgAdmin } from "../../../middlewares/organization/validate-org-admin";

const inviteRouter = Router({ mergeParams: true });

inviteRouter
  .route("/")
  .get(validateOrgAdmin, getAllOrgInvites)
  .post(validateOrgAdmin, createNewInvite);

inviteRouter
  .route("/:inviteId")
  .patch(validateOrgAdmin, updateInvite)
  .delete(validateOrgAdmin, deleteInvite);

export { inviteRouter };
