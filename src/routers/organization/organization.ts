import express from "express";
import {
  createOrganization,
  deleteOrganization,
  getAllPublicOrganization,
  updateOrganizationInfo,
} from "../../controllers/organization";
import { validateOrgAdmin } from "../../middlewares/organization/validate-org-admin";
import { inviteRouter } from "./[orgId]/invites";
import { taskRouter } from "./[orgId]/tasks";

const organizationRouter = express.Router();

organizationRouter.use("/:orgId/invites", inviteRouter);
organizationRouter.use("/:orgId/tasks", taskRouter);

organizationRouter
  .route("/")
  .get(getAllPublicOrganization)
  .post(createOrganization);

organizationRouter
  .route("/:orgId")
  .patch(validateOrgAdmin, updateOrganizationInfo)
  .delete(validateOrgAdmin, deleteOrganization);

export { organizationRouter };
