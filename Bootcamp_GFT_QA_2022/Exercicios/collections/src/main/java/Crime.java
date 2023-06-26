/*
Utilizando listas, faça um programa que faça 5 perguntas para uma pessoa sobre um crime. As perguntas são:
1. "Telefonou para a vítima?"
2. "Esteve no local do crime?"
3. "Mora perto da vítima?"
4. "Devia para a vítima?"
5. "Já trabalhou com a vítima?"
Se a pessoa responder positivamente a 2 questões ela deve ser classificada como "Suspeita", entre 3 e 4 como
"Cúmplice" e 5 como "Assassina". Caso contrário, ele será classificado como "Inocente".
*/

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Crime {
    public static void main(String[] args){
        List<Boolean> answers = new ArrayList<Boolean>();

        System.out.println("Questioning");
        answers.add(questioning("Did you call the victim? (y or n) "));
        answers.add(questioning("Were you at the crime scene? (y or n) "));
        answers.add(questioning("Do you live near the victim? (y or n) "));
        answers.add(questioning("Did you owe the victim? (y or n) "));
        answers.add(questioning("Have you worked with the victim? (y or n) "));

        int q = answers.stream().filter(a -> a == true).collect(Collectors.toList()).size();
        if(q < 2) System.out.println("Inocent");
        else if(q == 2) System.out.println("Suspect");
        else if(q == 5) System.out.println("Assassin");
        else System.out.println("Crime partner");
    }

    private static Boolean questioning(String question) {
        Scanner scanner = new Scanner(System.in);
        do {
            System.out.println(question);
            String a = scanner.nextLine();
            if(a.equals("y"))
                return true;
            if(a.equals("n"))
                return false;
        }while (true);
    }
}
