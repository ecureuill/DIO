import java.util.*;
import java.util.stream.Collectors;

public class Rainbow {
    /*
Crie uma conjunto contendo as cores do arco-íris e:
a) Exiba todas as cores o arco-íris uma abaixo da outra;
b) A quantidade de cores que o arco-íris tem;
c) Exiba as cores em ordem alfabética;
d) Exiba as cores na ordem inversa da que foi informada;
e) Exiba todas as cores que começam com a letra ”v”;
f) Remova todas as cores que não começam com a letra “v”;
g) Limpe o conjunto;
h) Confira se o conjunto está vazio;
 */

    /*
    Violet
    Indigo
    Blue
    Green
    Yellow
    Orange
    Red
    * */
    public static void main(String[] args){
        Set<String> rainbowColors = new HashSet<String>();

        rainbowColors.add("Violet");
        rainbowColors.add("Indigo");
        rainbowColors.add("Blue");
        rainbowColors.add("Green");
        rainbowColors.add("Yellow");
        rainbowColors.add("Orange");
        rainbowColors.add("Red");
        System.out.println(rainbowColors);

        for(String colors: rainbowColors)
            System.out.println(colors);

        System.out.println(rainbowColors.size());

        System.out.println(new TreeSet<String>(rainbowColors));

        List list = new ArrayList(rainbowColors);
        Collections.reverse(list);
        System.out.println(list);

        list = rainbowColors.stream().filter(color -> color.startsWith("V")).collect(Collectors.toList());
        System.out.println(list);

        list = rainbowColors.stream().filter(color -> !color.startsWith("V")).collect(Collectors.toList());
        System.out.println(list);

        rainbowColors.clear();
        System.out.println(rainbowColors.isEmpty());

    }
}
