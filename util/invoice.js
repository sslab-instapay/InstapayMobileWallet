"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var web3_utils_1 = require("web3-utils");
var bignumber_js_1 = __importDefault(require("bignumber.js"));
var v4_1 = __importDefault(require("uuid/v4"));
exports.deriveNonce = function (invoice) {
    var invoiceChecksum = web3_utils_1.soliditySha3({ type: 'bytes16', value: invoice.id }, { type: 'uint256', value: invoice.network.toString() }, { type: 'bytes32', value: invoice.operatorAddress }, { type: 'bytes32', value: invoice.publicKey }, { type: 'uint256', value: invoice.amount.toFixed(0) }, { type: 'bytes32', value: invoice.tokenAddress });
    var completeNonce = new bignumber_js_1.default(invoiceChecksum);
    var fragment = new bignumber_js_1.default(2).pow(32);
    return completeNonce.mod(fragment).toNumber();
};
exports.createInvoice = function (params) {
    var invoice = {
        publicKey: params.publicKey,
        tokenAddress: params.tokenAddress || params.operatorAddress,
    };
    if (params.operatorAddress)
        invoice.operatorAddress = params.operatorAddress;
    if (params.amount)
        invoice.amount = params.amount;
    return invoice;
};
exports.encodeInvoice = function (invoice) {
    var data = [invoice.publicKey];
    if (invoice.id)
        data.push(invoice.id);
    if (invoice.operatorAddress)
        data.push(invoice.operatorAddress);
    if (invoice.amount)
        data.push(compressAmount(invoice.amount.toString()));
    return INVOICE_PREFIX + data.join('|');
};
exports.decodeInvoice = function (encoded) {
    var data = encoded.substring(INVOICE_PREFIX.length).split('|');
    var invoice = {
        publicKey: data.shift(),
        amount: data.shift()
    };
    return invoice;
};
var compressAmount = function (amount) {
    for (var i = amount.length - 1; i >= 0; i--) {
        if (amount[i] !== '0') {
            var zerosAmount = amount.length - i - 1;
            return zerosAmount > 2 ? amount.substring(0, i + 1) + '^' + zerosAmount.toString() : amount;
        }
    }
    return amount;
};
var INVOICE_PREFIX = 'INSTA|';
