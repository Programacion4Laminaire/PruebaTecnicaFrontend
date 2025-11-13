import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person, PersonFilter } from './person.model';


const API_URL = 'https://web.laminaire.net/sirbackend';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${API_URL}/api/Person`;

  getPersons(filter: PersonFilter): Observable<Person[]> {
    let params = new HttpParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (value) {
        params = params.set(key, value);
      }
    });

    return this.http.get<Person[]>(this.baseUrl, { params });
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person);
  }
}
