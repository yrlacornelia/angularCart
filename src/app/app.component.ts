import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { HeaderComponent } from './component/header/header.component';
import { NgModule } from '@angular/core';
import { DataService } from './service/data.service';
import { ProductComponent } from './component/product/product.component';

interface Post {
  userId: number;
  image: string;
  id: number;
  title: string;
  body: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ CommonModule, RouterOutlet, HeaderComponent, CartComponent, ProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularCart';
  posts: Post[] = [];
  errorMessage!: string;

  constructor(private data_service: DataService) {}

  ngOnInit() {
    this.data_service.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log(this.posts);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}
