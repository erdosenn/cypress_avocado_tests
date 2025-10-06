import {
  generatePassword,
  generateRandomUsername,
} from "../../../dataGenerators";

export interface ConfigData {
  username?: string;
  password?: string;
  domain?: string;
}

export function prepareConfigData(
  username?: string,
  password?: string,
  domain?: string,
  is_it_put: boolean = false,
): ConfigData {
  let newData: any = {};

  if (!username) {
    newData.username = generateRandomUsername(newData.merchantId);
  } else {
    newData.username = username;
  }
  if (!password) {
    newData.password = generatePassword();
  } else {
    newData.password = password;
  }
  if (!is_it_put) {
    if (!domain) {
      newData.domain = "new-domain.com";
    } else {
      newData.domain = domain;
    }
  }
  return newData;
}
