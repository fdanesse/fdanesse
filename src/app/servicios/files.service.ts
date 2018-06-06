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

  // private collection$: AngularFirestoreCollection<any>;
  // public collectionObserver: Observable<Array<any>>;

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) {
    // this.collection$ = this.db.collection('Guias');
    // this.collectionObserver = this.collection$.valueChanges();
  }

  getStorageDirectoryReference(path: string) {
    // Storage Dirpath Observer.
    return this.storage.storage.ref(path);
  }

  getCollection(path: string) {
    // Database collection observer.
    const collection$ = this.db.collection(path);
    return collection$.valueChanges();
  }

  getDocument(path: string, lenguaje: string) {
    // Database Document Observer.
    const collection$ = this.db.collection(path);
    const document: AngularFirestoreDocument<any> = collection$.doc(lenguaje);
    // this.document$: Observable<any> = document.valueChanges();
    return document.valueChanges();
  }
}
