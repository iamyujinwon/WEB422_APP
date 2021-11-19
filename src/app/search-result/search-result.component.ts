import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results:any;
  searchQuery:string = "";
  q:any;

  constructor(private activatedRoute: ActivatedRoute, private musicDataService: MusicDataService) { }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(queryParams=>{
      this.searchQuery = queryParams['q'];

      this.musicDataService.searchArtists(this.searchQuery).subscribe(data=>{
        this.results = data.artists.items.filter((x:any)=>x.images.length > 0);
      });
    })
  }
}
