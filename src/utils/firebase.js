import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import { getAuth, inMemoryPersistence, setPersistence} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCNruYCEOKVYi3KY1VLwVcmjf6-MMaKjQo",
  authDomain: "weather-app-4a90b.firebaseapp.com",
  projectId: "weather-app-4a90b",
  storageBucket: "weather-app-4a90b.appspot.com",
  messagingSenderId: "807561451557",
  appId: "1:807561451557:web:67eb8f8dd15529931947cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
(async () => {
  await setPersistence(auth, inMemoryPersistence);
})();
export const firestore = getFirestore(app);
