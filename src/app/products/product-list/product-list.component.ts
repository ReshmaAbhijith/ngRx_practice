import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { from, Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.actions';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: Observable<Product[]>;
  componentActive: boolean = true;
  errorMessage$: Observable<string>;

  constructor(private productService: ProductService,
    private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );
    this.products$ = this.store.pipe(select(fromProduct.getProducts));
    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));

    this.store.dispatch(new productActions.Load());
    this.store.pipe(select(fromProduct.getShowProductCode), takeWhile(() => this.componentActive)).subscribe((products) => {
      this.displayCode = products;
    });
  }

  checkChanged(event): void {
    const val = event.target.checked;
    // this.displayCode = !this.displayCode;
    // this.store.dispatch({
    //   type: 'TOGGLE_PRODUCT_CODE',
    //   payload: val
    // });
    this.store.dispatch(new productActions.ToggleProductCode(val));
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

  ngOnDestroy(): void {
    this.componentActive = false;
    this.sub.unsubscribe();
  }

}
