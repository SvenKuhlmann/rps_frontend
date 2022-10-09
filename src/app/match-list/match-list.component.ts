import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatchList, MatchService } from '../matchservice';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateMatchDialogComponent } from '../create-match-dialog/create-match-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  selector: 'app-match-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, RouterModule, MatDialogModule, MatSidenavModule],
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})
export class MatchListComponent implements OnInit {

  matchList?: MatchList

  constructor(public dialog: MatDialog, private matchService: MatchService) { }

  ngOnInit(): void {
    this.loadList();
  }
  
  loadList() {
    this.matchService.getList().subscribe(matchList => this.matchList = matchList);
  }

  createNewDialog() {
    const dialogRef = this.dialog.open(CreateMatchDialogComponent, {
      width: '50%',
    })
    dialogRef.afterClosed().subscribe(() => this.loadList())
  }
}
