import BasketFinalPage from "../../../../../support/gui/shop/page/client/basket/BasketFinalPage";
import BasketFeature from "../../../../../support/gui/feature/BasketFeature";
import BasketFinishedPage from "../../../../../support/gui/shop/page/client/basket/BasketFinishedPage";
import CategoryApiFeature from "../../../../../support/api/shop/api/CategoryApiFeature";
import { FourSandboxPage } from "../../../../../support/gui/partners/four/FourSandboxPage";
import ProductApiFeature from "../../../../../support/api/shop/api/ProductApiFeature";
import {
  BasketAddressData,
  prepareData,
} from "../../../../../support/gui/shop/dataType/BasketAddressData";
import { PaymentMethod } from "../../../../../support/gui/shop/dictionary/PaymentMethod";
import { TranslationPL } from "../../../../../support/gui/shop/dictionary/TranslationPL";

describe("PayPal - testy płatności", (): void => {
  const basketFeature = new BasketFeature();
  const basketFinalPage = new BasketFinalPage();
  const basketFinishedPage = new BasketFinishedPage();
  const categoryFeature = new CategoryApiFeature();
  const ppSandboxPage = new FourSandboxPage();
  const productFeature = new ProductApiFeature();

  let categoryId: number;
  let productId: number;
  let testAddress: BasketAddressData;

  beforeEach((): void => {
    testAddress = prepareData();
    categoryFeature.create({}).then((newCategoryId): void => {
      categoryId = newCategoryId;
      productFeature
        .create({ category_id: categoryId, stock: { price: 310, stock: 10 } })
        .then((newProductId): void => {
          productId = newProductId;
        });
    });
  });

  afterEach((): void => {
    productFeature.delete(productId);
    categoryFeature.delete(categoryId);
  });

  describe("Testy w Shop", (): void => {
    it("PayPal - sprawdzenie metody w koszyku", (): void => {
      basketFeature.addProductToBasketAndGoToBasket(productId);
      basketFinalPage.selectShippingMethod();
      basketFeature.getElementByText(PaymentMethod.FOUR).should("be.visible");
    });
    it("PayPal - sprawdzenie przycisku 'Opłać'", (): void => {
      basketFeature.makeOrderAndPay(productId, testAddress, PaymentMethod.FOUR);

      basketFeature.elementShouldBeVisible(basketFeature.FORM);
      basketFeature.elementShouldHaveAttr(
        basketFeature.FORM,
        "action",
        "https://www.sandbox.four.com/cgi-bin/webscr",
      );
      basketFeature.elementShouldBeVisible(basketFeature.BUTTON_SUBMIT);
      basketFeature.elementShouldContainText(
        basketFeature.BUTTON_SUBMIT,
        TranslationPL.PAY_WITH_FOUR,
      );
    });
  });

  describe("Płatności w sandbox PayPal", (): void => {
    it("PayPal - poprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.FOUR,
      );
      ppSandboxPage.makeSuccessPayment();
      basketFinishedPage.verifySuccessMessage(TranslationPL.ORDER_DONE);
    });

    it("PayPal - niepoprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.FOUR,
      );
      ppSandboxPage.makeFailurePayment();
      basketFinishedPage.verifyErrorMessage(TranslationPL.ORDER_NOT_PAID);
    });
  });
});
