import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public totalItem :number = 0
  public searchTerm : string = '';
  constructor(private cartService : CartService){}
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length; 
      
    })
  }
  search(event: KeyboardEvent): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
