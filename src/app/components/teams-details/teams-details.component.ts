import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from 'src/app/interfaces/game-details';
import { CommonService } from 'src/app/services/common.service';
import { FootballService } from 'src/app/services/football.service';

@Component({
  selector: 'app-teams-details',
  templateUrl: './teams-details.component.html',
  styleUrls: ['./teams-details.component.css']
})
export class TeamsDetailsComponent {

  fixtures: GameDetails[];
  loading: boolean;
  errorMessage: string = '';
  teamId: string;

  constructor(
    private footballDataService: FootballService,
    private route: ActivatedRoute,
    private commonCheckService: CommonService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.teamId = params['teamId'];
    });
    let selectedCountry = JSON.parse(sessionStorage.getItem('selectedCountry')!);
    let leagueId =
      JSON.parse(sessionStorage.getItem(`TopleagueId_${selectedCountry.name}`)!) || null;

    if (this.commonCheckService.notNull(leagueId)) {
      this.footballDataService
        .getDetails(leagueId, this.teamId)
        .subscribe((data) => {
          this.loading = false;
          this.fixtures = data['response'];
        });
    }
  }


}
