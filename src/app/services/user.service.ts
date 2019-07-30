import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Token} from '../resources/models/token';
import {User} from '../resources/models/user';
import {UserData} from '../resources/models/userData';
import {delay, tap} from 'rxjs/operators';
import {Store} from '../../store';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // public isLogged: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private http: HttpClient, private store: Store) {
    // this.isAuthenticated().subscribe(login =>
    //   this.isLogged.next(!!login)
    // );
  }

  getUserToken(user: User): Observable<Token> {
    return this.http.post<Token>('http://185.157.80.88:8080/api/authenticate', user);
  }

  getUserData(login: string): Observable<UserData> {
    return this.http.get<UserData>(`http://185.157.80.88:8080/api/users/${login}`);
  }

  isAuthenticated(): Observable<string> {
    return this.http.get('http://185.157.80.88:8080/api/authenticate', {responseType: 'text'})
      .pipe(delay(1000), tap(response => this.store.set('isLogged', !!response)));
  }

  register(userData: UserData) {
    console.log(userData);
    return this.http.post('http://185.157.80.88:8080/api/register', userData);
  }

  login() {
    this.store.set('isLogged', true);
  }

  logout() {
    localStorage.removeItem('token');
    this.store.set('isLogged', false);
  }
}
