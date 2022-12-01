/*Faça um programa que receba a temperatura média os 6 primeiros meses do ano e armazene-as em uma lista.
Após isto, calcule a média semestral das temperaturas e mostre todas as temperaturas acima desta média,
e em que mês elas ocorreram (mostrar o mês por extenso: 1 – Janeiro, 2 – Fevereiro e etc).
*/

import org.junit.Test;
import org.junit.jupiter.api.Assertions;

import java.util.Arrays;
import java.util.List;

public class WheatherTest {

    @Test
    public void calculateSixMonthAverageTemperatureTest(){
        //Sao Paulo 23,1 	23,5 	22,5 	21,2 	18,4 	17,5 	17,2 	18,1 	19,1 	20,5 	21,2 	22,6
        //23,5 	22,5 	21,2 	18,4 	17,5 	17,2  => 20.05

        Assertions.assertEquals(20.05d, Wheather.calculateSixMonthAverageTemperatureTest(Arrays.asList(23.5d,22.5d,21.2d,18.4d,17.5d,17.2d)));
    }

    @Test
    public void listAllTemperaturesAboveTheAverageTest(){
        List<Double> temperature = Arrays.asList(23.5d,22.5d,21.2d, 18.4d,17.5d,17.2d);;
        Assertions.assertEquals(Arrays.asList(23.5d,22.5d,21.2d), Wheather.listAllTemperaturesAboveTheAverage(20.05d, Arrays.asList(23.5d,22.5d,21.2d,18.4d,17.5d,17.2d)));
    }
}
