import LoginPage from "../../../../../support/gui/shop/page/admin/LoginPage";
import ThreeDomainListPage from "../../../../../support/gui/shop/page/admin/payment/three/ThreeDomainListPage";
import ThreeAddPage from "../../../../../support/gui/shop/page/admin/payment/three/ThreeAddPage";

const loginPage: LoginPage = new LoginPage();
const threeListPage = new ThreeDomainListPage();
const threeAdd: ThreeAddPage = new ThreeAddPage();

describe("Onboarding do Three", (): void => {
  it("Onboarding puste pola", (): void => {
    loginPage.loginAsAdmin();
    threeListPage.visit();
    threeListPage.addNewConfigurationForFirstDomain();
    threeAdd.clickSaveButton();

    threeAdd.elementShouldBeVisible(ThreeAddPage.getErrorLocator("login"));
    threeAdd.elementShouldBeVisible(ThreeAddPage.getErrorLocator("password"));
    threeAdd.elementShouldContainText(
      ThreeAddPage.getErrorLocator("login"),
      "Pole wymagane",
    );
    threeAdd.elementShouldContainText(
      ThreeAddPage.getErrorLocator("password"),
      "Pole wymagane",
    );
  });

  const incorrectThreeCredentials = [
    {
      merchantUid: "aaa",
      password: "bbb",
      uidIsErrorVisible: false,
      passIsErrorVisible: true,
      errorTextForUid: "",
      errorTextForPassword: "nieprawidłowa wartość",
    },
    {
      merchantUid: " ",
      password: " ",
      uidIsErrorVisible: true,
      passIsErrorVisible: true,
      errorTextForUid: "Pole wymagane",
      errorTextForPassword: "Pole wymagane",
    },
  ];

  incorrectThreeCredentials.forEach((incorrectData) => {
    it(`Niepoprawny dane do Three. Login: "${incorrectData.merchantUid}", password: "${incorrectData.password}"`, (): void => {
      loginPage.loginAsAdmin();
      threeListPage.visit();
      threeListPage.addNewConfigurationForFirstDomain();
      threeAdd.fillDataSaveAndResolveModal(
        true,
        incorrectData.merchantUid,
        incorrectData.password,
      );

      if (incorrectData.uidIsErrorVisible) {
        threeAdd.elementShouldBeVisible(ThreeAddPage.getErrorLocator("login"));
        threeAdd.elementShouldContainText(
          ThreeAddPage.getErrorLocator("login"),
          incorrectData.errorTextForUid,
        );
      } else {
        threeAdd.elementShouldNotExist(ThreeAddPage.getErrorLocator("login"));
      }
      if (incorrectData.passIsErrorVisible) {
        threeAdd.elementShouldBeVisible(
          ThreeAddPage.getErrorLocator("password"),
        );
        threeAdd.elementShouldContainText(
          ThreeAddPage.getErrorLocator("password"),
          incorrectData.errorTextForPassword,
        );
      } else {
        threeAdd.elementShouldNotExist(
          ThreeAddPage.getErrorLocator("password"),
        );
      }
    });
  });

  it("Zamknięcie modala", (): void => {
    loginPage.loginAsAdmin();
    threeListPage.visit();
    threeListPage.addNewConfigurationForFirstDomain();
    threeAdd.fillDataSaveAndResolveModal(false);

    threeAdd.elementShouldNotExist(threeAdd.MODAL);
    threeAdd.fieldShouldContainValue(
      threeAdd.FIELD_UID,
      "PK72891_e27b051b0ea6",
    );
    threeAdd.fieldShouldContainValue(
      threeAdd.FIELD_PASSWORD,
      "5424bLtPKWbeIv5K",
    );
  });

  it("Poprawny onboarding do Three", (): void => {
    loginPage.loginAsAdmin();
    threeListPage.visit();
    threeListPage.addNewConfigurationForFirstDomain();
    threeAdd.fillDataSaveAndResolveModal();
  });
});
