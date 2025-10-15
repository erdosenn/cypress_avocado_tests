import ClientAbstractPage from "./ClientAbstractPage";

class ProductPage extends ClientAbstractPage {
  public readonly URI: string = "/p/id/";

  public readonly BUTTON_ADD_TO_BASKET: string =
    "//div[@data-module-name='product_actions']//buy-button";
  private GO_TO_MAKE_ORDER: string = "//*[contains(@href,'/basket')]";

  public openProductCardById(id: number): void {
    super.visit("/pl" + this.URI + id);
  }

  public clickAddToBasket(): void {
    this.clickButton(this.BUTTON_ADD_TO_BASKET);
  }

  public clickGoToMakeOrder(): void {
    this.clickButton(this.VISIBLE_MODAL + this.GO_TO_MAKE_ORDER);
  }

  public openProductCardAndAddToBasket(id: number): void {
    this.openProductCardById(id);
    this.clickAddToBasket();
    this.clickGoToMakeOrder();
  }
}

export default ProductPage;
