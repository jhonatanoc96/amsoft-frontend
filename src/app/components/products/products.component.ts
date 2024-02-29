import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/product.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ProductTypeService } from '../../shared/product-type.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  productTypes: any[] = [];
  showForm = false;
  showFormEdit = false;
  newProduct = { product_type_id: '', name: '', description: '', id: 0 };

  constructor(
    private productService: ProductService,
    private productTypeService: ProductTypeService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getProductTypes();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(products => this.products = products);
  }

  getProductTypes(): void {
    this.productTypeService.getProductTypes().subscribe(productTypes => this.productTypes = productTypes);
  }

  createProduct(): void {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.getProducts();
      this.showForm = false;
      this.newProduct = { product_type_id: '', name: '', description: '', id: 0 };

      Swal.fire({
        title: 'Éxito',
        text: 'Producto creado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    })
  }

  updateProduct() {
    this.productService.updateProduct(this.newProduct.id, this.newProduct).subscribe(() => {
      this.getProducts()
      this.showFormEdit = false;
      this.newProduct = { product_type_id: '', name: '', description: '', id: 0 };

      Swal.fire({
        title: 'Éxito',
        text: 'Producto actualizado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.getProducts();
        Swal.fire({
          title: 'Éxito',
          text: 'Producto eliminado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }),
      (error: any) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
  }

  changeForm(): void {
    this.showForm = !this.showForm;
    this.showFormEdit = false;
    this.newProduct = { product_type_id: '', name: '', description: '', id: 0 };
  }

  changeFormEdit(product: any): void {
    this.showFormEdit = true;
    this.newProduct.description = product.description;
    this.newProduct.name = product.name;
    this.newProduct.product_type_id = product.product_type_id;
    this.newProduct.id = product.id;
  }

  searchProducts(event: any): void {
    const query = event.target.value;

    if (query === '') {
      this.getProducts();
      return;
    }

    this.products = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
      || product.description.toLowerCase().includes(query.toLowerCase())
      || product.product_type.type.toLowerCase().includes(query.toLowerCase()));
  }
}