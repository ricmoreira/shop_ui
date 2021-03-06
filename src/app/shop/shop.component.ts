import { Component, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { List as ListReq, Filter } from '../../models/request/list';
import { List as ListRes } from '../../models/response/list';
import { Product } from '../../models/response/products';
import { CartItem } from '../../models/cart';
import { NotificationService } from '../../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { fromEvent, Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';
import { UUID } from 'angular2-uuid';
import { InvoicesService } from '../../services/invoices.service';
import { InvoiceCreate, Line } from '../../models/request/invoices';

@Component({
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements AfterViewInit {

  private PRODUCTS_BATCH_SIZE: number = 5;

  public showPrevious: boolean;

  public showNext: boolean;

  public totalProducts: number;

  public perPage: number;

  public currentPage: number;

  public totalPages: number;

  public products: Array<Product>;

  public cart: Array<CartItem>;

  public storedReq: ListReq;

  public documentID: string;

  constructor(private notificationService: NotificationService,
    private invoicesService: InvoicesService,
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    this.documentID = UUID.UUID();
    this.showPrevious = false;
    this.showNext = true;

    // load products list with first 15 products
    let req = new ListReq(this.PRODUCTS_BATCH_SIZE, 1);
    this.fetchList(req);

    this.cart = new Array<CartItem>();
  }

  getTotalCartProducts(): string {
    let totalProducts = 0;
    this.cart.forEach(item => {
      totalProducts += item.quantity;
    });
    
    return String(totalProducts);
  }

  addProductToCart(productIndex: number) {
    let product = this.products[productIndex];

    // check if the product already exists in cart
    let inCart = this.cart.find((cartItem) => {
      return cartItem.product.ProductCode == product.ProductCode;
    });

    if (inCart != null) {
      inCart.quantity++;
    } else {
      let cartItem = new CartItem(product, 1);
      console.log("added cart item", cartItem);
      this.cart.push(cartItem);
    }
  }

  removeProductFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  confirmPurchase() {
    const invoice = new InvoiceCreate();
    invoice.InvoiceNo = this.documentID;
    let now = new Date();
    invoice.SystemEntryDate = now.toISOString()
    invoice.InvoiceDate = invoice.SystemEntryDate.split('T')[0];
    invoice.Line = new Array<Line>();

    this.cart.forEach((cartItem, i) => {
      let line = new Line();
      line.ProductCode = cartItem.product.ProductCode;
      line.Quantity = cartItem.quantity;
      line.UnitOfMeasure = "UNI" // TODO: put this dynamic
    
      invoice.Line.push(line);
    });

    this.invoicesService.createInvoice(invoice).subscribe(
      (success) => {

        this.notificationService.success(`Purchase completed with success! Invoice ID: ${invoice.InvoiceNo}`);

        // clear for new purchase
        this.documentID = UUID.UUID();
        this.cart = new Array<CartItem>();
      },
      (err) => {
        console.log(err);
        this.notificationService.error(`Error ocurred on completing purchase! Invoice ID: ${invoice.InvoiceNo}`);

        // clear for new purchase
        this.documentID = UUID.UUID();
        this.cart = new Array<CartItem>();
      }
    );
  }

  ngAfterViewInit() {
    // SEARCH BOX PRODUCT DESCRIPTION
    const searchBoxProductDescription = document.getElementById('search-box-pdescription');

    const typeaheadPD = fromEvent(searchBoxProductDescription, 'input').pipe(
      map((e: KeyboardEvent) => (<HTMLInputElement>event.target).value),
      filter(text => text.length > 2),
      debounceTime(10),
      distinctUntilChanged(),
      switchMap(search => {
        let filter = new Filter("ProductDescription", search);
        let req = new ListReq(this.PRODUCTS_BATCH_SIZE, 1, "ProductDescription", "normal", filter);
        return Observable.of(this.fetchList(req));
      })
    );
    // start search box type handling 
    typeaheadPD.subscribe(
      () => { }, // success do nothing
      ((error: HttpErrorResponse) => {
        console.log(error)
        this.notificationService.error(error.message);
      })
    );
  }

  public fetchList(req: ListReq): void {
    this.storedReq = req;
    this.productService.list(req)
      .subscribe(
        (list: ListRes) => {
          this.totalProducts = list.total;
          this.perPage = list.per_page;
          this.currentPage = list.page;
          this.totalPages = Math.ceil(this.totalProducts / this.perPage);

          // fill component with products
          this.products = new Array<Product>();
          list.items.map((item: any) => {
            let product = <Product>item;
            this.products.push(product);
          }, this);

          // show previous and show next buttons logic
          this.showPrevious = this.currentPage >= 2;
          this.showNext = this.totalPages > this.currentPage;
        },
        ((error: HttpErrorResponse) => {
          console.log(error)
          this.notificationService.error(error.message);
        })
      );
  }

  public loadPrev(): boolean {
    if (!this.showPrevious) {
      return false;
    }
    let pageNumber = this.currentPage - 1 <= 1 ? 1 : this.currentPage - 1;

    this.storedReq.page = pageNumber;
    this.fetchList(this.storedReq);
  }

  public loadNext(): boolean {
    if (!this.showNext) {
      return false;
    }
    let pageNumber = this.currentPage + 1 <= this.totalPages ? this.currentPage + 1 : this.currentPage;

    this.storedReq.page = pageNumber;
    this.fetchList(this.storedReq);
  }

  public listIsEmpty(): boolean {
    return !(this.products.length > 0)
  }

  public doNothing() {
    return false;
  }
}
