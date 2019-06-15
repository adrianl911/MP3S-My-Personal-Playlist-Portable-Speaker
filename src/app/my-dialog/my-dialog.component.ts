import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.less']
})
export class MyDialogComponent implements OnInit {

  info: any;
  playlists: any;

  constructor(public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private data2: DataService) { }

  ngOnInit() {
  	this.data2.getPlaylists().subscribe((data) => {
      this.playlists = data;
    });
  }
  playlistExists(playlistName) {
    for (var i = 0; i < this.playlists.length; i++) {
      if (this.playlists[i].name == playlistName) {
        this.info = {"id": this.playlists[i].id, "name": this.playlists[i].name};
        return true;
      }
    }
    return false;
  }
  save(playlistName) {
    this.info = {"name": playlistName};
    if (!this.playlistExists(playlistName)) {
      this.data2.pushPlaylist(this.info);
      console.log("this.info:", this.info);
    }
  }


}
