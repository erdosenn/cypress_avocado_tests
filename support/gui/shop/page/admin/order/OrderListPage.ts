import AdminAbstractPage from "../AdminAbstractPage";

class OrderListPage extends AdminAbstractPage {
  public readonly URI: string = "/orders/list";

  public readonly LINK_ORDERS_DETAILS =
    "`//a[contains(@href,'/orders/edit/id/${id}')]`";

  /**
   * Metoda przechodzi do strony szczegółów zamówienia o podanym identyfikatorze.
   *
   * @param {number} id Unikalny identyfikator zamówienia, do którego należy przejść.
   * @return {void} Nie zwraca żadnej wartości.
   */
  public goToOrder(id: number): void {
    this.clickButton(this.LINK_ORDERS_DETAILS + id);
  }
}

export default OrderListPage;
