import { PartnerAbstractPage } from "../PartnerAbstractPage";

export class FourSandboxPage extends PartnerAbstractPage {
  private readonly FIELD_EMAIL: string = "//*[@id='email']";
  private readonly BUTTON_NEXT: string = "//*[@id='btnNext']";
  private readonly FIELD_PASSWORD: string = "//*[@id='password']";
  private readonly BUTTON_LOGIN: string = "//*[@id='btnLogin']";
  private readonly BUTTON_COMPLETE_PAYMENT: string =
    "//button[@data-id='payment-submit-btn']";
  private readonly BUTTON_COMPLETE_PAYMENT_HL: string =
    "//input[@id='confirmButtonTop']";
  private readonly BUTTON_RETURN_TO_SHOP: string =
    "//button[@data-testid='donepage-return-to-merchant-button']";
  private readonly LINK_CANCEL: string = "//a[@data-testid='cancel-link']";
  private readonly LINK_CANCEL_HL: string = "//a[@id='cancelLink']";

  private readonly EMAIL: string = "sb-o41br26574208@personal.example.com";
  private readonly PASSWORD: string = `]SWd")5o`;

  /**
   * Wypełnia pole e-mail podaną wartością.
   *
   * @param {string} email - Adres e-mail do wypełnienia w polu. Jeśli nie zostanie podany, zostanie użyta domyślna wartość EMAIL.
   * @return {void} Nic nie zwraca.
   */
  private fillEmail(email: string = this.EMAIL): void {
    this.fillField(this.FIELD_EMAIL, email);
  }

  /**
   * Kliknięcie przycisku "Dalej".
   *
   * @return {void} Nic nie jest zwracane.
   */
  private clickButtonNext(): void {
    this.clickButton(this.BUTTON_NEXT);
  }

  /**
   * Wypełnia pole hasła podanym ciągiem znaków.
   *
   * @param {string} [password=this.PASSWORD] Hasło, które ma zostać wpisane do pola hasła. Domyślnie wykorzystywana jest wartość zdefiniowana w PASSWORD.
   * @return {void} Nie zwraca żadnej wartości.
   */
  private fillPassword(password: string = this.PASSWORD): void {
    this.fillField(this.FIELD_PASSWORD, password);
  }

  /**
   * Kliknięcie przycisku logowania na stronie.
   *
   * @return {void} Nic nie jest zwracane.
   */
  private clickLoginButton(): void {
    this.clickButton(this.BUTTON_LOGIN);
  }

  //Success payment
  /**
   * Kliknięcie przycisku zatwierdzającego płatność.
   *
   * @return {void} Metoda nie zwraca wartości.
   */
  private clickCompletePayment(): void {
    this.clickButton(this.BUTTON_COMPLETE_PAYMENT);
  }

  /**
   * Metoda obsługuje zdarzenie kliknięcia przycisku "Powrót do sklepu".
   * Wywołuje wewnętrzną metodę do obsługi kliknięcia na przycisk o określonym identyfikatorze.
   *
   * @return {void} Nie zwraca wartości.
   */
  private clickReturnToShop(): void {
    this.clickButton(this.BUTTON_RETURN_TO_SHOP);
  }

  //Failure payment
  /**
   * Metoda obsługująca kliknięcie przycisku "Anuluj" i powrót do sklepu.
   *
   * @return {void} Nie zwraca żadnej wartości.
   */
  public clickCancelAndReturnToShop(): void {
    this.clickButton(this.LINK_CANCEL);
  }

  /**
   * Loguje użytkownika jako klienta, wprowadzając jego dane uwierzytelniające.
   *
   * @param {string} email Adres e-mail użytkownika.
   * @param {string} password Hasło użytkownika.
   * @return {void} Nie zwraca żadnej wartości.
   */
  private logAsClient(email: string, password: string): void {
    this.fillEmail(email);
    if (this.getElement(this.BUTTON_NEXT).should("be.visible")) {
      this.clickButtonNext();
    }
    this.fillPassword(password);
    this.clickLoginButton();
  }

  /**
   * Metoda realizująca udaną płatność na stronie Four.
   *
   * @param {string} [email] Opcjonalny adres e-mail użytkownika.
   * @param {string} [password] Opcjonalne hasło użytkownika.
   * @return {void} Nie zwraca wartości.
   */
  public makeSuccessPayment(email?: string, password?: string): void {
    this.logAsClient(email, password);
    this.clickCompletePayment();
    this.clickReturnToShop();
  }

  /**
   * Metoda obsługująca dokonanie nieudanej płatności na stronie Four.
   *
   * @param {string} [email] - Opcjonalny adres e-mail użytkownika do logowania.
   * @param {string} [password] - Opcjonalne hasło użytkownika do logowania.
   * @return {void} Metoda nie zwraca wartości.
   */
  public makeFailurePayment(email?: string, password?: string): void {
    this.logAsClient(email, password);
    this.clickCancelAndReturnToShop();
  }
}
