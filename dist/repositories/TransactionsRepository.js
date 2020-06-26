"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transaction_1 = __importDefault(require("../models/Transaction"));
var TransactionsRepository = /** @class */ (function () {
    function TransactionsRepository() {
        this.transactions = [];
    }
    TransactionsRepository.prototype.all = function () {
        var balance = this.getBalance();
        var data = {
            transactions: this.transactions,
            balance: balance,
        };
        return data;
    };
    TransactionsRepository.prototype.getBalance = function () {
        var income = 0;
        var outcome = 0;
        var balanceTotal = this.transactions.reduce(function (total, t) {
            if (t.type === 'income') {
                income += t.value;
                return total + t.value;
            }
            outcome += t.value;
            return total - t.value;
        }, 0);
        var data = {
            income: income,
            outcome: outcome,
            total: balanceTotal,
        };
        return data;
    };
    TransactionsRepository.prototype.create = function (_a) {
        var title = _a.title, value = _a.value, type = _a.type;
        var transaction = new Transaction_1.default({ title: title, value: value, type: type });
        this.transactions.push(transaction);
        return transaction;
    };
    return TransactionsRepository;
}());
exports.default = TransactionsRepository;
