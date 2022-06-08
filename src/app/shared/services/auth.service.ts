import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { collection, query, where } from "firebase/firestore";
import {AngularFirestore, AngularFirestoreDocument, DocumentData, QuerySnapshot} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {SignupModel, UserModel} from "../../authentication/models";
import {getDocs, getFirestore} from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
  ) {}

  // Sign in with email/password
  async SignIn(username: string, password: string) {
    let valid = false;
    let existing_email = await this.getEmailByUsername(username)
    if (existing_email) {
      username = existing_email
    }
    await this.afAuth
      .signInWithEmailAndPassword(username, password)
      .then((result) => {
        if (result.user?.uid) {
          const userid = result.user.uid
          const userRef = this.getUserRefById(userid)
          userRef.get().subscribe(value => {
            let userData = value.data()
            this.setInLocalStorage("user", {uid: userid, ...userData})
            this.navigateUserByRole(userData.role)
          })
        }
        valid = true;
      })
      .catch((error) => {
        console.error(error.message);
      });
    return valid;
  }

  // Sign up with email/password
  async SignUp(signupModel: SignupModel)  {
     await this.afAuth
      .createUserWithEmailAndPassword(signupModel.email, signupModel.password)
      .then((result) => {
        let customUserData: UserModel = {
          first_name: signupModel.first_name,
          last_name: signupModel.last_name,
          username: signupModel.username,
          email: signupModel.email,
          phone: signupModel.phone,
          role: signupModel.role,
        }
        if (result.user?.uid) {
          const userid = result.user.uid
          const userRef = this.getUserRefById(userid)
          userRef.set(customUserData, {
            merge: true,
          }).then(() => {
            this.setInLocalStorage("user", {
              uid: userid, ...customUserData
            })
            this.navigateUserByRole(customUserData.role)
          });
        }
      })
  }

  getUserRefById(id: string): AngularFirestoreDocument<any> {
    return this.afs.doc(
      `users/${id}`
    );
  }

  setInLocalStorage(key: string, item: object) {
    localStorage.setItem("user", JSON.stringify(item))
  }

  navigateUserByRole(role: string) {
    if (role === 'admin') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['user']);
    }
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

  // get query using angular firestore collection
  // this.afs.collection("users",
  //     ref=> ref.where('uid', '==', user.uid)).get().subscribe(data => {
  //   console.log(data)
  // })

  async getUserByUsername(username: string): Promise<any> {
    const db = getFirestore()
    const usersRef = collection(db, "users");

    const q = query(usersRef, where("username", "==", username));
    return await getDocs(q).then(data =>  {
      return data
    });
  }

  // check if username is available or not
  async getEmailByUsername(username: string) {
    const userData = await this.getUserByUsername(username)
    let email = ''
    if (userData.docs.length > 0) {
      email = userData.docs[0].data()['email']
    }
    return email;
  }

  // check if username is available or not
  async isUsernameValid(username: string) {
    const userData = await this.getUserByUsername(username)
    let valid = true
    if (userData.docs.length > 0) {
      valid = false
    }
    return valid;
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
