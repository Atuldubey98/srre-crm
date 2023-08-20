import { base64url, EncryptJWT, jwtDecrypt } from "jose";
import { JWT_EXPIRE, JWT_SECRET } from "../config.js";
import bcrypt from "bcryptjs";
function encryptionRepository() {
  const ISSUER = "urn:srre_crm:issuer";
  const AUDIENCE = "urn:srre_crm:audience";
  async function encryptPassword(password) {
    try {
      const salt = await bcrypt.genSalt(8);
      const encryptedPassword = await bcrypt.hash(password, salt);
      return encryptedPassword;
    } catch (error) {
      throw error;
    }
  }
  async function checkPasswordMatching(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  async function getTokenAndEncryptionThePayload(userPayload) {
    return new EncryptJWT(userPayload)
      .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
      .setIssuedAt()
      .setIssuer(ISSUER)
      .setAudience(AUDIENCE)
      .setExpirationTime(JWT_EXPIRE)
      .encrypt(base64url.decode(JWT_SECRET));
  }
  async function decryptTokenAndGetUser(jwt) {
    try {
      const { payload } = await jwtDecrypt(jwt, base64url.decode(JWT_SECRET), {
        issuer: ISSUER,
        audience: AUDIENCE,
      });
      return payload;
    } catch (error) {
      throw error;
    }
  }
  return Object.freeze({
    getTokenAndEncryptionThePayload,
    decryptTokenAndGetUser,
    encryptPassword,
    checkPasswordMatching,
  });
}

export default encryptionRepository;
