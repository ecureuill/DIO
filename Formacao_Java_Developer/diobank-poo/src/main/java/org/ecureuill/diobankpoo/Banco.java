package org.ecureuill.diobankpoo;

import java.util.ArrayList;
import java.util.List;

public class Banco {
    private String nome;
    private List<Conta> contas;
    private List<Cliente> clientes;

    public Banco(String nome) {
        this.nome = nome;
        contas = new ArrayList<Conta>();
        clientes = new ArrayList<Cliente>();

    }

    public String getNome() {
        return nome;
    }

    public ContaCorrente createContaCorrente(Cliente cliente) {
        ContaCorrente conta = new ContaCorrente(cliente);
        contas.add(conta); 
        return conta;
    }

    public ContaCorrente createContaCorrente(String nome, String cpf) throws Exception {
        
        if(existeCliente(cpf))
            throw new Exception("CPF já cadastrado");
        
        Cliente cliente = new Cliente(nome, cpf);
        clientes.add(cliente);        
        ContaCorrente conta = new ContaCorrente(cliente);
        contas.add(conta); 
        return conta; 
    }

    public ContaPoupanca createContaPoupanca(Cliente cliente) {
        ContaPoupanca conta = new ContaPoupanca(cliente);
        contas.add(conta);
        return conta; 
    }

    public ContaPoupanca createContaPoupanca(String nome, String cpf) throws Exception {
        
        if(existeCliente(cpf))
            throw new Exception("CPF já cadastrado");

        Cliente cliente = new Cliente(nome, cpf);
        clientes.add(cliente);
        ContaPoupanca conta = new ContaPoupanca(cliente);
        contas.add(conta); 
        return new ContaPoupanca(cliente); 
    }

    private boolean existeCliente(String cpf){
        return clientes.stream().anyMatch(cliente -> cliente.getCpf() == cpf);
    }

    public Cliente getContaCPF(String cpf) throws Exception {
        Cliente cliente = clientes.stream().filter(cli -> cli.getCpf() == cpf).findAny().orElse(null);

        if(cliente == null)
            throw new Exception("Cliente inexistente");
        return cliente;
    }
}

