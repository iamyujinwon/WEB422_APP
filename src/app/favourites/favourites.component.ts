import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites: Array<any> = [];
  favouritesSub: Subscription | undefined;

  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.musicDataService.getFavourites().subscribe(data=>{
      this.favourites = data.tracks;
    })
  }

  removeFromFavourites(id: string): void{
    this.musicDataService.removeFromFavourites(id).subscribe(data=>{
      this.favourites = data.tracks;
    })
  }

  ngOnDestroy(): void{
    this.favouritesSub?.unsubscribe();
  }
}
