import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.init';


const auth = getAuth(app);
export const AuthContext = createContext();

const UserContext = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)

    // 1. Create User
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // 2. Update Name 
    const updateName = (name) => {
        setLoading(true)
        return updateProfile(auth.currentUser, { displayName: name });
    }

    // 3. Email Verify
    const verityEmail = () => {
        setLoading(true)
        return sendEmailVerification(auth.currentUser)
    }

    // 4. Google SignIn
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    // 5. LogOut
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // 6. LogIn with password
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // 7. Forget password
    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }


    const authInfo = {
        user,
        createUser,
        updateName,
        verityEmail,
        signInWithGoogle,
        logOut,
        signIn,
        resetPassword,
        loading,

    }

    useEffect(() => {
        // eta run hobe jokhon component mount hobe
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            // eta run hobe jokhon component unmount hobe
            unSubscribe();
        }

    }, [])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;