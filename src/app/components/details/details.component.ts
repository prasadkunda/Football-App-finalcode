import { Component } from '@angular/core';
import { Country } from 'src/app/interfaces/country';
import { TeamsDetails } from 'src/app/interfaces/teams-details';
import { CommonService } from 'src/app/services/common.service';
import { FootballService } from 'src/app/services/football.service';
import { StandingsConst, TopEuropeanLeagues } from 'src/assets/constants';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  countriesList: Country[] = [];
  selectedCountryName: string;
  errorMessage = '';
  leagueStandingsList: TeamsDetails[] = [];
  selectedCountry: Country;

  readonly STANDING_CONSTANT = StandingsConst;
  currentSeason: string = (new Date().getFullYear()).toString();

  constructor(
    private footballDataService: FootballService,
    private commonChecksService: CommonService
  ) {}

  ngOnInit(): void {
    // this.getTopCountries();
    // this.loadGameDetails();
    debugger;
    let countries = JSON.parse(sessionStorage.getItem('countries')!) || [];
    if (this.commonChecksService.isDisplayArray(countries)) {
      this.countriesList = countries;
      this.loadGameDetails();
    } else {
      this.getTopCountries();
    }
  }

  getTopCountries() {
    this.footballDataService.getCountries().subscribe((data) => {
      if (this.commonChecksService.isDisplayArray(data['response'])) {
        this.countriesList = data['response'].filter((country: Country) => {
          return Object.keys(TopEuropeanLeagues).indexOf(country.name) !== -1;
        });
        sessionStorage.setItem('countries', JSON.stringify(this.countriesList));
        this.loadGameDetails();
      } else {
        this.errorMessage = data['errors']?.requests;
      }
    });
  }

  loadGameDetails() {
    let selectedCountryItem =
      JSON.parse(sessionStorage.getItem('selectedCountry')!) || null;

    this.selectedCountry = this.commonChecksService.notNullOrUndefined(
      selectedCountryItem
    )
      ? selectedCountryItem
      : this.countriesList[0];
    sessionStorage.setItem(
      'selectedCountry',
      JSON.stringify(this.selectedCountry)
    );
    this.getCountries(this.selectedCountry);
  }

  getCountries(country: Country) {
    if (this.commonChecksService.notNullOrUndefined(country)) {
      this.selectedCountryName = country?.name;

      this.selectedCountry = country;
      sessionStorage.setItem(
        'selectedCountry',
        JSON.stringify(this.selectedCountry)
      );

      let leagueLocalId =
        JSON.parse(sessionStorage.getItem(`TopleagueId_${country.name}`)!) ||
        null;

      if (this.commonChecksService.notNull(leagueLocalId)) {
        this.getStandingsDetails(leagueLocalId, this.currentSeason);
      } else {
        this.getLeagueId(country, leagueLocalId);
      }
    }
  }

  getLeagueId(country: Country, leagueLocalId: number) {
    let leagueName = TopEuropeanLeagues[country.name];
    this.footballDataService
      .getLeaguesId(country.code, this.currentSeason, leagueName, country.name)
      .subscribe((data) => {
        if (this.commonChecksService.isDisplayArray(data['response'])) {
          leagueLocalId = data['response'][0]?.league.id;
          sessionStorage.setItem(
            `TopleagueId_${country.name}`,
            JSON.stringify(leagueLocalId)
          );
          this.getStandingsDetails((leagueLocalId).toString(), this.currentSeason);
        } else {
          this.errorMessage = data['errors']?.requests;
        }
      });
  }

  getStandingsDetails(leagueId: string, currentSeason: string) {
    let standingsData = JSON.parse(sessionStorage.getItem(`standings_${this.selectedCountry.name}`)!) ;
      
      // JSON.parse(sessionStorage.getItem(`standings_${this.selectedCountry.name}`)) || [];

    if (this.commonChecksService.isDisplayArray(standingsData)) {
      this.leagueStandingsList = standingsData;
      console.log("leagueStandingsList in if",this.leagueStandingsList);
    } else {
      this.footballDataService
        .getTeamDetails(leagueId, currentSeason)
        .subscribe((data) => {
          if (this.commonChecksService.isDisplayArray(data['response'])) {
            this.leagueStandingsList =
              data['response'][0]?.league?.standings[0];
              console.log("leagueStandingsList",this.leagueStandingsList);
            sessionStorage.setItem(
              `standings_${this.selectedCountry.name}`,
              JSON.stringify(this.leagueStandingsList)
            );
          }
          
        return this.leagueStandingsList;

        });
    }
  }

}
