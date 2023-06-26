numeros = []

1..3.times do
  puts "Digite um número: "
  numeros.push gets.chomp.to_i
end

potencia = numeros.map { |numero| numero**3 }

puts potencia
