import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Token} from '../resources/models/token';
import {User} from '../resources/models/user';
import {UserData} from '../resources/models/userData';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserToken(user: User): Observable<Token> {
    return this.http.post<Token>('http://185.157.80.88:8080/api/authenticate', user);
  }

  getUserData(login: string): Observable<UserData> {
    return this.http.get<UserData>(`http://185.157.80.88:8080/api/users/${login}`);
  }

  isAuthenticated(): Observable<string> {
    return this.http.get('http://185.157.80.88:8080/api/authenticate', { responseType: 'text'});
  }

  register(userData: UserData) {
    console.log(userData);
    return this.http.post('http://185.157.80.88:8080/api/register', userData);
  }
}
