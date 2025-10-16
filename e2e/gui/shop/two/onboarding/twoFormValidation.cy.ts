import LoginPage from "../../../../../support/gui/shop/page/admin/LoginPage";
import TwoEditPage from "../../../../../support/gui/shop/page/admin/payment/two/TwoEditPage";
import TwoAddPage from "../../../../../support/gui/shop/page/admin/payment/two/TwoAddPage";
import { tradeTypeTwo } from "../../../../../support/gui/shop/dictionary/TradeTypeTwo";
import { businessTypeTwo } from "../../../../../support/gui/shop/dictionary/BusinessTypeTwo";
import {
  onboardingDataTwo,
  prepareAllData,
} from "../../../../../support/gui/shop/dataType/OnboardingDataTwo";

const adminLoginPage: LoginPage = new LoginPage();
const twoAddPage: TwoAddPage = new TwoAddPage();
const twoEditPage: TwoEditPage = new TwoEditPage();

describe("twoFormValidation", (): void => {
  beforeEach((): void => {
    adminLoginPage.loginAsAdmin();
    twoAddPage.visit();
    twoAddPage.set_trade_type_by_name(tradeTypeTwo.ARTSPOZ);
  });

  it("Zapis pustego formularza, sprawdzenie komunikatów błędów", (): void => {
    for (let type in businessTypeTwo) {
      type = businessTypeTwo[type];
      twoAddPage.set_business_type_by_name(type);

      twoAddPage.check_all_terms();
      twoAddPage.save_form();

      let fields_to_check: string[] = [
        twoAddPage.FIELD_COMPANY_NAME,
        twoAddPage.FIELD_NIP,
        twoAddPage.FIELD_REGON,
        twoAddPage.FIELD_COMPANY_PHONE,
        twoAddPage.FIELD_COMPANY_COUNTRY,
        twoAddPage.FIELD_COMPANY_STREET,
        twoAddPage.FIELD_COMPANY_CITY,
        twoAddPage.FIELD_COMPANY_ZIP,
        twoAddPage.FIELD_REPRESENTATIVE_FULL_NAME,
        twoAddPage.FIELD_REPRESENTATIVE_PESEL,
        twoAddPage.FIELD_CONTACT_PERSON_FIRST_NAME,
        twoAddPage.FIELD_CONTACT_PERSON_FIRST_NAME,
        twoAddPage.FIELD_CONTACT_PERSON_EMAIL,
        twoAddPage.FIELD_CONTACT_PERSON_PHONE,
        twoAddPage.FIELD_IBAN,
        twoAddPage.FIELD_EMAIL_FOR_INVOICES,
      ];
      for (let field in fields_to_check.values()) {
        if (type != businessTypeTwo.JDG) {
          fields_to_check.push(twoAddPage.FIELD_KRS);
        }

        twoAddPage.elementShouldBeVisible(
          TwoAddPage.create_error_locator(field),
        );
        twoAddPage.elementShouldContainText(
          TwoAddPage.create_error_locator(field),
          "Pole wymagane",
        );
        twoAddPage
          .getElement(field)
          .should("have.class", "control_error control");
      }
    }
  });

  const incorrect_company_names = [
    {
      is_error: true,
      value: "#$@%^&%*&%&$#%@$",
      error_text:
        "Nazwa zawiera niedozwolone znaki. Dozwolone znaki specjalne to . , + - &",
    },
    {
      is_error: true,
      value: "F.H.U. Cats'n'Dogz",
      error_text:
        "Nazwa zawiera niedozwolone znaki. Dozwolone znaki specjalne to . , + - &",
    },
    {
      is_error: true,
      value:
        "sldmgfklsdngkfndjgdfnkjhndflgknskfsldmgfklsdngkfndjgdfnkjhndflgknskfsldmgfklsdngkfndjgdfnkjhndflgknskfsldmgfklsdngkfndjgdfnkjhndflgknskfsldmgfklsdngkfndjgdfnkjhndflgknskfdmgfklsdngkfndjgdfnkjhndflgknskfsldmgfklsdngkfndjgdfnkjhndflgknskf",
      error_text: "Maksymalnie 200 znaków",
    },
    {
      is_error: true,
      value: "   ",
      error_text: "Pole wymagane",
    },
    {
      is_error: false,
      value: "..---++ Pat&kot, Kot&Pat ++---..",
    },
    {
      is_error: false,
      value: "123456787654323456",
    },
  ];

  incorrect_company_names.forEach((incorrect_company_name) => {
    it(
      "Walidacja pola Pełna nazwa firmy dla wartości: '" +
        incorrect_company_name.value +
        "'",
      (): void => {
        twoAddPage.set_business_type_by_name(businessTypeTwo.JDG);
        twoAddPage.fill_company_name(incorrect_company_name.value);
        twoAddPage.check_all_terms();
        twoAddPage.save_form();
        if (incorrect_company_name.is_error) {
          twoAddPage.elementShouldBeVisible(
            TwoAddPage.create_error_locator(twoAddPage.FIELD_COMPANY_NAME),
          );
          twoAddPage
            .getElement(twoAddPage.FIELD_COMPANY_NAME)
            .should("have.class", "control_error control");
          twoAddPage.elementShouldContainText(
            TwoAddPage.create_error_locator(twoAddPage.FIELD_COMPANY_NAME),
            incorrect_company_name.error_text,
          );
        } else {
          twoAddPage
            .getElement(twoAddPage.FIELD_COMPANY_NAME)
            .should("not.have.class", "control_error control");
        }
        twoAddPage
          .getElement(twoAddPage.FIELD_COMPANY_NAME)
          .should("have.value", incorrect_company_name.value);
      },
    );
  });

  const incorrect_nips = [
    {
      is_error: true,
      value: "asdf",
      error_text: "Nieprawidłowy NIP",
    },
    {
      is_error: true,
      value: "1234",
      error_text: "Nieprawidłowy NIP",
    },
    {
      is_error: true,
      value: "12345678901",
      error_text: "Nieprawidłowy NIP",
    },
    {
      is_error: true,
      value: "   ",
      error_text: "Pole wymagane",
    },
    {
      is_error: false,
      value: "1234567890",
    },
    {
      is_error: false,
      value: "1582779848",
    },
    // {
    //     is_error: false,
    //     value: "158-277-98-48"
    // }
  ];
  incorrect_nips.forEach((incorrect_nip) => {
    it(
      "Walidacja pola NIP dla wartości: '" + incorrect_nip.value + "'",
      (): void => {
        twoAddPage.set_business_type_by_name(businessTypeTwo.JDG);
        twoAddPage.fill_nip(incorrect_nip.value);
        twoAddPage.check_all_terms();
        twoAddPage.save_form();
        if (incorrect_nip.is_error) {
          twoAddPage.elementShouldBeVisible(
            TwoAddPage.create_error_locator(twoAddPage.FIELD_NIP),
          );
          twoAddPage
            .getElement(twoAddPage.FIELD_NIP)
            .should("have.class", "control_error control");
          twoAddPage.elementShouldContainText(
            TwoAddPage.create_error_locator(twoAddPage.FIELD_NIP),
            incorrect_nip.error_text,
          );
        } else {
          twoAddPage
            .getElement(twoAddPage.FIELD_NIP)
            .should("not.have.class", "control_error control");
        }
        twoAddPage
          .getElement(twoAddPage.FIELD_NIP)
          .should("have.value", incorrect_nip.value);
      },
    );
  });

  const incorrect_regons = [
    {
      is_error: true,
      value: "asdf",
      error_text: "Nieprawidłowy REGON",
    },
    {
      is_error: true,
      value: "1234",
      error_text: "Nieprawidłowy REGON",
    },
    {
      is_error: true,
      value: "1234567890",
      error_text: "Nieprawidłowy REGON",
    },
    {
      is_error: true,
      value: "   ",
      error_text: "Pole wymagane",
    },
    {
      is_error: true,
      value: "123456789",
      error_text: "Nieprawidłowy REGON",
    },
    {
      is_error: false,
      value: "254919210",
    },
  ];
  incorrect_regons.forEach((incorrect_regon) => {
    it(
      "Walidacja pola REGON dla wartości: '" + incorrect_regon.value + "'",
      (): void => {
        twoAddPage.set_business_type_by_name(businessTypeTwo.JDG);
        twoAddPage.fill_regon(incorrect_regon.value);
        twoAddPage.check_all_terms();
        twoAddPage.save_form();
        if (incorrect_regon.is_error) {
          twoAddPage.elementShouldBeVisible(
            TwoAddPage.create_error_locator(twoAddPage.FIELD_REGON),
          );
          twoAddPage
            .getElement(twoAddPage.FIELD_REGON)
            .should("have.class", "control_error control");
          twoAddPage.elementShouldContainText(
            TwoAddPage.create_error_locator(twoAddPage.FIELD_REGON),
            incorrect_regon.error_text,
          );
        } else {
          twoAddPage
            .getElement(twoAddPage.FIELD_REGON)
            .should("not.have.class", "control_error control");
        }
        twoAddPage
          .getElement(twoAddPage.FIELD_REGON)
          .should("have.value", incorrect_regon.value);
      },
    );
  });

  const incorrect_pesels = [
    {
      is_error: true,
      value: "fmwekfwef",
      error_text: "Nieprawidłowy PESEL",
    },
    {
      is_error: true,
      value: "1234",
      error_text: "Nieprawidłowy PESEL",
    },
    {
      is_error: true,
      value: "87565433434",
      error_text: "Nieprawidłowy PESEL",
    },
    {
      is_error: true,
      value: "   ",
      error_text: "Pole wymagane",
    },
    {
      is_error: false,
      value: "89081413532",
    },
  ];

  incorrect_pesels.forEach((incorrect_pesel) => {
    it(
      "Walidacja pola PESEL dla wartości: '" + incorrect_pesel.value + "'",
      (): void => {
        twoAddPage.set_business_type_by_name(businessTypeTwo.JDG);
        twoAddPage.fill_representative_pesel(incorrect_pesel.value);
        twoAddPage.check_all_terms();
        twoAddPage.save_form();
        if (incorrect_pesel.is_error) {
          twoAddPage.elementShouldBeVisible(
            TwoAddPage.create_error_locator(
              twoAddPage.FIELD_REPRESENTATIVE_PESEL,
            ),
          );
          twoAddPage
            .getElement(twoAddPage.FIELD_REPRESENTATIVE_PESEL)
            .should("have.class", "control_error control");
          twoAddPage.elementShouldContainText(
            TwoAddPage.create_error_locator(
              twoAddPage.FIELD_REPRESENTATIVE_PESEL,
            ),
            incorrect_pesel.error_text,
          );
        } else {
          twoAddPage
            .getElement(twoAddPage.FIELD_REPRESENTATIVE_PESEL)
            .should("not.have.class", "control_error control");
        }
        twoAddPage
          .getElement(twoAddPage.FIELD_REPRESENTATIVE_PESEL)
          .should("have.value", incorrect_pesel.value);
      },
    );
  });

  it.skip("Zapisanie wypełnionego formularza", (): void => {
    const twoData: onboardingDataTwo = prepareAllData(true);

    twoAddPage.fill_basic_info(
      twoData.basicData.businessType,
      twoData.basicData.tradeType,
    );
    twoAddPage.fill_company_data(
      twoData.company.companyName,
      twoData.company.nip,
      twoData.company.regon,
      twoData.company.companyPhone,
      twoData.company.companyStreet,
      twoData.company.companyCity,
      twoData.company.companyZip,
    );
    twoAddPage.fill_representative_data(
      twoData.representative.fullName,
      twoData.representative.pesel,
    );
    twoAddPage.fill_contact_person_data(
      twoData.contactPerson.firstName,
      twoData.contactPerson.lastName,
      twoData.contactPerson.email,
      twoData.contactPerson.phone,
    );
    twoAddPage.fill_other_data(
      twoData.otherData.iban,
      twoData.otherData.invoiceEmail,
    );
    twoAddPage.check_all_terms();
    twoAddPage.save_form();

    twoEditPage.elementShouldBeVisible(twoEditPage.INFOBOX_SUCCESS);
    twoEditPage.elementShouldBeVisible(twoEditPage.ACCOUNT_ID);
    twoEditPage.elementShouldBeVisible(twoEditPage.INFOBOX_ACTIVATE);
    twoEditPage.elementShouldBeVisible(twoEditPage.BUTTON_ACTIVATE_ACCOUNT);
    twoEditPage.elementShouldContainText(
      twoEditPage.BUTTON_ACTIVATE_ACCOUNT,
      twoEditPage.TEXT_ACTIVATE_ACCOUNT,
    );
  });
});
