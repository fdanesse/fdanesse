import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// https://angularfirebase.com/lessons/firestore-with-angularfire-basics/


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private collection$: AngularFirestoreCollection<any>;
  public collectionObserver: Observable<Array<any>>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) {
    this.collection$ = this.db.collection('Guias');
    this.collectionObserver = this.collection$.valueChanges();
  }

  getStorageDirectoryReference(path: string) {
    return this.storage.storage.ref(path);
  }

  getDocument(lenguaje: string) {
    const document: AngularFirestoreDocument<any> = this.collection$.doc(lenguaje);
    // this.document$: Observable<any> = document.valueChanges();
    return document.valueChanges();
  }
}
