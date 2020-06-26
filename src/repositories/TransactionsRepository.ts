import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

interface TransactionsBalance {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): TransactionsBalance {
    const balance = this.getBalance();
    const data: TransactionsBalance = {
      transactions: this.transactions,
      balance,
    };
    return data;
  }

  public getBalance(): Balance {
    let income = 0;
    let outcome = 0;
    const balanceTotal = this.transactions.reduce(function (total, t) {
      if (t.type === 'income') {
        income += t.value;
        return total + t.value;
      }
      outcome += t.value;
      return total - t.value;
    }, 0);
    const data = {
      income,
      outcome,
      total: balanceTotal,
    };
    return data;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
