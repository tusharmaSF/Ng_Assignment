import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CrudOperations } from "./cruds.interface";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export abstract class ApiService<T, ID> implements CrudOperations<T, ID> {

  constructor(private http: HttpClient) { }

  public postUser(data: T): Observable<T>{
    return this.http.post<T>("http://localhost:3000/posts",data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  public getUser(): Observable<T[]>{
    return this.http.get<any>("http://localhost:3000/posts")
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  public updateUser(data: T,id: ID): Observable<T>{
    return this.http.put<T>("http://localhost:3000/posts/"+id,data)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

  public deleteUser(id: ID): Observable<T>{
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
    .pipe(map((res: any)=>{
      return res;
    }))
  }

}
