context("Application", () => {
  it("Should be able verify if all the elements are in the website page", () => {
    cy.visit("http://localhost:3000");
    cy.viewport(1440, 900);

    cy.contains("Busca de endereço");
    cy.get("input[name=CEP]");
    cy.contains("Buscar pelo CEP");
    cy.contains("Endereço buscado");
  });

  it("Should be able to show a form containing adress information, after searching a brazilian zipcode that is 8 charaters", () => {
    cy.viewport(1440, 900);

    cy.intercept("GET", "/", {
      statusCode: 201,
      body: {
        complemento: "at\u00e9 Rua 500",
        bairro: "Coqueiros",
        cidade: "Florian\u00f3polis",
        logradouro: "Avenida Almirante Tamandar\u00e9",
        estado_info: {
          area_km2: "95.737,895",
          codigo_ibge: "42",
          nome: "Santa Catarina",
        },
        cep: "88080160",
        cidade_info: { area_km2: "675,409", codigo_ibge: "4205407" },
        estado: "SC",
      },
    }).as("new-zipcode");

    cy.get("input[name=CEP]").type(88080160);
    cy.get("button").click();
    cy.get("form");
  });
});
