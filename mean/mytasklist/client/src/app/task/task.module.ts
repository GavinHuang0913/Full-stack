import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})

export class TaskModule {
  _id: object;
  title: string;
  isDone: boolean;
}
