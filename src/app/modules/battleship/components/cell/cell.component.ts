import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Square } from '../../models/square';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cell: Square;
  @Output() cellClick: EventEmitter<Square> = new EventEmitter();
  testMode: boolean;

  constructor() { }

  ngOnInit() {
    this.testMode = environment.testMode;
  }

  onCellClick() {
    this.cellClick.emit(this.cell);
  }

}
