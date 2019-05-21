import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({

  imports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatExpansionModule, MatMenuModule, MatRadioModule, MatSelectModule, MatStepperModule],

  exports: [FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule, MatExpansionModule, MatMenuModule, MatRadioModule, MatSelectModule, MatStepperModule]

})
export class MaterialModule { }
