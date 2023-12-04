import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './component/cart/cart.component';
import { ProductComponent } from './component/product/product.component';

export const routes: Routes = [
 {path:'', redirectTo:'products', pathMatch:'full'},
 {path: 'products', component: ProductComponent  },
 {path: 'cart', component: CartComponent}
];
