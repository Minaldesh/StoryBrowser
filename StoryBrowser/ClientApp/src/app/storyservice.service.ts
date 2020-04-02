import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import{map, catchError} from 'rxjs/operators';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StoryserviceService {
  
 
  constructor(private http:HttpClient){}
  public getTop500(baseUrl:string):Observable<any[]>{
       
    return this.http.get(baseUrl + 'Story' ).pipe(map(results=><any[]>results)).pipe(catchError(this.handleError));
}

private handleError(error:any){
  let errMsg =(error.message)?error.message : error.status?`${error.status} - ${error.statusText}`:'server error';
  console.log(errMsg);
  return Observable.throw(errMsg);
}
}
