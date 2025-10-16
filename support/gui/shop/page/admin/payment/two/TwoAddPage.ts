import AdminAbstractPage from "../../AdminAbstractPage";
import { TranslationPL } from "../../../../dictionary/TranslationPL";
import { DropdownType } from "../../../ShopAbstractPage";

class TwoAddPage extends AdminAbstractPage {
  public readonly URI: string =
    "/configPayments/edit/id/" + this.SHOP_ENV["payments"]["two"];

  public readonly LIST_BUSINESS_TYPE: string = "#businessType";
  public readonly LIST_TRADE: string = "#trade";
  public readonly LIST_SHOP_URL: string = "#shopUrl";

  public readonly FIELD_COMPANY_NAME: string = "#companyName";
  public readonly FIELD_NIP: string = "#nip";
  public readonly FIELD_REGON: string = "#REGON";
  public readonly FIELD_KRS: string = "#krs";
  public readonly FIELD_COMPANY_PHONE: string = "#phoneNumber";
  public readonly FIELD_COMPANY_COUNTRY: string =
    "//*[@id='companyAddress[country]']";
  public readonly FIELD_COMPANY_STREET: string =
    "//*[@id='companyAddress[street]']";
  public readonly FIELD_COMPANY_CITY: string =
    "//*[@id='companyAddress[city]']";
  public readonly FIELD_COMPANY_ZIP: string =
    "//*[@id='companyAddress[postCode]']";
  public readonly CHECKBOX_COMPANY_OTHER_ADDRESS: string =
    "//*[@id='otherMailingAddress']";
  public readonly FIELD_COMPANY_OTHER_ADDRESS_COUNTRY: string =
    "//*[@id='correspondenceAddress[country]']";
  public readonly FIELD_COMPANY_OTHER_ADDRESS_STREET: string =
    "//*[@id='correspondenceAddress[street]']";
  public readonly FIELD_COMPANY_OTHER_ADDRESS_CITY: string =
    "//*[@id='correspondenceAddress[city]']";
  public readonly FIELD_COMPANY_OTHER_ADDRESS_ZIP: string =
    "//*[@id='correspondenceAddress[postCode]']";

  public readonly FIELD_REPRESENTATIVE_FULL_NAME: string =
    "//*[contains(@id,'representatives') and contains(@id,'name')]";
  public readonly FIELD_REPRESENTATIVE_PESEL: string =
    "//*[contains(@id,'representatives') and contains(@id,'pesel')]";
  public readonly BUTTON_NEXT_REPRESENTATIVE: string = `//*[contains(text(),'${TranslationPL.ADD_NEXT_REPRESENTATIVE}')]`;
  public readonly LABEL_REPRESENTATIVE_DATA: string = `//h4[contains(text(),'${TranslationPL.REPRESENTATIVE_DATA}')]`;

  public readonly FIELD_CONTACT_PERSON_FIRST_NAME: string =
    "//*[@id='contactPerson[firstName]']";
  public readonly FIELD_CONTACT_PERSON_LAST_NAME: string =
    "//*[@id='contactPerson[lastName]']";
  public readonly FIELD_CONTACT_PERSON_EMAIL: string =
    "//*[@id='contactPerson[email]']";
  public readonly FIELD_CONTACT_PERSON_PHONE: string =
    "//*[@id='contactPerson[phoneNumber]']";
  public readonly CHECKBOX_TECHNICAL_PERSON: string = "#technicalContact";
  public readonly FIELD_TECHNICAL_PERSON_FIRST_NAME: string =
    "//*[@id='technicalPerson[firstName]']";
  public readonly FIELD_TECHNICAL_PERSON_LAST_NAME: string =
    "//*[@id='technicalPerson[lastName]']";
  public readonly FIELD_TECHNICAL_PERSON_EMAIL: string =
    "//*[@id='technicalPerson[email]']";
  public readonly FIELD_TECHNICAL_PERSON_PHONE: string =
    "//*[@id='technicalPerson[phoneNumber]']";

  public readonly FIELD_IBAN: string = "#bankAccount";
  public readonly FIELD_EMAIL_FOR_INVOICES: string = "#invoiceEmail";

  public readonly CHECKBOX_ALL_TERMS: string = "#consent_all";
  public readonly CHECKBOX_CONSENT_PERSONAL_DATA: string =
    "#consent_personal_data";
  public readonly CHECKBOX_TERMS_OF_FINANCIAL_SERVICES: string =
    "#terms_of_financial_services";
  public readonly CHECKBOX_CONSENTS_MARKETING_SHOP: string = "#consents";
  public readonly CHECKBOX_CONSENT_PERSONAL_DATA_SHOP: string = "#statement";

  public readonly BUTTON_CREATE_ACCOUNT: string = `//button[contains(text(),'${TranslationPL.CREATE_ACCOUNT_ON_PARTNER_PAGE}')]`;

  visit(): void {
    super.visit(this.URI);
  }

  set_business_type_by_name(business_type: string): void {
    this.selectValueFromDropdown(
      this.LIST_BUSINESS_TYPE,
      business_type,
      DropdownType.TWO,
    );
  }

  set_trade_type_by_name(trade_type: string): void {
    this.selectValueFromDropdown(this.LIST_TRADE, trade_type, DropdownType.TWO);
  }

  set_domain_by_name(domain: string): void {
    this.selectValueFromDropdown(this.LIST_SHOP_URL, domain);
  }

  fill_basic_info(
    business_type?: string,
    trade_type?: string,
    domain?: string,
  ): void {
    if (business_type) {
      this.set_business_type_by_name(business_type);
    }
    if (trade_type) {
      this.set_trade_type_by_name(trade_type);
    }
    if (domain) {
      this.set_domain_by_name(domain);
    }
  }

  fill_company_name(company_name: any): void {
    this.typeInField(this.FIELD_COMPANY_NAME, company_name);
  }

  fill_nip(nip: any): void {
    this.typeInField(this.FIELD_NIP, nip);
  }

  fill_regon(regon: any): void {
    this.typeInField(this.FIELD_REGON, regon);
  }

  fill_krs(krs: any): void {
    this.typeInField(this.FIELD_KRS, krs);
  }

  fill_company_phone(company_phone: any): void {
    this.typeInField(this.FIELD_COMPANY_PHONE, company_phone);
  }

  fill_company_address(company_address: any): void {
    this.typeInField(this.FIELD_COMPANY_STREET, company_address);
  }

  fill_company_city(company_city: any): void {
    this.typeInField(this.FIELD_COMPANY_CITY, company_city);
  }

  fill_company_zip(company_zip: any): void {
    this.typeInField(this.FIELD_COMPANY_ZIP, company_zip);
  }

  fill_company_data(
    company_name?: any,
    nip?: any,
    regon?: any,
    company_phone?: any,
    company_address?: any,
    company_city?: any,
    company_zip?: any,
    krs?: any,
  ): void {
    if (company_name) {
      this.fill_company_name(company_name);
    }
    if (nip) {
      this.fill_nip(nip);
    }
    if (regon) {
      this.fill_regon(regon);
    }
    if (company_phone) {
      this.fill_company_phone(company_phone);
    }
    if (company_address) {
      this.fill_company_address(company_address);
    }
    if (company_city) {
      this.fill_company_city(company_city);
    }
    if (company_zip) {
      this.fill_company_zip(company_zip);
    }
    if (krs) {
      this.fill_krs(krs);
    }
  }

  fill_representative_full_name(
    name_and_surname: string,
    representative_num: number = 1,
  ): void {
    let field: string = this.create_next_representative_locators(
      representative_num,
      this.FIELD_REPRESENTATIVE_FULL_NAME,
    );
    this.typeInField(field, name_and_surname);
  }

  fill_representative_pesel(
    pesel: string,
    representative_num: number = 1,
  ): void {
    let field: string = this.create_next_representative_locators(
      representative_num,
      this.FIELD_REPRESENTATIVE_PESEL,
    );
    this.typeInField(field, pesel);
  }

  fill_representative_data(full_name?: string, pesel?: string): void {
    this.getElement(this.LABEL_REPRESENTATIVE_DATA)
      .last()
      .invoke("text")
      .then((text1: string): void => {
        let rep_arr: string[] = text1.split(" ");
        let rep_string: string = rep_arr.at(-1);
        let representative_number: number = +rep_string;
        if (full_name) {
          this.fill_representative_full_name(full_name, representative_number);
        }
        if (pesel) {
          this.fill_representative_pesel(pesel, representative_number);
        }
      });
  }

  add_next_representative_form(): void {
    this.getElement(this.BUTTON_NEXT_REPRESENTATIVE).click();
  }

  add_next_representative(full_name?: string, pesel?: string): void {
    this.add_next_representative_form();
    this.fill_representative_data(full_name, pesel);
  }

  create_next_representative_locators(
    representative_number: number = 1,
    field?: string,
  ): string {
    let prefix: string = `//*[@class='mt-4' and descendant::*[contains(text(),'${TranslationPL.REPRESENTATIVE_DATA} ${representative_number}')]]`;
    switch (field) {
      case this.FIELD_REPRESENTATIVE_FULL_NAME:
        return prefix + this.FIELD_REPRESENTATIVE_FULL_NAME;
      case this.FIELD_REPRESENTATIVE_PESEL:
        return prefix + this.FIELD_REPRESENTATIVE_PESEL;
      default:
        return prefix;
    }
  }

  fill_contact_person_first_name(first_name: string): void {
    this.typeInField(this.FIELD_CONTACT_PERSON_FIRST_NAME, first_name);
  }

  fill_contact_person_last_name(last_name: string): void {
    this.typeInField(this.FIELD_CONTACT_PERSON_LAST_NAME, last_name);
  }

  fill_contact_person_email(email: string): void {
    this.typeInField(this.FIELD_CONTACT_PERSON_EMAIL, email);
  }

  fill_contact_person_phone(phone: string): void {
    this.typeInField(this.FIELD_CONTACT_PERSON_PHONE, phone);
  }

  check_technical_person(mark_as_checked: boolean = true): void {
    this.setCheckbox(this.CHECKBOX_TECHNICAL_PERSON, mark_as_checked);
  }

  fill_contact_person_data(
    first_name?: string,
    last_name?: string,
    email?: string,
    phone?: string,
  ): void {
    if (first_name) {
      this.fill_contact_person_first_name(first_name);
    }
    if (last_name) {
      this.fill_contact_person_last_name(last_name);
    }
    if (email) {
      this.fill_contact_person_email(email);
    }
    if (phone) {
      this.fill_contact_person_phone(phone);
    }
  }

  fill_iban(iban: any): void {
    this.typeInField(this.FIELD_IBAN, iban);
  }

  fill_email_for_invoices(email: any): void {
    this.typeInField(this.FIELD_EMAIL_FOR_INVOICES, email);
  }

  fill_other_data(iban?: any, email_for_invoices?: string): void {
    if (iban) {
      this.fill_iban(iban);
    }
    if (email_for_invoices) {
      this.fill_email_for_invoices(email_for_invoices);
    }
  }

  check_consent_personal_data(mark_as_checked: boolean = true): void {
    this.setCheckbox(this.CHECKBOX_CONSENT_PERSONAL_DATA, mark_as_checked);
  }

  check_terms_of_financial_services(mark_as_checked: boolean = true): void {
    this.setCheckbox(
      this.CHECKBOX_TERMS_OF_FINANCIAL_SERVICES,
      mark_as_checked,
    );
  }

  check_consents_marketing_shop(mark_as_checked: boolean = true): void {
    this.setCheckbox(this.CHECKBOX_CONSENTS_MARKETING_SHOP, mark_as_checked);
  }

  check_statement_personal_data_shop(mark_as_checked: boolean = true): void {
    this.setCheckbox(this.CHECKBOX_CONSENT_PERSONAL_DATA_SHOP, mark_as_checked);
  }

  check_all_terms(mark_as_checked: boolean = true): void {
    this.setCheckbox(this.CHECKBOX_ALL_TERMS, mark_as_checked);
  }

  save_form(): void {
    this.getElement(this.BUTTON_CREATE_ACCOUNT).click();
  }

  public static create_error_locator(field: string): string {
    if (field.startsWith("//")) {
      return `//*[@class='controls' and descendant::${field.slice(
        2,
      )}]//label[@class='aicon-exclamation error']`;
    } else {
      return `//*[@class='controls' and descendant::*[@id='${field.slice(
        1,
      )}']]//label[@class='aicon-exclamation error']`;
    }
  }
}

export default TwoAddPage;
