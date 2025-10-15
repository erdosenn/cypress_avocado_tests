import {
  generateFirstName,
  generateLastName,
  generatePhone,
  generateRandomNumber,
} from "../../../dataGenerators";

export type BasketAddressData = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  zipCode: string;
  city: string;
};

export function prepareData(data?: BasketAddressData): BasketAddressData {
  let preparedData: BasketAddressData = {
    email: `agata.knapp+${generateRandomNumber()}@dreamcommerce.com`,
    firstName: generateFirstName(),
    lastName: generateLastName(),
    phone: generatePhone(),
    street: "Testowa 102",
    zipCode: "12-345",
    city: "Testowe Górne",
  };
  if (data) {
    preparedData.email = data.email ? data.email : preparedData.email;
    preparedData.firstName = data.firstName
      ? data.firstName
      : preparedData.firstName;
    preparedData.lastName = data.lastName
      ? data.lastName
      : preparedData.lastName;
    preparedData.phone = data.phone ? data.phone : preparedData.phone;
    preparedData.street = data.street ? data.street : preparedData.street;
    preparedData.zipCode = data.zipCode ? data.zipCode : preparedData.zipCode;
    preparedData.city = data.city ? data.city : preparedData.city;
  }
  return preparedData;
}
