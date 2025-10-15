import AdminAbstractPage from "../../AdminAbstractPage";
import { TranslationPL } from "../../../../dictionary/TranslationPL";
import { PaymentMethod } from "../../../../dictionary/PaymentMethod";
import {DropdownType} from "../../../ShopAbstractPage";

class OneEditPage extends AdminAbstractPage {
  // URI constant
  public readonly URI: string =
    "/configPayments/edit/id/" + this.SHOP_ENV["payments"]["one"];

  // Tab selectors
  public readonly TAB_DATA: string = "1.1";
  public readonly TAB_SETTINGS: string = "1.2";
  public readonly TAB_SP_SETTINGS: string = "1.4";
  public readonly TAB_REFUNDS: string = "1.3";

  // Form elements
  public readonly PAYMENT_FORM: string = "form#payment_form";
  public readonly PAYMENT_NAME_INPUT: string = "input#payment_name";
  public readonly PAYMENT_DESCRIPTION: string = "textarea#payment_description";
  public readonly PAYMENT_STATUS: string = "input#payment_status";

  // Headers and titles
  public readonly PAGE_TITLE: string = "h2.h3";
  public readonly PAYMENT_SECTION_TITLE: string = ".frame_title.uppercase";

  //SP settings
  public readonly LIST_PAYMENT_PLUGIN_NAME: string =
    "//*[@id='paymentPluginName']";

  // Buttons and interactive elements
  public readonly BUTTON_SUBMIT: string = "button[type='submit']";
  public readonly BUTTON_CANCEL: string = ".btn.btn_cancel";

  // Success/Error messages
  public readonly SUCCESS_MESSAGE: string =
    ".message-box_light.message-box_success";
  public readonly ERROR_MESSAGE: string =
    ".message-box_light.message-box_error";

  /**
   * Navigates to the payment edit page
   *
   */
  public visit(): void {
    super.visit(this.URI);
    this.elementShouldContainText(this.PAGE_TITLE, TranslationPL.EDIT_PAYMENT);
  }

  /**
   * Sets the payment method name
   * @param name - Name of the payment method
   */
  public setPaymentName(name: string): void {
    this.typeInField(this.PAYMENT_NAME_INPUT, name);
  }

  /**
   * Sets the payment method description
   * @param description - Description of the payment method
   */
  public setPaymentDescription(description: string): void {
    this.typeInField(this.PAYMENT_DESCRIPTION, description);
  }

  /**
   * Sets the payment method status (active/inactive)
   * @param isActive - Whether the payment method should be active
   */
  public setPaymentStatus(isActive: boolean): void {
    this.setCheckbox(this.PAYMENT_STATUS, isActive);
  }

  /**
   * Saves the payment method settings
   */
  public savePaymentSettings(): void {
    this.clickButton(this.BUTTON_SUBMIT);
    this.elementShouldBeVisible(this.SUCCESS_MESSAGE);
  }

  /**
   * Cancels the editing of payment method
   */
  public cancelEditing(): void {
    this.clickButton(this.BUTTON_CANCEL);
  }
  private setDefaultPaymentGate(): void {
    this.goToTab(this.TAB_SP_SETTINGS);
    this.selectValueFromDropdown(
      this.LIST_PAYMENT_PLUGIN_NAME,
      PaymentMethod.ONE,
      DropdownType.TWO,
    );
    this.clickButton(this.BUTTON_SUBMIT);
  }
  public setApAsDefaultPaymentGate(): void {
    this.visit();
    this.setDefaultPaymentGate();
  }
}

export default OneEditPage;
