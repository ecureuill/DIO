import java.math.BigDecimal;
import java.util.Scanner;

public class ContaTerminal {

    public static void start() {
        Scanner sc = new Scanner(System.in);
        sc.useDelimiter("\\n");

        System.out.println("Digite o numero da sua conta:");
        int numero = sc.nextInt();

        System.out.println("Digite o numero da sua agencia:");
        String agencia = sc.next();

        System.out.println("Digite o seu nome:");
        String nome = sc.next();
        
        System.out.println("Digite o seu saldo:");
        BigDecimal saldo = sc.nextBigDecimal();

        sc.close();

        System.out.println(String.format("Olá %s obrigado por criar uma conta em nosso banco, sua agência é %s, conta %s e seu saldo %S já está disponível para saque", nome, agencia, numero, saldo));


    }
}
