import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "test-6e645", appId: "1:1028215165657:web:6ce5835f9466787c75a4c8", storageBucket: "test-6e645.firebasestorage.app", apiKey: "AIzaSyCIOQahY99KaRHaZnN059T9PY8GUOj-aOA", authDomain: "test-6e645.firebaseapp.com", messagingSenderId: "1028215165657" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
