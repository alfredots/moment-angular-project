import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Moment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

import { environment } from 'src/environments/enviroment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allMoments: Moment[] = [];
  moments: Moment[] = [];
  baseApiUrl = environment.baseApiUrl;

  searchTerm = '';
  faSearch = faSearch;

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe(items => {
      const data = items.data;

      data.map(item => {
        item.created_at = new Date(item.created_at!).toLocaleDateString(
          'pt-br'
        );
      });

      this.allMoments = data;
      this.moments = data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.moments = this.allMoments.filter(moment =>
      moment.title.toLowerCase().includes(value)
    );
  }
}
