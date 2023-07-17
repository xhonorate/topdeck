import { initializeApp } from 'firebase/app'
import { initializeAuth, browserLocalPersistence } from 'firebase/auth'

const firebaseConfig = {
  // config copied from Firebase console when creating a web app
}

const app = initializeApp(firebaseConfig)

initializeAuth(app, {
  persistence: browserLocalPersistence,
})
