import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';

const routes: Routes = [
  { path: 'recipe', component: RecipesComponent, children: [
    {path: '', component: RecipeStartComponent, data: {message: 'Message from Route' }},
    {path: 'new', component: RecipeEditComponent},
    {path: ':id', component: RecipeDetailComponent , resolve: [RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
  ]},
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: '', pathMatch: 'full', redirectTo: 'recipe' },
  { path: '**', redirectTo: 'recipe' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
