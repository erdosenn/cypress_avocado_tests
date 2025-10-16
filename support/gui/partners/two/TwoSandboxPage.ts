import { PartnerAbstractPage } from "../PartnerAbstractPage";

export class TwoSandboxPage extends PartnerAbstractPage {
  private readonly BUTTON_COMPLETE_PAYMENT: string =
    "//button[@id='user_account_pbl_correct']";
  private readonly BUTTON_ERROR_PAYMENT: string =
    "//button[@id='user_account_pbl_error']";

  //Success payment
  /**
   * Kliknięcie przycisku zatwierdzającego płatność.
   * @return {void} Metoda nie zwraca wartości.
   */
  private clickCompletePayment(): void {
    this.clickButton(this.BUTTON_COMPLETE_PAYMENT);
  }

  //Failure payment
  /**
   * Metoda obsługująca kliknięcie przycisku "Błąd płatności" i powrót do sklepu.
   * @return {void} Nie zwraca żadnej wartości.
   */
  private clickErrorPayment(): void {
    this.clickButton(this.BUTTON_ERROR_PAYMENT);
  }

  /**
   * Metoda realizująca udaną płatność na stronie partnera.
   * @return {void} Nie zwraca wartości.
   */
  public makeSuccessPayment(): void {
    this.clickCompletePayment();
  }

  /**
   * Metoda obsługująca dokonanie nieudanej płatności na stronie partnera.
   * @return {void} Metoda nie zwraca wartości.
   */
  public makeFailurePayment(): void {
    this.clickErrorPayment();
  }
}
