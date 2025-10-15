import * as allure from "allure-js-commons";
import ShopAbstractPage from "../../page/ShopAbstractPage";
import {
  FLASH_MESSAGE,
  FlashMessageType,
} from "../../dataType/FlashMessageType";

class ClientAbstractPage extends ShopAbstractPage {
  public readonly BUTTON_COOKIES_NECESSARY: string =
    "//consents-accept-necessary[@role='button']";
  public readonly BUTTON_COOKIES_ALL: string = "//consents-accept-all";

  protected readonly VISIBLE_MODAL: string =
    "//*[contains(@class,'modal_visible') and @role='dialog']";

  // Flash message selectors

  public visit(uri: string): void {
    super.visit(uri);
    allure.step(`Sprawdzam widoczność polityki cookies`, (): void => {
      if (this.getElement(this.BUTTON_COOKIES_NECESSARY).should("be.visible")) {
        this.click_cookies_politics();
      }
    });
  }

  private set_cookies_politics(all_cookies: boolean = true): void {
    allure.step(
      `Klikam politykę cookies. Dla wszystkich: "${all_cookies}"`,
      (): void => {
        if (all_cookies) {
          this.clickButton(this.BUTTON_COOKIES_ALL);
        } else {
          this.clickButton(this.BUTTON_COOKIES_NECESSARY);
        }
      },
    );
  }

  public click_cookies_politics(all_cookies: boolean = true): void {
    allure.step("Wybieram politykę cookies", (): void => {
      this.set_cookies_politics(all_cookies);
    });
  }

  /**
   * Weryfikuje czy wiadomość flash jest widoczna i zawiera oczekiwaną treść oraz typ
   * @param expectedText - Oczekiwana treść wiadomości
   * @param type - Oczekiwany typ wiadomości (success/error/warning/info)
   */
  private verifyFlashMessage(
    expectedText: string,
    type: FlashMessageType,
  ): void {
    ClientAbstractPage.verifyMessage(
      this.getElement.bind(this),
      FLASH_MESSAGE,
      expectedText,
      type,
    );
  }

  /**
   * Weryfikuje czy wiadomość flash nie jest obecna
   */
  public verifyNoFlashMessage(): void {
    ClientAbstractPage.verifyNoMessage(
      this.getElement.bind(this),
      FLASH_MESSAGE,
    );
  }

  /**
   * Weryfikuje wiadomość flash typu success
   */
  public verifySuccessMessage(text: string): void {
    this.verifyFlashMessage(text, FlashMessageType.SUCCESS);
  }

  /**
   * Weryfikuje wiadomość flash typu error
   */
  public verifyErrorMessage(text: string): void {
    this.verifyFlashMessage(text, FlashMessageType.ERROR);
  }

  /**
   * Weryfikuje wiadomość flash typu warning
   */
  public verifyWarningMessage(text: string): void {
    this.verifyFlashMessage(text, FlashMessageType.WARNING);
  }

  /**
   * Weryfikuje wiadomość flash typu info
   */
  public verifyInfoMessage(text: string): void {
    this.verifyFlashMessage(text, FlashMessageType.INFO);
  }
}

export default ClientAbstractPage;
