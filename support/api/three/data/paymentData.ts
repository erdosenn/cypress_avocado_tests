import {
    generateCity,
    generateFirstName, generateLastName, generatePhone,
    generateRandomEmail,
    generateRandomNumber, generateStreetAddress,
    generateZipCode
} from "../../../dataGenerators";

export function prepareAllData(configId: string): object {
  let basicData: BasicData = prepareBasicData(configId);
  let addressData: addressesData = prepareAddressesData();
  return {
    billingAddress: addressData.billingAddress,
    configurationId: basicData.configurationId,
    currencyName: basicData.currencyName,
    deliveryAddress: addressData.deliveryAddress,
    discount: prepareDiscount(),
    email: basicData.email,
    locale: basicData.locale,
    merchantUrls: prepareMerchantUrls(basicData.orderId),
    orderAmount: basicData.orderAmount,
    orderId: basicData.orderId,
    products: prepareProducts(),
    shipping: prepareShipping(),
    transactionId: basicData.transactionId,
  };
}

export type BasicData = {
  configurationId: string;
  currencyName: string;
  email: string;
  locale: string;
  orderAmount: string;
  orderId: number;
  transactionId: number;
};

export function prepareBasicData(configId: string): BasicData {
  return {
    configurationId: configId,
    currencyName: "PLN",
    email: generateRandomEmail(),
    locale: "pl-PL",
    orderAmount: "402.05",
    orderId: generateRandomNumber(10000, 99999),
    transactionId: generateRandomNumber(10000, 99999),
  };
}

export type addressesData = {
  billingAddress: addressData;
  deliveryAddress: addressData;
};

export function prepareAddressesData(
  billingSameAsDelivery: boolean = true,
): addressesData {
  let newAddress: addressData = prepareAddress();
  if (billingSameAsDelivery) {
    return {
      deliveryAddress: newAddress,
      billingAddress: newAddress,
    };
  } else {
    let newBillingAddress: addressData = prepareAddress();
    return {
      deliveryAddress: newAddress,
      billingAddress: newBillingAddress,
    };
  }
}

type addressData = {
  city: string;
  company: string;
  countryCode: string;
  firstname: string;
  isCompany: boolean;
  lastname: string;
  phone: string;
  postcode: string;
  state: string;
  street1: string;
  street2: string;
};

function prepareAddress(): addressData {
  let data: addressData = {
    city: generateCity(),
    company: "",
    countryCode: "PL",
    firstname: generateFirstName(),
    isCompany: false,
    lastname: generateLastName(),
    phone: generatePhone(),
    postcode: generateZipCode(),
    state: "",
    street1: generateStreetAddress(),
    street2: "",
  };
  return data;
}

export function prepareProducts(): object {
  return [
    {
      grossPrice: "339.00",
      name: "Testowy produkt",
      quantity: 1,
      sku: "",
      taxValue: "23",
      unit: "szt.",
    },
  ];
}

export function prepareDiscount(): object {
  return {
    grossPrice: "-16.95",
    name: "Discount",
  };
}

export function prepareShipping(): object {
  return {
    grossPrice: "80.00",
    name: "Przesyłka kurierska",
    taxValue: "23",
  };
}

export function prepareMerchantUrls(orderId: number): object {
  let prefixUrl: string = "new-domain.com" + "/basket/finished/status";
  let suffixUrl: string = `/paymentid/8/orderid/${orderId}/`;
  return {
    success: "https://" + prefixUrl + "/ok" + suffixUrl,
    failure: "https://" + prefixUrl + "/fail" + suffixUrl,
  };
}
