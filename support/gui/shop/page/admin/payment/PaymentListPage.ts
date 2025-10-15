import AdminAbstractPage from "../AdminAbstractPage";

class PaymentListPage extends AdminAbstractPage {
  public readonly URI: string = "/configPayments/list";

  public readonly SP_FRAME: string = "//*[@class='frame_title uppercase']";
  public readonly BUTTON_ACTIVATE_TWO: string =
    "//a[contains(@href,'configPayments/edit/id/" +
    this.SHOP_ENV["payments"]["two"] +
    "')]";
  public readonly BUTTON_ACTIVATE: string =
    "//a[contains(@href,'configPayments/edit/id/" +
    this.SHOP_ENV["payments"]["one"] +
    "')]";
  public readonly LIST_PAYMENTS: string = "#select_payment";

  public visit(): void {
    super.visit(this.URI);
  }

  public click_activate_two(): void {
    this.getElement(this.BUTTON_ACTIVATE_TWO).click();
  }

  public select_payment_from_list(payment_name: string): void {
    this.selectValueFromDropdown(this.LIST_PAYMENTS, payment_name);
  }
}

export default PaymentListPage;
