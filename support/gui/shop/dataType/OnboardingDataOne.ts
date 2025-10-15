import { businessTypeOne } from "../dictionary/BusinessTypeOne";
import { tradeTypeOne } from "../dictionary/TradeTypeOne";
import {
  generateStreetAddress,
  generateCompanyName,
  generateNip,
  generatePhone,
  generateCity,
  generateZipCode,
  generateFirstName,
  generateLastName,
} from "../../../dataGenerators";

export type OnboardingDataOne = {
  basicData: BasicData;
  company: CompanyData;
  representative: RepresentativeData;
  paymentData: PaymentData;
};

export type BasicData = {
  businessType: string;
  tradeType: any;
};

export type CompanyData = {
  companyName: string;
  nip: string;
  companyPhone: string;
  registrationDate: string;
  companyStreet: string;
  companyCity: string;
  companyZip: string;
};

export type RepresentativeData = {
  firstName: string;
  lastName: string;
  pesel: string;
  documentSerialNumber: string;
  docExpireDate: string;
};

export type PaymentData = {
  iban: string;
  averageServiceTurnover: number;
  averageTransactionAmount: number;
};

export function prepareBasicData(data?: BasicData): BasicData {
  let preparedData: BasicData = {
    businessType: businessTypeOne.JDG,
    tradeType: tradeTypeOne.DOM,
  };
  if (data) {
    preparedData.businessType = data.businessType
      ? data.businessType
      : preparedData.businessType;
    preparedData.tradeType = data.tradeType
      ? data.tradeType
      : preparedData.tradeType;
  }
  return preparedData;
}

export function prepareCompanyData(data?: CompanyData): CompanyData {
  let preparedData: CompanyData = {
    companyName: generateCompanyName(),
    nip: generateNip(),
    companyPhone: generatePhone(),
    registrationDate: "2000-01-01",
    companyStreet: generateStreetAddress(),
    companyCity: generateCity(),
    companyZip: generateZipCode(),
  };
  if (data) {
    preparedData.companyName = data.companyName
      ? data.companyName
      : preparedData.companyName;
    preparedData.nip = data.nip ? data.nip : preparedData.nip;
    preparedData.companyPhone = data.companyPhone
      ? data.companyPhone
      : preparedData.companyPhone;
    preparedData.registrationDate = data.registrationDate
      ? data.registrationDate
      : preparedData.registrationDate;
    preparedData.companyStreet = data.companyStreet
      ? data.companyStreet
      : preparedData.companyStreet;
    preparedData.companyCity = data.companyCity
      ? data.companyCity
      : preparedData.companyCity;
    preparedData.companyZip = data.companyZip
      ? data.companyZip
      : preparedData.companyZip;
  }
  return preparedData;
}

export function prepareRepresentativeData(
  data?: RepresentativeData,
): RepresentativeData {
  let preparedData: RepresentativeData = {
    firstName: generateFirstName(),
    lastName: generateLastName(),
    pesel: "00281249985",
    documentSerialNumber: "WVO140668",
    docExpireDate: "2030-01-01",
  };
  if (data) {
    preparedData.firstName = data.firstName
      ? data.firstName
      : preparedData.firstName;
    preparedData.lastName = data.lastName
      ? data.lastName
      : preparedData.lastName;
    preparedData.pesel = data.pesel ? data.pesel : preparedData.pesel;
    preparedData.documentSerialNumber = data.documentSerialNumber
      ? data.documentSerialNumber
      : preparedData.documentSerialNumber;
    preparedData.docExpireDate = data.docExpireDate
      ? data.docExpireDate
      : preparedData.docExpireDate;
  }
  return preparedData;
}

export function preparePaymentData(data?: PaymentData): PaymentData {
  let preparedData: PaymentData = {
    iban: "93102015924527130825049914",
    averageServiceTurnover: 5000,
    averageTransactionAmount: 500,
  };
  if (data) {
    preparedData.iban = data.iban ? data.iban : preparedData.iban;
    preparedData.averageServiceTurnover = data.averageServiceTurnover
      ? data.averageServiceTurnover
      : preparedData.averageServiceTurnover;
    preparedData.averageTransactionAmount = data.averageTransactionAmount
      ? data.averageTransactionAmount
      : preparedData.averageServiceTurnover;
  }
  return preparedData;
}

export function prepareAllData(
  basicData?: BasicData,
  companyData?: CompanyData,
  representativeData?: RepresentativeData,
  paymentData?: PaymentData,
): OnboardingDataOne {
  return {
    basicData: prepareBasicData(basicData),
    company: prepareCompanyData(companyData),
    representative: prepareRepresentativeData(representativeData),
    paymentData: preparePaymentData(paymentData),
  };
}
