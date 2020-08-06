import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { accessToken } from './images-grouping.component';
import { Observable } from 'rxjs';

const urlUploads = 'https://photoslibrary.googleapis.com/v1/uploads';
const urlBatchCreate = 'https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate';

@Injectable({
  providedIn: 'root'
})
export class MediaItemService {

  constructor(private http: HttpClient) { }

  async uploads(mediaItem: IMediaItem): Promise<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken,
        'Content-type': 'application/octet-stream',
        'X-Goog-Upload-Content-Type': 'mime-type',
        'X-Goog-Upload-Protocol': 'raw'
      }),
      observe: "body" as const,
      responseType: "text" as const
    };
    return await this.http.post(urlUploads, mediaItem.contentBytes, httpOptions).toPromise();
  }

  async batchCreate(mediaItem: IMediaItem, uploadToken: string, albumId?: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + accessToken,
        'Content-type': 'application/json'
      })
    };

    const body = {
      "albumId": albumId,
      "newMediaItems": [
        {
          "description": "",
          "simpleMediaItem": {
            "fileName": mediaItem.name,
            "uploadToken": uploadToken
          }
        }
      ]
    }

    return await this.http.post(urlBatchCreate, body, httpOptions).toPromise();
  }

}

export interface IMediaItem {
  name: string;
  dateTime: moment.Moment;
  contentBytes: string | ArrayBuffer;
  contentUrl: string | ArrayBuffer;
}

export class MediaItem implements IMediaItem {
  constructor(public name: string, public dateTime: moment.Moment, public contentBytes: string | ArrayBuffer, public contentUrl: string | ArrayBuffer) {}
}

export interface IMediaItemForGrouping {
  mediaItem: IMediaItem;
  seqNo: number;
  timeDiff: number;
  isDuplicate?: YesNo;
}

export class MediaItemForGrouping implements IMediaItemForGrouping {
  constructor(public mediaItem: IMediaItem, public seqNo: number, public timeDiff: number, public isDuplicate: YesNo = YesNo.N) {}
}

export const enum YesNo {
  Y = 'Y',
  N = 'N'
}
