import chaiHttp from "chai-http";
import app from "../src/app.js";
import chai from "chai";
import httpStatusCodes from "http-status-codes";

const expect = chai.expect;
chai.use(chaiHttp);

describe("Health of server", () => {
  const apiHealthRoute = "/api/v1/health";
  describe(apiHealthRoute, () => {
    it("should return 200 if server is running", async () => {
      const response = await chai.request(app).get(apiHealthRoute);
      expect(response.statusCode).to.be.equal(httpStatusCodes.OK);
      expect(response.text).to.be.equal(
        httpStatusCodes.getStatusText(httpStatusCodes.OK)
      );
    });
  });
});
