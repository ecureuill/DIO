import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Wheather {

    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        List<Double> temperatures = new ArrayList<Double>();

        int i = 1;
        do{
            System.out.print("Enter the temperature for "+ retrieveMonth(i));
            double temp = scan.nextDouble();
            temperatures.add(temp);
            i++;
        }while (i <= 6);

        System.out.println("Six month temperatures entered was: " + temperatures.toString());

        Double averageTemperature = calculateSixMonthAverageTemperatureTest(temperatures);
        System.out.println("The average temperature is " + averageTemperature);

        List<Double> aboveAverage = listAllTemperaturesAboveTheAverage(averageTemperature, temperatures);

        System.out.println("Showing all temperatures above the average");
        for(Double temp: aboveAverage) {
            int indexMonth = temperatures.indexOf(temp) +1;
            System.out.println(indexMonth + " - " + retrieveMonth(indexMonth) + " " + temp);
        }

    }
    public static Double calculateSixMonthAverageTemperatureTest(List<Double> temperatures) {
        if (temperatures.size() < 6)
            throw new IllegalArgumentException("Must have 6 temperatures");

        Double average = 0d;

        for(Double temp: temperatures) {
            average += temp;
        };

        return  average/6;
    }

    public  static List<Double> listAllTemperaturesAboveTheAverage(Double avarage, List<Double> temperatures){
        return temperatures.stream().filter(temp -> temp > avarage).collect(Collectors.toList());
    }

    public static String retrieveMonth(int i){
        switch (i){
            case 1:
                return "January";
            case 2:
                return "February";
            case 3:
                return "March";
            case 4:
                return "April";
            case 5:
                return "May";
            case 6:
                return "June";
            default:
                throw new IllegalArgumentException("Must be a number between 1 and 6");
        }
    }
}
