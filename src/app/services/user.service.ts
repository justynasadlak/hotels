import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Token} from '../resources/models/token';
import {User} from '../resources/models/user';
import {UserData} from '../resources/models/userData';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isLogged: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.isLogged = new BehaviorSubject<boolean>(
      !!this.isAuthenticated().pipe(switchMap(res => of(!!res)))
    );
  }

  getUserToken(user: User): Observable<Token> {
    return this.http.post<Token>('http://185.157.80.88:8080/api/authenticate', user);
  }

  getUserData(login: string): Observable<UserData> {
    return this.http.get<UserData>(`http://185.157.80.88:8080/api/users/${login}`);
  }

  isAuthenticated(): Observable<string> {
    return this.http.get('http://185.157.80.88:8080/api/authenticate', {responseType: 'text'});
  }

  register(userData: UserData) {
    console.log(userData);
    return this.http.post('http://185.157.80.88:8080/api/register', userData);
  }

  login() {
    this.isLogged.next(true);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged.next(false);
  }
}
