import { prepareAllData } from "./data/paymentData";
import CryptoJS from "crypto-js";
import REST from "../../rest";

let restAPI: REST = new REST(Cypress.env("api_tests").url);

function sendGet(
  path: string,
  customHeaders: object | null,
  auth: object | null,
  should_fail: boolean = false,
): Cypress.Chainable {
  const requestHeaders: object = prepareRequestHeaders(customHeaders);
  const preparedAuth: object = prepareAuth(auth);
  return restAPI.sendGet(path, requestHeaders, preparedAuth, should_fail);
}

function sendPost(
  path: string,
  customHeaders: object | null,
  auth: object | null,
  body: object | string | null,
  should_fail: boolean = false,
  form: boolean = false,
): Cypress.Chainable {
  const requestHeaders: object = prepareRequestHeaders(customHeaders);
  const preparedAuth: object = prepareAuth(auth);
  return restAPI.sendPost(
    path,
    requestHeaders,
    preparedAuth,
    body,
    should_fail,
    form,
  );
}

function sendPut(
  path: string,
  customHeaders: object | null,
  auth: object | null,
  body: object,
  should_fail: boolean = false,
): Cypress.Chainable {
  const requestHeaders: object = prepareRequestHeaders(customHeaders);
  const preparedAuth: object = prepareAuth(auth);
  return restAPI.sendPut(path, requestHeaders, preparedAuth, body, should_fail);
}

export function getHealth(): Cypress.Chainable {
  return sendGet("/health", null, null);
}

export function createShop(
  body: object,
  should_fail: boolean = false,
): Cypress.Chainable {
  return sendPost("/v1/shop", null, null, body, should_fail);
}

export function createConfiguration(
  shopId: string,
  auth: object,
  body: object,
  should_fail: boolean = false,
): Cypress.Chainable {
  return sendPost(
    `/v1/shop/${shopId}/configuration`,
    null,
    auth,
    body,
    should_fail,
  );
}

export function getConfiguration(
  shopId: string,
  configId: string,
  auth: object,
  should_fail: boolean = false,
): Cypress.Chainable {
  return sendGet(
    `/v1/shop/${shopId}/configuration/${configId}`,
    null,
    auth,
    should_fail,
  );
}

export function changeConfiguration(
  shopId: string,
  configId: string,
  auth: object,
  body: object,
  should_fail: boolean = false,
): Cypress.Chainable {
  return sendPut(
    `/v1/shop/${shopId}/configuration/${configId}`,
    {},
    auth,
    body,
    should_fail,
  );
}

export function createPayment(
  shopId: string,
  auth: object,
  paymentData: object,
  secretKey: string,
  should_fail: boolean = false,
): Cypress.Chainable {
  let body: string = preparePaymentFormData(paymentData, secretKey);
  return sendPost(
    `/v1/shop/${shopId}/payment`,
    { "content-type": "application/x-www-form-urlencoded" },
    auth,
    body,
    should_fail,
    true,
  );
}

export function sendPaymentStatus(
  body: object,
  should_fail: boolean = false,
): Cypress.Chainable {
  return sendPost("/v1/payment/status", {}, null, body, should_fail);
}

export function preparePaymentBody(configId: string): object {
  return prepareAllData(configId);
}

export function preparePaymentFormData(
  paymentData: object,
  secretKey: string,
): string {
  let base64Hash: CryptoJS.lib.WordArray = CryptoJS.enc.Utf8.parse(
    JSON.stringify(paymentData),
  );
  let base64: string = CryptoJS.enc.Base64.stringify(base64Hash);
  let sha512Hash: string = CryptoJS.SHA512(base64 + secretKey).toString();
  return "data=" + base64 + "&hash=" + sha512Hash;
}

const prepareRequestHeaders = (customHeaders: object | null): object => {
  if (customHeaders == null) {
    customHeaders = {};
  }
  return { customHeaders };
};
const prepareAuth = (auth: object | null): object => {
  if (auth == null) {
    let currentEnv = Cypress.env("api_tests");
    if (currentEnv["url"] == "http://localhost") {
      auth = { username: "username.client", password: "lightPass" };
    } else {
      auth = { username: "username.admin", password: "veryStrongPass" };
    }
  }
  return auth;
};
