import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutosizeDirective } from '../autosize.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutosizeDirective],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, AutosizeDirective],
})
export class SharedModule {}
