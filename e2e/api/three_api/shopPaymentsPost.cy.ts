import {
  ConfigData,
  prepareConfigData,
} from "../../../support/api/three/data/configData";
import {
  prepareShopData,
  ShopData,
} from "../../../support/api/three/data/shopData";
import {
  createPayment,
  createShop,
  preparePaymentBody,
} from "../../../support/api/three/helpers";
import { StatusCodes } from "http-status-codes";

let configurationId: string;
let secretKey: string;
let login: string;
let password: string;

before((): void => {
  cy.fixture("threeRealUser.json").then((realUser): void => {
    let newConfigData: ConfigData = prepareConfigData(
      realUser.username,
      realUser.password,
    );
    let newShopData: ShopData = prepareShopData(newConfigData);
    createShop(newShopData).then((response): void => {
      login = response.body.user.login;
      password = response.body.user.password;
      configurationId = response.body.configurationId;
      secretKey = response.body.secretKey;
    });
  });
});

describe("POST /v1/shops/{shopId}/payments", (): void => {
  it("C184 Create payment", (): void => {
    createPayment(
      login,
      { username: login, password: password },
      preparePaymentBody(configurationId),
      secretKey,
    ).then((response): void => {
      expect(response.status).to.eq(StatusCodes.OK);
    });
  });
});
