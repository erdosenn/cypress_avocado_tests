import AdminAbstractPage from "../../AdminAbstractPage";
import { TranslationPL } from "../../../../dictionary/TranslationPL";
import { PaymentMethod } from "../../../../dictionary/PaymentMethod";
import {DropdownType} from "../../../ShopAbstractPage";

class TwoEditPage extends AdminAbstractPage {
  public readonly URI: string =
    "/configPayments/edit/id/" + this.SHOP_ENV["payments"]["two"];

  public readonly TAB_DATA: string = "1.1";
  public readonly TAB_SETTINGS: string = "1.2";
  public readonly TAB_SP_SETTINGS: string = "1.4";

  public readonly INFOBOX_SUCCESS: string = `//*[contains(@class,'message-box_light') and descendant::*[contains(text(),'${TranslationPL.SUCCESSFULLY_CREATED_ACCOUNT}')]]`;
  public readonly ACCOUNT_ID: string =
    "//*[contains(text(),'Identyfikator konta')]/following::strong[contains(@class,'copy-on-click')]";

  public readonly CHECKBOX_STATE_BLIK_0: string = "//a[*[@id='two-blik0']]";
  public readonly CHECKBOX_BLIK_0: string = "//*[@id='two-blik0']";
  public readonly MODAL_BLIK_O_OK: string =
    "//*[@class='js__confirm-ok btn btn_bg btn_s']";

  public readonly LIST_PAYMENT_PLUGIN_NAME: string =
    "//*[@id='paymentPluginName']";

  public readonly INFOBOX_ACTIVATE: string = `//*[contains(@class,'message-box_warning') and descendant::*[contains(text(),'${TranslationPL.ACTIVATE_SERVICE}')]]`;
  public readonly BUTTON_ACTIVATE_ACCOUNT: string = `//*[@class='btn btn_bg' and contains(text(),'${TranslationPL.ACTIVATE_YOUR_ACCOUNT}')]`;

  public readonly TEXT_ACTIVATE_ACCOUNT: string =
    TranslationPL.ACTIVATE_YOUR_ACCOUNT_ON_PARTNER_PAGE;

  public visit(): void {
    super.visit(this.URI);
    this.elementShouldContainText(
      "//h2[@class='h3']",
      TranslationPL.EDIT_PAYMENT,
    );
  }

  public getAccountId() {
    this.goToTab(this.TAB_SETTINGS);
    return this.getElement(this.ACCOUNT_ID).invoke("text");
  }

  public setBlik0(isActive: boolean = false): void {
    cy.wait(1000);
    this.goToTab(this.TAB_SETTINGS);
    this.getElement(this.CHECKBOX_STATE_BLIK_0)
      .invoke("attr", "data-confirm-message")
      .then((mess) => {
        if (mess.includes(TranslationPL.DO_YOU_WANT_ACTIVATE_BLIK_0)) {
          if (isActive) {
            this.setCheckbox(this.CHECKBOX_BLIK_0, isActive);
            this.clickButton(this.MODAL_BLIK_O_OK);
          }
        } else if (mess.includes(TranslationPL.DO_YOU_WANT_DEACTIVATE_BLIK_0)) {
          if (isActive == false) {
            this.setCheckbox(this.CHECKBOX_BLIK_0, isActive);
            this.clickButton(this.MODAL_BLIK_O_OK);
          }
        }
      });
  }

  private setDefaultPaymentGate(): void {
    this.goToTab(this.TAB_SP_SETTINGS);
    this.selectValueFromDropdown(
      this.LIST_PAYMENT_PLUGIN_NAME,
      PaymentMethod.TWO,
      DropdownType.TWO,
    );
    this.clickButton(this.BUTTON_SUBMIT);
  }

  public setTwoAsDefaultPaymentGate(): void {
    this.visit();
    this.setDefaultPaymentGate();
  }

  public turnOffBlik0(): void {
    this.visit();
    this.setBlik0(false);
    this.elementShouldBeNotChecked(this.CHECKBOX_BLIK_0);
  }

  public turnOnBlik0(): void {
    this.visit();
    this.setBlik0(true);
    this.elementShouldBeChecked(this.CHECKBOX_BLIK_0);
  }

  public click_activate_button(): void {
    this.getElementByText(this.TEXT_ACTIVATE_ACCOUNT).click();
  }
}

export default TwoEditPage;
