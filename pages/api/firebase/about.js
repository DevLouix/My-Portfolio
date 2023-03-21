import { collection, addDoc} from 'firebase/firestore';
import { db } from './config';

export async function postNewContract(contractDetails) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, 'Contracts'), contractDetails);
    // console.log('Document written with ID: ', docRef.id);
}
