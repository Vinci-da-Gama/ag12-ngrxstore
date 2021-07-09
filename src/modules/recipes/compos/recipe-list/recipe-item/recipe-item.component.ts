import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../../../../contracts/modes/recipe.model';

@Component({
  selector: 'ngrxstore-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;
  @Input() index!: number;

  ngOnInit() { }
}
