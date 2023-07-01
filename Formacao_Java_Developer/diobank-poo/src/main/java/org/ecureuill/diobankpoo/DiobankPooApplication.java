package org.ecureuill.diobankpoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DiobankPooApplication {

	public static void main(String[] args) {
		SpringApplication.run(DiobankPooApplication.class, args);
		try {
            
            Banco banco = new Banco("Dio bank");
            Conta cc = banco.createContaCorrente("Maria", "12312312312");
            
            cc.imprimirExtrato();
            
            cc.depositar(100);
            cc.imprimirExtrato();

            Cliente cliente = banco.getContaCPF("12312312312");
            Conta cc2 = banco.createContaCorrente(cliente);
                
            
            cc.transferir(25.5, cc2);
            cc2.imprimirExtrato();
            cc.imprimirExtrato();

            
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
	}

}
