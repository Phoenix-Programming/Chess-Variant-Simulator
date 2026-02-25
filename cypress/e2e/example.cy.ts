describe("Loads the app", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Chess Variant Simulator");
  });
});
