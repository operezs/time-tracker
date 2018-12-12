import { Injectable } from '@angular/core';

@Injectable()
export class MediaService {
  data = [{
    id: 0,
    name: 'Video1',
    views: 54,
    rating: 4,
    dateModified: new Date(),
  },
  {
    id: 1,
    name: 'Video2',
    views: 23,
    rating: 3,
    dateModified: new Date(),
  },
  {
    id: 2,
    name: 'Video3',
    views: 102,
    rating: 5,
    dateModified: new Date(),
  }];

  getData() {
    return this.data;
  }
}
