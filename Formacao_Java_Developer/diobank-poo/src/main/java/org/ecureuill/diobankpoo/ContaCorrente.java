package org.ecureuill.diobankpoo;

public class ContaCorrente extends Conta{

    protected ContaCorrente(Cliente cliente) {
        super(cliente);
    }

    @Override
    protected void imprimirExtrato() {
        System.out.println("==== Extrato Conta Corrente ====");
        super.imprimirInfos();
    }
}

