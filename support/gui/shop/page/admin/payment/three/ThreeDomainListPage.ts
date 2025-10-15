import AdminAbstractPage from "../../AdminAbstractPage";
import * as allure from "allure-js-commons";

class ThreeEditPage extends AdminAbstractPage {
  public readonly URI: string =
    "/configPayments/edit/id/" + this.SHOP_ENV["payments"]["three"];

  public visit(): void {
    super.visit(this.URI);
  }

  public addNewConfigurationForFirstDomain(): void {
    let firstRow = this.getElement("//table/tbody/tr").first();
    firstRow.contains("Skonfiguruj usługę").click();
  }

  public configureServiceForDomain(domain: string): void {
    allure.step(`Kliknięcie "skonfiguruj usługę" dla domeny: ${domain}`, () => {
      this.getElement(`//td[contains(text(),"${domain}")]`)
        .parents("tr")
        .find('a:contains("Skonfiguruj usługę")')
        .click();
    });
  }

  /**
   * Weryfikuje podstawowe metadane strony
   */
  public verifyMetadata(): void {
    cy.get("html").should("have.attr", "lang", "pl");
    cy.get('meta[name="language"]').should("have.attr", "content", "pl");
    cy.get('meta[name="viewport"]').should(
      "have.attr",
      "content",
      "width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0",
    );
  }

  // Metody weryfikacyjne
  /**
   * Weryfikuje tytuł strony
   */
  public verifyPageTitle(): void {
    cy.title().should("eq", "Płatności - Panel Administracyjny");
  }

  /**
   * Sprawdza, czy strona załadowała się poprawnie
   */
  public verifyPageLoaded(): void {
    cy.get("body").should("be.visible");
    cy.get("#aurora-styles").should("exist");
    cy.get('link[rel="stylesheet"][href*="skin.min.css"]').should("exist");
  }

  /**
   * Sprawdza, czy załadowane zostały wymagane zasoby
   */
  public verifyRequiredResources(): void {
    // Sprawdzanie ikon
    cy.get('link[rel="icon"][sizes="32x32"]').should("exist");
    cy.get('link[rel="icon"][sizes="128x128"]').should("exist");
    cy.get('link[rel="icon"][sizes="192x192"]').should("exist");

    // Sprawdzanie ikon dla iOS
    cy.get('link[rel="apple-touch-icon"][sizes="152x152"]').should("exist");
    cy.get('link[rel="apple-touch-icon"][sizes="167x167"]').should("exist");
    cy.get('link[rel="apple-touch-icon"][sizes="180x180"]').should("exist");
  }

  /**
   * Weryfikuje czy strona znajduje się w trybie edycji
   */
  public verifyEditMode(): void {
    cy.url().should("include", this.URI);
    cy.get("html.actn-edit").should("exist");
  }
}

export default ThreeEditPage;
