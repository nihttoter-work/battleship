import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SquareComponent } from './components/square/square.component';
import { SquareService } from './services/square.service';
import { UserActionsService } from './services/user-actions.service';
import { CellComponent } from './components/cell/cell.component';
import { BattleshipComponent } from './components/battleship/battleship.component';
import { AiService } from './services/ai.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BattleshipComponent
  ],
  providers: [
    SquareService,
    UserActionsService,
    UserActionsService,
    AiService,
  ],
  declarations: [SquareComponent, CellComponent, BattleshipComponent]
})
export class BattleshipModule { }
