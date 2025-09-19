class REST {
  service_url: string = null;

  private RESPONSE: Cypress.Chainable<Cypress.Response<any>>;

  constructor(service_url: string) {
    this.service_url = service_url;
  }

  sendPost(
    path: string,
    headers: object | null,
    auth: object | null,
    body: object | string | null,
    should_fail: boolean = false,
    form: boolean = false,
  ): Cypress.Chainable {
    return cy.request({
      method: "POST",
      url: this.service_url + path,
      headers: headers,
      auth: auth,
      body: body,
      failOnStatusCode: !should_fail,
      form: form,
    });
  }

  sendPut(
    path: string,
    headers: object | null,
    auth: object | null,
    body: object | string | null,
    should_fail: boolean = false,
  ): Cypress.Chainable {
    return cy.request({
      method: "PUT",
      url: this.service_url + path,
      headers: headers,
      auth: auth,
      body: body,
      failOnStatusCode: !should_fail,
    });
  }

  sendGet(
    path: string,
    headers: object | null,
    auth: object | null,
    should_fail: boolean = false,
  ): Cypress.Chainable {
    return cy.request({
      method: "GET",
      url: this.service_url + path,
      headers: headers,
      auth: auth,
      failOnStatusCode: !should_fail,
    });
  }

  sendDelete(
    path: string,
    headers: object | null,
    auth: object | null,
    should_fail: boolean = false,
  ): Cypress.Chainable {
    this.RESPONSE = cy.request({
      method: "DELETE",
      url: this.service_url + path,
      headers: headers,
      auth: auth,
      failOnStatusCode: !should_fail,
    });
    return this.RESPONSE;
  }
}

export default REST;
