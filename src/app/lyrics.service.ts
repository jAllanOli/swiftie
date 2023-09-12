import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Lyric = {
  album: string;
  quote: string;
  song: string;
};

export type Song = {
  song_id: number;
  title: string;
  album_id: number;
};

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  constructor(private http: HttpClient) {}

  getRandomLyric(): Observable<Lyric> {
    return this.http.get<Lyric>('https://taylorswiftapi.onrender.com/get');
  }

  getLyric(randomizeLyrics: boolean, numberOfParagraphs: number) {
    const url = 'https://taylor-swift-api.sarbo.workers.dev/lyrics';
    let queryParams = new HttpParams();

    queryParams = queryParams.append('shouldRandomizeLyrics', randomizeLyrics);
    queryParams = queryParams.append('numberOfParagraphs', numberOfParagraphs);

    return this.http.get(url, {
      params: queryParams,
    });
  }

  getAllSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(
      'https://taylor-swift-api.sarbo.workers.dev/songs'
    );
  }
}
