import { initializeApp } from "firebase/app";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: process.env.REACT_APP_AUTH_DOMAIN,

  projectId: process.env.REACT_APP_PROJECT_ID,

  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,

  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,

  appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GithubAuthProvider();

provider.addScope("repo");

export const signInWithGitHub = (callback) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      callback({ data: token });
    })
    .catch((error) => {
      console.log(error);
    });
};
