import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { NewArticle } from '../newArticle';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
})
export class CreateArticleComponent implements OnInit {
  public articleModel: NewArticle = {
    article_title: '',
    article_url: '',
    article_summary: '',
    article_category: '',
    article_posted_date: new Date(),
  };

  public warning: string;
  public loading: boolean = false;
  public success: boolean = false;
  public response: string;
  private articleSub: any;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private routing: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.articleSub = this.articleService
      .createArticle(this.articleModel)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          this.warning = error.error;
        }
      );
    this.routing.navigate(['/articles']);
  }
}
