import {PartnerAbstractPage} from "../PartnerAbstractPage";

export class ThreeSandboxPage extends PartnerAbstractPage {
  private readonly INPUT_PHONE: string = "//input[@id='phone']";
  private readonly BUTTON_CONTINUE: string = "//*[contains(@id,'onContinue')]";
  private readonly INPUT_OTP_FIELD: string = "//input[@id='otp_field']";
  private readonly BUTTON_BUY_WITH_THREE: string =
    "//*[contains(@id,'buy_button')]";
  private readonly BUTTON_CLOSE: string = "//*[@aria-label='Zamknij']";

  private readonly PHONE: string = "601499402";
  private readonly OTP: string = `123456`;

  /**
   * Uzupełnia pole numeru telefonu podanym numerem lub domyślną wartością.
   * @param {string} [phone = this.PHONE] Numer telefonu do wpisania w polu. Jeśli nie zostanie podany, używana jest domyślna wartość `this.PHONE`.
   * @return {void} Nic nie zwraca.
   */
  private fillPhone(phone: string = this.PHONE): void {
    this.fillField(this.INPUT_PHONE, phone);
  }

  /**
   * Metoda klika w przycisk "Kontynuuj" na podstawie zdefiniowanego selektora.
   * @return {void} Nic nie zwraca.
   */
  private clickContinue(): void {
    this.clickButton(this.BUTTON_CONTINUE);
  }

  /**
   * Wypełnia pole formularza kodem OTP.
   * @param {string} [otp=this.OTP] Kod OTP, który ma zostać wprowadzony. Domyślnie używany jest kod przypisany do this.OTP.
   * @return {void} Nic nie zwraca.
   */
  private fillOTP(otp: string = this.OTP): void {
    this.fillField(this.INPUT_OTP_FIELD, otp);
  }

  /**
   * Obsługuje kliknięcie przycisku "Kup z Three".
   * @return {void} Nic nie zwraca.
   */
  private clickBuyWithThree(): void {
    this.clickButton(this.BUTTON_BUY_WITH_THREE);
  }

  /**
   * Obsługuje zamknięcie elementu, wywołując funkcję kliknięcia przycisku zamknięcia.
   * @return {void} Nic nie zwraca.
   */
  private clickClose(): void {
    this.clickButton(this.BUTTON_CLOSE);
  }

  /**
   * Metoda odpowiedzialna za wykonanie udanej płatności.
   * Sprawdza widoczność pola na numer telefonu, wypełnia dane, a następnie finalizuje płatność za pomocą Three.
   *
   * @return {void} Nic nie zwraca.
   */
  public makeSuccessPayment(): void {
    if (this.getElement(this.INPUT_PHONE).should("be.visible")) {
      this.fillPhone();
      this.clickContinue();
      this.fillOTP();
    }
    this.clickBuyWithThree();
  }

  /**
   Metoda odpowiedzialna za wykonanie nieudanej płatności.
   * Sprawdza widoczność elementu telefonu, wypełnia formularz telefoniczny oraz kod OTP,
   * a następnie kończy proces, klikając przycisk zamknięcia okna.
   *
   * @return {void} Nic nie zwraca.
   */
  public makeFailurePayment(): void {
    if (this.getElement(this.INPUT_PHONE).should("be.visible")) {
      this.fillPhone();
      this.clickContinue();
      this.fillOTP();
    }
    this.clickClose();
  }
}
