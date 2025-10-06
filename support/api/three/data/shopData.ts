import { generateRandomNumber } from "../../../dataGenerators";
import { ConfigData, prepareConfigData } from "./configData";

export interface ShopData {
  externalShopId?: number;
  configuration: ConfigData;
  notifyDomain?: string;
}

export function prepareShopData(
  configuration?: ConfigData,
  externalShopId?: number,
  notifyDomain?: string,
): ShopData {
  let newData: any = {};
  if (!externalShopId) {
    newData.externalShopId = generateRandomNumber(1000, 9999);
  } else {
    newData.externalShopId = externalShopId;
  }
  if (!configuration) {
    newData.configuration = prepareConfigData();
  } else {
    newData.configuration = configuration;
  }
  if (!notifyDomain) {
    newData.notifyDomain = newData.configuration.domain;
  } else {
    newData.notifyDomain = notifyDomain;
  }
  return newData;
}
