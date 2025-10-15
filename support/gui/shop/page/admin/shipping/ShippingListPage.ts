import AdminAbstractPage from "../AdminAbstractPage";

class ShippingListPage extends AdminAbstractPage {
  public readonly URI: string = "/configShippings/list";

  private getEditShippingLocatorByName(shippingName: string): string {
    return `//a[contains(@href,'/edit/id/') and contains(text(),'${shippingName}')]`;
  }

  public visit(): void {
    super.visit(this.URI);
  }

  public goToShippingEditPage(shippingName: string): void {
    this.getElement(this.getEditShippingLocatorByName(shippingName)).click();
  }
}

export default ShippingListPage;
