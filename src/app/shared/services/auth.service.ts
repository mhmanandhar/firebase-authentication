import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, query, where } from "firebase/firestore";
import {
  AngularFirestore, DocumentData,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {SignupModel} from "../../authentication/models/signup-model";
import {getDocs, getFirestore} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import QuerySnapshot = firebase.firestore.QuerySnapshot;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    // TODO: Review later
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    let valid = false;
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        valid = true;
      })
      .catch((error) => {
        console.error(error.message);
      });
    return valid;
  }

  // Sign up with email/password
  SignUp(signupModel: SignupModel)  {
     this.afAuth
      .createUserWithEmailAndPassword(signupModel.email, signupModel.password)
      .then((result) => {
        this.afs.collection("usersCollection")
          .add({
            uid: result?.user?.uid,
            first_name: signupModel.first_name,
            last_name: signupModel.last_name,
            email: signupModel.email,
            phone: signupModel.phone,
            role: signupModel.role,
          })
        console.log('------returned user--------', result.user);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get isAdmin():boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.role === "admin";
  }

  SetUserData(user: any) {
    const db = getFirestore()
    const userCollectionRef = collection(db, "usersCollection");

    // Create a query against the collection.
    const q = query(userCollectionRef, where("uid", "==", user.uid));
    getDocs(q).then(result =>  {
      result.forEach(doc => {
        console.log('------user data------', JSON.stringify(doc.data()));
        const userData: SignupModel = doc.data() as SignupModel;
        let userFromStorage = JSON.parse(localStorage.getItem('user')!)
        let updatedUser = { ...userFromStorage, ...userData }
        localStorage.setItem("user", JSON.stringify(updatedUser));
          if (userData.role === 'admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
      })
    });

    // same query using angular firestore
    // this.afs.collection(
    //   "usersCollection",
    // ref=> ref.where('uid', '==', user.uid)).get().subscribe(data => {
    //   console.log(data)
    // })
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
