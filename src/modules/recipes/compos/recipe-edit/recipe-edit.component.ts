import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppStoreStateInterface } from '../../../../contracts/store/AppStoreStateInterface';
import { Recipe } from '../../../../contracts/modes/recipe.model';
// import { RecipeService } from '../../../../services/internal/recipe.service';
import { UpdateRecipe, AddRecipe } from '../../../../store/recipeStore/recipe.actions';

@Component({
  selector: 'ngrxstore-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;
  editReciSub!: Subscription;

  constructor(
    private route: ActivatedRoute,
    // private recipeService: RecipeService,
    private router: Router,
    private store: Store<AppStoreStateInterface>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(UpdateRecipe({
        idx: this.id,
        newRecipe: this.recipeForm.value
      }));
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value);
      this.store.dispatch(AddRecipe(this.recipeForm.value))
    }
    this.onCancel();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.editReciSub = this.store.select('recipeReducer')
        .pipe(
          map(({ recipes }) => {
            const target = recipes.find((each, idx) => idx === this.id);
            return target ? target : new Recipe('', '', '', []);
          })
        ).subscribe((recipe: Recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  ngOnDestroy(): void {
    this.editReciSub && this.editReciSub.unsubscribe()
  }

}
