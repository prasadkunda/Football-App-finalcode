import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Country } from 'src/app/interfaces/country';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input()topLeagueCountries: Country[];
  @Input()currentActiveCountry: string;
  @Output('getCountriesData') getCountriesData = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitCountriesEvent(country: Country) {
    this.getCountriesData.emit(country);
  }
}
