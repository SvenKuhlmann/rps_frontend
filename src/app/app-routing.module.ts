import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '',   redirectTo: '/match', pathMatch: 'full' },
  { path: 'match', component: MatchListComponent},
  { path: 'match/:matchId', component: MatchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
