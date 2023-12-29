import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';

interface Post {
  userId: number;
  image: string;
  id: number;
  title: string;
  price: string;
  description: string;
  body: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  title = 'angularCart';
  posts: Post[] = [];
  errorMessage!: string;

  constructor(private data_service: DataService, private cartService: CartService) {}

  ngOnInit() {
    this.data_service.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.posts.forEach((a:any)=> {
          Object.assign(a, {quantity:1, total:a.price});
        })
        console.log(this.posts);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
  addToCart(item : any){
    this.cartService.addToCart(item)
    console.log("hi")
  }
}
