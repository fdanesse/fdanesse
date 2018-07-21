import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore,
  // AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';
// https://angularfirebase.com/lessons/firestore-with-angularfire-basics/

import { Fduser } from '../modelos/fduser';

// NOTA: Servicio para la base de datos y para archivos en storage
// getStorageDirectoryReference(path: string) devuelve una referencia a un directorio de archivos
// getCollection(path: string) devuelve un Observable a una colección en la base de datos
// getDocument(databasename: string, documentname: string) devuelve un Observable a un documento dentro de una colección en la base de datos
// saveUser(user: Fduser) Guarda los datos de un usuario en la colección registrados de la base de datos


@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(public db: AngularFirestore, private storage: AngularFireStorage) { }

  getStorageDirectoryReference(path: string) { // Storage Dirpath Observer. FIXME: analizar
    return this.storage.storage.ref(path);
  }

  getCollection(path: string) { // Database collection observer.
    const collection$ = this.db.collection(path);
    return collection$.valueChanges();
  }

  getDocument(collectionName: string, documentName: string) { // Database Document Observer.
    const collection$ = this.db.collection(collectionName);
    const document: AngularFirestoreDocument<any> = collection$.doc(documentName);
    return document.valueChanges();
  }

  saveUser(user: Fduser) { // Ejemplo add: coleccion.add({title: cont, title: cont ...}) id automático
    const collection$ = this.db.collection('registrados');
    collection$.doc(user.email).set( (Object.assign({}, user)) )
      .then(success => window.alert('Datos almacenados correctamente.'))
      .catch(err => window.alert('Ocurrió un error inesperado.'));
  }

  deleteUser(email: string) {
    if (confirm('¿Eliminar Usuario?')) {
      const collection$ = this.db.collection('registrados');
      collection$.doc(email).delete()
        .then(success => window.alert('Datos eliminados correctamente.'))
        .catch(err => window.alert('Ocurrió un error inesperado.'));
      }
  }
}
