import { Component, OnInit } from '@angular/core';
import { HotTableRegisterer } from '@handsontable/angular';
import Handsontable from 'handsontable';
import { MovieServiceService } from './services/movie-service.service';
import { take, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'angular-test';
  isloading = false;
  dataSet: Array<any> = [];
  id = 'hotInstance';

  hotSettings :Handsontable.GridSettings= {}

  constructor(private movieService: MovieServiceService) {

  }
  ngOnInit() {
    this.movieService.getMovies().pipe(
      finalize(() => this.isloading = true)
      )
    .subscribe(data => {

      this.dataSet.push(data);
      this.dataSet = [].concat.apply([], this.dataSet); //flat array

      this.hotSettings = {
        data: this.dataSet,
        colHeaders: true,
        persistentState: true, 
        manualRowMove: true,
        manualColumnResize: true, 
        manualColumnMove: true,
        licenseKey: 'non-commercial-and-evaluation'
      
      }
    })
  }
}
