import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfiguratorComponent } from './pages/configurator/configurator.component';
import { ComparisonComponent } from './pages/comparison/comparison.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { authGuard, publicGuard } from './shared/guards/auth/auth.guard';


export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'configurator', component: ConfiguratorComponent, canActivate: [authGuard] },
  { path: 'comparison', component: ComparisonComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }  
];
