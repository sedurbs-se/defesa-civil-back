import { CPF } from './cpf';

describe('CPF', () => {
  it('should not be able to create a CPF with invalid value', () => {
    expect(new CPF('123.456.789-001111')).toBeFalsy();
  });
});
