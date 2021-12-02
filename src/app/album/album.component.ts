import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  id: string = "";
  album: any;

  constructor(private activatedRoute: ActivatedRoute, private musicDataService: MusicDataService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id = params['id'];

      this.musicDataService.getAlbumById(this.id).subscribe(data=>{
        this.album = data;
      });
    })
  }

  addToFavourites(trackID: string): void {
    this.musicDataService.addToFavourites(trackID).subscribe(
      (success) => {
        this.matSnackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      (err) => {
        this.matSnackBar.open("Unable to add song to Favourites", "Failed", { duration: 1500 });
      }
    )
  }
}
