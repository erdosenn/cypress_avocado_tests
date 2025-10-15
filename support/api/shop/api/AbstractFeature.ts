import REST from "../../../rest";
import { generateRandomNumber } from "../../../dataGenerators";

const bearer: string = "Bearer ";
const id_path: string = "/id/";

const SUT = Cypress.env("SUT");
const API_URL: string = Cypress.env(SUT).url + "/api/rest";
const SHOP_ENV: object = Cypress.env("shopEnv");

class AbstractFeature {
  public URI: string = "";

  public RANDOM_NUMBER: number = generateRandomNumber(1000, 9999);

  restAPI: REST = new REST(API_URL);

  public ID: string | number;
  public BODY: object;

  public create(data: object) {
    return this.getToken().then((response) => {
      this.restAPI
        .sendPost(
          this.URI,
          { Authorization: bearer + response.body.access_token },
          null,
          data,
        )
        .then((response) => {
          return response.body;
        });
    });
  }

  get(object_id: number) {
    return this.getToken().then((response) => {
      return this.restAPI
        .sendGet(
          this.URI + id_path + object_id,
          { Authorization: bearer + response.body.access_token },
          null,
        )
        .then((response) => {
          return (this.BODY = response.body);
        });
    });
  }

  edit(object_id: number, data: object): void {
    this.getToken().then((response) => {
      return this.restAPI.sendPut(
        this.URI + id_path + object_id,
        { Authorization: bearer + response.body.access_token },
        null,
        data,
      );
    });
  }

  delete(object_id: number): void {
    this.getToken().then((response) => {
      return this.restAPI.sendDelete(
        this.URI + id_path + object_id,
        { Authorization: bearer + response.body.access_token },
        null,
      );
    });
  }

  private getToken(): Cypress.Chainable<any> {
    let loginData = SHOP_ENV["login"]["admin"];
    return this.restAPI.sendPost(
      "/auth",
      null,
      {
        username: loginData["login"],
        password: loginData["password"],
      },
      null,
    );
  }
}

export default AbstractFeature;
