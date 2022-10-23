import { db } from './../firebase-config'
import { collection, getDocs } from 'firebase/firestore';

const collectionRef = collection(db, "contacts1");

//getRecords pulls Rceords from the mentioned collection
async function getRecords(setList) {

    //all the Records are present in 'data.docs'
    const data = await getDocs(collectionRef);

    //we map over 'data.docs'-(array of objects)
    //& set 'list'-state as object containing the mentioned values
    setList(data.docs.map((doc, index) => {

        // ... - is the spread operator
        // doc.data() fetches all key-value pairs from data.docs
        // index - is just the current index (0 based)
        return { ...doc.data(), code: doc.id, id: (index + 1) }
    }));
    console.log("getRecords Ran");
}

export { getRecords };