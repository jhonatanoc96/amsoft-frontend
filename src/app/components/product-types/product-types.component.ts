import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from '../../shared/product-type.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-types',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-types.component.html',
  styleUrls: ['./product-types.component.scss']
})
export class ProductTypesComponent implements OnInit {
  productTypes: any[] = [];
  showForm = false;
  showFormEdit = false;
  newProductType = { type: '', id: 0 };


  constructor(
    private productTypeService: ProductTypeService
  ) { }

  ngOnInit(): void {
    this.getProductTypes();
  }

  getProductTypes(): void {
    this.productTypeService.getProductTypes().subscribe(productTypes => this.productTypes = productTypes);
  }

  createProductType(): void {
    this.productTypeService.createProductType(this.newProductType).subscribe(() => {
      this.getProductTypes();
      this.showForm = false;
      this.newProductType = { type: '', id: 0 };

      Swal.fire({
        title: 'Éxito',
        text: 'Tipo de producto creado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  }

  updateProductType(): void {
    this.productTypeService.updateProductType(this.newProductType.id, this.newProductType).subscribe(() => {
      this.getProductTypes();
      this.showFormEdit = false;
      this.newProductType = { type: '', id: 0 };

      Swal.fire({
        title: 'Éxito',
        text: 'Tipo de producto actualizado exitosamente',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  }

  deleteProductType(id: number): void {
    this.productTypeService.deleteProductType(id).subscribe(
      () => {
        this.getProductTypes()
        Swal.fire({
          title: 'Éxito',
          text: 'Tipo de producto eliminado exitosamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error: any) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      });
  }

  changeForm(): void {
    this.showForm = !this.showForm;
    this.showFormEdit = false;
    this.newProductType = { type: '', id: 0 };
  }

  changeFormEdit(productType: any): void {
    this.showFormEdit = !this.showFormEdit;
    this.showForm = false;
    this.newProductType.type = productType.type;
    this.newProductType.id = productType.id;
  }


  searchProductTypes(event: any): void {
    const query = event.target.value;

    if (query === '') {
      this.getProductTypes();
      return;
    }

    this.productTypes = this.productTypes.filter(productType =>
      productType.type.toLowerCase().includes(query.toLowerCase()));
  }
}