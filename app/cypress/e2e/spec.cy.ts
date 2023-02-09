describe("template spec", () => {
  beforeEach(() => {
    cy.viewport(1280, 960);
  });

  const selectTravelName = (
    expectedNameBefore: string,
    expectedNameAfter: string
  ) => {
    cy.contains(expectedNameBefore).should("be.visible");
    cy.contains(expectedNameAfter).should("not.exist");
    cy.dataTestId("travel-select-label").click();
    cy.contains(expectedNameAfter).click();
    cy.contains(expectedNameBefore).should("not.exist");
    cy.contains(expectedNameAfter).should("be.visible");
  };

  it("visit diary page", () => {
    cy.log("visit my diary page");
    cy.visit("http://localhost:9000/");
    cy.log("verify an initial state of my diary page.");
    cy.contains("旅の名前").should("be.visible");
    // TODO: 旅の名前の初期表示

    cy.contains("場所を検索する").should("be.visible");
    // TODO: 検索窓の初期状態

    cy.contains("思い出の場所").should("be.visible");
    // TODO: 思い出の場所の一覧の初期状態

    cy.contains("2023/01沖縄旅行／美ら海水族館 の日記").should("be.visible");
    // TODO: 日記入力スペースの初期状態

    cy.contains("【ここに写真を載せられるよ】");
    // TODO: 写真表示欄の初期状態

    cy.log("check a select component of travel name.");
    selectTravelName("2023/01沖縄旅行", "ダミー旅行");
    selectTravelName("ダミー旅行", "2023/01沖縄旅行");
  });
});
