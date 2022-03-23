import { el } from "./elements";

class Toast {
  shouldHaveTest(expectText) {
    // validação do resultado esperado
    cy.get(el.toast)
      .should("be.visible")
      .find("p")
      .should("have.text", expectText);
  }
}

export default new Toast();
