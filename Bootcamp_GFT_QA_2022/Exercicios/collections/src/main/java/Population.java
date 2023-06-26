/*
Dada a população estimada de alguns estados do nordeste brasileiro, faça:
 Estado = PE - população = 9.616.621
 Estado = AL - população = 3.351.543
 Estado = CE - população  = 9.187.103
 Estado = RN - população = 3.534.265
 */

import java.util.*;
import java.util.stream.Collectors;

public class Population {

    public static void main(String[] args){
        System.out.println ("Crie um dicionário que relacione os estados e suas respectivas populações: ");
//        Map<String, Integer> population = Map.of("PE", 9616621, "AL", 3351543, "CE",  9187103, "RN", 3534265 );
        Map<String, Integer> population = new HashMap<>() {{
            put("PE", 9616621);
            put("AL", 3351543);
            put("CE", 9187103);
            put("RN", 3534265);
        }};
        System.out.println(population);

        System.out.println("Substitua a população do estado RN por : 3.534.165");
        population.put("RN", 3534165);
        System.out.println(population);

        System.out.println("Confira se o estado da Paraíba (PB) tucson está no dicionário, caso não, adicione PB - 4.039.277: ");
        if(!population.containsKey("PB"))
            population.put("PB", 4039277);
        System.out.println(population);

        System.out.println("Exiba a população do estado PE: ");
        System.out.println(population.get("PE"));

//    System.out.println("Exiba todos os estados e suas populaçãos na ordem em que foram informados: ");
//
        System.out.println("Exiba todos os estados e suas populações na ordem alfabética: ");
        System.out.println(new TreeMap<String, Integer>(population));
        System.out.println(population.entrySet().stream().sorted(Map.Entry.comparingByKey()).collect(Collectors.toList()));

        System.out.println("Exiba o estado com o menor população e seu respectivo valor");
        System.out.println(Collections.min(population.values()));

        System.out.println("Exiba o estado com a maior população e seu respectivo valor");
        System.out.println(Collections.max(population.values()));

        System.out.println("Exiba a soma da população desses estados");
        int populacaoTotal = population.values().stream().reduce(0, Integer::sum);
        System.out.println(populacaoTotal);

        System.out.println("Exiba a média da população deste dicionário de estados");
        System.out.println(populacaoTotal / population.size());

        System.out.println("Remova os estados com a população menor que 4.000.000: ");
        population.values().removeIf(pop -> pop < 4000000);
        System.out.println(population);

    System.out.println("Apague o dicionario de estados com suas respectivas populações estimadas: ");
    population.clear();

    System.out.println("Confira se a lista está vazia:");
        System.out.println(population.isEmpty());

    }
}
