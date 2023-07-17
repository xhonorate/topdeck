import 'setimmediate'
import NextApp from 'next/app'
import React from 'react'
import { FirebaseAppProvider } from 'reactfire'

const firebaseConfig = {
  apiKey: 'AIzaSyBBE4oezMDApdWi9Go1nWDIiBlNIuTOeT8',
  authDomain: 'topdeck-firebase.firebaseapp.com',
  databaseURL: 'https://topdeck-firebase-default-rtdb.firebaseio.com',
  projectId: 'topdeck-firebase',
  storageBucket: 'topdeck-firebase.appspot.com',
  messagingSenderId: '23104403186',
  appId: '1:23104403186:web:678635c74352122cf4026b',
}

export default function App(props: any): JSX.Element {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <NextApp {...props} />
    </FirebaseAppProvider>
  )
}
