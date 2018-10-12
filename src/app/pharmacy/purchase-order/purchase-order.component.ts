import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PharmacyService } from '../../core';
import { PurchaseOrder } from '../../core/Models/Pharmacy/PurchaseOrder';
import { Supplier } from '../../core/Models/Pharmacy/Supplier';
import { InventoryItem } from '../../core/Models/Pharmacy/InventoryItem';
import { Currency } from '../../core/Models/Pharmacy/Currency';
import { PurchaseOrderItem } from '../../core/Models/Inventory/Purchase/PurchaseOrderItem';



@Component({
    selector: 'app-purchase-order',
    templateUrl: './purchase-order.component.html',
    styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {

    private PurchaseOrders : PurchaseOrder;
    private NewPurchaseOrder : PurchaseOrder;
    private Suppliers: Supplier;
    private SelectedSupplier : Supplier;
    private UpdatedModel : any;
    private PurchaseOrderForm : FormGroup;
    private PurchaseOrderDetailsForm : FormGroup;
    private InventoryItems : InventoryItem;
    private SelectedInventoryItem : any;
    private PurchaseOrderDetail : PurchaseOrderItem;
    private PurchaseOrderDetailsArray : any[] = [];
    private FilteredInventoryItems : InventoryItem;
    private Currencies : Currency[];
    private SelectedCurrency : Currency;
    private TotalOrderAmount : number;

    constructor(private PharmacyService: PharmacyService, private FormBuilder : FormBuilder) {
        this.PurchaseOrderForm = this.FormBuilder.group( {
            OrderNumber: [''],
            OrderDate: [''],
            Status: [''],
            Origin: [''],
            Remarks: [''],
            SupplierId: [''],
            CurrencyId : [''],
            ExchangeRate : [''],
            PurchaseOrderItems: this.FormBuilder.array([])
        } );

        this.PurchaseOrderDetailsForm = this.FormBuilder.group( {
            ManualCode : [''],
            Description : [''],
            PackType : [''],
            StockQuantity: [''],
            OrderQuantity : [''],
            BonusQuantity : [''],
            PerUnit : [''],
            Rate : [''],
            GrossAmount : [''],
            DiscountPercentage : [''],
            DiscountAmount : [''],
            SalesTaxPercentage : [''],
            SalesTaxAmount : [''],
            NetAmount : ['']
        } );
    }

    ngOnInit() {
        this.PharmacyService.GetSuppliers().subscribe((res : Supplier ) => { this.Suppliers = res; });
        this.PharmacyService.GetInventoryItems().subscribe((res : InventoryItem ) => { this.InventoryItems = res; this.FilteredInventoryItems = res; console.log(this.FilteredInventoryItems); });
        this.PharmacyService.GetCurrency().subscribe((res : Currency[]) => { this.Currencies = res; });
    }

    // async AddPurchaseOrder(value) {
    //     await this.PharmacyService.AddPurchaseOrder(value).toPromise();
    //     this.PharmacyService.GetPurchaseOrders().subscribe((res : PurchaseOrder ) => this.PurchaseOrders = res);
    // }

    // UpdateModel(value) {
    //     this.UpdatedModel = { ...value.oldData, ...value.newData };
    // }

    // async UpdatePurchaseOrder() {
    //     await this.PharmacyService.UpdatePurchaseOrder(this.UpdatedModel).toPromise();
    // }

    // async DeletePurchaseOrder(value) {
    //     await this.PharmacyService.DeletePurchaseOrder(value.key.PurchaseOrderId).toPromise();
    // }

    GetSupplierDetails(value){
        console.log(value);
        var a : any = this.Suppliers;
        this.SelectedSupplier = a.find(a => a.inventoryCurrencyId == value);
    }

    GetCurrencyDetails(value){
        console.log(value);
        this.SelectedCurrency = this.Currencies.find(a => a.inventoryCurrencyId == value);
    }

    GetItemDetails(value) {
        console.log(value);
        var a : any = this.InventoryItems;
        this.SelectedInventoryItem = a.find(x => x.inventoryItemId == value);
    }

    AddPurchaseOrderDetails(value) {
        console.log(value);
        this.PurchaseOrderDetailsForm.value.ManualCode = value.ManualCode;
        this.PurchaseOrderDetailsForm.value.Description = value.Description;
        this.PurchaseOrderDetailsForm.value.PackType = value.PackType;
        this.PurchaseOrderDetailsForm.value.StockQuantity = value.StockQuantity;
        this.PurchaseOrderDetailsForm.value.PerUnit = value.PerUnit;
        this.PurchaseOrderDetailsForm.value.GrossAmount = <number>this.PurchaseOrderDetailsForm.value.OrderQuantity * <number> this.PurchaseOrderDetailsForm.value.PerUnit;
        this.PurchaseOrderDetailsForm.value.SalesTaxAmount = (<number>this.PurchaseOrderDetailsForm.value.SalesTaxPercentage * <number>this.PurchaseOrderDetailsForm.value.GrossAmount) / 100;
        this.PurchaseOrderDetailsForm.value.DiscountAmount = (<number>this.PurchaseOrderDetailsForm.value.DiscountPercentage * (<number>this.PurchaseOrderDetailsForm.value.GrossAmount + this.PurchaseOrderDetailsForm.value.SalesTaxAmount)) / 100;
        this.PurchaseOrderDetailsForm.value.NetAmount = this.PurchaseOrderDetailsForm.value.GrossAmount + this.PurchaseOrderDetailsForm.value.SalesTaxAmount - this.PurchaseOrderDetailsForm.value.DiscountAmount;
        console.log(this.PurchaseOrderDetailsForm.value);
        let a : any = this.FilteredInventoryItems;
        this.FilteredInventoryItems = a.filter(b => b.InventoryItemId == this.SelectedInventoryItem.inventoryItemId);
        console.log(this.FilteredInventoryItems);

        var b : any = {
            // PackType: this.PurchaseOrderDetailsForm.value.packType.name,
            // PackSize: this.PurchaseOrderDetailsForm.value.packSize.name,
            Quantity: this.PurchaseOrderDetailsForm.value.Quantity,
            ExchangeRate: this.PurchaseOrderForm.value.ExchangeRate,
            GrossAmount: this.PurchaseOrderDetailsForm.value.GrossAmount,
            DiscountPercentage: this.PurchaseOrderDetailsForm.value.DiscountPercentage,
            DiscountAmount: this.PurchaseOrderDetailsForm.value.DiscountAmount,
            AfterDiscountAmount: this.PurchaseOrderDetailsForm.value.GrossAmount + this.PurchaseOrderDetailsForm.value.SalesTaxAmount - this.PurchaseOrderDetailsForm.value.DiscountAmount,
            GstPercentage: this.PurchaseOrderDetailsForm.value.GstPercentage,
            GstAmount: this.PurchaseOrderDetailsForm.value.SalesTaxAmount,
            AfterGstAmount: this.PurchaseOrderDetailsForm.value.GrossAmount + this.PurchaseOrderDetailsForm.value.SalesTaxAmount,
            NetAmount: this.PurchaseOrderDetailsForm.value.NetAmount,
            RetailPrice: <number>this.PurchaseOrderDetailsForm.value.PerUnit * <number>this.PurchaseOrderDetailsForm.value.Quantity,
            CostPrice: <number>this.SelectedInventoryItem.costPrice  * <number>this.PurchaseOrderDetailsForm.value.Quantity,
            InventoryItemId: this.SelectedInventoryItem.inventoryItemId,
            InventoryId: this.SelectedInventoryItem.InventoryId
        };

        // this.PurchaseOrderDetail = value;
        // //this.TotalOrderAmount += Number.parseInt(this.PurchaseOrderDetailsForm.value.NetAmount);
        this.PurchaseOrderDetailsArray.push(b);
        console.log(this.PurchaseOrderDetailsArray);
        //this.PurchaseOrderDetailsForm.reset();
    }

    RemovePurchaseOrderDetails(index, value) {
        this.PurchaseOrderDetailsArray.splice(index, 1);
        this.TotalOrderAmount -= Number.parseInt(value);
    }

    SavePurchaseOrderForm(value) {
        console.log(value);
    }

    SubmitPurchaseOrder() {
        console.log(this.PurchaseOrderDetailsArray);
        // this.NewPurchaseOrder.PurchaseOrderDetails = this.PurchaseOrderDetailsArray;
        // this.NewPurchaseOrder.OrderDate = this.PurchaseOrderForm.value.OrderDate;
        // this.PharmacyService.AddSalesOrder().subscribe(r => console.log(r));
        // this.UpdateStockPosition(this.Invs);
    }

}




