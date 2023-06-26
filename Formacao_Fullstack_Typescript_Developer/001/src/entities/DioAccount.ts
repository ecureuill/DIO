export abstract class DioAccount {
  private readonly name: string
  private readonly accountNumber: number
  private balance: number = 0
  private status: boolean = true

  constructor(name: string, accountNumber: number){
    this.name = name
    this.accountNumber = accountNumber
  }

  setName(name: string): void {
    this.name = name
    console.log('Nome alterado com sucesso!')
  }

  getName(): string {
    return this.name
  }

  deposit(value: number): void{
    if(this.validateStatus()){
    	this.balance += value;
      console.log('Voce depositou')
    }
  }

  withdraw(value: number): void {
  	if(this.validateStatus()){
    	if(this.balance >= value){
    		this.balance -= value;
    		console.log('Voce sacou')
    	}
	}
  }

  getBalance(): number {
    return this.balance
  }

  validateStatus(): boolean {
    if (this.status) {
      return this.status
    }

    throw new Error('Conta inválida')
  }
}