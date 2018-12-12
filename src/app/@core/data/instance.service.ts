import { Injectable } from '@angular/core';

@Injectable()
export class InstanceService {

  data = [
    [{
      id: 'ab',
      idType: 'String', // 'String' | 'Number' | 'Byte'
      dateModified: new Date(),
    },
    {
      id: 'qwww',
      idType: 'String', // 'String' | 'Number' | 'Byte'
      dateModified: new Date(),
    }],
    [{
      id: 11,
      idType: 'Number', // 'String' | 'Number' | 'Byte'
      dateModified: new Date(),
    }],
  ];

  getData(id: number) {
    if (id >= 0 && id < this.data.length) {
      return this.data[id];
    } else {
      return [];
    }
  }
}
