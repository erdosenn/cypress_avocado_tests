import AdminAbstractPage from "../../page/admin/AdminAbstractPage";

class LoginPage extends AdminAbstractPage {
  private readonly INPUT_LOGIN: string = "input[name=login]";
  private readonly INPUT_PASSWORD: string = "input[name=password]";
  private readonly INPUT_NEW_PASSWORD: string = "input[name=pass]";
  private readonly INPUT_REPEAT_PASSWORD: string = "input[name=pass2]";

  private readonly BUTTON_AVATAR: string = "//*[@class='caret']";
  private readonly LINK_LOGOUT: string = "//*[@href='/admin/auth/logout']";

  visit(): void {
    super.visit();
  }

  private fillLogin(login: string): void {
    this.typeInField(this.INPUT_LOGIN, login);
  }

  private fillPassword(password: string): void {
    this.typeInField(this.INPUT_PASSWORD, password);
  }

  private fillNewPassword(password: string): void {
    this.typeInField(this.INPUT_NEW_PASSWORD, password);
  }

  private repeatNewPassword(password: string): void {
    this.typeInField(this.INPUT_REPEAT_PASSWORD, password);
  }

  private clickSubmit(): void {
    this.clickButton(this.BUTTON_SUBMIT);
  }

  private changePasswordOnFirstLogin(password: string): void {
    this.fillNewPassword(password);
    this.repeatNewPassword(password);
    this.clickSubmit();
  }

  private loginToPanelAndSave(login: string, password: string): void {
    this.fillLogin(login);
    this.fillPassword(password);
    this.clickSubmit();
  }

  private loginToPanel(login: string, password: string): void {
    this.visit();
    this.loginToPanelAndSave(login, password);
  }

  public logout(): void {
    this.clickButton(this.BUTTON_AVATAR);
    this.clickButton(this.LINK_LOGOUT);
  }

  public loginAsAdmin(): void {
    let loginData = this.SHOP_ENV["login"]["admin"];
    this.loginToPanel(loginData["login"], loginData["password"]);
    cy.get("body").then(($body): void => {
      if ($body.find(this.INPUT_REPEAT_PASSWORD).length) {
        cy.log("Found field to change password. Starting to change");
        this.changePasswordOnFirstLogin(loginData["password"]);
      }
      return;
    });
  }
}

export default LoginPage;
