import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc,query,getDocs,where,orderBy,limit,startAfter,QueryDocumentSnapshot,DocumentData } from '@angular/fire/firestore';
import { Processor } from '../../pages/configurator/configurator.component'; 
import { Observable,map,from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessorService {
  
  constructor(private firestore: Firestore) {}
  

  getProcessors(): Observable<Processor[]> {
  const processorsRef = collection(this.firestore, 'processors');
  return from(getDocs(processorsRef)).pipe(
    map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Processor)))
  );
}

  addProcessor(processor: Omit<Processor, 'id'>) {
    const processorsRef = collection(this.firestore, 'processors');
    return addDoc(processorsRef, processor);
  }

  updateProcessor(id: string, processor: Partial<Processor>) {
    const processorRef = doc(this.firestore, 'processors', id);
    return updateDoc(processorRef, processor);
  }

  deleteProcessor(id: string) {
    const processorRef = doc(this.firestore, 'processors', id);
    return deleteDoc(processorRef);
  }
   
  getProcessorsWithMinCores(minCores: number): Observable<Processor[]> {
    const processorsRef = collection(this.firestore, 'processors');
    const q = query(processorsRef, where('cores', '>=', minCores));
    return collectionData(q, { idField: 'id' }) as Observable<Processor[]>;
  }

  
  getProcessorsOrderedByPrice(limitCount: number): Observable<Processor[]> {
    const processorsRef = collection(this.firestore, 'processors');
    const q = query(processorsRef, orderBy('price', 'asc'), limit(limitCount));
    return collectionData(q, { idField: 'id' }) as Observable<Processor[]>;
  }

  
  getTopFastestProcessors(limitCount: number): Observable<Processor[]> {
    const processorsRef = collection(this.firestore, 'processors');
    const q = query(processorsRef, orderBy('speed', 'desc'), limit(limitCount));
    return collectionData(q, { idField: 'id' }) as Observable<Processor[]>;
  }


  async getProcessorsPaginated(lastDoc?: QueryDocumentSnapshot<DocumentData>, pageSize: number = 5): Promise<{ processors: Processor[], lastDoc?: QueryDocumentSnapshot<DocumentData> }> {
    const processorsRef = collection(this.firestore, 'processors');
    let q;
    if (lastDoc) {
      q = query(processorsRef, orderBy('price'), startAfter(lastDoc), limit(pageSize));
    } else {
      q = query(processorsRef, orderBy('price'), limit(pageSize));
    }

    const snapshot = await getDocs(q);
    const processors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Processor));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];

    return { processors, lastDoc: lastVisible };
  }
}
