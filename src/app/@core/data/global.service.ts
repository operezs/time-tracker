import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {


  private _apiProtocol: string = 'http';
  private _apiHost: string = 'ec2-35-180-192-236.eu-west-3.compute.amazonaws.com';
  private _apiPort: number = 80;
  // private _apiHost: string = 'localhost';
  // private _apiPort: number = 4000;
  private _apiVersion: string = 'api/v1';

  constructor() { }

  apiUrl(): any {
   return `${ this._apiProtocol }://${ this._apiHost }:${ this._apiPort }/${ this._apiVersion }/`;
  }




}
