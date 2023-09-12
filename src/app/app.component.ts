import { Component, OnInit } from '@angular/core';
import { Lyric, LyricsService, Song } from './lyrics.service';
import { Observable } from 'rxjs';
import { calculateSimilarity, treatSongTitle } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public songsList$!: Observable<Song[]>;
  public songData!: Lyric;
  public titleGuess = '';
  public feedback!: string;
  public streak = 0;

  constructor(private lyricsService: LyricsService) {}

  ngOnInit(): void {
    this.setLyric();
  }

  setLyric() {
    this.feedback = 'Give it a try...';
    this.lyricsService
      .getRandomLyric()
      .subscribe((res) => (this.songData = res));
    this.songsList$ = this.lyricsService.getAllSongs();
  }

  checkGuess() {
    const guess = treatSongTitle(this.titleGuess);
    const answer = treatSongTitle(this.songData.song);

    if (!this.titleGuess.length) {
      this.feedback = 'Input a song first!';
      return;
    }

    console.log(calculateSimilarity(guess, answer));

    const isCloseMatch = calculateSimilarity(guess, answer) > 80;

    if (isCloseMatch) {
      this.feedback = `Correct! ${this.songData.song} from ${this.songData.album}`;
      this.streak++;

      setTimeout(() => {
        this.setLyric();
      }, 4000);
    } else {
      this.feedback = 'Not yet';
    }
  }

  regenerate() {
    this.setLyric();
    this.streak = 0;
  }
}
