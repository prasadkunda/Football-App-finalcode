import { Component } from '@angular/core';
import { GeneralConstant } from 'src/assets/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = GeneralConstant.FOOTBALL_TITLE;
}
