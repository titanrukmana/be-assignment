"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentHistory = void 0;
class PaymentHistory {
    constructor(account, user, amount, recipient, status) {
        this.account = account;
        this.user = user;
        this.amount = amount;
        this.recipient = recipient;
        this.status = status;
    }
}
exports.PaymentHistory = PaymentHistory;
