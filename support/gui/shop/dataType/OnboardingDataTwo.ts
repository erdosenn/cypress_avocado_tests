import { businessTypeTwo } from "../dictionary/BusinessTypeTwo";
import { tradeTypeTwo } from "../dictionary/TradeTypeTwo";
import {
  generateStreetAddress,
  generateCompanyName,
  generateNip,
  generatePhone,
  generateRegon9,
  generateCity,
  generateZipCode,
  generateFirstName,
  generateLastName,
  generatePesel,
  generateRandomEmail,
  generateIban,
} from "../../../dataGenerators";

export type onboardingDataTwo = {
  basicData: BasicCompanyData;
  company: CompanyData;
  representative: Representative;
  contactPerson: ContactPerson;
  otherData: OtherData;
};

export type BasicCompanyData = {
  businessType: string;
  tradeType: string;
};
export type OtherData = {
  iban: string;
  invoiceEmail: string;
};

export type CompanyData = {
  companyName: string;
  nip: string;
  regon: string;
  krs?: string;
  companyPhone: string;
  companyStreet: string;
  companyCity: string;
  companyZip: string;
};

export type Representative = {
  fullName: string;
  pesel: string;
};

export type ContactPerson = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export function prepareBasicData(): BasicCompanyData {
  return {
    businessType: businessTypeTwo.JDG,
    tradeType: tradeTypeTwo.ARTSPOZ,
  };
}

export function prepareCompanyData(
  isJDGorSC: boolean = false,
  krs: string = "0000007996",
): CompanyData {
  if (isJDGorSC) {
    return {
      companyName: generateCompanyName(),
      nip: generateNip(),
      regon: generateRegon9(),
      companyCity: generateCity(),
      companyPhone: generatePhone(),
      companyStreet: generateStreetAddress(),
      companyZip: generateZipCode(),
    };
  } else {
    return {
      companyName: generateCompanyName(),
      nip: generateNip(),
      regon: generateRegon9(),
      krs: krs,
      companyCity: generateCity(),
      companyPhone: generatePhone(),
      companyStreet: generateStreetAddress(),
      companyZip: generateZipCode(),
    };
  }
}

export function prepareRepresentativeData(): Representative {
  return {
    fullName: generateFirstName() + " " + generateLastName(),
    pesel: generatePesel(),
  };
}

export function prepareContactPerson(): ContactPerson {
  return {
    email: generateRandomEmail(),
    firstName: generateFirstName(),
    lastName: generateLastName(),
    phone: generatePhone(),
  };
}

export function prepareOtherData(): OtherData {
  return {
    iban: generateIban(),
    invoiceEmail: generateRandomEmail(),
  };
}

export function prepareAllData(
  isJDGorCS?: boolean,
  krs?: string,
): onboardingDataTwo {
  return {
    basicData: prepareBasicData(),
    company: prepareCompanyData(isJDGorCS, krs),
    representative: prepareRepresentativeData(),
    contactPerson: prepareContactPerson(),
    otherData: prepareOtherData(),
  };
}
