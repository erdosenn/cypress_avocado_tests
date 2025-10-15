import AdminAbstractPage from "../../AdminAbstractPage";

class ThreeEditPage extends AdminAbstractPage {
  public readonly URI: string =
    "/configPayments/edit/id/" + this.SHOP_ENV["payments"]["three"];

  public readonly TAB_DATA: string = "1.1";
  public readonly TAB_SETTINGS: string = "1.2";

  public readonly SWITCH_ACTIVE: string = "//*[@id='active']";

  public readonly FIELD_MERCHANT_ID: string = "//*[@id='posid']";

  public visit(): void {
    super.visit(this.URI);
  }

  private fill_merchant_id(merchant_id?: string): void {
    if (!merchant_id) {
      merchant_id = "sb-643mto26937081@business.example.com";
    }
    this.typeInField(this.FIELD_MERCHANT_ID, merchant_id);
  }

  private set_payment_as_active(): void {
    this.setCheckbox(this.SWITCH_ACTIVE);
  }

  public goToTab(tab: string): void {
    this.getElement(tab).click();
  }

  public go_to_settings_tab_fill_merchant_id_and_save(
    merchant_id?: string,
  ): void {
    this.visit();
    this.goToTab(this.TAB_SETTINGS);
    this.fill_merchant_id(merchant_id);
    this.clickButton(this.BUTTON_SUBMIT);
  }

  public go_to_data_tab_activate_and_save(): void {
    this.visit();
    this.goToTab(this.TAB_DATA);
    this.set_payment_as_active();
    this.clickButton(this.BUTTON_SUBMIT);
  }

  public setup_payment(merchant_id?: string): void {
    this.visit();
    this.set_payment_as_active();
    this.goToTab(this.TAB_SETTINGS);
    this.fill_merchant_id(merchant_id);
    this.clickButton(this.BUTTON_SUBMIT);
  }
}

export default ThreeEditPage;
