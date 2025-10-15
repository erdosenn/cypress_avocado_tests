import BasketAbstractPage from "./BasketAbstractPage";

class BasketDonePage extends BasketAbstractPage {
  public readonly INFO_BOX: string = "//*[contains(@class,'info-box')]";

  public clickPayButton() {
    this.getElement(this.FORM).invoke("attr", "target", "_self");
    this.clickButton(this.BUTTON_SUBMIT);
  }
}

export default BasketDonePage;
