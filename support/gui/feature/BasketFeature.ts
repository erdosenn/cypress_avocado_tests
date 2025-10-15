import BasketSummaryPage from "../shop/page/client/basket/BasketSummaryPage";
import BasketFinalPage from "../shop/page/client/basket/BasketFinalPage";
import BasketDonePage from "../shop/page/client/basket/BasketDonePage";
import ProductPage from "../shop/page/client/ProductPage";
import { BasketAddressData } from "../shop/dataType/BasketAddressData";
import { ShippingMethod } from "../shop/dictionary/ShippingMethod";
import { PaymentMethod } from "../shop/dictionary/PaymentMethod";
import BasketAbstractPage from "../shop/page/client/basket/BasketAbstractPage";

const productPage: ProductPage = new ProductPage();
const basketSummaryPage: BasketSummaryPage = new BasketSummaryPage();
const basketFinalPage: BasketFinalPage = new BasketFinalPage();
const basketDonePage: BasketDonePage = new BasketDonePage();

class BasketFeature extends BasketAbstractPage {
  /**
   * Dodaje produkt do koszyka na podstawie podanego identyfikatora produktu,
   * a następnie przechodzi do strony koszyka w celu wyboru opcji wysyłki i płatności.
   *
   * @param {any} productId - Identyfikator produktu, który ma zostać dodany do koszyka.
   * @return {void} - Nie zwraca żadnej wartości.
   */
  public addProductToBasketAndGoToBasket(productId: any): void {
    productPage.openProductCardAndAddToBasket(productId);
    basketSummaryPage.goToShippingAndPayment();
  }

  /**
   * Tworzy zamówienie na podstawie podanego produktu, adresu, metody płatności oraz metody wysyłki,
   * a następnie klika przycisk 'Zamów i zapłać' w koszyku.
   *
   * @param {any} productId Identyfikator produktu, który ma zostać dodany do koszyka.
   * @param {BasketAddressData} [address] Opcjonalny adres używany do dostarczenia zamówienia.
   * @param {PaymentMethod} [paymentMethod] Opcjonalna metoda płatności używana do realizacji zamówienia.
   * @param {PaymentMethod} [paymentChannel] Opcjonalny kanał płatności używany do realizacji zamówienia.
   * @return {Cypress.Chainable<number>} Zwraca numer stworzonego zamówienia
   */
  public makeOrderAndPay(
    productId: any,
    address: BasketAddressData,
    paymentMethod?: PaymentMethod,
    paymentChannel?: PaymentMethod,
  ): number {
    this.addProductToBasketAndGoToBasket(productId);
    basketFinalPage.fillBasketFinalPageAndClickPay(
      address,
      ShippingMethod.PC,
      paymentMethod,
      paymentChannel,
    );
    this.getElement(this.FORM).invoke("attr", "target", "_self");
    return +basketDonePage.getOrderId();
  }

  /**
   * Tworzy zamówienie na podstawie podanego produktu, adresu oraz metody wysyłki, gdzie metodą płatności jest BLIK_0,
   * a następnie klika przycisk 'Zapłać z BLIK' w koszyku.
   *
   * @param {any} productId Identyfikator produktu, który ma zostać dodany do koszyka.
   * @param {BasketAddressData} [address] Opcjonalny adres używany do dostarczenia zamówienia.
   * @return {void} Brak wartości zwracanej.
   */
  public makeOrderAndPayByBlik0(
    productId: any,
    address: BasketAddressData,
  ): void {
    this.addProductToBasketAndGoToBasket(productId);
    basketFinalPage.fillBasketFinalPageAndClickPayWithBlik(
      address,
      PaymentMethod.TWO,
    );
  }

  /**
   * Tworzy zamówienie na podstawie podanego produktu, adresu, metody płatności oraz metody wysyłki, klika przycisk 'Zamów i zapłać' w koszyku i przechodzi
   * na stronę partnera.
   *
   * @param {any} productId - Identyfikator produktu, który ma być zamówiony.
   * @param {BasketAddressData} [address] - Opcjonalny obiekt zawierający dane adresowe użytkownika.
   * @param {PaymentMethod} [paymentMethod] - Opcjonalna metoda płatności, która ma zostać użyta.
   * @param {PaymentMethod} [paymentChannel] - Opcjonalny kanał płatności, który ma zostać użyty.
   */
  public makeOrderAndPayOnPartnerSite(
    productId: any,
    address?: BasketAddressData,
    paymentMethod?: PaymentMethod,
    paymentChannel?: PaymentMethod,
  ) {
    this.makeOrderAndPay(productId, address, paymentMethod, paymentChannel);
    let orderId: Cypress.Chainable<number> = basketDonePage.getOrderId();
    basketDonePage.clickPayButton();
    return orderId;
  }
}

export default BasketFeature;
