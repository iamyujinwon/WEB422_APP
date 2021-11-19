import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  id: string = "";
  artist:any;
  albums:any;

  constructor(private activatedRoute: ActivatedRoute, private musicDataService: MusicDataService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      this.id = params['id'];

      this.musicDataService.getArtistById(this.id).subscribe(data=>{
        this.artist = data;
      });

      this.musicDataService.getAlbumsByArtistId(this.id).subscribe(data=>{
        this.albums = data.items.filter((curValue:any, index:any, self:any) => self.findIndex((t:any) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
      })
    })
  }
}
