import LoginPage from "../../../../../support/gui/shop/page/admin/LoginPage";
import TwoAddPage from "../../../../../support/gui/shop/page/admin/payment/two/TwoAddPage";
import { tradeTypeTwo } from "../../../../../support/gui/shop/dictionary/TradeTypeTwo";
import { businessTypeTwo } from "../../../../../support/gui/shop/dictionary/BusinessTypeTwo";

const adminLoginPage: LoginPage = new LoginPage();
const twoPage: TwoAddPage = new TwoAddPage();
describe("twoFormView", (): void => {
  beforeEach((): void => {
    adminLoginPage.loginAsAdmin();
    twoPage.visit();
    twoPage.set_trade_type_by_name(tradeTypeTwo.ARTSPOZ);
  });

  it("Sprawdzenie sekcji 'Dane firmy' dla typów działalności gospodarczych", (): void => {
    for (let type in businessTypeTwo) {
      type = businessTypeTwo[type];
      twoPage.set_business_type_by_name(type);

      twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_NAME);
      twoPage.elementShouldBeVisible(twoPage.FIELD_NIP);
      twoPage.elementShouldBeVisible(twoPage.FIELD_REGON);
      twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_PHONE);
      twoPage.elementShouldBeDisabled(twoPage.FIELD_COMPANY_COUNTRY);
      twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_STREET);
      twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_CITY);
      twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_ZIP);
      twoPage.elementShouldBeVisible(twoPage.CHECKBOX_COMPANY_OTHER_ADDRESS);

      switch (type) {
        case businessTypeTwo.JDG:
        case businessTypeTwo.SC:
          twoPage.elementShouldNotExist(twoPage.FIELD_KRS);
          break;
        default:
          twoPage.elementShouldBeVisible(twoPage.FIELD_KRS);
          break;
      }
    }

    twoPage.setCheckbox(twoPage.CHECKBOX_COMPANY_OTHER_ADDRESS);
    twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_OTHER_ADDRESS_COUNTRY);
    twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_OTHER_ADDRESS_STREET);
    twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_OTHER_ADDRESS_CITY);
    twoPage.elementShouldBeVisible(twoPage.FIELD_COMPANY_OTHER_ADDRESS_ZIP);
  });

  it("Sprawdzenie sekcji 'Dane reprezentanta' dla typów działalności gospodarczych", (): void => {
    for (let type in businessTypeTwo) {
      type = businessTypeTwo[type];
      twoPage.set_business_type_by_name(type);

      twoPage.elementShouldBeVisible(twoPage.FIELD_REPRESENTATIVE_FULL_NAME);
      twoPage.elementShouldBeVisible(twoPage.FIELD_REPRESENTATIVE_PESEL);
      twoPage.elementShouldBeVisible(twoPage.BUTTON_NEXT_REPRESENTATIVE);
    }
    twoPage.add_next_representative_form();

    twoPage
      .getElement(twoPage.FIELD_REPRESENTATIVE_FULL_NAME)
      .should("have.length", 2);
    twoPage
      .getElement(twoPage.FIELD_REPRESENTATIVE_PESEL)
      .should("have.length", 2);
  });

  it("Sprawdzenie sekcji 'Osoba kontaktowa' dla typów działalności gospodarczych", (): void => {
    for (let type in businessTypeTwo) {
      type = businessTypeTwo[type];
      twoPage.set_business_type_by_name(type);

      twoPage.elementShouldBeVisible(twoPage.FIELD_CONTACT_PERSON_FIRST_NAME);
      twoPage.elementShouldBeVisible(twoPage.FIELD_CONTACT_PERSON_LAST_NAME);
      twoPage.elementShouldBeVisible(twoPage.FIELD_CONTACT_PERSON_EMAIL);
      twoPage.elementShouldBeVisible(twoPage.FIELD_CONTACT_PERSON_PHONE);
      twoPage.elementShouldBeVisible(twoPage.CHECKBOX_TECHNICAL_PERSON);
    }
    twoPage.check_technical_person();

    twoPage.elementShouldBeVisible(twoPage.FIELD_TECHNICAL_PERSON_FIRST_NAME);
    twoPage.elementShouldBeVisible(twoPage.FIELD_TECHNICAL_PERSON_LAST_NAME);
    twoPage.elementShouldBeVisible(twoPage.FIELD_TECHNICAL_PERSON_EMAIL);
    twoPage.elementShouldBeVisible(twoPage.FIELD_TECHNICAL_PERSON_PHONE);
  });
  it("Sprawdzenie sekcji 'Inne ustawienia' oraz 'Zgody' dla typów działalności gospodarczych", (): void => {
    for (let type in businessTypeTwo) {
      type = businessTypeTwo[type];
      twoPage.set_business_type_by_name(type);

      twoPage.elementShouldBeVisible(twoPage.FIELD_IBAN);
      twoPage.elementShouldBeVisible(twoPage.FIELD_EMAIL_FOR_INVOICES);

      twoPage.elementShouldBeVisible(twoPage.CHECKBOX_ALL_TERMS);
      twoPage.elementShouldBeVisible(twoPage.CHECKBOX_CONSENT_PERSONAL_DATA);
      twoPage.elementShouldBeVisible(
        twoPage.CHECKBOX_TERMS_OF_FINANCIAL_SERVICES,
      );
      twoPage.elementShouldBeVisible(twoPage.CHECKBOX_CONSENTS_MARKETING_SHOP);
      twoPage.elementShouldBeVisible(
        twoPage.CHECKBOX_CONSENT_PERSONAL_DATA_SHOP,
      );
    }

    twoPage.check_all_terms();
    twoPage
      .getElement(twoPage.CHECKBOX_CONSENT_PERSONAL_DATA)
      .should("be.checked");
    twoPage
      .getElement(twoPage.CHECKBOX_TERMS_OF_FINANCIAL_SERVICES)
      .should("be.checked");
    twoPage
      .getElement(twoPage.CHECKBOX_CONSENTS_MARKETING_SHOP)
      .should("be.checked");
    twoPage
      .getElement(twoPage.CHECKBOX_CONSENT_PERSONAL_DATA_SHOP)
      .should("be.checked");
  });
});
