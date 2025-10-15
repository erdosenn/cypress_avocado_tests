import AdminAbstractPage from "../AdminAbstractPage";
import { TranslationPL } from "../../../dictionary/TranslationPL";

class OrderDetailPage extends AdminAbstractPage {
  ORDER_ID: number;

  public readonly URI: string = "/orders/view/id/";
  //lewy górny box podsumowań — info o płatnościach
  public readonly BOX_ORDER_PAYMENT: string = "//*[@id='order-paid-field']";
  public readonly BOP_PAYMENT_STATUS: string = this.BOX_ORDER_PAYMENT + "/a";
  public readonly BOP_PAYMENT_NAME: string = this.BOX_ORDER_PAYMENT + "/p";
  public readonly BOP_PAID_LEFT: string = "//*[@id='order-paid-left']";
  //prawy panel boczny
  //szczegóły zamówienia
  public readonly ASIDE_BOX_DETAILS: string = `//*[contains(@class,'box') and descendant::*[contains(text(), ${TranslationPL.ORDER_DETAILS})]]`;
  public readonly ABD_INPUT_ORDER_STATUS: string =
    this.ASIDE_BOX_DETAILS + "//input";
  //szczegóły płatności
  public readonly ASIDE_BOX_PAYMENT: string = `//aside/*[span[contains(text(),'${TranslationPL.PAYMENT_DETAILS}')]]`;
  public readonly ABP_PAYMENT_STATUS: string = this.ASIDE_BOX_PAYMENT + "//a";
  public readonly ABP_PAYMENT_NAME: string =
    this.ASIDE_BOX_PAYMENT + "//strong[@class]";
  //core
  public readonly BUTTON_TRANSACTIONS: string =
    "//a[contains(@data-href,'/admin/orders/ajax-transactions/id/')]";
  //modal transakcji do zamówienia
  public readonly MODAL_TRANSACTIONS: string =
    "//section[contains(@class,'modal-window') and @role='document']";
  public readonly MT_BUTTON_CLOSE: string =
    this.MODAL_TRANSACTIONS + "//*[contains(@class,'modal-close')]";
  public readonly MT_BUTTON_REFUND: string =
    this.MODAL_TRANSACTIONS +
    "//button[contains(@data-href,'/admin/orders/ajax-refund-transaction/id/')]";
  //modal zwrotu
  public readonly MODAL_REFUND: string = "//*[@data-order-refund]";
  public readonly MR_FIELD_NUMBER_OF_ITEMS: string =
    this.MODAL_REFUND + "//input[contains(@name,'refund_quantity')]";
  public readonly MR_SELECT_PAYMENT_METHOD: string =
    this.MODAL_REFUND + "//select[@id='refund-by-payment']";
  public readonly MR_BUTTON_REFUND: string = this.BUTTON_SUBMIT;

  public constructor(id: number) {
    super();
    this.URI = this.URI + id;
    this.ORDER_ID = id;
  }

  public visit(): void {
    super.visit(this.URI);
  }

  public changeOrderStatus(status: string = "completed"): void {
    this.selectValueFromDropdown(this.ABD_INPUT_ORDER_STATUS, status);
  }

  public openOrderAndChangeOrderStatus(): void {
    this.visit();
    this.changeOrderStatus();
  }

  public openTransactionsModal(): void {
    this.clickButton(this.BUTTON_TRANSACTIONS);
  }

  public closeTransactionsModal(): void {
    this.clickButton(this.MT_BUTTON_CLOSE);
  }

  public clickRefundButton(): void {
    this.clickButton(this.MT_BUTTON_REFUND);
  }

  public fillNumberOfItems(numberOfItems: number): void {
    this.typeInField(this.MR_FIELD_NUMBER_OF_ITEMS, numberOfItems);
  }

  public selectPaymentMethod(paymentMethod: string): void {
    this.selectValueFromDropdown(this.MR_SELECT_PAYMENT_METHOD, paymentMethod);
  }

  public clickMakeRefundButton(): void {
    this.clickButton(this.MR_BUTTON_REFUND);
  }

  public makeRefund(numberOfItems: number = 1, paymentMethod?: string): void {
    this.openTransactionsModal();
    this.clickRefundButton();
    this.elementShouldBeVisible(this.MODAL_REFUND);
    this.fillNumberOfItems(numberOfItems);
    if (paymentMethod) {
      this.selectPaymentMethod(paymentMethod);
    }
    this.clickMakeRefundButton();
    this.elementShouldBeVisible(this.MODAL_TRANSACTIONS);
  }

  public openOrderAndMakeRefund(
    numberOfItems: number = 1,
    paymentMethod?: string,
  ): void {
    this.visit();
    this.makeRefund(numberOfItems, paymentMethod);
  }
}

export default OrderDetailPage;
