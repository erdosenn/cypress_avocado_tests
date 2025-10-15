import {PartnerAbstractPage} from "../PartnerAbstractPage";

export class OneSandboxPage extends PartnerAbstractPage {
  private readonly LINK_RETURN_TO_SHOP: string =
    "//section[@class='sidebar-column']/descendant::button[contains(@class,'back-to-client')]";
  private readonly ONLINE_PAYMENT: string =
    "//h2[text()='Przelew internetowy']";
  private readonly BUTTON_TEST_106: string = "//*[@id='106']";
  private readonly BUTTON_PAY: string = "//button[span[text()='Płacę']]";
  private readonly BUTTON_MAKE_PAYMENT: string =
    "//input[@type='submit' and contains(@onclick,'value=53515')]";
  private readonly BUTTON_RETURN_TO_SHOP: string =
    "//section[@class='back-to-client']/button";

  /**
   * Anuluje bieżącą płatność i przekierowuje użytkownika z powrotem do sklepu.
   *
   * @return {void} Metoda nic nie zwraca.
   */
  private clickCancelAndReturnToShop(): void {
    this.clickButton(this.LINK_RETURN_TO_SHOP);
  }

  /**
   * Metoda odpowiadająca za wybranie formy płatności online.
   *
   * @return {void} Nie zwraca wartości.
   */
  private selectOnlinePayment(): void {
    this.clickButton(this.ONLINE_PAYMENT);
  }

  /**
   * Klika przycisk kanału płatności oznaczonego jako TEST_106.
   *
   * @return {void} Brak wartości zwracanej.
   */
  private selectMethod106(): void {
    cy.wait(2000);
    this.clickButton(this.BUTTON_TEST_106);
  }

  /**
   * Klika przycisk płatności na bramce po wyborze metody.
   *
   * @return {void} Nie zwraca żadnej wartości.
   */
  private clickPay(): void {
    cy.wait(2000);
    this.clickButton(this.BUTTON_PAY);
  }

  /**
   * Klika przycisk płatności na podsumowaniu danych płatnika.
   *
   * @return {void} Nie zwraca żadnej wartości.
   */
  private makePayment(): void {
    cy.wait(2000);
    this.clickButton(this.BUTTON_MAKE_PAYMENT);
  }

  /**
   * Klika przycisk powrotu użytkownika do sklepu.
   *
   * @return {void} Nie zwraca żadnej wartości.
   */
  private returnToShop(): void {
    cy.wait(2000);
    this.clickButton(this.BUTTON_RETURN_TO_SHOP);
  }

  /**
   * Metoda realizuje proces dokonania płatności zakończonej powodzeniem na stronie AP.
   * Obejmuje wybór formy płatności, wybór kanału płatności,
   * dokonanie płatności oraz powrót do sklepu po zakończeniu procesu.
   *
   * @return {void} brak zwracanego wyniku
   */
  public makeSuccessPayment(): void {
    cy.wait(5000);
    this.selectOnlinePayment();
    this.selectMethod106();
    this.clickPay();
    this.makePayment();
    this.returnToShop();
  }

  /**
   * Metoda odpowiedzialna za obsługę nieudanej płatności na stronie AP.
   * W ramach działania oczekuje przez 5 sekund, a następnie klika link anulowania i powrotu do sklepu.
   *
   * @return {void} Brak zwracanego wyniku.
   */
  public makeFailurePayment(): void {
    cy.wait(5000);
    this.clickCancelAndReturnToShop();
    this.returnToShop();
  }
}
