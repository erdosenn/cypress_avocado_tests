import { pl, Faker } from "@faker-js/faker";

export const polish = new Faker({
  locale: [pl],
});

//Internet

export const generateDomain = () => polish.internet.domainName();
export const generateRandomUuid = () => polish.string.uuid();
export const generateRandomEmail = () =>
  polish.internet.email({ firstName: "payment", lastName: "tests" });
export const generateRandomMerchantId = () =>
  "PK" + generateRandomNumber(10000, 99999);

export const generateRandomUsername = (merchantId) =>
  merchantId + "_" + polish.internet.password({ length: 12, memorable: true });

export const generatePassword = () =>
  polish.internet.password({ length: 16, memorable: true });

//User and company
export const generateFirstName = () => polish.person.firstName();
export const generateLastName = () => polish.person.lastName();
export const generateCompanyName = () => polish.company.name();
export const generateCity = () => polish.location.city();
export const generateZipCode = () => polish.location.zipCode("##-###");
export const generateStreetAddress = () => polish.location.streetAddress();
export const generatePhone = () =>
  "601" + generateRandomNumber(100000, 999999, 0);

//Bank
export const generateIban = () => polish.finance.iban({ countryCode: "PL" });

//Datatypes

const rand = function (min, max) {
  return min + Math.floor((max - min) * Math.random());
};

export const generateRandomNumber = (
  min: number = 1000,
  max: number = 9999,
  fractionDigits: number = 2,
): number =>
  polish.number.float({ min: min, max: max, fractionDigits: fractionDigits });

function calculateSum(weights: number[], raw: any, numberType): number {
  let sum: number = 0,
    i;
  switch (numberType) {
    case "nip":
      for (i = 0; i < weights.length; i += 1) {
        sum += weights[i] * +raw.charAt(i);
      }
      return sum % 11;
    case "regon":
      for (i = 0; i < weights.length; i += 1) {
        sum += weights[i] * +raw.charAt(i);
      }
      return (sum % 11) % 10;
    case "pesel":
      for (i = 0; i < weights.length; i += 1) {
        sum += weights[i] * raw[i];
      }
      return (10 - (sum % 10)) % 10;
  }
}

export function generateRegon9() {
  const firstHalf = (
    "00000" + generateRandomNumber(0, 100000).toString(10)
  ).slice(-5);
  const secondHalf = ("000" + generateRandomNumber(0, 1000).toString(10)).slice(
    -3,
  );
  const raw = firstHalf + secondHalf;

  const weights: number[] = [8, 9, 2, 3, 4, 5, 6, 7];
  let sum: number = calculateSum(weights, raw, "regon");
  return raw + sum.toString(10);
}

export function generateNip() {
  let taxOfficeId = rand(100000000, 999999999).toString(10);

  let weights: number[] = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum: number = calculateSum(weights, taxOfficeId, "nip");

  if (sum === 10) {
    // valid NIP cannot have control sum equal 10
    return generateNip();
  } else {
    return taxOfficeId + sum.toString(10);
  }
}

export function generateDocSerialNumber() {
  //TODO
  return "";
}

const getMonthOffsetForPesel = function (century: number): number {
  switch (century) {
    case 18:
      return 80;
    case 19:
      return 0;
    case 20:
      return 20;
    case 21:
      return 40;
    case 22:
      return 60;
  }
};

const daysInMonth = function (year: number, month: number) {
  // JS - month are zero based, but days are 1 based
  // so 1 is first day of month.
  // If we pass 0 day of next month - we get LAST day of month.
  return new Date(year, month + 1, 0).getDate();
};

const last2Digits = function (number: number) {
  const n: number = Math.floor(number % 100);
  return ("00" + n.toString(10)).slice(-2);
};

const computePeselControlDigit = function (rawPesel) {
  const peselDigits = rawPesel.split("").map(function (d) {
    return +d;
  });
  const weights: number[] = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  return calculateSum(weights, peselDigits, "pesel");
};

export const generatePesel = function () {
  const birthYear: number = rand(1800, 2300);

  const century: number = Math.floor(birthYear / 100);
  const monthOffset: number = getMonthOffsetForPesel(century);

  const birthMonth: number = rand(1, 13);
  const birthDay: number = rand(1, daysInMonth(birthYear, birthMonth) + 1);
  const peselMonth: number = birthMonth + monthOffset;

  const fourRandomDigits = ("0000" + rand(0, 10000).toString(10)).slice(-4);

  const rawPesel =
    last2Digits(birthYear) +
    last2Digits(peselMonth) +
    last2Digits(birthDay) +
    fourRandomDigits;

  const controlDigit: number = computePeselControlDigit(rawPesel);
  return rawPesel + controlDigit;
};
