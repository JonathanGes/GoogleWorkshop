import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
      apiKey: "AIzaSyAGfKgOAAMkUtgeCJjRAJbL2SDpKQPJsok",
      authDomain: "events-planner-workshop.firebaseapp.com",
      databaseURL: "https://events-planner-workshop.firebaseio.com",
      projectId: "events-planner-workshop",
      storageBucket: "events-planner-workshop.appspot.com",
      messagingSenderId: "99458369236",
      appId: "1:99458369236:web:0eff2c72cdd47d02"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
  this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () =>
  this.auth.signInWithPopup(this.googleProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;