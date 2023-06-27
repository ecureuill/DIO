operacao = ""
operacoes = []

while (operacao != "0"):
    operacao = input('''Informe
        1- para depositar
        2- para sacar
        3- para extrato
        0- para sair
    \n''' )
    if(operacao == "1"):
        valor = float(input('Informe o valor para desposito '))
        if(valor <= 0):
            print("Valor inválido. Operação não realizada.")
        else:
            operacoes.append(valor)
            print("Operação realizada com sucesso.")
            saldo += valor
    elif(operacao == "2"):
        valor = float(input('Informe o valor para saque '))
        print(f"Valor informado: {valor}")
        
        if(valor > saldo):
            print("Saldo insuficiente. Operação não realizada.")
        elif(valor <= 0):
            print("Valor inválido. Operação não realizada.")
        elif(valor > 500):
            print("Limite não autorizado.")
        else:
            if(len(list(filter(lambda x: x < 0, operacoes))) >= 3):
                print("Limite de saques diário atingido.")
            else:
                operacoes.append(valor * -1)
                saldo -= valor
                print("Operação realizada com sucesso.")
    elif(operacao == "3"):
        print("#### Extrato ####")
        saldo_final = 0
        for valor in operacoes:
            if valor > 0:
                tipo_operacao = 'DEPÓSITO'
            else:
                tipo_operacao = 'SAQUE'
            saldo_inicial = saldo_final
            saldo_final += valor
            print(f"""
            {tipo_operacao}
                saldo           R${saldo_inicial:.2f}
                                R${valor:.2f}
                saldo final     R${saldo_final:.2f}
            """)
else:
    print("Operação finalizada")
