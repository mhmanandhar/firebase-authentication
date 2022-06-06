import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, query, where } from "firebase/firestore";
import {
  AngularFirestore,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {SignupModel} from "../../authentication/models/signup-model";
import {sign} from "crypto";
import {getDocs, getFirestore} from "@angular/fire/firestore";
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
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['signup']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password
  SignUp(signupModel: SignupModel) {
    return this.afAuth
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
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        // this.SendVerificationMail();
        console.log('------returned user--------', result.user);
        this.SetUserData(result.user);
        this.router.navigate(['login'])
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  SetUserData(user: any) {
    const db = getFirestore()
    const userCollectionRef = collection(db, "usersCollection");

    // Create a query against the collection.
    const q = query(userCollectionRef, where("uid", "==", user.uid));
    getDocs(q).then(result => {
      result.forEach(doc => {
        console.log('------user data------', JSON.stringify(doc.data()));
      })
    });

    // same query using angular firestore
    // this.afs.collection(
    //   "usersCollection",
    // ref=> ref.where('uid', '==', user.uid)).get().subscribe(data => {
    //   debugger;
    //   console.log(data)
    // })
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
