import { OneSandboxPage } from "../../../../../support/gui/partners/one/OneSandboxPage";
import BasketFeature from "../../../../../support/gui/feature/BasketFeature";
import BasketFinishedPage from "../../../../../support/gui/shop/page/client/basket/BasketFinishedPage";
import CategoryApiFeature from "../../../../../support/api/shop/api/CategoryApiFeature";
import LoginPage from "../../../../../support/gui/shop/page/admin/LoginPage";
import ProductApiFeature from "../../../../../support/api/shop/api/ProductApiFeature";
import {
  BasketAddressData,
  prepareData,
} from "../../../../../support/gui/shop/dataType/BasketAddressData";
import { PaymentMethod } from "../../../../../support/gui/shop/dictionary/PaymentMethod";
import { TranslationPL } from "../../../../../support/gui/shop/dictionary/TranslationPL";
import OneEditPage from "../../../../../support/gui/shop/page/admin/payment/one/OneEditPage";

describe("One - testy płatności", (): void => {
  const apSandboxPage: OneSandboxPage = new OneSandboxPage();
  const basketFeature: BasketFeature = new BasketFeature();
  const basketFinishedPage: BasketFinishedPage = new BasketFinishedPage();
  const categoryFeature: CategoryApiFeature = new CategoryApiFeature();
  const loginPage: LoginPage = new LoginPage();
  const paymentSettingsPage: OneEditPage = new OneEditPage();
  const productFeature: ProductApiFeature = new ProductApiFeature();

  let categoryId: number;
  let productId: number;
  let testAddress: BasketAddressData;

  before((): void => {
    loginPage.loginAsAdmin();
    paymentSettingsPage.setOneAsDefaultPaymentGate();
    loginPage.logout();
  });

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
    it("C445 Domyślna bramka One - sprawdzenie kanałów w koszyku", (): void => {
      basketFeature.addProductToBasketAndGoToBasket(productId);

      basketFeature.getElementByText(PaymentMethod.ONE).should("be.visible");
      basketFeature.getElementByText(PaymentMethod.BLIK).should("be.visible");
      basketFeature.getElementByText(PaymentMethod.CARD).should("be.visible");
    });

    it("C446 Płatność One (bez wyboru banku) - sprawdzenie przycisku 'Opłać'", (): void => {
      basketFeature.makeOrderAndPay(productId, testAddress, PaymentMethod.ONE);

      basketFeature.elementShouldExist(basketFeature.FORM);
      basketFeature.elementShouldContainText(
        basketFeature.BUTTON_SUBMIT,
        TranslationPL.PAY,
      );
    });
  });

  describe("Testy w sandbox One", (): void => {
    it("C447 Płatność One (bez wyboru banku) - poprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.ONE,
      );
      apSandboxPage.makeSuccessPayment();

      basketFinishedPage.verifySuccessMessage(TranslationPL.ORDER_DONE);
    });

    it("C448 Płatność One (bez wyboru banku) - niepoprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.ONE,
      );
      apSandboxPage.makeFailurePayment();

      basketFinishedPage.verifyErrorMessage(TranslationPL.ORDER_NOT_PAID);
    });
  });
});
