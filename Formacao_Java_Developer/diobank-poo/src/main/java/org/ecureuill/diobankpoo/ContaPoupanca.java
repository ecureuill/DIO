package org.ecureuill.diobankpoo;

public class ContaPoupanca extends Conta {

    public ContaPoupanca(Cliente cliente) {
        super(cliente);
    }

    @Override
    protected void imprimirExtrato() {
        System.out.println("==== Extrato Conta Poupança ====");
        super.imprimirInfos();
    }
}

