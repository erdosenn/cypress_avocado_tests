import {
  createConfiguration,
  createShop,
  getConfiguration,
} from "../../../support/api/three/helpers";
import {
  prepareShopData,
  ShopData,
} from "../../../support/api/three/data/shopData";
import { StatusCodes } from "http-status-codes";

let newShopData: ShopData;
let configurationId: string;
let login: string;
let password: string;

before((): void => {
  newShopData = prepareShopData();

  createShop(newShopData).then((response): void => {
    login = response.body.user.login;
    password = response.body.user.password;
    createConfiguration(
      login,
      { username: login, password: password },
      newShopData.configuration,
    );
    configurationId = response.body.configurationId;
  });
});
describe("GET /v1/shops/{shopId}/configurations/{configurationId}", (): void => {
  it("C332 Get existing configuration for selected shop", (): void => {
    getConfiguration(login, configurationId, {
      username: login,
      password: password,
    }).then((response): void => {
      expect(response.status).to.eq(StatusCodes.OK);
      expect(response.body)
        .to.have.property("domain")
        .to.eq(newShopData.configuration.domain);
      expect(response.body)
        .to.have.property("username")
        .to.eq(newShopData.configuration.username);
    });
  });
});
