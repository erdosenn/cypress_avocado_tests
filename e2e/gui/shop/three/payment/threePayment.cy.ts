import CategoryApiFeature from "../../../../../support/api/shop/api/CategoryApiFeature";
import ProductApiFeature from "../../../../../support/api/shop/api/ProductApiFeature";
import BasketFeature from "../../../../../support/gui/feature/BasketFeature";
import { ThreeSandboxPage } from "../../../../../support/gui/partners/three/ThreeSandboxPage";
import BasketFinishedPage from "../../../../../support/gui/shop/page/client/basket/BasketFinishedPage";
import BasketFinalPage from "../../../../../support/gui/shop/page/client/basket/BasketFinalPage";
import {
  BasketAddressData,
  prepareData,
} from "../../../../../support/gui/shop/dataType/BasketAddressData";
import { PaymentMethod } from "../../../../../support/gui/shop/dictionary/PaymentMethod";
import { TranslationPL } from "../../../../../support/gui/shop/dictionary/TranslationPL";

describe("threePayment", (): void => {
  const categoryFeature: CategoryApiFeature = new CategoryApiFeature();
  const productFeature: ProductApiFeature = new ProductApiFeature();
  const basketFeature: BasketFeature = new BasketFeature();
  const threeSandboxPage: ThreeSandboxPage = new ThreeSandboxPage();
  const basketFinishedPage = new BasketFinishedPage();
  const basketFinalPage = new BasketFinalPage();

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
    it("Three - sprawdzenie metody w koszyku", (): void => {
      basketFeature.addProductToBasketAndGoToBasket(productId);
      basketFinalPage.selectShippingMethod();
      basketFinalPage.elementShouldBeVisible(
        basketFinalPage.getPaymentLocatorByName("Three"),
      );
    });

    it("Three - sprawdzenie przycisku 'Opłać'", (): void => {
      basketFeature.makeOrderAndPay(
        productId,
        testAddress,
        PaymentMethod.THREE,
      );

      basketFeature.elementShouldExist(basketFeature.FORM);
      basketFeature.elementShouldContainText(
        basketFeature.BUTTON_SUBMIT,
        TranslationPL.PAY,
      );
    });
  });

  describe("Płatności w sandbox Three", (): void => {
    it("Three - poprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.THREE,
      );
      threeSandboxPage.makeSuccessPayment();
      basketFinishedPage.verifySuccessMessage(TranslationPL.ORDER_DONE);
    });

    it("Three - niepoprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.THREE,
      );
      threeSandboxPage.makeFailurePayment();
      basketFinishedPage.verifyErrorMessage(TranslationPL.ORDER_NOT_PAID);
    });
  });
});
