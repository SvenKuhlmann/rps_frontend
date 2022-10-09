import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Match, MatchService, Move } from '../matchservice';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, FlexLayoutModule, MatButtonModule, MatCardModule, MatTooltipModule, MatSnackBarModule, RouterModule],
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {

  match?: Match;
  matchId: string | null | undefined;
  wins?: number;
  looses?: number;
  lastMove?: Move;
  error?: number;

  constructor(private matchService: MatchService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(map => this.setup(map.get("matchId")))
  }

  setup(id: string | null | undefined): void {
    if (id) {
      this.matchId = id;
      this.matchService.getMatch(this.matchId!)
      .subscribe({
        next: match => this.setupMatch(match),
        error: (error : HttpErrorResponse) => this.error = error.status
      });
    }
  }

  setupMatch(match: Match): void {
    this.match = match
    this.wins = this.match.moves.filter(move => move.result == 'WIN').length;
    this.looses = this.match.moves.filter(move => move.result == 'LOOSE').length;
  }

  send(move: string) {
    let moveRequest = { gesture: move.toUpperCase() };
    this.matchService.postMove(this.matchId!, moveRequest).subscribe(move => this.displayResultAndReload(move));
  }

  displayResultAndReload(move: Move): void {
    this.lastMove = move;
    let snackBarRef = this.snackBar.open(resultMsgMap.get(move.result)!);
    snackBarRef.afterOpened().subscribe(() => setTimeout(() => snackBarRef.dismiss(), 2000));
    this.setup(this.matchId);
  }
}

const resultMsgMap = new Map<string, string>([
  ['TIE', 'That was a Tie!'],
  ['WIN', 'Congratulations! You Won This Round!'],
  ['LOOSE', ' You lost!']
]);

