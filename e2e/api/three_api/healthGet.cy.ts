import { getHealth } from "../../../support/api/three/helpers";

describe("GET /health", (): void => {
  it("Gets server status", (): void => {
    getHealth().then((response): void => {
      expect(response.status).to.eq(200);
      expect(response.body[0]).to.have.property("status");
      expect(response.body[0].status).to.have.property("database");
      expect(response.body[0].status.database).to.have.eq("ok");
    });
  });
});
