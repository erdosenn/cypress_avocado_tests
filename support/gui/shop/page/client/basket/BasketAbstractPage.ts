import ClientAbstractPage from "../ClientAbstractPage";

class BasketAbstractPage extends ClientAbstractPage {
  public readonly URI: string = "/basket";

  public readonly LOCALE: string = "/pl";

  public visit(uri?: string): void {
    super.visit(this.LOCALE + this.URI + uri);
  }

  public getOrderId() {
    return cy.url().then((url) => {
      return +Number(url.split("/").pop());
    });
  }
}

export default BasketAbstractPage;
