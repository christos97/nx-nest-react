import { admin } from '@ntua-saas-10/firebase-admin';

class FirestoreWorkspace {
  private static instance: FirestoreWorkspace;
  private readonly _firestore!: FirebaseFirestore.Firestore;
  constructor() {
    if (!FirestoreWorkspace.instance) {
      FirestoreWorkspace.instance = this;
      this._firestore = admin.firestore;
    }
  }

  get firestore() {
    return this._firestore;
  }
}

const firestoreWorkspace = new FirestoreWorkspace();
export default firestoreWorkspace.firestore;
