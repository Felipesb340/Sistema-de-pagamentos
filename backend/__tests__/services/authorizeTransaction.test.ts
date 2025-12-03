import {
  authorizeTransaction,
  type AuthorizeInput,
} from "../../src/services/transactionService";

describe("authorizeTransaction", () => {
  it("deve aprovar uma transação válida (PAN 16 dígitos, bandeira aceita, valor <= 1000)", () => {
    const input: AuthorizeInput = {
      pan: "4111111111111111",
      brand: "Visa",
      amount: 500,
    };

    const result = authorizeTransaction(input);

    expect(result.status).toBe("approved");
    expect(result.reason).toBeNull();
    expect(result.authorizationCode).toHaveLength(6);
    expect(result.maskedPan).toBe("**** **** **** 1111");
  });

  it("deve recusar quando o PAN for inválido", () => {
    const input: AuthorizeInput = {
      pan: "123", 
      brand: "Visa",
      amount: 100,
    };

    const result = authorizeTransaction(input);

    expect(result.status).toBe("declined");
    expect(result.reason).toBe("PAN inválido");
    expect(result.authorizationCode).toBeNull();

    expect(result.maskedPan.endsWith("0123") || result.maskedPan.endsWith("00123")).toBe(true);
  });

  it("deve recusar quando a bandeira não for aceita", () => {
    const input: AuthorizeInput = {
      pan: "4111111111111111",
      brand: "Amex",
      amount: 100,
    };

    const result = authorizeTransaction(input);

    expect(result.status).toBe("declined");
    expect(result.reason).toBe("Bandeira não aceita");
    expect(result.authorizationCode).toBeNull();
    expect(result.maskedPan).toBe("**** **** **** 1111");
  });

  it("deve recusar quando o valor for menor ou igual a zero", () => {
    const input: AuthorizeInput = {
      pan: "4111111111111111",
      brand: "Visa",
      amount: 0,
    };

    const result = authorizeTransaction(input);

    expect(result.status).toBe("declined");
    expect(result.reason).toBe("Valor inválido");
    expect(result.authorizationCode).toBeNull();
  });

  it("deve recusar quando o valor ultrapassar 1000", () => {
    const input: AuthorizeInput = {
      pan: "4111111111111111",
      brand: "Visa",
      amount: 1500,
    };

    const result = authorizeTransaction(input);

    expect(result.status).toBe("declined");
    expect(result.reason).toBe("Excede limite permitido");
    expect(result.authorizationCode).toBeNull();
  });
});
