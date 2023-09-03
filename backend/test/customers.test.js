import chaiHttp from "chai-http";
import app from "../src/app.js";
import chai from "chai";
import Customer from "../src/customer-service/customer.model.js";
import User from "../src/auth-service/user.model.js";
import httpStatusCodes from "http-status-codes";
import {
  assertIsBadRequest,
  assertIsNotfound,
  assertIsUnauthenticated,
} from "./auth.test.js";
const expect = chai.expect;
chai.use(chaiHttp);
const requestor = chai.request(app).keepOpen();

const assertIsCustomer = (customer) => {
  const { name, contact, createdBy, address } = customer;
  expect({ name, contact }).to.be.deep.equal(customerBody);
  expect(createdBy.name).to.be.equal(correctAdminUser.name);
  expect(address).to.be.a("array");
  expect(createdBy.email).to.be.equal(correctAdminUser.email);
};
const customerBody = {
  name: "Test customer",
  contact: {
    name: "test contact",
    phoneNumber: "4545612587797",
  },
};
const correctAdminUser = {
  email: "admin@srre.com",
  password: "12345678",
  name: "B P Dubey",
  secretKey: "SECRET_ADMIN_KEY",
};
describe("Customer routes", () => {
  const loginRoute = "/api/v1/auth/login";
  const customerRoute = "/api/v1/customers";
  let token = "";
  let customerId = "";
  before(async () => {
    const { email, password } = correctAdminUser;
    const response = await requestor.post(loginRoute).send({
      email,
      password,
    });
    token = response.body.data.token;
  });
  after(async () => {
    await User.deleteMany({});
    await Customer.deleteMany({});
  });

  describe(`POST ${customerRoute}`, () => {
    it("should return 201 if correct customer body is passed", async () => {
      const response = await requestor
        .post(customerRoute)
        .send(customerBody)
        .set("Authorization", `Bearer ${token}`);
      customerId = response.body.data._id;
      expect(response.statusCode).to.be.equal(httpStatusCodes.CREATED);
      assertIsCustomer(response.body.data);
    });
    it("should return 400 if correct customer body does not have name or left blank", async () => {
      const response = await requestor
        .post(customerRoute)
        .send({
          name: "",
        })
        .set("Authorization", `Bearer ${token}`);
      assertIsBadRequest(response.statusCode);
    });
    it("should return 400 if correct customer body does not have name or left blank", async () => {
      const response = await requestor
        .post(customerRoute)
        .send({})
        .set("Authorization", `Bearer ${token}`);
      assertIsBadRequest(response.statusCode);
    });
    it("should return 401 if no token passed", async () => {
      const response = await requestor.post(customerRoute).send(customerBody);
      assertIsUnauthenticated(response.statusCode);
    });
  });
  describe(`GET ${customerRoute}`, () => {
    it("should return 200", async () => {
      const response = await requestor
        .get(customerRoute)
        .set("Authorization", `Bearer ${token}`);
      expect(response.body)
        .to.have.property("data")
        .that.is.an("array")
        .to.have.length.at.least(1);
      assertIsCustomer(response.body.data[0]);
    });
    it("should return 401 if token not passed", async () => {
      const response = await requestor.get(customerRoute);
      assertIsUnauthenticated(response.statusCode);
    });
  });
  describe(`PATCH ${customerRoute}/customerId`, () => {
    it("should return 200 if customer is updated correctly", async () => {
      const name = "Test customer 1";
      const response = await requestor
        .patch(`${customerRoute}/${customerId}`)
        .send({
          ...customerBody,
          name,
        })
        .set("Authorization", `Bearer ${token}`);
      expect(response.body.data.name).to.be.equal(name);
    });
    it("should return 200 if customer is updated correctly", async () => {
      const name = "Test customer 1";
      const response = await requestor
        .patch(`${customerRoute}/${customerId}`)
        .send({
          ...customerBody,
          name,
          address: ["asdasdhj"],
        })
        .set("Authorization", `Bearer ${token}`);
      assertIsNotfound(response.statusCode);
    });
    it("should return 401 if token not found", async () => {
      const name = "Test customer 1";
      const response = await requestor
        .patch(`${customerRoute}/${customerId}`)
        .send({
          ...customerBody,
          name,
          address: ["asdasdhj"],
        })
        .set("Authorization", `Bearer bad_token`);
      assertIsUnauthenticated(response.statusCode);
    });
  });
  describe(`GET ${customerRoute}/customerId`, () => {
    it("should return 401 if token is not found", async () => {
      const response = await requestor
        .get(`${customerRoute}/${customerId}`)
        .set("Authorization", `Bearer bad token`);
      assertIsUnauthenticated(response.statusCode);
    });
    it("should return 200 if token there and authenticated", async () => {
      const response = await requestor
        .get(`${customerRoute}/${customerId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.be.equal(httpStatusCodes.OK);

      assertIsCustomer(response.body.data);
    });
  });
  describe(`DELETE ${customerRoute}/customerId`, () => {
    it("should return 401 if token is not found", async () => {
      const response = await requestor
        .delete(`${customerRoute}/${customerId}`)
        .set("Authorization", `Bearer bad token`);
      assertIsUnauthenticated(response.statusCode);
    });
    it("should return 204 if token there and authenticated", async () => {
      const response = await requestor
        .delete(`${customerRoute}/${customerId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).to.be.equal(httpStatusCodes.NO_CONTENT);
    });
  });
});
