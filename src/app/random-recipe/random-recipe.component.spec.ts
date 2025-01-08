import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRecipeComponent } from './random-recipe.component';

describe('RandomRecipeComponent', () => {
  let component: RandomRecipeComponent;
  let fixture: ComponentFixture<RandomRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
