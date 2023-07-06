import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../../errors/authentication-error";
import { BadRequestError } from "../../errors/bad-request";
import { CustomAPIError } from "../../errors/custom-api-error";
import { userModel } from "../../models/User";
import { orgModel } from "../../models/Organization";
import { AuthorizationError } from "../../errors/authorization-error";

async function validateOrgUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user.id;
    if (!userId) throw new AuthenticationError("Invalid token");
    const { orgId } = req.params;
    if (!orgId)
      throw new BadRequestError("Please provide a valid organization id");
    const user = await userModel.findById(userId);
    if (!user) throw new CustomAPIError("User not found");
    const org = await orgModel.findById(orgId);
    if (!org) throw new BadRequestError("Organization does not exist");
    const isRegistered = org.checkIsRegistered(userId);
    if (!isRegistered)
      throw new AuthorizationError("User does not have sufficient permission");
    res.locals.orgDoc = org;
    next();
  } catch (err) {
    next(err);
  }
}

export { validateOrgUser };
