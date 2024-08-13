import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private dbs: Map<string, { db: IDBDatabase; queue: (() => Observable<any>)[] }> = new Map();

  constructor() {}

  private connectToDB(dbName: string, storeName: string): Promise<IDBDatabase> {
    if (this.dbs.has(dbName) && this.dbs.get(dbName)?.db) {
      return Promise.resolve(this.dbs.get(dbName)!.db);
    }

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName, 1);

      request.onerror = () => {
        console.error('Database error:', request.error);
        reject('Database error: ' + request.error);
      };

      request.onupgradeneeded = (event) => {
        const db = request.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
        }
      };

      request.onsuccess = () => {
        const db = request.result;
        if (!this.dbs.has(dbName)) {
          this.dbs.set(dbName, { db, queue: [] });
        } else {
          const stored = this.dbs.get(dbName)!;
          stored.db = db;
          this.dbs.set(dbName, stored);
        }
        this.processQueue(dbName);
        resolve(db);
      };
    });
  }

  private enqueueOperation(
    dbName: string,
    storeName: string,
    operation: () => Observable<any>
  ): Observable<any> {
    if (this.dbs.has(dbName) && this.dbs.get(dbName)?.db) {
      return operation();
    } else {
      return new Observable((subscriber) => {
        const queue = this.dbs.get(dbName)?.queue ?? [];
        queue.push(():any => {
          const opSubscription = operation().subscribe(
            (result) => {
                console.log(result)
                return subscriber.next(result)
            },
            (error) => {
                console.log(error)
                return subscriber.error(error)
            },
            () => subscriber.complete()
          );
          return opSubscription;
        });
        if (!this.dbs.has(dbName)) {
          this.dbs.set(dbName, { db: null!, queue });
          this.connectToDB(dbName, storeName).catch((error) => subscriber.error(error));
        }
      });
    }
  }

  private processQueue(dbName: string): void {
    const stored = this.dbs.get(dbName);
    if (stored && stored.queue.length > 0) {
      while (stored.queue.length > 0) {
        const operation = stored.queue.shift();
        if (operation) {
          operation();
        }
      }
    }
  }


  addItem(dbName: string, storeName: string, keyName: string, item: any): Observable<any> {

     // Clean the item or ensure it's serializable
     const cleanItem = {...item}; // Shallow copy, remove functions or non-serializable parts
     delete cleanItem.nonSerializablePart; // Example of removing a non-serializable part
 
     return this.enqueueOperation(dbName, storeName, () =>
       from(new Promise<any>((resolve, reject) => {
         const db = this.dbs.get(dbName)!.db;
         const transaction = db.transaction(storeName, 'readwrite');
         const store = transaction.objectStore(storeName);
         console.log(cleanItem)
         const request = store.put(cleanItem,keyName);
 
         request.onsuccess = () => resolve(request.result);
         request.onerror = (event:any) => {
            // Handle ConstraintError specifically
            if (event.target.error.name === 'ConstraintError') {
                reject('ConstraintError: Key already exists. Item not added.');
            } else {
                reject('Error adding item: ' + event.target.error);
            }
        };
        //  request.onerror = () => reject('Error adding item: ' + request.error);
       })
     ));


    // return this.enqueueOperation(dbName, storeName, () =>
    //   from(new Promise<any>((resolve, reject) => {
    //     const db = this.dbs.get(dbName)!.db;
    //     const transaction = db.transaction(storeName, 'readwrite');
    //     const store = transaction.objectStore(storeName);
    //     // Assuming `item` itself includes the key or the store has out-of-line keys auto-generated
    //     console.log(item)
    //     const request = store.add(cloneDeep(item), keyName);

    //     request.onsuccess = () => resolve(request.result);
    //     request.onerror = () => reject('Error adding item: ' + request.error);
    //   })
    // ));
  }

//   addItem(dbName: string, storeName: string, keyName: string, item: any): Observable<any> {
//     return this.enqueueOperation(dbName, storeName, () =>
//       from(new Promise<number>((resolve, reject) => {
//         const db = this.dbs.get(dbName)!.db;
//         const transaction = db.transaction(storeName, 'readwrite');
//         const store = transaction.objectStore(storeName);
//         const request = store.add(item, keyName);

//         request.onsuccess = () => resolve(request.result as any);
//         request.onerror = () => reject('Error adding item');
//       })
//     ));
//   }

  getItem(dbName: string, storeName: string, keyName: any): Observable<any> {
    return this.enqueueOperation(dbName, storeName, () =>
      from(new Promise<any>((resolve, reject) => {
        const db = this.dbs.get(dbName)!.db;
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);
        const request = store.get(keyName);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject('Error fetching item');
      })
    ));
  }

  updateItem(dbName: string, storeName: string, keyName: string, item: any, ): Observable<void> {
    return this.enqueueOperation(dbName, storeName, () =>
      from(new Promise<void>((resolve, reject) => {
        const db = this.dbs.get(dbName)!.db;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(item, keyName);

        request.onsuccess = () => resolve();
        request.onerror = () => reject('Error updating item');
      })
    ));
  }

  deleteItem(dbName: string, storeName: string, keyName: string): Observable<void> {
    return this.enqueueOperation(dbName, storeName, () =>
      from(new Promise<void>((resolve, reject) => {
        const db = this.dbs.get(dbName)!.db;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.delete(keyName);

        request.onsuccess = () => resolve();
        request.onerror = () => reject('Error deleting item');
      })
    ));
  }
}
