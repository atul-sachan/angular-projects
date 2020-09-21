import { EventEmitter, Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe(
            1,
            'Tasty Schnitzel',
            'A super tasty Tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('Meet', 1),
                new Ingredient('French Fries', 20)
            ]
        ),
        new Recipe(
            2,
            'Big Fat Burger',
            'This is jumbo burger - Fantastic! ',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
        )
    ];

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private slService: ShoppingListService ) { }

    getRecipes(): Recipe[] {
        return this.recipes.slice(); // returns new object/Array instance
    }

    getRecipe(id: number): Recipe{
        return this.recipes.slice().find(x => x.id === id);
    }

    addIngredientToShoppingList(ingredients: Ingredient[]): void{
        this.slService.addIngredients(ingredients);
    }

}
