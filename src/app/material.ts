import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule]
})
export class MaterialModule { }
