import { validarCPF, validarEmail, validarSenhaForte } from "../src/utils/validacoes";

describe("Validação de CPF", () => {
  it("deve retornar true para CPF válido", () => {
    expect(validarCPF("12345678910")).toBe(true);
  });

  it("deve retornar false para CPF inválido", () => {
    expect(validarCPF("12345678900")).toBe(false);
  });
});

describe("Validação de Email", () => {
  it("deve aceitar e-mails válidos", () => {
    expect(validarEmail("testedominio.com")).toBe(true);
  });

  it("deve rejeitar e-mails inválidos", () => {
    expect(validarEmail("teste@com")).toBe(false);
  });
});

describe("Validação de Senha Forte", () => {
  it("deve aceitar senhas fortes", () => {
    expect(validarSenhaForte("Senha123!")).toBe(true);
  });

  it("deve rejeitar senhas fracas", () => {
    expect(validarSenhaForte("Hsvqv8pt*")).toBe(false);
    expect(validarSenhaForte("senhafraca")).toBe(false);
    expect(validarSenhaForte("SenhaSemNumero")).toBe(false);
  });
});
