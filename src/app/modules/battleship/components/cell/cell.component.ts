import { Component, OnInit, Input } from '@angular/core';
import { Square } from '../../models/square';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() cell: Square;

  constructor() { }

  ngOnInit() {
  }

}
