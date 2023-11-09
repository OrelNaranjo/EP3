import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>('RegistrAPP');
    
  setTitle(title: string) {
    this.titleSubject.next(title);
  }

  getTitle() {
    return this.titleSubject.asObservable();
  }
}