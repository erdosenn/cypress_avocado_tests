import BasketAbstractPage from "./BasketAbstractPage";
import { BasketAddressData } from "../../../dataType/BasketAddressData";
import { PaymentMethod } from "../../../dictionary/PaymentMethod";
import { ShippingMethod } from "../../../dictionary/ShippingMethod";
import * as allure from "allure-js-commons";
import { TranslationPL } from "../../../dictionary/TranslationPL";

class BasketFinalPage extends BasketAbstractPage {
  public readonly URI: string = "/step2";

  public readonly BUTTON_SET_ADDRESS: string =
    "//button[contains(@class,'basket-addresses')]";

  //Modal dla adresu dostawy i płatności
  public readonly MODAL: string = this.VISIBLE_MODAL;

  public readonly MODAL_EMAIL: string = this.MODAL + "//input[@name='email']";
  public readonly MODAL_FIRSTNAME: string =
    this.MODAL + "//input[@name='firstname']";
  public readonly MODAL_LASTNAME: string =
    this.MODAL + "//input[@name='lastname']";
  public readonly MODAL_PHONE: string = this.MODAL + "//input[@name='phone']";
  public readonly MODAL_STREET: string = this.MODAL + "//input[@name='street']";
  public readonly MODAL_ZIP: string =
    this.MODAL + "//input[contains(@id,'postal-code')]";
  public readonly MODAL_CITY: string = this.MODAL + "//input[@name='city']";
  public readonly MODAL_SAVE: string =
    this.MODAL + "//button[@class='btn btn_primary']";

  public readonly BUTTON_SELECT_BANK: string = `//button[text()='${TranslationPL.SELECT_BANK}']`;
  public readonly BUTTON_FIRST_BANK: string = `//div[contains(@class, 'payments-channels-list')]//div[contains(@class, 'payment-channel')][1]`;

  public readonly CHECKBOX_TERMS_SHOP: string = "//input[@id='additional_2']";
  public readonly CHECKBOX_INVOICE: string = "//input[@id='additional_3']";

  private MODULE_BASKET_SUMMARY_CHECKOUT: string =
    "//*[@data-module-name='basket_summary_checkout']";
  public readonly BUTTON_ORDER_AND_PAY: string =
    this.MODULE_BASKET_SUMMARY_CHECKOUT +
    "//button[h-icon[@icon-name='icon-basket']]";
  public readonly BUTTON_PAY_WITH_BLIK: string =
    this.MODULE_BASKET_SUMMARY_CHECKOUT +
    "//h-modal-opener[contains(@name,'pay-with-blik')]";
  public readonly BUTTON_PAY_WITH_GPAY =
    this.MODULE_BASKET_SUMMARY_CHECKOUT +
    "//button[@id='gpay-button-online-api-id']";

  //Modal dla BLIK_0
  public readonly MODAL_BLIK_O: string =
    "//*[contains(@class,'modal_visible') and @role='dialog']//h-modal-body[*[@class='grid blik-modal']]";
  public readonly MODAL_LOGO: string =
    this.MODAL_BLIK_O + "//figure[@class and //*[@alt='Blik logo']]";
  public readonly FIELD_BLIK_CODE: string =
    this.MODAL_BLIK_O + "//*[contains(@controlid,'blik-code')]";
  public readonly BUTTON_ORDER_AND_PAY_WITH_BLIK_0: string =
    this.MODAL_BLIK_O + "//*[contains(@id,'pay-with-blik-button')]";
  public readonly BUTTON_PAY_OTHER_WAY: string =
    this.MODAL_BLIK_O + "//*[contains(@class,'btn_secondary')]";

  public getShippingLocatorByName(
    shipping_name: string,
    type: string = "input",
  ): string {
    return `//h-radio-control[following-sibling::h-radio-content[descendant::span[contains(text(),"${shipping_name}")]]]/descendant::${type}`;
  }

  public getPaymentLocatorByName(
    payment_name: string,
    type: string = "input",
  ): string {
    return `//h-radio-control[following-sibling::h-radio-content[descendant::span[contains(text(),"${payment_name}")]]]/descendant::${type}`;
  }

  public visit(): void {
    super.visit(this.URI);
  }

  public openAddressesModal(): void {
    this.clickButton(this.BUTTON_SET_ADDRESS);
  }

  public fillAddress(addressData: BasketAddressData): void {
    this.typeInField(this.MODAL_EMAIL, addressData.email);
    this.typeInField(this.MODAL_FIRSTNAME, addressData.firstName);
    this.typeInField(this.MODAL_LASTNAME, addressData.lastName);
    this.typeInField(this.MODAL_PHONE, addressData.phone);
    this.typeInField(this.MODAL_STREET, addressData.street);
    this.getElement(this.MODAL_ZIP).focus().type(addressData.zipCode);
    this.typeInField(this.MODAL_CITY, addressData.city);
  }

  public saveModal(): void {
    this.getElement(this.MODAL_SAVE).click();
  }

  public setTermsCheckbox(mark_as_checked: boolean = true): void {
    allure.step(`Zaznaczam checkbox z regulaminami`, (): void => {
      this.setCheckbox(this.CHECKBOX_TERMS_SHOP, mark_as_checked);
      cy.wait(1000);
      this.elementShouldBeChecked(this.CHECKBOX_TERMS_SHOP);
    });
  }

  public orderAndPay(): void {
    this.clickButton(this.BUTTON_ORDER_AND_PAY);
  }

  public clickPayWithBlik(): void {
    this.clickButton(this.BUTTON_PAY_WITH_BLIK);
  }

  public selectShippingMethod(shippingName: string = "Odbiór osobisty"): void {
    allure.step(`Wybieram formę dostawy: ${shippingName}`, (): void => {
      this.getElement(
        this.getShippingLocatorByName(shippingName, "label"),
      ).click();
      this.clickOnRadio(this.getShippingLocatorByName(shippingName));
    });
  }

  public selectPaymentMethod(
    paymentMethod: string = PaymentMethod.CASH,
    paymentChannel?: string,
  ): void {
    allure.step(`Wybieram formę płatności: ${paymentMethod}`, (): void => {
      switch (paymentMethod) {
        case PaymentMethod.FOUR:
          let idFour = this.SHOP_ENV["payments"]["four"];
          this.clickOnRadio(
            `//h-radio[@controlid='payment-${idFour}-${idFour}']//input`,
          );
          break;
        case PaymentMethod.TWO:
          let idTwo = this.SHOP_ENV["payments"]["two"];
          if (paymentChannel) {
            this.clickOnRadio(
              `//h-radio[contains(@controlid,"payment-${idTwo}") and descendant::*[contains(text(),"${paymentChannel}")]]//input`,
            );
          } else {
            this.clickOnRadio(
              `//h-radio[@controlid='payment-${idTwo}-${idTwo}']//input`,
            );
            this.selectBank();
          }
          break;
        default:
          this.getElement(
            this.getPaymentLocatorByName(paymentMethod, "label"),
          ).click();
          this.clickOnRadio(this.getPaymentLocatorByName(paymentMethod));
      }
    });
  }

  /**
   * Simulates a click action on the "Select Bank" button.
   *
   * @return {void} This method does not return any value.
   */
  public clickSelectBank(): void {
    this.clickButton(this.BUTTON_SELECT_BANK);
  }

  public clickBank(): void {
    this.clickButton(this.BUTTON_FIRST_BANK);
  }

  public selectBank(): void {
    this.clickSelectBank();
    this.clickBank();
  }

  public openAddressModalFillAndSave(addressData: BasketAddressData): void {
    this.openAddressesModal();
    this.fillAddress(addressData);
    this.saveModal();
  }

  public fillBasketFinalPage(
    addressData: BasketAddressData,
    shippingName?: string,
    paymentMethod?: string,
    paymentChannel?: string,
  ): void {
    this.openAddressModalFillAndSave(addressData);
    this.selectShippingMethod(shippingName);
    this.selectPaymentMethod(paymentMethod, paymentChannel);
    this.setTermsCheckbox();
  }

  public fillBasketFinalPageAndClickPayWithBlik(
    addressData: BasketAddressData,
    paymentMethod: string,
  ): void {
    this.fillBasketFinalPage(
      addressData,
      ShippingMethod.PC,
      paymentMethod,
      PaymentMethod.BLIK,
    );
    this.clickPayWithBlik();
  }

  public fillBlikCode(code: string): void {
    cy.xpath(this.FIELD_BLIK_CODE).type(code);
  }

  public orderAndPayBlik0(): void {
    this.clickButton(this.BUTTON_ORDER_AND_PAY_WITH_BLIK_0);
  }

  /**
   * Automatyzuje proces wypełniania kodu BLIK i wykonywania płatności.
   *
   * @param {string} code - Kod BLIK, który zostanie wprowadzony w procesie płatności.
   * @return {void} Ta metoda nie zwraca żadnej wartości.
   */
  public fillBlikCodeAndPay(code: string): void {
    this.fillBlikCode(code);
    this.orderAndPayBlik0();
  }

  public fillBasketFinalPageAndClickPay(
    addressData: BasketAddressData,
    shippingName?: string,
    paymentName?: string,
    paymentChannel?: string,
  ): void {
    this.fillBasketFinalPage(
      addressData,
      shippingName,
      paymentName,
      paymentChannel,
    );
    this.orderAndPay();
  }
}

export default BasketFinalPage;
