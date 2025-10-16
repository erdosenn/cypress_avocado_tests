import TwoAddPage from "../../../support/gui/shop/page/admin/payment/two/TwoAddPage";
import LoginPage from "../../../support/gui/shop/page/admin/LoginPage";
import PaymentListPage from "../../../support/gui/shop/page/admin/payment/PaymentListPage";

require("cypress-xpath");

const adminLoginPage: LoginPage = new LoginPage();
const paymentListPage: PaymentListPage = new PaymentListPage();
const paymentTwoPage: TwoAddPage = new TwoAddPage();
describe("paymentList", (): void => {
  it("Sprawdzenie listy form płatności", (): void => {
    adminLoginPage.visit();
    adminLoginPage.loginAsAdmin();

    paymentListPage.visit();

    paymentListPage.elementShouldBeVisible(paymentListPage.SP_FRAME);
    paymentListPage.elementShouldBeVisible(paymentListPage.BUTTON_ACTIVATE_TWO);
    paymentListPage.elementShouldContainText(
      paymentListPage.BUTTON_ACTIVATE_TWO,
      "Aktywuj",
    );
  });
  it("Wejście na formularz", (): void => {
    adminLoginPage.visit();
    adminLoginPage.loginAsAdmin();

    paymentTwoPage.visit();

    paymentTwoPage.elementShouldBeVisible(paymentTwoPage.LIST_BUSINESS_TYPE);
    paymentTwoPage.elementShouldBeVisible(paymentTwoPage.LIST_TRADE);
    paymentTwoPage.elementShouldBeVisible(paymentTwoPage.LIST_SHOP_URL);

    paymentTwoPage.elementShouldBeDisabled(
      paymentTwoPage.BUTTON_CREATE_ACCOUNT,
    );
  });
});
