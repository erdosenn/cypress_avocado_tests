import {
  prepareShopData,
  ShopData,
} from "../../../support/api/three/data/shopData";
import {
  createConfiguration,
  createShop,
} from "../../../support/api/three/helpers";
import { prepareConfigData } from "../../../support/api/three/data/configData";
import { StatusCodes } from "http-status-codes";

let newShopData: ShopData;
let login: string;
let password: string;

before((): void => {
  newShopData = prepareShopData();

  createShop(newShopData).then((response): void => {
    login = response.body.user.login;
    password = response.body.user.password;
  });
});
describe("POST /v1/shops/{shopId}/configurations", (): void => {
  it("C334 Post new configuration for existing shop", (): void => {
    createConfiguration(
      login,
      { username: login, password: password },
      prepareConfigData(),
    ).then((response): void => {
      expect(response.status).to.eq(StatusCodes.CREATED);
      expect(response.body).to.have.property("configurationId");
    });
  });
});
