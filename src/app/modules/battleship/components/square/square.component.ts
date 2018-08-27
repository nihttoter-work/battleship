import { Component, OnInit } from '@angular/core';
import { SquareService } from '../../services/square.service';
import { ShipService } from '../../services/ship.service';
import { UserActionsService } from '../../services/user-actions.service';
import { Square } from '../../models/square';
import { Ship } from '../../models/ship';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {
  square: Square[][];
  ships: Ship[];

  constructor(
    public squareService: SquareService,
    public shipService: ShipService,
    public userActions: UserActionsService,
  ) { }

  ngOnInit() {
    this.square = this.squareService.generateSquare(10, 10);
    this.ships = this.shipService.generateShips(this.square, []);
  }

}
