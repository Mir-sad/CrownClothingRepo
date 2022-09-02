import {initializeApp} from 'firebase/app';
import {
     getAuth,
      signInWithRedirect,
     signInWithPopup,
      GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
      }
       from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'       

const firebaseConfig = {
    apiKey: "AIzaSyCyHfjEHIi7fCEzyAuDDChj_EbnXhPRxyI",
    authDomain: "crown-clothing-db-ff283.firebaseapp.com",
    projectId: "crown-clothing-db-ff283",
    storageBucket: "crown-clothing-db-ff283.appspot.com",
    messagingSenderId: "149254022631",
    appId: "1:149254022631:web:6dcf7acb13ded7032b8942"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  
export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth,
     additionalInformation ={}
     ) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);
    
    if(!userSnapshot.exists()){
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
           

        }catch(error){
            console.log('error creating the useer', error.message);
        }
    }

    return userDocRef;
}
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser =async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
 onAuthStateChanged(auth, callback)