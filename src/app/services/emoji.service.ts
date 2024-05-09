import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {
  private _descriptionSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  // Méthode pour récupérer le BehaviorSubject en tant qu'observable
  get description$() {
    return this._descriptionSubject.asObservable();
  }

  // Méthode pour mettre à jour la description
  updateDescription(description: string) {
    this._descriptionSubject.next(description);
  }
}
