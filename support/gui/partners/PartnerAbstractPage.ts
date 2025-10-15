import * as allure from "allure-js-commons";

export class PartnerAbstractPage {
  /**
   * Pobiera element HTML, używając dostarczonego selektora. Określa czy użyć selektorów XPath czy CSS na podstawie danych wejściowych.
   *
   * @param {string} element - Tekst selektora używany do znalezienia elementu. Jeśli tekst zaczyna się od "//", jest traktowany jako XPath. W przeciwnym razie jest traktowany jako selektor CSS.
   */
  public getElement(element: string): Cypress.Chainable<JQuery<HTMLElement>> {
    if (element.startsWith("//")) {
      return cy.xpath(element);
    } else {
      return cy.get(element);
    }
  }

  /**
   * Wpisuje określony tekst w pole zlokalizowane przez podany identyfikator elementu.
   * Opcjonalnie czyści pole przed wpisaniem tekstu.
   *
   * @param {string} element - Identyfikator pola docelowego do wpisania tekstu.
   * @param {*} text - Tekst do wpisania w pole.
   * @param {boolean} [clearText=true] - Określa czy pole powinno zostać wyczyszczone przed wpisaniem tekstu.
   * @return {void} Ta metoda nie zwraca wartości.
   */
  public fillField(
    element: string,
    text: any,
    clearText: boolean = true,
  ): void {
    allure.step(`Uzupełniam tekst: "${text}" w: "${element}"`, (): void => {
      let locator: Cypress.Chainable<JQuery<HTMLElement>> =
        this.getElement(element).focus();
      if (clearText) {
        locator.clear();
      }
      locator.focus().type(text, { force: true });
    });
  }

  /**
   * Klika w określony element przycisku. Najpierw próbuje kliknąć ostatni dostępny element pasujący do selektora.
   * Jeśli to się nie powiedzie, próbuje kliknąć pierwszy dostępny element.
   *
   * @param {string} element - Selektor elementu przycisku, który ma zostać kliknięty.
   * @param {Object} [options] - Opcjonalna konfiguracja dla akcji kliknięcia.
   * @return {void} Metoda nie zwraca wartości.
   */
  public clickButton(element: string, options?: object): void {
    allure.step(`Klikam w: "${element}"`, (): void => {
      cy.wait(1000);
      try {
        this.getElement(element).last().click(options);
      } catch (e) {
        this.getElement(element).first().click(options);
      }
    });
  }
}
