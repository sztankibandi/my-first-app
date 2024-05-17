import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A test Recipe', 'This is simply a test','https://images.immediate.co.uk/production/volatile/sites/2/2019/04/Dum-Aloo-e163632.jpg?quality=90&webp=true&resize=600,545'),
    new Recipe('An other Recipe', 'This is a delicious recipe','https://assets-global.website-files.com/5e86c7170f1ab21474c3f2a4/5ef1d04b4056011f67df2ed7_Natural%2Blight%2B-%2BFood%2BPhotography%2B-%2BFrenchly%2B-4365.jpg')

  ];

  constructor() {

  }

  ngOnInit(){
  }

  onRecipeSelected(recipe:Recipe){
    this.recipeWasSelected.emit(recipe);
  }
}
