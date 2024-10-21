import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private booleanState = new BehaviorSubject<boolean>(false);
  booleanState$ = this.booleanState.asObservable();

  constructor() {
  }

  setBooleanState(newState: boolean) {
    console.warn("newState:", newState)
    this.booleanState.next(newState);
  }
}
