import {Component, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {IndexHtmlGenerator} from "@angular-devkit/build-angular/src/utils/index-file/index-html-generator";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>()


  onAddItem(){
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,this.amountInputRef.nativeElement.value);
    this. ingredientAdded.emit(newIngredient);
  }

}
