import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Country } from '../interfaces/country';
import { TeamsDetails } from '../interfaces/teams-details';
import { GeneralConstant } from 'src/assets/constants';
import { GameDetails } from '../interfaces/game-details';

@Injectable({
  providedIn: 'root'
})
export class FootballService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country> {
    return this.http.get<Country>(`${environment.API_HOST_URL}countries`);
  }

  //getLeaguesId
  getLeaguesId(
    countryCode: string,
    season: string,
    leagueName: string,
    countryName: string
  ): Observable<Object> {
    const params = new HttpParams()
      .set('code', countryCode)
      .set('season', season)
      .set('name', leagueName)
      .set('country', countryName);
    return this.http.get(`${environment.API_HOST_URL}/leagues`, {
      params: params,
    });
  }

  //getStandings
  getTeamDetails(leagueId: string, season: string): Observable<TeamsDetails> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('season', season);
    return this.http.get<TeamsDetails>(`${environment.API_HOST_URL}/standings`, {
      params: params,
    });
  }

  //getfixtures
  getDetails(leagueId: string, teamId: string): Observable<GameDetails> {
    const params = new HttpParams()
      .set('league', leagueId)
      .set('team', teamId)
      .set('last', GeneralConstant.TEN);
    return this.http.get<GameDetails>(`${environment.API_HOST_URL}/fixtures`, {
      params: params,
    });
  }

}
