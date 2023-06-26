require 'cpf_cnpj'

print "Informe o CPF (apenas números)"
cpf = gets.chomp

if CPF.valid?(cpf, strict: true) == true
	puts "CPF válido"
else
	puts "CPF inválido"
end
