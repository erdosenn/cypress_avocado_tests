import BasketFeature from "../../../../../support/gui/feature/BasketFeature";
import BasketFinalPage from "../../../../../support/gui/shop/page/client/basket/BasketFinalPage";
import CategoryApiFeature from "../../../../../support/api/shop/api/CategoryApiFeature";
import LoginPage from "../../../../../support/gui/shop/page/admin/LoginPage";
import TwoEditPage from "../../../../../support/gui/shop/page/admin/payment/two/TwoEditPage";
import ProductApiFeature from "../../../../../support/api/shop/api/ProductApiFeature";
import { TwoSandboxPage } from "../../../../../support/gui/partners/two/TwoSandboxPage";
import BasketFinishedPage from "../../../../../support/gui/shop/page/client/basket/BasketFinishedPage";
import BasketDonePage from "../../../../../support/gui/shop/page/client/basket/BasketDonePage";
import {
  BasketAddressData,
  prepareData,
} from "../../../../../support/gui/shop/dataType/BasketAddressData";
import { PaymentMethod } from "../../../../../support/gui/shop/dictionary/PaymentMethod";
import { TranslationPL } from "../../../../../support/gui/shop/dictionary/TranslationPL";
import { generateRandomNumber } from "../../../../../support/dataGenerators";
import { ShippingMethod } from "../../../../../support/gui/shop/dictionary/ShippingMethod";

describe("Two - testy płatności", (): void => {
  const basketFeature = new BasketFeature();
  const basketFinalPage: BasketFinalPage = new BasketFinalPage();
  const categoryFeature: CategoryApiFeature = new CategoryApiFeature();
  const loginPage: LoginPage = new LoginPage();
  const paymentSettingsPage: TwoEditPage = new TwoEditPage();
  const productFeature: ProductApiFeature = new ProductApiFeature();
  const twoSandboxPage = new TwoSandboxPage();
  const basketFinishedPage = new BasketFinishedPage();
  const basketDonePage = new BasketDonePage();

  let categoryId: number;
  let productId: number;
  let testAddress: BasketAddressData;

  before((): void => {
    loginPage.loginAsAdmin();
    paymentSettingsPage.setTwoAsDefaultPaymentGate();
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
    it("C381 Włączenie Two i sprawdzenie kanałów w koszyku", (): void => {
      basketFeature.addProductToBasketAndGoToBasket(productId);

      basketFeature.getElementByText(PaymentMethod.TWO).should("be.visible");
      basketFeature.getElementByText(PaymentMethod.BLIK).should("be.visible");
      basketFeature.getElementByText(PaymentMethod.CARD).should("be.visible");
    });

    it("C421 Dokonanie płatności za pomocą Two (z wyborem banku)", (): void => {
      basketFeature.makeOrderAndPay(productId, testAddress, PaymentMethod.TWO);

      basketFeature.elementShouldExist(basketFeature.FORM);
      basketFeature.elementShouldContainText(
        basketFeature.BUTTON_SUBMIT,
        TranslationPL.PAY,
      );
    });

    describe("Testy BLIK", (): void => {
      before((): void => {
        loginPage.loginAsAdmin();
        paymentSettingsPage.turnOffBlik0();
        loginPage.logout();
      });
      it("Płatność BLIK", (): void => {
        basketFeature.makeOrderAndPay(
          productId,
          testAddress,
          PaymentMethod.TWO,
          PaymentMethod.BLIK,
        );

        basketFeature.elementShouldExist(basketFeature.FORM);
        basketFeature.elementShouldContainText(
          basketFeature.BUTTON_SUBMIT,
          TranslationPL.PAY,
        );
      });
    });

    describe("Testy BLIK 0", (): void => {
      before((): void => {
        loginPage.loginAsAdmin();
        paymentSettingsPage.turnOnBlik0();
        loginPage.logout();
      });
      after((): void => {
        loginPage.loginAsAdmin();
        paymentSettingsPage.turnOffBlik0();
        loginPage.logout();
      });

      it("Płatność BLIK_0", (): void => {
        basketFeature.addProductToBasketAndGoToBasket(productId);
        basketFinalPage.fillBasketFinalPageAndClickPayWithBlik(
          testAddress,
          PaymentMethod.TWO,
        );

        basketFinalPage.elementShouldBeVisible(basketFinalPage.MODAL);
        basketFinalPage.elementShouldBeVisible(basketFinalPage.MODAL_LOGO);
        basketFinalPage.elementShouldBeVisible(basketFinalPage.FIELD_BLIK_CODE);
        basketFinalPage.elementShouldBeVisible(
          basketFinalPage.BUTTON_ORDER_AND_PAY_WITH_BLIK_0,
        );
        basketFinalPage.elementShouldBeDisabled(
          basketFinalPage.BUTTON_ORDER_AND_PAY_WITH_BLIK_0,
        );
        basketFinalPage.elementShouldBeVisible(
          basketFinalPage.BUTTON_PAY_OTHER_WAY,
        );
      });

      it("Płatność BLIK_0 wpisanie poprawnego kodu BLIK", (): void => {
        basketFeature.makeOrderAndPayByBlik0(productId, testAddress);

        basketFinalPage.fillBlikCodeAndPay(
          "777" + generateRandomNumber(100, 999),
        );

        basketFinalPage.elementShouldNotExist(basketFinalPage.MODAL_BLIK_O);
        basketDonePage.webAddressContains("basket/done");
        basketFinalPage.elementShouldContainText(
          basketFinalPage.MODAL_BLIK_O,
          TranslationPL.CONFIRM_YOUR_BLIK_PAYMENT,
        );
        basketDonePage.elementShouldContainText(
          basketDonePage.INFO_BOX,
          TranslationPL.MANAGE_TO_PAY_FOR_ORDER,
        );
      });

      it("Płatność BLIK_0 wpisanie niepoprawnego kodu BLIK", (): void => {
        basketFeature.makeOrderAndPayByBlik0(productId, testAddress);

        basketFinalPage.fillBlikCodeAndPay(
          "000" + generateRandomNumber(100, 999),
        );

        basketFinalPage.elementShouldNotExist(basketFinalPage.MODAL_BLIK_O);
        basketDonePage.webAddressContains("basket/done");
        basketDonePage.elementShouldContainText(
          basketDonePage.INFO_BOX,
          TranslationPL.FAILED_TO_PAY_FOR_ORDER,
        );
      });
    });

    describe("Testy GPay", (): void => {
      it.skip("Sprawdzenie przycisku GPay", (): void => {
        basketFeature.addProductToBasketAndGoToBasket(productId);
        basketFinalPage.fillBasketFinalPage(
          testAddress,
          ShippingMethod.PC,
          PaymentMethod.TWO,
        );
        basketFinalPage.elementShouldExist(
          basketFinalPage.BUTTON_PAY_WITH_GPAY,
        );
      });
    });
  });
  describe("Testy w sandbox Two", (): void => {
    it("Płatność Two - poprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.TWO,
      );
      twoSandboxPage.makeSuccessPayment();

      basketFinishedPage.verifySuccessMessage(
        TranslationPL.PAYMENT_IN_PROGRESS,
      );
    });
    it("Płatność Two - niepoprawne opłacenie zamówienia", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.TWO,
      );
      twoSandboxPage.makeFailurePayment();

      basketFinishedPage.verifySuccessMessage(
        TranslationPL.PAYMENT_IN_PROGRESS,
      );
    });

    it("C454 Płatność Two (z wyborem banku) - wycofanie się do sklepu w ciągu 30 sekund (lock na transakcję)", (): void => {
      basketFeature.makeOrderAndPayOnPartnerSite(
        productId,
        testAddress,
        PaymentMethod.TWO,
      );
      cy.go("back");
      basketFeature.elementShouldNotExist(basketFeature.FORM);

      basketFinishedPage.verifyErrorMessage(TranslationPL.ERROR_DURING_PAYMENT);
    });
  });
});
