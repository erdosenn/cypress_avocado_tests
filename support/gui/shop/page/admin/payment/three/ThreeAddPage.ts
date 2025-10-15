import AdminAbstractPage from "../../AdminAbstractPage";

class ThreeAddPage extends AdminAbstractPage {
  public readonly URI: string = "/configuredDomain/1";

  public readonly TAB_DATA: string = "1.3";

  public readonly FIELD_UID: string = "//*[@id='login']";
  public readonly FIELD_PASSWORD: string = "//*[@id='password']";

  public readonly MODAL: string =
    "//*[@role='dialog' and //h3[contains(text(),'three')]]";
  public readonly MODAL_OK: string =
    this.MODAL + "//*[contains(@class,'confirm-ok')]";
  public readonly MODAL_CANCEL: string =
    this.MODAL + "//footer//*[contains(@class,'confirm-cancel')]";

  /**
   * @private
   * @param field
   * login, password
   */
  public static getErrorLocator(field: string): string {
    return `//*[@class='aicon-exclamation error' and @for='${field}']`;
  }

  public visit(): void {
    super.visit(this.URI);
  }

  public fillMerchantId(merchantUid?: string): void {
    this.typeInField(this.FIELD_UID, merchantUid);
  }

  public fillPassword(password?: string): void {
    this.typeInField(this.FIELD_PASSWORD, password);
  }

  public clickSaveButton(): void {
    this.getElementByText("Zapisz").click();
  }

  public clickSaveButtonAndResolveModal(accept: boolean = true): void {
    this.clickSaveButton();
    if (accept) {
      this.clickButton(this.MODAL_OK);
    } else {
      this.clickButton(this.MODAL_CANCEL);
    }
  }

  public fillDataAndSave(
    merchantUid: string = "PK72891_e27b051b0ea6",
    password: string = "5424bLtPKWbeIv5K",
  ): void {
    this.fillMerchantId(merchantUid);
    this.fillPassword(password);
    this.clickSaveButton();
  }

  public fillDataSaveAndResolveModal(
    accept: boolean = true,
    merchantUid: string = "PK72891_e27b051b0ea6",
    password: string = "5424bLtPKWbeIv5K",
  ): void {
    this.fillMerchantId(merchantUid);
    this.fillPassword(password);
    this.clickSaveButtonAndResolveModal(accept);
  }
}

export default ThreeAddPage;
