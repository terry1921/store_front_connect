
"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import {
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth, rtdb } from "@/lib/firebase";
import { ref, set, get } from "firebase/database";

export interface AppUser extends FirebaseUser {
  rol?: string;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (data: { email: string; password: string }) => Promise<void>;
  signUpWithEmail: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        const userRef = ref(rtdb, `users/${firebaseUser.uid}`);
        get(userRef).then((snapshot) => {
          if (snapshot.exists()) {
            const dbUser = snapshot.val();
            setUser({ ...firebaseUser, rol: dbUser.rol });
          } else {
            setUser(firebaseUser);
          }
          setLoading(false);
        });
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const saveUserToDb = async (userToSave: FirebaseUser, name?: string) => {
    const userRef = ref(rtdb, `users/${userToSave.uid}`);
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      const now = new Date().toISOString();
      await set(userRef, {
        name: name || userToSave.displayName || "Anonymous",
        email: userToSave.email,
        rol: "user",
        createdAt: now,
        updatedAt: now,
      });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToDb(result.user);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signInWithEmail = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        await signOut(auth);
        throw new Error("unverified-email");
      }
    } catch (error) {
      console.error("Error signing in with email", error);
      throw error;
    }
  };

  const signUpWithEmail = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await saveUserToDb(userCredential.user, name);
      await sendEmailVerification(userCredential.user);
    } catch (error) {
      console.error("Error signing up with email", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser) {
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (error) {
        console.error("Error resending verification email", error);
        throw error;
      }
    } else {
      throw new Error("No user is currently signed in.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        resendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
