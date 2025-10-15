import Chainable = Cypress.Chainable;
import * as allure from "allure-js-commons";
import {
  BalloonMessengerType,
  FLASH_MESSENGER,
  FlashMessageType,
} from "../dataType/FlashMessageType";

/**
 * Typ określający rodzaj dropdowna
 */
export enum DropdownType {
  STANDARD = "standard",
  TWO = "two",
}

class ShopAbstractPage {
  public readonly SUT = Cypress.env("SUT");
  public readonly SHOP_URL: string = Cypress.env(this.SUT).url;
  public readonly SHOP_ENV: object = Cypress.env("shopEnv");

  public readonly CAL_PREVIOUS_MONTH: string =
    "//*[@class='c-arrow-layout'][1]";
  public readonly CAL_NEXT_MONTH: string = "//*[@class='c-arrow-layout'][2]";
  public readonly FIRST_DAY_OF_MONTH: string =
    "//*[@class='c-week'][1]/*[@class='c-day-popover popover-container' and descendant::*[@class='c-day-content' and not(@style)]][1]";

  public readonly DROPPED_LIST: string =
    "//*[@data-test-id='dropdown-content']";
  public readonly FORM: string = "//*[@data-module-name='basket_done']//form";
  public readonly BUTTON_SUBMIT: string = "button[type=submit]";
  /** XPath pattern for text search */
  private static readonly TEXT_XPATH_PATTERN = {
    contains: `//*[contains(text(),'%s')]`,
    exact: `//*[text()='%s']`,
  };

  /**
   * Navigates to the specified URI within the client's base URL and logs the operation's*/
  public visit(uri: string): void {
    allure.step(`Otwieram: "${uri}"`, (): void => {
      try {
        cy.visit(this.SHOP_URL + uri);
        cy.log(`Opened successfully: "${uri}"`);
      } catch (e) {
        cy.log(`Problem with open: "${uri}": ${e.Message}`);
      }
    });
  }

  /**
   * Creates an XPath locator to find elements by their text content
   *
   * @param {string} text - The text to search for
   * @param {boolean} [exactMatch=false] - If true, searches for exact text match. Otherwise, uses partial match
   * @returns {string} XPath locator string
   */
  public static createXPathLocatorByText(
    text: string,
    exactMatch: boolean = false,
  ): string {
    const pattern = exactMatch
      ? this.TEXT_XPATH_PATTERN.exact
      : this.TEXT_XPATH_PATTERN.contains;
    return pattern.replace("%s", text);
  }

  /**
   * Fetches an HTML element using the provided selector. Determines whether to use XPath or CSS selectors based on the input.
   *
   * @param {string} element - The selector string used to find the element. If the string starts with "//", it is treated as an XPath. Otherwise, it is treated as a CSS selector.
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} A Cypress chainable object representing the selected element.
   */
  public getElement(element: string): Cypress.Chainable<JQuery<HTMLElement>> {
    if (element.startsWith("//")) {
      return cy.xpath(element);
    } else {
      return cy.get(element);
    }
  }

  /**
   * Attempts to find an element on the page that contains the specified text.
   *
   * @param {string} text - The text to search for within the element.
   * @return {Cypress.Chainable<JQuery<HTMLElement>>} The found element wrapped in a Cypress Chainable object, if it exists.
   */
  public getElementByText(
    text: string,
  ): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(text);
  }

  /**
   * Types a specified text into a field located by the given element identifier.
   * Optionally clears the field before typing.
   *
   * @param {string} element - The identifier of the target field to type into.
   * @param {*} text - The text to be typed into the field.
   * @param {boolean} [clearText=true] - Determines whether the field should be cleared before typing.
   * @return {void} This method does not return a value.
   */
  public typeInField(
    element: string,
    text: any,
    clearText: boolean = true,
  ): void {
    allure.step(`Wpisuję: "${text}" w pole: "${element}"`, () => {
      let locator: Cypress.Chainable<JQuery<HTMLElement>> =
        this.getElement(element).focus();
      if (clearText) {
        locator.clear();
      }
      locator.focus().type(text, { force: true });
    });
  }

  /**
   * Wybiera wartość z listy rozwijanej na podstawie jej nazwy.
   *
   * @param {string} element - Lokator elementu dropdown
   * @param {string} name - Nazwa elementu do wybrania
   * @param {DropdownType} type - Typ dropdowna (standard lub two)
   * @throws {Error} Gdy nie uda się wybrać elementu
   */
  public selectValueFromDropdown(
    element: string,
    name: string,
    type: DropdownType = DropdownType.STANDARD,
  ): void {
    allure.step(`Wybieram: "${name}" z dropdowna: "${element}"`, (): void => {
      try {
        if (type === DropdownType.TWO) {
          this.getElement(element)
            .click()
            .then(() => {
              this.elementShouldBeVisible(this.DROPPED_LIST);
              const dropdownItem =
                this.DROPPED_LIST +
                ShopAbstractPage.createXPathLocatorByText(name);
              this.getElement(dropdownItem).click();
            });
        } else {
          this.getElement(element).select(name);
        }
        cy.log(`Pomyślnie wybrano: "${name}"`);
      } catch (error) {
        const errorMsg = `Nie udało się wybrać "${name}" z listy "${element}"`;
        cy.log(errorMsg);
        throw new Error(errorMsg);
      }
    });
  }

  /**
   * Clicks on the specified button element. It first tries to click the last available element matching the selector.
   * If unsuccessful, it falls back to clicking the first available element.
   *
   * @param {string} element - The selector of the button element to be clicked.
   * @param {Object} [options] - Optional configuration options for the click action.
   * @return {void} No return value.
   */
  public clickButton(element: string, options?: object): void {
    allure.step(`Klikam przycisk: "${element}"`, (): void => {
      cy.wait(1000);
      try {
        this.getElement(element).last().click(options);
      } catch (e) {
        this.getElement(element).first().click(options);
      }
    });
  }

  /**
   * Attempts to click on a radio button identified by the given element string.
   *
   * @param {string} element - The selector or identifier of the radio button to click.
   * @return {void} This method does not return a value.
   */
  public clickOnRadio(element: string): void {
    allure.step(`Klikam radio button: "${element}"`, (): void => {
      cy.wait(1000);
      this.getElement(element).click({ force: true });
    });
  }

  /**
   * Sets the state of a checkbox element to check or uncheck.
   *
   * @param {string} element - The selector or identifier of the checkbox element to set.
   * @param {boolean} [markAsChecked=true] - Determines whether to check or uncheck the checkbox. Defaults to true (checked).
   * @return {void} This method does not return a value.
   */
  public setCheckbox(element: string, markAsChecked: boolean = true): void {
    allure.step(
      `Oznaczam checkbox: "${element}" na: ${markAsChecked}`,
      (): void => {
        if (markAsChecked) {
          this.getElement(element).check({ force: true });
        } else {
          this.getElement(element).uncheck({ force: true });
        }
      },
    );
  }

  /**
   * Sets the date on a calendar based on the provided parameters.
   *
   * @param {string} calendarSelector - The selector to locate the calendar element.
   * @param {boolean} [shouldSelectPastDate=true] - Indicates whether to select a past date. Defaults to true.
   * @param {number} [monthsOffset=4] - The number of months to navigate from the current selection. Defaults to 4.
   * @return {void} This method does not return a value.
   */
  public setDate(
    calendarSelector: string,
    shouldSelectPastDate: boolean = true,
    monthsOffset: number = 4,
  ): void {
    allure.step(
      `Ustawiam datę na ${monthsOffset} miesiące w tył: ${shouldSelectPastDate} w kalendarzu: ${calendarSelector}`,
      (): void => {
        const element: Chainable<JQuery<HTMLElement>> =
          this.getElement(calendarSelector);

        if (!element.should("be.visible")) {
          return;
        }

        element.click();
        this.navigateCalendarByMonths(shouldSelectPastDate, monthsOffset);
        this.getElement(this.FIRST_DAY_OF_MONTH).last().click();
      },
    );
  }

  /**
   * Navigates the calendar by the specified number of months in the past or future.
   *
   * @param {boolean} shouldSelectPastDate - Indicates whether to navigate to past months.
   *                                         If true, navigates to past months. If false, navigates to future months.
   * @param {number} monthsOffset - The number of months to navigate.
   * @return {void} No return value.
   */
  private navigateCalendarByMonths(
    shouldSelectPastDate: boolean,
    monthsOffset: number,
  ): void {
    allure.step("Przewijam miesiące", (): void => {
      const navigationButton: string = shouldSelectPastDate
        ? this.CAL_PREVIOUS_MONTH
        : this.CAL_NEXT_MONTH;

      for (let i: number = 0; i < monthsOffset; i++) {
        this.getElement(navigationButton).click();
      }
    });
  }

  /**
   * Checks if a specified element is visible on the page.
   *
   * @param {string} element - The selector of the element to check for visibility.
   * @return {any} The Cypress chainable object if the element is found and visible; otherwise, undefined.
   */
  public elementShouldBeVisible(element: string): any {
    allure.step(
      `Sprawdzam czy element: "${element}" jest widoczny`,
      (): void => {
        this.getElement(element).should("be.visible");
      },
    );
  }

  /**
   * Verifies if a given element has the specified attribute with the expected value.
   * If the element contains the attribute with the expected value, it logs a success message and returns the evaluation.
   * Otherwise, logs a failure message.
   *
   * @param {string} element - The selector of the element to check.
   * @param {string} attr - The attribute name to check on the element.
   * @param {string} attrValue - The expected value of the attribute.
   * @return {any} The result of the Cypress assertion if the attribute is present with the expected value; otherwise undefined.
   */
  public elementShouldHaveAttr(
    element: string,
    attr: string,
    attrValue: string,
  ): any {
    allure.step(
      `Sprawdzam, czy element: "${element}" ma atrybut: "${attr}" o wartości: "${attrValue}"`,
      (): void => {
        this.getElement(element).should("have.attr", attr, attrValue);
      },
    );
  }

  /**
   * Checks if the specified element exists on the page and logs the verification process.
   *
   * @param {string} element - The selector or identifier of the element to verify.
   * @return {void} This method does not return a value.
   */
  public elementShouldExist(element: string): void {
    allure.step(`Sprawdzam czy element: "${element}" istnieje`, (): void => {
      this.getElement(element).should("exist");
    });
  }

  /**
   * Verifies that the specified element does not exist in the DOM.
   *
   * @param {string} element - The selector string for the element to verify its non-existence.
   * @return {void} This method does not return a value.
   */
  public elementShouldNotExist(element: string): void {
    allure.step(
      `Sprawdzam czy element: "${element}" nie istnieje`,
      (): void => {
        this.getElement(element).should("not.exist");
      },
    );
  }

  /**
   * Asserts that the specified element contains the given text.
   *
   * @param {string} element - The selector or reference to the element being checked.
   * @param {string} text - The text that should be present within the element.
   * @return {void} No return value.
   */
  public elementShouldContainText(element: string, text: string): void {
    allure.step(
      `Sprawdzam czy element: "${element}" zawiera tekst: "${text}"`,
      (): void => {
        this.getElement(element).should("contain.text", text);
      },
    );
  }

  /**
   * Verifies that the specified field contains the expected value.
   *
   * @param {string} element - The selector for the field to be checked.
   * @param {string} value - The expected value that the field should contain.
   * @return {void} This method does not return any value.
   */
  public fieldShouldContainValue(element: string, value: string): void {
    allure.step(
      `Sprawdzam czy pole: "${element}" zawiera wartość: "${value}"`,
      (): void => {
        this.getElement(element).should("contain.value", value);
      },
    );
  }

  /**
   * Ensures that the specified element is not empty and optionally verifies it contains a given text.
   *
   * @param {string} element - The selector of the element to be verified.
   * @param {string} [text] - Optional text that the element should contain.
   * @return {void} Does not return a value.
   */
  public elementShouldNotBeEmpty(element: string, text?: string): void {
    allure.step(
      `Sprawdzam czy element: "${element}" nie jest pusty`,
      (): void => {
        this.getElement(element).should("not.be.empty", text);
      },
    );
  }

  /**
   * Verifies if the specified element is disabled.
   *
   * @param {string} element - The selector of the element to check.
   * @return {void} No return value.
   */
  public elementShouldBeDisabled(element: string): void {
    allure.step(
      `Sprawdzam czy element: "${element}" jest nieaktywny`,
      (): void => {
        this.getElement(element).should("be.disabled");
      },
    );
  }

  /**
   * Ensures the specified element is checked by inspecting its state.
   * Logs the status of the element as checked or not checked.
   *
   * @param {string} element - The selector or identifier of the element to verify.
   * @return {void}
   */
  public elementShouldBeChecked(element: string): void {
    allure.step(
      `Sprawdzam czy element: "${element}" jest zaznaczony`,
      (): void => {
        this.getElement(element).should("be.checked");
      },
    );
  }

  /**
   * Verifies that the specified element is not checked.
   *
   * @param {string} element - The selector of the element to verify.
   * @return {void} This method does not return a value.
   */
  public elementShouldBeNotChecked(element: string): void {
    allure.step(
      `Sprawdzam czy element: "${element}" nie jest zaznaczony`,
      (): void => {
        this.getElement(element).should("not.be.checked");
      },
    );
  }

  /**
   * Verifies if the current web address contains the specified text and logs the result.
   *
   * @param {string} text - The text to check for in the current web address.
   * @return {void} This method does not return a value.
   */
  public webAddressContains(text: string): void {
    allure.step(`Sprawdzam czy adres URL zawiera: "${text}"`, (): void => {
      cy.url().should("include", text);
    });
  }

  //-------------------------------------------- Współdzielone z ClientAbstractPage.ts. Obsługuje widoczność wiadomości flash------------------
  /**
   * Weryfikuje czy wiadomość flash jest widoczna i zawiera oczekiwaną treść oraz typ
   * @param getElement - Funkcja do pobierania elementu
   * @param selector - Selektor elementu wiadomości
   * @param expectedText - Oczekiwana treść wiadomości
   * @param type - Oczekiwany typ/kolor wiadomości
   */
  protected static verifyMessage(
    getElement: (selector: string) => Chainable<JQuery<HTMLElement>>,
    selector: string,
    expectedText: string,
    type: FlashMessageType | BalloonMessengerType,
  ): void {
    allure.step(`Sprawdzam wiadomość: "${expectedText}"`, (): void => {
      // Weryfikacja widoczności wiadomości
      getElement(selector)
        .should("be.visible")
        .should("contain.text", expectedText)
        .should("have.class", type);
    });
  }

  /**
   * Weryfikuje czy wiadomość flash nie jest obecna
   * @param getElement - Funkcja do pobierania elementu
   * @param selector - Selektor elementu wiadomości
   */
  protected static verifyNoMessage(
    getElement: (selector: string) => Chainable<JQuery<HTMLElement>>,
    selector: string,
  ): void {
    allure.step(`Sprawdzam czy wiadomość nie istnieje`, (): void => {
      getElement(selector).should("not.exist");
    });
  }

  //-------------------------------------------------------------------------------------------------------------
  /**
   * Weryfikuje wiadomość dymkową (balloon message) na stronie.
   *
   * @param {string} expectedText Oczekiwany tekst wiadomości.
   * @param {BalloonMessengerType} type Typ wiadomości dymkowej.
   * @return {void} Funkcja nie zwraca wartości.
   */
  private verifyBalloonMessage(
    expectedText: string,
    type: BalloonMessengerType,
  ): void {
    ShopAbstractPage.verifyMessage(
      this.getElement.bind(this),
      FLASH_MESSENGER,
      expectedText,
      type,
    );
  }

  /**
   * Weryfikuje czy wiadomość dymkowa jest nieobecna
   */
  public verifyNoFlashMessage(): void {
    ShopAbstractPage.verifyNoMessage(
      this.getElement.bind(this),
      FLASH_MESSENGER,
    );
  }

  /**
   * Weryfikuje wiadomość dymkową typu success
   */
  public verifySuccessMessage(text: string): void {
    this.verifyBalloonMessage(text, BalloonMessengerType.SUCCESS);
  }

  /**
   * Weryfikuje wiadomość dymkową typu error
   */
  public verifyErrorMessage(text: string): void {
    this.verifyBalloonMessage(text, BalloonMessengerType.ERROR);
  }

  /**
   * Weryfikuje wiadomość dymkową typu warning
   */
  public verifyWarningMessage(text: string): void {
    this.verifyBalloonMessage(text, BalloonMessengerType.WARNING);
  }

  /**
   * Weryfikuje wiadomość dymkową typu info
   */
  public verifyInfoMessage(text: string): void {
    this.verifyBalloonMessage(text, BalloonMessengerType.INFO);
  }
}

export default ShopAbstractPage;
