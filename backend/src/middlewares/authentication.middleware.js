import encryptionRepository from "../auth-service/encryption.repostory.js";
import { UnAuthenticatedUserError } from "../auth-service/errors.js";
import userRepository from "../auth-service/user.repository.js";
const { getEmployeeById } = userRepository();
const { decryptTokenAndGetUser } = encryptionRepository();
export default async function authenticationMiddleware(req, res, next) {
  try {
    const authHeader =
      typeof req.headers.authorization === "string"
        ? req.headers.authorization
        : "";
    if (!authHeader || authHeader.split(" ").length !== 2) {
      throw new UnAuthenticatedUserError();
    }
    const bearerToken = authHeader.split(" ")[1];
    const { email, name, _id, role } = await decryptTokenAndGetUser(
      bearerToken
    );
    const user = await getEmployeeById(_id);
    if (!user) {
      throw new UnAuthenticatedUserError();
    }
    req.user = { email, name, _id, role };
    next();
  } catch (error) {
    next(error);
  }
}
