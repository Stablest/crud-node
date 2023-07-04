import { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../errors/authentication-error";
import { AuthorizationError } from "../errors/authorization-error";
import { BadRequestError } from "../errors/bad-request";
import { CustomAPIError } from "../errors/custom-api-error";
import { orgModel } from "../models/Organization";
import { userModel } from "../models/User";

async function validateOrgAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { orgId } = req.params;
    if (!orgId)
      throw new BadRequestError("Please provide a valid organization id");
    const user = await userModel.findById(res.locals.user.id);
    if (!user) throw new CustomAPIError("User not found");
    const { password } = req.body;
    if (!password)
      throw new BadRequestError("Please provide a password and newUser");
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new AuthenticationError("Invalid password");
    const org = await orgModel.findById(orgId);
    if (!org) throw new BadRequestError("Organization does not exist");
    const isAdmin = org.checkIsAdmin(res.locals.user.id);
    if (!isAdmin)
      throw new AuthorizationError("Not authorized to make this action");
    res.locals.orgDoc = org;
    next();
  } catch (err) {
    next(err);
  }
}

export { validateOrgAdmin };
