usuarios = []
contas = []
AGENCIA = "0001"
LIMITE_SAQUE_VALOR = 500
LIMITE_SAQUE_QTDE = 3

def existe_cpf(cpf):
    return len(list(filter(lambda usuario: usuario["cpf"] == cpf, usuarios))) > 0

def retorna_usuario(cpf):
    usuario = [usuario for usuario in usuarios if usuario["cpf"] == cpf]
    print(usuario)
    return usuario[0] if (len(usuario)>0) else None

def retorna_conta(conta_nro):
    conta = [conta for conta in contas if conta["conta"] == int(conta_nro)]
    return conta[0] if (len(conta)>0) else None

def cadastrar_usuario():
    cpf = input("Informe seu CPF (somente número)\n")

    try:
        int(cpf)
    except:
        print("CPF deve ser informado apenas com números")

    if(existe_cpf(cpf)):
        print("CPF já cadastrado")
        return

    nome = input("Informe seu nome ")
    data_nascimento = input("Informe sua data de nascimento ")
    endereco_logradouro = input("Informe seu logradouro (sem número) ")
    endereco_nro = input("Informe o número do seu logradouro ")
    endereco_bairro = input("Informe seu bairro ")
    endereco_cidade = input("Informe sua cidade ")
    endereco_uf = input("Informe sua UF ")

    usuarios.append({"nome": nome, "data_nascimento": data_nascimento, "cpf": cpf, "endereco": f"{endereco_logradouro}, {endereco_nro} - {endereco_bairro}, {endereco_cidade}/{endereco_uf}"})

def extrato_operacao(saldo_inicial, valor, saldo_final, tipo_operacao):
    return f"""
        {tipo_operacao.upper()}
            saldo           R${saldo_inicial:.2f}
            {tipo_operacao}           R${valor:.2f}
            novo saldo      R${saldo_final:.2f}
    """

def cadastrar_conta(cpf):
    conta_nro = len(contas) + 1
    usuario = retorna_usuario(cpf)

    if(usuario != None):
        contas.append({"usuario": usuario, "agencia": AGENCIA, "conta": conta_nro, "saldo": 0, "saques": 0, "extrato": []})
    else:
        print("CPF não cadastrado")

def saque_valida(valor, saques, saldo, qtde_saques):
    if(valor > saldo):
        print("Saldo insuficiente. Operação não realizada.")
    elif(valor <= 0):
        print("Valor inválido. Operação não realizada.")
    elif(valor > LIMITE_SAQUE_VALOR):
        print("Limite não autorizado.")
    elif(qtde_saques >= LIMITE_SAQUE_QTDE):
        print("Limite de saques diário atingido.")
    else:
        return True
    return

def deposito_valida(valor):
    if(valor <= 0):
        print("Valor inválido. Operação não realizada.")
        return
    return True

def sacar(*, valor, conta_nro):
    
    conta = retorna_conta(conta_nro)
    if(conta == None):
        print("Conta inexistente")
        return

    if(saque_valida(valor, conta["saques"], conta["saldo"], conta["saques"]) == None):
        return

    conta["extrato"].append(extrato_operacao(conta["saldo"], valor, conta["saldo"] - valor, "saque"))
    conta["saldo"] = conta["saldo"] - valor
    conta["saques"] = conta["saques"] + 1
    print("Operação realizada com sucesso.\n")

    return conta["saldo"], conta["extrato"][-1]

def depositar(valor, conta_nro, /):
    if(deposito_valida(valor) == None):
        return

    conta = retorna_conta(conta_nro)
    if(conta == None):
        print("Conta inexistente")
        return

    conta["extrato"].append(extrato_operacao(conta["saldo"], valor, conta["saldo"]+valor, "deposito"))
    conta["saldo"] += valor 
    print("Operação realizada com sucesso.\n")
 
    return conta["saldo"], conta["extrato"][-1]

def emitir_extrato(conta_nro):
    
    conta = retorna_conta(conta_nro)
    if(conta == None):
        print("Conta inexistente")
        return

    print("###### Extrato Completo ######")
    for extrato_operacao in conta["extrato"]:
        print(extrato_operacao)

def listar_contas():
    print(contas)

def listar_usuarios():
    print(usuarios)

def main():

    operacao = "-1"
    while (operacao != "0"):
        operacao = input('''Qual operação deseja realizar?
            1- depositar
            2- sacar
            3- extrato
            4- novo usuário
            5- nova conta
            6- lista usuarios
            7- lista contas
            0- encerrar
        \n''' )

        if(operacao == "1"):
            conta_nro = input('Informe o número da conta ')
            valor = float(input('Informe o valor para desposito '))
            print(f"Valor informado: {valor}")
            depositar(valor, conta_nro)
        
        elif(operacao == "2"):
            conta_nro = input('Informe o número da conta ')
            valor = float(input('Informe o valor para saque '))
            print(f"Valor informado: {valor}")
            sacar(valor=valor, conta_nro=conta_nro)
            
        elif(operacao == "3"):
            conta_nro = input('Informe o número da conta ')
            emitir_extrato(conta_nro)
            
        elif(operacao == "4"):
            cadastrar_usuario()

        elif(operacao == "5"):
            cpf = input('Informe o CPF ')
            cadastrar_conta(cpf) 
            
        elif(operacao == "6"):
            listar_usuarios()
            
        elif(operacao == "7"):
            listar_contas()   
    else:
        print("Operação finalizada")


main()