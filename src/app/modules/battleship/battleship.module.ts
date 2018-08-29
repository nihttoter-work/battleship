import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from './components/square/square.component';
import { SquareService } from './services/square.service';
import { UserActionsService } from './services/user-actions.service';
import { CellComponent } from './components/cell/cell.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SquareComponent
  ],
  providers: [
    SquareService,
    UserActionsService,
    UserActionsService,
  ],
  declarations: [SquareComponent, CellComponent]
})
export class BattleshipModule { }
