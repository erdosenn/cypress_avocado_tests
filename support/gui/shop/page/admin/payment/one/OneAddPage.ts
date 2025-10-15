import AdminAbstractPage from "../../AdminAbstractPage";
import {
  OnboardingDataOne,
  BasicData,
  CompanyData,
  PaymentData,
  RepresentativeData,
} from "../../../../dataType/OnboardingDataOne";

class TwoAddPage extends AdminAbstractPage {
  public readonly URI: string =
    "/configPayments/edit/id/" + this.SHOP_ENV["payments"]["one"];

  public readonly TAB_DATA: string = "//*[@data-tab-for-page=2.1]";
  public readonly TAB_SETTINGS: string = "//*[@data-tab-for-page=2.2]";

  public readonly LIST_BUSINESS_TYPE: string = "#activity_kind";
  public readonly LIST_TRADE: string = "#numeric_trade";
  public readonly LIST_COUNTRY: string = "#country";

  public readonly FIELD_COMPANY_NAME: string = "#name";
  public readonly FIELD_NIP: string = "#nip";
  public readonly FIELD_COMPANY_PHONE: string = "#phone";
  public readonly FIELD_COMPANY_REGISTRATION_DATE: string =
    "//*[@data-switch='onlinepayment-registration-date']/descendant::*[@data-test-id='dropdown-toggler']";
  public readonly FIELD_COMPANY_STREET: string =
    "//*[@name='address[address]']";
  public readonly FIELD_COMPANY_CITY: string = "//*[@id='city']";
  public readonly FIELD_COMPANY_ZIP: string = "//*[@id='postal_code']";

  public readonly FIELD_REPRESENTATIVE_FIRST_NAME: string =
    "//*[@id='representing_person_first_name']";
  public readonly FIELD_REPRESENTATIVE_LAST_NAME: string =
    "//*[@id='representing_person_last_name']";
  public readonly FIELD_REPRESENTATIVE_PESEL: string =
    "#representing_person_pesel";
  public readonly FIELD_REPRESENTATIVE_CITIZENSHIP: string =
    "#representing_person_citizenship";
  public readonly FIELD_REPRESENTATIVE_ID_CARD: string =
    "#representing_person_personal_document";
  public readonly FIELD_REPRESENTATIVE_VALIDATION_DATE: string =
    "//*[@data-switch='representing-person-document']/descendant::*[@data-test-id='dropdown-toggler']";

  public readonly LIST_SHOP_URL: string = "//*[@id='service_url']";

  public readonly FIELD_IBAN: string = "#settlement_nrb";
  public readonly FIELD_AVERAGE_SERVICE_TURNOVER: string =
    "//*[@id='average_service_turnover']";
  public readonly FIELD_AVERAGE_TRANSACTION_AMOUNT: string =
    "//*[@id='average_transaction_amount']";
  public readonly FIELD_EMAIL_FOR_INVOICES: string = "#contact_email";

  public readonly CHECKBOX_ALL_TERMS: string = "#all_required_statements";

  public readonly BUTTON_CREATE_ACCOUNT: string = "#submit-button";

  visit(): void {
    super.visit(this.URI);
  }

  set_business_type_by_name(business_type: string): void {
    this.selectValueFromDropdown(this.LIST_BUSINESS_TYPE, business_type);
  }

  set_trade_type_by_name(trade_type: string): void {
    this.selectValueFromDropdown(this.LIST_TRADE, trade_type);
  }

  fill_basic_info(basicData: BasicData): void {
    if (basicData.businessType) {
      this.set_business_type_by_name(basicData.businessType);
    } else {
      this.set_business_type_by_name("Jednoosobowa działalność gospodarcza");
    }
    if (basicData.tradeType) {
      this.set_trade_type_by_name(basicData.tradeType);
    } else {
      this.set_trade_type_by_name("Artykuły spożywcze");
    }
  }

  fill_company_name(company_name: any): void {
    this.typeInField(this.FIELD_COMPANY_NAME, company_name);
  }

  fill_nip(nip: any): void {
    this.typeInField(this.FIELD_NIP, nip);
  }

  fill_company_phone(company_phone: any): void {
    this.typeInField(this.FIELD_COMPANY_PHONE, company_phone);
  }

  set_company_registration_date(number_of_months: number = 3): void {
    this.setDate(this.FIELD_COMPANY_REGISTRATION_DATE, true, number_of_months);
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

  fill_company_data(company_data?: CompanyData): void {
    if (company_data.companyName) {
      this.fill_company_name(company_data.companyName);
    }
    if (company_data.nip) {
      this.fill_nip(company_data.nip);
    }
    if (company_data.companyPhone) {
      this.fill_company_phone(company_data.companyPhone);
    }
    this.set_company_registration_date();
    if (company_data.companyCity) {
      this.fill_company_address(company_data.companyStreet);
    }
    if (company_data.companyCity) {
      this.fill_company_city(company_data.companyCity);
    }
    if (company_data.companyZip) {
      this.fill_company_zip(company_data.companyZip);
    }
  }

  fill_representative_first_name(first_name: string): void {
    this.typeInField(this.FIELD_REPRESENTATIVE_FIRST_NAME, first_name);
  }

  fill_representative_last_name(last_name: string): void {
    this.typeInField(this.FIELD_REPRESENTATIVE_LAST_NAME, last_name);
  }

  fill_representative_pesel(pesel: string): void {
    this.typeInField(this.FIELD_REPRESENTATIVE_PESEL, pesel);
  }

  fill_representative_citizenship(citizenship: string): void {
    this.typeInField(this.FIELD_REPRESENTATIVE_CITIZENSHIP, citizenship);
  }

  fill_representative_id_card(id_card_number: string): void {
    this.typeInField(this.FIELD_REPRESENTATIVE_ID_CARD, id_card_number);
  }

  set_representative_id_card_validation_date(
    number_of_months: number = 3,
  ): void {
    this.setDate(
      this.FIELD_REPRESENTATIVE_VALIDATION_DATE,
      false,
      number_of_months,
    );
  }

  fill_representative_data(representative_data?: RepresentativeData): void {
    if (representative_data.firstName) {
      this.fill_representative_first_name(representative_data.firstName);
    }
    if (representative_data.lastName) {
      this.fill_representative_last_name(representative_data.lastName);
    }
    if (representative_data.pesel) {
      this.fill_representative_pesel(representative_data.pesel);
    }
    if (representative_data.documentSerialNumber) {
      this.fill_representative_id_card(
        representative_data.documentSerialNumber,
      );
    }
    if (representative_data.docExpireDate) {
      this.set_representative_id_card_validation_date();
    }
  }

  public go_to_next_tab(): void {
    this.clickButton(this.TAB_SETTINGS);
  }

  public set_shop_url(shop_url?: string): void {
    if (shop_url) {
      this.selectValueFromDropdown(this.LIST_SHOP_URL, shop_url);
    } else {
      this.selectValueFromDropdown(this.LIST_SHOP_URL, this.SHOP_URL);
    }
  }

  fill_iban(iban: any): void {
    this.typeInField(this.FIELD_IBAN, iban);
  }

  fill_average_service_turnover(average_service_turnover: number): void {
    this.typeInField(
      this.FIELD_AVERAGE_SERVICE_TURNOVER,
      average_service_turnover,
    );
  }

  fill_average_transaction_amount(average_transaction_amount: number): void {
    this.typeInField(
      this.FIELD_AVERAGE_TRANSACTION_AMOUNT,
      average_transaction_amount,
    );
  }

  fill_email_for_invoices(email: any): void {
    this.typeInField(this.FIELD_EMAIL_FOR_INVOICES, email);
  }

  fill_payment_settings(data?: PaymentData): void {
    if (data.iban) {
      this.fill_iban(data.iban);
    }
    if (data.averageServiceTurnover) {
      this.fill_average_service_turnover(data.averageServiceTurnover);
    }
    if (data.averageTransactionAmount) {
      this.fill_average_transaction_amount(data.averageTransactionAmount);
    }
  }

  check_all_terms(mark_as_checked: boolean = true): void {
    this.setCheckbox(this.CHECKBOX_ALL_TERMS, mark_as_checked);
  }

  save_form(): void {
    this.getElement(this.BUTTON_CREATE_ACCOUNT).click();
  }

  public visit_form_fill_and_save(data?: OnboardingDataOne): void {
    this.visit();
    this.fill_basic_info(data.basicData);
    this.fill_company_data(data.company);
    this.fill_representative_data(data.representative);
    this.go_to_next_tab();
    this.set_shop_url();
    this.fill_payment_settings(data.paymentData);
    this.check_all_terms();
    this.save_form();
  }

  create_error_locator(field: string): string {
    if (field.startsWith("//")) {
      return (
        "//*[@class='controls' and descendant::" +
        field.slice(2) +
        "]//label[@class='aicon-exclamation error']"
      );
    } else {
      return (
        "//*[@class='controls' and descendant::*[@id='" +
        field.slice(1) +
        "']]//label[@class='aicon-exclamation error']"
      );
    }
  }
}

export default TwoAddPage;
