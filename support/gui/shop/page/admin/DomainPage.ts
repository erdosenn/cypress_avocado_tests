import AdminAbstractPage from "../../page/admin/AdminAbstractPage";

class DomainPage extends AdminAbstractPage {
  public readonly URI: string =
    "/plugin/execute/plugin/SaasDomains-Hosting/act/domains";

  visit(): void {
    super.visit(this.URI);
  }
}

export default DomainPage;
