
//Code from WebDeb WorkShop 
import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js'
import * as firestore from 'https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCpnfGbZ06KBSBsu3RlLOIdyA5-ljPMTJg",
    authDomain: "geauxhack2025.firebaseapp.com",
    projectId: "geauxhack2025",
    storageBucket: "geauxhack2025.firebasestorage.app",
    messagingSenderId: "960217831763",
    appId: "1:960217831763:web:c8b809f78387f739b0e9a6",
    measurementId: "G-B9EZ3EXY31"
}

const app = initializeApp(firebaseConfig);
const database = firestore.getFirestore(app);
const table = 'UserData';

async function addToFirebase(object) {
  try {
    await firestore.addDoc(firestore.collection(database, table), object);
  } catch (error) {
    console.error("Error adding to document: ", error);
  }
}

async function deleteFromFirebase(docId) {
  try {
    await firestore.deleteDoc(firestore.doc(database, table, docId));
  } catch (error) {
    console.error("Error removing from document: ", error);
  }
}

async function upsertToFirebase(objectId, newObject) {
  try {
    const reference = firestore.doc(database, table, objectId);
    await firestore.updateDoc(reference, newObject);
  } catch (error) {
    console.error("Error upserting to document: ", error);
  }
}

async function getAllDocsFromFirebase() {
  var docIds = []
  const references = firestore.collection(database, table);
  const snapshots = await firestore.getDocs(references);

  snapshots.forEach((document) => {
    docIds.push(document.id); 
  });

  return docIds;
}

async function getDocFromFirebase(docId) {
  const docRef = firestore.doc(database, table, docId);
  const docSnap = await firestore.getDoc(docRef);
  
  if (docSnap.exists()) {
    return ({
      id: docId,
      data: docSnap.data()
    })
  }
}

async function getAllDataFromFirebase() {
  try {
    const docIds = await getAllDocsFromFirebase();
    const allData = [];

    for (let i = 0; i < docIds.length; i++) {
      allData.push(getDocFromFirebase(docIds[i]));
    }
    return allData;

  } catch (error) {
    console.error("Error getting all data: ", error);
    throw error;
  }
}

export { 
  addToFirebase,
  deleteFromFirebase,
  upsertToFirebase,
  getAllDataFromFirebase, 
  getAllDocsFromFirebase,
  getDocFromFirebase,
}