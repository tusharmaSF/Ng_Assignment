import { Observable } from 'rxjs';

export interface CrudOperations<T, ID>{
    postUser(t: T): Observable<T>;
    getUser(): Observable<T[]>;
    updateUser(t: T, id: ID): Observable<T>;
    deleteUser(id: ID): Observable<any>;
}