import express from "express";
import {
  createNewInvite,
  createOrganization,
  deleteOrganization,
} from "../controllers/organization";
import { validateOrgAdmin } from "../middlewares/validate-org-admin";

const organizationRouter = express.Router();

organizationRouter.param("orgId", validateOrgAdmin);

organizationRouter.route("/").get().post(createOrganization);
organizationRouter
  .route("/:orgId")
  // .all(validateOrgAdmin)
  .delete(deleteOrganization);
organizationRouter
  .route("/new-invite/:orgId")
  // .all(validateOrgAdmin)
  .post(createNewInvite);

export { organizationRouter };
