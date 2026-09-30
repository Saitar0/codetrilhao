#!/usr/bin/env python3
"""Solução de referência (V1) - Refatorar calculadora
Imprime exemplos de uso em vez de ler do stdin para facilitar captura de saída.
"""
from __future__ import annotations

def soma(a: float, b: float) -> float:
    return a + b

def subtrai(a: float, b: float) -> float:
    return a - b

def multiplica(a: float, b: float) -> float:
    return a * b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Divisão por zero")
    return a / b

def calcular(op: str, a: float, b: float) -> float:
    ops = {"+": soma, "-": subtrai, "*": multiplica, "/": divide}
    if op not in ops:
        raise ValueError(f"Operador desconhecido: {op}")
    return ops[op](a, b)

def exemplos():
    casos = [
        ("+", 10, 5),
        ("-", 10, 5),
        ("*", 3, 7),
        ("/", 22, 7),
    ]
    for op, a, b in casos:
        try:
            resultado = calcular(op, a, b)
            print(f"{a} {op} {b} = {resultado}")
        except Exception as e:
            print(f"Erro ao calcular {a} {op} {b}: {e}")

if __name__ == "__main__":
    exemplos()
