import chaiHttp from "chai-http";
import app from "../src/app.js";
import chai from "chai";
import httpStatusCodes from "http-status-codes";
const expect = chai.expect;
chai.use(chaiHttp);

/**
 *
 * @param {number} statusCode
 */
export const assertsIsForbidden = (statusCode) => {
  expect(statusCode).to.be.equal(httpStatusCodes.FORBIDDEN);
};

/**
 *
 * @param {number} statusCode
 */
export const assertIsUnauthenticated = (statusCode) => {
  expect(statusCode).to.be.equal(httpStatusCodes.UNAUTHORIZED);
};

/**
 *
 * @param {number} statusCode
 */
export const assertIsBadRequest = (statusCode) => {
  expect(statusCode).to.be.equal(httpStatusCodes.BAD_REQUEST);
};

/**
 *
 * @param {number} statusCode
 */
export const assertIsCreated = (statusCode) => {
  expect(statusCode).to.be.equal(httpStatusCodes.CREATED);
};
/**
 *
 * @param {number} statusCode
 */
export const assertIsNotfound = (statusCode) => {
  expect(statusCode).to.be.equal(httpStatusCodes.NOT_FOUND);
};
const correctAdminUser = {
  email: "admin@srre.com",
  password: "12345678",
  name: "B P Dubey",
  secretKey: "SECRET_ADMIN_KEY",
};
const testUser = {
  email: "test@srre.com",
  name: "test user",
  password: "12156454",
};
const requestor = chai.request(app).keepOpen();
describe("Authentication routes", () => {
  const registerAdminRoute = "/api/v1/auth/register-su";
  const registerEmployeeRoute = "/api/v1/admin/users/register";
  const loginRoute = "/api/v1/auth/login";
  const currentUserRoute = "/api/v1/auth";
  let token = "";
  describe(registerAdminRoute, () => {
    it("should return 403 if secret key is wrong", async () => {
      const response = await requestor.post(registerAdminRoute).send({
        ...correctAdminUser,
        secretKey: "SECRET_ADMIN_KE",
      });
      assertsIsForbidden(response.statusCode);
      expect(response.body).to.be.deep.equal({
        status: false,
        message: "Unauthorized for this request",
      });
    });
    it("should return 400 if email is not present", async () => {
      const response = await requestor.post(registerAdminRoute).send({
        name: "B P Dubey",
        password: "12345678",
        secretKey: "SECRET_ADMIN_KE",
      });
      assertIsBadRequest(response.statusCode);
      expect(response.body).to.be.deep.equal({
        status: false,
        message: '"email" is required',
      });
    });
    it("should return 201 if correct admin", async () => {
      const response = await requestor
        .post(registerAdminRoute)
        .send(correctAdminUser);
      assertIsCreated(response.statusCode);
      expect(response.body).to.be.deep.equal({
        status: true,
        data: "Admin registered successfully",
      });
    });
    it("should return 409 if correct admin but trying to register again", async () => {
      const response = await requestor
        .post(registerAdminRoute)
        .send(correctAdminUser);
      expect(response.statusCode).to.be.equal(httpStatusCodes.CONFLICT);
      expect(response.body).to.be.deep.equal({
        status: false,
        message: "User already exists",
      });
    });
  });
  describe(loginRoute, () => {
    it("should return 400 if user email incorrect", async () => {
      const response = await requestor.post(loginRoute).send({
        email: "admin@srre.co",
        password: "ajshdjkasd",
      });
      assertIsUnauthenticated(response.statusCode);
      expect(response.body).to.be.deep.equal({
        status: false,
        message: "email does not exists",
      });
    });
    it("should return 200 if user credentials correct", async () => {
      const { email, password, name } = correctAdminUser;
      const response = await requestor.post(loginRoute).send({
        email,
        password,
      });
      token = response.body.data.token;
      expect(response.statusCode).to.be.equal(httpStatusCodes.OK);
      expect(response.body.data).to.have.property("token");
      expect(response.body.data).to.have.property("user");
      expect(response.body.data.user.email).to.be.equal(email);
      expect(response.body.data.user.name).to.be.equal(name);
      expect(response.body.data.user).to.have.property("_id");
    });
    it("should return 401 if user password incorrect", async () => {
      const response = await requestor.post(loginRoute).send({
        email: correctAdminUser.email,
        password: "1234567",
      });
      expect(response.statusCode).to.be.equal(httpStatusCodes.UNAUTHORIZED);
      expect(response.body).to.be.deep.equal({
        status: false,
        message: "password does not match",
      });
    });
  });
  describe(currentUserRoute, () => {
    it("should return 200 if correct token is passed", async () => {
      const response = await requestor
        .get(currentUserRoute)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.be.equal(httpStatusCodes.OK);
      expect(response.body.data.email).to.be.equal(correctAdminUser.email);
      expect(response.body.data.name).to.be.equal(correctAdminUser.name);
      expect(response.body.data).to.have.property("_id");
    });
    it("should return 401 if random token is passed", async () => {
      const response = await requestor
        .get(currentUserRoute)
        .set("Authorization", `Bearer random token`);
      expect(response.statusCode).to.be.equal(httpStatusCodes.UNAUTHORIZED);
    });
  });
  describe(registerEmployeeRoute, () => {
    it("should return 201 if correct admin token is used to register employee", async () => {
      const response = await requestor
        .post(registerEmployeeRoute)
        .send(testUser)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data.email).to.be.equal(testUser.email);
      expect(response.body.data.name).to.be.equal(testUser.name);
      expect(response.body.data.role).to.be.equal("EMPLOYEE");
      assertIsCreated(response.statusCode);
    });
    it("should return 401 if correct admin token is not used to register employee", async () => {
      const response = await requestor
        .post(registerEmployeeRoute)
        .send(testUser)
        .set("Authorization", `Bearer normal token`);
      assertIsUnauthenticated(response.statusCode);
    });
  });
});
