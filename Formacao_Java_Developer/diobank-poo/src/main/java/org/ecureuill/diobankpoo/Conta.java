package org.ecureuill.diobankpoo;

import lombok.Getter;

public abstract class Conta{
    private static int AGENCIA_PADRAO = 1;
    private static int SEQUENCIAL = 1;
    
    @Getter
    protected int agencia;

    @Getter
    protected int numero;

    @Getter
    private double saldo;

    @Getter
    private Cliente titular;

    private int limiteNrosSaques;
    private int nrosSaques;
    private double limiteValorSaques;

    protected Conta(Cliente cliente) {
        agencia = AGENCIA_PADRAO;
        numero = SEQUENCIAL++;
        titular = cliente; 
        limiteNrosSaques = 3;
        nrosSaques = 0;
        limiteValorSaques = 500.00;
    }
    
    protected void depositar(double valor) throws Exception {
        if(valor <= 0)
            throw new Exception("Valor invalido para deposito");
        saldo += valor;
    }

    protected void sacar(double valor) throws Exception {
        if(nrosSaques == limiteNrosSaques)
            throw new Exception("Limite de quantidade de saques atingidos");

        if(valor > limiteValorSaques)
            throw new Exception("Limite de saque insuficiente");

        if(valor > saldo)
            throw new Exception("Saldo insuficiente");

        if(valor <= 0)
            throw new Exception("Valor invalido para saque");
    
        limiteNrosSaques++;
        saldo -= valor;
    }

    protected void transferir(double valor, Conta contaDestino) throws Exception  {
        sacar(valor);
        contaDestino.depositar(valor);
    }
    
    protected abstract void imprimirExtrato();

    protected void imprimirInfos(){
        System.out.println(String.format("Agencia: %d", agencia));
        System.out.println(String.format("Conta: %d", numero));
        System.out.println(String.format("Saldo: %.2f", saldo));

    }
}
