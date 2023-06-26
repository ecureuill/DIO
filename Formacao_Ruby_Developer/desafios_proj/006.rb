puts "Informe seu número de whatsapp:"

numero = gets.chomp

puts "Meu whatsapp é #{numero}"

print /\([0-9]{2}\)\s9\s[0-9]{4}\-[0-9]{4}/.match(numero)
