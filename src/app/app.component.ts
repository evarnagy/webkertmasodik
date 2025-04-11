import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ConfiguratorComponent } from './pages/configurator/configurator.component';
import { ComparisonComponent } from './pages/comparison/comparison.component';
import { CartComponent } from './pages/cart/cart.component';
import { MenuComponent } from './shared/menu/menu.component';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'; 






@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeComponent,ConfiguratorComponent,ComparisonComponent,CartComponent,MenuComponent,NgIf,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'learnflow';

  page= "home";

  changePage(selectedPage: string)
  {
    this.page = selectedPage;
  }
}
