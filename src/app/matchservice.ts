import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatchService {


  url = "/api"

  constructor(private http: HttpClient) { }

  post(match: any): Observable<any> {
    return this.http.post<any>(this.url + "/match", match);
  }

  getList(): Observable<MatchList> {
    return this.http.get<MatchList>(this.url + "/match");
  }

  getMatch(id: String): Observable<Match> {
    return this.http.get<Match>(this.url + "/match/" + id);
  }

  postMove(match: string, request: any): Observable<Move> {
    return this.http.post<Move>(this.url + "/match/" + match + "/move", request);
  }

}

export interface MatchList {
  matches: Match[];
}

export interface Match {
  id: number;
  name: string;
  moves: Move[]
}

export interface Move {
  playerGesture: string;
  kiGesture: string;
  result: string;
}