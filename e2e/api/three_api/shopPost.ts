import { StatusCodes } from "http-status-codes";
import {
  generatePassword,
  generateRandomMerchantId,
  generateRandomNumber,
  generateRandomUsername,
} from "../../../support/dataGenerators";
import { createShop } from "../../../support/api/three/helpers";

const randomMerchantId: string = generateRandomMerchantId();
const randomDomain: string = "random-domain.com";

// before

// after
describe("POST /v1/shops", (): void => {
  it("C175 Create shop", (): void => {
    createShop({
      externalShopId: generateRandomNumber(1000, 9999),
      configuration: {
        username: generateRandomUsername(randomMerchantId),
        password: generatePassword(),
        domain: randomDomain,
      },
      notifyDomain: randomDomain,
    }).then((response): void => {
      expect(response.status).to.eq(StatusCodes.CREATED);
      expect(response.body).to.have.property("configurationId");
      expect(response.body).to.have.property("secretKey");
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("login");
      expect(response.body.user).to.have.property("password");
    });
  });

  it("C335 Create shop and post again same data", (): void => {
    const shopData: object = {
      externalShopId: generateRandomNumber(1000, 9999),
      configuration: {
        username: generateRandomUsername(randomMerchantId),
        password: generatePassword(),
        domain: randomDomain,
      },
      notifyDomain: randomDomain,
    };

    createShop(shopData);
    createShop(shopData, true).then((response): void => {
      expect(response.status).to.eq(StatusCodes.FORBIDDEN);
      expect(response.body).to.have.property("error");
      expect(response.body.error)
        .to.have.property("message")
        .eq("Shop exists, authorize with it user");
    });
  });

  it("C336 Error with regex", (): void => {
    createShop(
      {
        externalShopId: 1,
        configuration: {
          username: "ABC",
          password: "ABC",
          domain: "abc",
        },
        notifyDomain: "abc",
      },
      true,
    ).then((response: Cypress.Response<any>): void => {
      expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.have.property("codes");
      expect(response.body.error).to.have.property("invalidFields");
      expect(response.body.error)
        .to.have.property("message")
        .eq("Validation failed");
      expect(response.body.error.codes)
        .to.have.property("configuration.domain")
        .eq("REGEX_FAILED_ERROR");
      expect(response.body.error.codes)
        .to.have.property("configuration.password")
        .eq("REGEX_FAILED_ERROR");
      expect(response.body.error.codes)
        .to.have.property("configuration.username")
        .eq("REGEX_FAILED_ERROR");
      expect(response.body.error.codes).to.have.property("notifyDomain");
      expect(response.body.error.invalidFields)
        .to.have.property("configuration.domain")
        .eq("This value is not valid.");
      expect(response.body.error.invalidFields)
        .to.have.property("configuration.password")
        .eq("This value is not valid.");
      expect(response.body.error.invalidFields)
        .to.have.property("configuration.username")
        .eq("This value is not valid.");
      expect(response.body.error.invalidFields).to.have.property(
        "notifyDomain",
      );
    });
  });

  it("C337 Error with missing fields", (): void => {
    createShop({}, true).then((response: Cypress.Response<any>): void => {
      expect(response.status).to.eq(StatusCodes.BAD_REQUEST);
      expect(response.body).to.have.property("error");
      expect(response.body.error).to.have.property("codes");
      expect(response.body.error).to.have.property("invalidFields");
      expect(response.body.error)
        .to.have.property("message")
        .eq("Validation failed");
      expect(response.body.error.codes)
        .to.have.property("configuration")
        .eq("MISSING_FIELD_ERROR");
      expect(response.body.error.codes)
        .to.have.property("externalShopId")
        .eq("MISSING_FIELD_ERROR");
      expect(response.body.error.codes)
        .to.have.property("notifyDomain")
        .eq("MISSING_FIELD_ERROR");
      expect(response.body.error.invalidFields)
        .to.have.property("configuration")
        .eq("This field is missing.");
      expect(response.body.error.invalidFields)
        .to.have.property("externalShopId")
        .eq("This field is missing.");
      expect(response.body.error.invalidFields)
        .to.have.property("notifyDomain")
        .eq("This field is missing.");
    });
  });
});
