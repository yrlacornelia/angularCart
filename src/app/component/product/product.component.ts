import { Component } from '@angular/core';
import { DataService } from '../../service/data.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { CustomFilterPipe } from '../../shared/custom-filter.pipe';
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
  imports: [CommonModule, CustomFilterPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  title = 'angularCart';
  posts: Post[] = [];
  errorMessage!: string;
  public filterCategory : any
  searchKey:string ="";
  constructor(private data_service: DataService, private cartService: CartService) {}

  ngOnInit() {
    this.data_service.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.filterCategory = posts;
        this.posts.forEach((a:any)=> {
          if(a.category === "women's clothing"|| a.category === "men's clothing"){
            a.category = "fashion"
          }
          Object.assign(a, {quantity:1, total:a.price});
        })
        console.log(this.posts);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });

    this.cartService.search.subscribe((val:any) => {
      this.searchKey = val;
    })
  }
  addToCart(item : any){
    this.cartService.addToCart(item)
    console.log("hi")
  }
  truncateText(text: string, limit: number): string {
    const textArray = text.trim().split(' ');
    const truncated = textArray.slice(0, limit).join(' ');

    return truncated + (textArray.length > limit ? '...' : '');
  }
  filter(category:string){
    this.filterCategory = this.posts
    .filter((a:any) =>{
      if(a.category == category || category == '' )
      {
        return a;
      }
    })
  }
}
