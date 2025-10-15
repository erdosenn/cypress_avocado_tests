import BasketAbstractPage from "./BasketAbstractPage";

class BasketSummaryPage extends BasketAbstractPage {
  public readonly BUTTON_SHIPPING_AND_PAYMENT: string =
    "//*[@data-module-name='basket_summary']//a[contains(@href,'basket/step2')]";

  public visit(): void {
    super.visit("/");
  }
  public goToShippingAndPayment(): void {
    this.clickButton(this.BUTTON_SHIPPING_AND_PAYMENT);
  }
}

export default BasketSummaryPage;
