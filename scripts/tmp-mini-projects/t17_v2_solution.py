#!/usr/bin/env python3
"""Solução de referência (V2) - Testes do validador de CPF
Gera exemplos de validação e mostra True/False para CPFs válidos/invalidos.
"""
import re

def limpa_cpf(cpf: str) -> str:
    return re.sub(r"\D", "", cpf)

def sequencia_repetida(cpf: str) -> bool:
    return cpf == cpf[0] * len(cpf)

def calcular_digito(cpf: str, multiplicadores) -> int:
    s = sum(int(d) * m for d, m in zip(cpf, multiplicadores))
    r = s % 11
    return 0 if r < 2 else 11 - r

def valida_cpf(cpf: str) -> bool:
    c = limpa_cpf(cpf)
    if len(c) != 11 or not c.isdigit():
        return False
    if sequencia_repetida(c):
        return False
    base = c[:9]
    d1 = calcular_digito(base, range(10, 1, -1))
    d2 = calcular_digito(base + str(d1), range(11, 1, -1))
    return c == base + str(d1) + str(d2)

if __name__ == "__main__":
    exemplos = [
        "529.982.247-25",  # válido
        "111.111.111-11",  # inválido (sequência)
        "123.456.789-09",  # inválido
        "935.411.347-80",  # válido (exemplo)
    ]
    for e in exemplos:
        print(e, "->", valida_cpf(e))
