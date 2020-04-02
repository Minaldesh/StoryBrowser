import { Component, Inject } from '@angular/core';
import { StoryserviceService } from '../storyservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  dtOptions: DataTables.Settings = {};
  public forecasts: WeatherForecast[];
  stories: Story[];
  baseurl: string;
  dtTrigger: any = new Subject();
  constructor(public _storyservice: StoryserviceService, @Inject('BASE_URL') baseUrl: string) { this.baseurl = baseUrl; }
 
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this._storyservice.getTop500(this.baseurl).subscribe(x => {
      this.stories = x;
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<WeatherForecast[]>(baseUrl + 'weatherforecast').subscribe(result => {
  //    this.forecasts = result;
  //  }, error => console.error(error));
  //}
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

interface Story {
  id: string;
  by: string;
  title: string;
  url: string;
}
