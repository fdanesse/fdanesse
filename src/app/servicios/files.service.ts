import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
// https://angularfirebase.com/lessons/firestore-with-angularfire-basics/

import { Fduser } from '../modelos/fduser';


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) { }

  getStorageDirectoryReference(path: string) {
    // Storage Dirpath Observer.
    return this.storage.storage.ref(path);
  }

  getCollection(path: string) {
    // Database collection observer.
    const collection$ = this.db.collection(path);
    return collection$.valueChanges();
  }

  getDocument(databasename: string, documentname: string) {
    // Database Document Observer.
    const collection$ = this.db.collection(databasename);
    const document: AngularFirestoreDocument<any> = collection$.doc(documentname);
    return document.valueChanges();
  }

  saveUser(user: Fduser) {
    // coleccion.add({title: cont, title: cont ...}) id automático
    const collection$ = this.db.collection('registrados');
    collection$.doc(user.email).set( (Object.assign({}, user)) )
      .then(success => console.log('SAVE', success))
      .catch(err => console.log('ERROR en saveUser', err));
  }

}
