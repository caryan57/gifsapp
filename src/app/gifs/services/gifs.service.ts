import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _tagsRecord: string[] = [];
  private GIHPY_API_KEY: string = environment.giphy_api_key;
  private GIPHY_URL: string = 'https://api.giphy.com/v1/gifs';
  public _gifsList: Gif[] = [];

  // Inyectamos un servicio de Angular para manejar las peticiones http
  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagsRecord(): string[] {
    return [...this._tagsRecord];
  }

  get gifsList(): Gif[] {
    return [...this._gifsList];
  }

  private addRecord(tag: string): void {
    // If record already exists, delete it and filter new array
    if(this._tagsRecord.includes(tag)) {
      this._tagsRecord = this._tagsRecord.filter(oldTag => oldTag !== tag);
    }

    this._tagsRecord.unshift(tag);

    // Limit quantity of records
    this._tagsRecord = this._tagsRecord.splice(0, 15);

    // Save changes in local storage
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('record', JSON.stringify(this.tagsRecord));
  }

  private loadLocalStorage(): void {
    // Return when there is no records
    if(!localStorage.getItem('record')) return;

    // When records exists then load the list
    const lastRecords = JSON.parse(localStorage.getItem('record')!);
    this._tagsRecord = lastRecords;

    // Load gifs of first result when starting if there is a record available in local storage
    if(this._tagsRecord.length > 0) this.searchTag(lastRecords[0]);
  }

  searchTag(query: string):void {
    if(query.length === 0) return;
    const searchTag = query.toLowerCase();

    //Configure http params
    const params = new HttpParams()
    .set('api_key', this.GIHPY_API_KEY)
    .set('limit', 20)
    .set('q', searchTag)

    // Make http request with Angular Module HttpModule(app.module.ts inside imports) and service HttpClient
    // Angular creates an Observable type object and with suscribe we can access to the data
    // We define the thype of response with <>
    const request = this.http.get<SearchResponse>(`${this.GIPHY_URL}/search`, {
      params,
    });
    
    //Add data to private property
    request.subscribe(response => {
      this._gifsList = response.data;
    });

    // Add new record to historial
    this.addRecord(searchTag);
  }

  clearRecords(): void {
    this._gifsList = [];
    this._tagsRecord = [];
    localStorage.clear();
  }
}
