/*
Crie uma classe LinguagemFavorita que possua os atributos nome, anoDeCriacao e IDE.
Em seguida, crie um conjunto com 3 linguagens e faça um programa que ordene esse conjunto por:
a) Ordem de inserção;
b) Ordem natural(nome);
c) IDE;
d) Ano de criação e nome;
e) Nome, ano de criação e IDE;
Ao final, exiba as linguagens no console, um abaixo da outra.
*/

import javax.swing.plaf.LabelUI;
import java.util.*;
import java.util.stream.Collectors;

public class LinguagemFavorita {
    private String nome;
    private Integer anoCriacao;
    private String IDE;

    public LinguagemFavorita(String nome, Integer anoCriacao, String IDE) {
        this.nome = nome;
        this.anoCriacao = anoCriacao;
        this.IDE = IDE;
    }

    public static void main(String[] args){
        Set<LinguagemFavorita> minhasLinguagensFavoritas = new LinkedHashSet<LinguagemFavorita>();
        minhasLinguagensFavoritas.add(new LinguagemFavorita("Python", 1991, "Pycharm"));
        minhasLinguagensFavoritas.add(new LinguagemFavorita("JavaScript", 1995, "IntelliJ"));
        minhasLinguagensFavoritas.add(new LinguagemFavorita("Java", 1991, "Visual Studio Code"));

        System.out.println("Ordem de inserção");
        for(LinguagemFavorita linguagem:  minhasLinguagensFavoritas)
            System.out.println("\t"+linguagem.toString());

        System.out.println("Ordem natural(nome)");
        for(LinguagemFavorita linguagem:  minhasLinguagensFavoritas.stream().sorted(
                Comparator.comparing(ling -> ling.getNome())).collect(Collectors.toList()))
            System.out.println("\t"+linguagem.toString());

        System.out.println("Ordem natural(IDE)");
        for(LinguagemFavorita linguagem:  minhasLinguagensFavoritas.stream().sorted(
                Comparator.comparing(ling -> ling.getIDE())).collect(Collectors.toList()))
            System.out.println("\t"+linguagem.toString());

        System.out.println("Ano de criação e nome");
        for(LinguagemFavorita linguagem:  minhasLinguagensFavoritas.stream().sorted(
                Comparator.comparing((LinguagemFavorita ling) -> ling.getAnoCriacao())
                        .thenComparing(ling -> ling.getNome()))
                .collect(Collectors.toList()))
            System.out.println("\t"+linguagem.toString());

        System.out.println("Nome, ano de criação e IDE;");
        for(LinguagemFavorita linguagem:  minhasLinguagensFavoritas.stream().sorted(
                        Comparator.comparing((LinguagemFavorita ling) -> ling.getNome())
                                .thenComparing((LinguagemFavorita ling) -> ling.getAnoCriacao())
                                .thenComparing(ling -> ling.getIDE()))
                .collect(Collectors.toList()))
            System.out.println("\t"+linguagem.toString());
//        e)
    }

    @Override
    public String toString() {
        return this.getNome() + " - " + this.getAnoCriacao() + " - " +this.getIDE();
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getAnoCriacao() {
        return anoCriacao;
    }

    public void setAnoCriacao(Integer anoCriacao) {
        this.anoCriacao = anoCriacao;
    }

    public String getIDE() {
        return IDE;
    }

    public void setIDE(String IDE) {
        this.IDE = IDE;
    }
}
