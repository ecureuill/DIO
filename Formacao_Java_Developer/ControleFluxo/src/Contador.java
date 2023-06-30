import java.util.InputMismatchException;
import java.util.Scanner;

public class Contador {
    public static void main(String[] args) {
        try {
            Scanner sc = new Scanner(System.in);

            System.out.println("Digite um número");
            int inicio = sc.nextInt();
            System.out.println("Digite outro número");
            int fim = sc.nextInt();
            
            sc.close();

            contar(inicio, fim);

        } catch (ParametrosInvalidosException e) {
           System.out.println(e.getMessage());
        } catch (InputMismatchException e){
            System.out.println("Deve ser um número inteiro");
        }
    }

    private static void contar(int inicio, int fim) throws ParametrosInvalidosException {
        int contador = fim - inicio;

        if(inicio > fim )
            throw new ParametrosInvalidosException("O segundo parâmetro deve ser maior que o primeiro");

        for(int i = 1; i <= contador; i++ ){
            System.out.println("Imprimindo o numero " + i);
        }
    }
}