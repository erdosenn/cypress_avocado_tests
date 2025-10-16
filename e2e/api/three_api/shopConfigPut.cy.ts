import {
  prepareShopData,
  ShopData,
} from "../../../support/api/three/data/shopData";
import {
  changeConfiguration,
  createConfiguration,
  createShop,
} from "../../../support/api/three/helpers";
import { prepareConfigData } from "../../../support/api/three/data/configData";
import { StatusCodes } from "http-status-codes";

let firstShopData: ShopData;
let secondShopData: ShopData;
let configurationId: string;
let login: string;
let password: string;

before((): void => {
  firstShopData = prepareShopData();

  createShop(firstShopData).then((firstResponse): void => {
    login = firstResponse.body.user.login;
    password = firstResponse.body.user.password;
    createConfiguration(
      login,
      { username: login, password: password },
      prepareConfigData("", "", firstShopData.configuration.domain),
    ).then((secondResponse): void => {
      configurationId = secondResponse.body.configurationId;
    });
  });
});
describe("PUT /v1/shops/{shopId}/configurations/{configurationId}", (): void => {
  it("C331 Change configuration for existing shop", (): void => {
    secondShopData = prepareShopData();
    changeConfiguration(
      login,
      configurationId,
      { username: login, password: password },
      prepareConfigData(
        secondShopData.configuration.username,
        secondShopData.configuration.password,
        "",
        true,
      ),
    ).then((thirdResponse): void => {
      expect(thirdResponse.status).to.eq(StatusCodes.OK);
      expect(thirdResponse.body).to.eq(undefined);
    });
  });
});
