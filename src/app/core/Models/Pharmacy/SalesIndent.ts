import { SalesIndentItem } from "./SalesIndentItem";

export interface SalesIndent {
    salesIndentId: number,
    date: Date,
    salesIndentNumber: string,
    totalQuantity: number,
    totalTradePrice: number,
    totalTradeOfferDiscount: number,
    totalTradeOffer: number,
    issueDate: Date,
    isIssued: boolean,
    approvedDate: Date,
    isApproved: boolean,
    processedDate: Date,
    isProcessed: boolean,
    userId: number,
    salesOrderId: number,
    deliveryOrderId: number,
    salesInvoiceId: number,
    deliveryChallanId: number,
    salesIndentItems: SalesIndentItem[],

    customerName: string,
    customerSecondName: string,
    consultantName: string,
    customerCode: string
}