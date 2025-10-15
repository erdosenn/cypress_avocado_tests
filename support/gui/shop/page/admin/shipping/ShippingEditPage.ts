import AdminAbstractPage from "../AdminAbstractPage";

class ShippingEditPage extends AdminAbstractPage {
  public readonly URI: string = "/configShippings/edit/id/";

  public constructor(id: number = 8) {
    super();
    this.URI = this.URI + id;
  }

  private getPaymentCheckboxLocatorByName(paymentName: string): string {
    return `//span[following-sibling::label[contains(text(),'${paymentName}')]]/input`;
  }

  public visit(): void {
    super.visit(this.URI);
  }

  public setPayment(paymentName: string, isActive: boolean = true): void {
    let checkbox = this.getPaymentCheckboxLocatorByName(paymentName);
    this.setCheckbox(checkbox, isActive);
  }

  public save(): void {
    this.clickButton(this.BUTTON_SUBMIT);
  }
}
export default ShippingEditPage;
