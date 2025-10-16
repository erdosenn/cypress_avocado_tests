import FourPage from "../../../../../support/gui/shop/page/admin/payment/FourPage";
import LoginPage from "../../../../../support/gui/shop/page/admin/LoginPage";

const loginPage: LoginPage = new LoginPage();
const payPal: FourPage = new FourPage();

describe("Onboarding do Four", (): void => {
  it("Onboarding do Four", (): void => {
    loginPage.loginAsAdmin();
    payPal.visit();
    payPal.setup_payment();
    payPal.elementShouldBeChecked(payPal.SWITCH_ACTIVE);
    payPal.goToTab(payPal.TAB_SETTINGS);
    payPal.elementShouldContainText(
      payPal.FIELD_MERCHANT_ID,
      "sb-643mto26937081@business.example.com",
    );
  });
});
