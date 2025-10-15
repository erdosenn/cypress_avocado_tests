import ShopAbstractPage from "../ShopAbstractPage";
import * as allure from "allure-js-commons";

/**
 * Represents an abstract administration page that provides core functionality
 * for navigating and interacting with admin-specific pages. Extends `ClientAbstractPage`.
 */
class AdminAbstractPage extends ShopAbstractPage {
  private static readonly TAB_XPATH_TEMPLATE: string =
    "//li[@data-tab-for-page='{}']";

  /**
   * Navigates to the specified URI within the admin section of the application.
   *
   * @param {string} [uri] - Optional URI to append to the "/admin" base path. If not provided, navigates to "/admin" only.
   * @return {void} Does not return any value.
   */
  visit(uri?: string): void {
    if (uri) {
      super.visit("/admin" + uri);
    } else {
      super.visit("/admin");
    }
  }

  /**
   * Constructs an XPath locator string for a tab element using the provided tab ID.
   *
   * @param {string} tabId - The unique identifier of the tab for which the XPath locator is generated.
   * @return {string} The XPath locator string for the specified tab.
   */
  private static getTabXPathLocator(tabId: string): string {
    return this.TAB_XPATH_TEMPLATE.replace("{}", tabId);
  }

  /**
   * Navigates to the specified tab in the application.
   *
   * @param {string} tabIdentifier - The identifier of the tab to navigate to.
   * @return {void} This method does not return a value.
   */
  public goToTab(tabIdentifier: string): void {
    allure.step(`Idę do zakładki: "${tabIdentifier}"`, (): void => {
      const tabLocator: string =
        AdminAbstractPage.getTabXPathLocator(tabIdentifier);
      cy.wait(1000);
      this.verifyAndActivateTab(tabLocator);
    });
  }

  /**
   * Verifies the visibility of a tab, activates it by clicking, and checks if it is correctly marked as active.
   *
   * @param {string} tabLocator - The locator of the tab element to verify and activate.
   * @return {void} This method does not return any value.
   */
  private verifyAndActivateTab(tabLocator: string): void {
    allure.step(
      `Sprawdzam czy zakładka: "${tabLocator}" jest aktywna`,
      (): void => {
        this.elementShouldBeVisible(tabLocator);
        this.getElement(tabLocator).click();
        this.elementShouldHaveAttr(tabLocator, "data-tab-for-current", "true");
      },
    );
  }
}

export default AdminAbstractPage;
