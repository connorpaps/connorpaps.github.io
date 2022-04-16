import { Component, OnInit } from '@angular/core';
import { Article } from '../Article';
import { ArticleService } from '../article.service';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-article-list',
    templateUrl: './article-list.component.html',
    styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
    public articles: Array<Article> = [];
    public categoryType = "All";//default all but can equal any of the categories
    public categories: Array<String> = ["All"];
    public articleCount = 0;
    public warning: string;
    public role = "";
    private articleSub: any = null;
    private roleSub: any = null;

    constructor(private articleService: ArticleService, private auth: AuthService) { }

    ngOnInit(): void {
        this.showArticles();
        //get the user's role so "add article" can only be seen by admin users
        this.roleSub = this.auth.isAdministrator().subscribe(
            (response) => {
                this.role = response;
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    showArticles(): void {
        //retrieve all articles
        this.articleSub = this.articleService.getListOfArticles().subscribe(
            (response) => {
                this.articles = response;
                this.saveUniqueCategories();
            },
            (error) => {
                this.warning = error.error;
            }
        );
    }

    //gets and saves all unique article categories
    saveUniqueCategories(): void {
        if (this.articles.length == 0){
            return;
        }
        //save all unique article categories
        for (let i = 0; i < this.articles.length; i++){
            let has: Boolean = false;
            for (let j = 0; j < this.categories.length; j++){
                if (this.articles[i].article_category.toLowerCase() == this.categories[j].toLowerCase()){
                    has = true;
                    break;
                }
            }
            if (!has){
                this.categories.push(this.articles[i].article_category);
            }
        }
        this.changeCategory("All");//default
    }

    //called when a category option is clicked
    changeCategory(category): void {
        this.categoryType = category;
        let options = document.getElementById("option-selector").children;
        //set the class names to reflect the selected option
        for (let i = 0; i < options.length; i++){
            options.item(i).className = `option ${(options.item(i).id == `option-${category}`) ? "option-selected" : ""}`;
        }
        //update this.articleCount
        if (this.categoryType == "All"){
            //size of array if all
            this.articleCount = this.articles.length;
        } else {
            //only count the selected category
            this.articleCount = 0;
            for (let i = 0; i < this.articles.length; i++){
                if (this.articles[i].article_category == this.categoryType){
                    this.articleCount++;
                }
            }
        }
    }

    //unsubscribe upon being destroyed
    ngOnDestroy() {
        if (this.articleSub) this.articleSub.unsubscribe();
        if (this.roleSub) this.roleSub.unsubscribe();
    }
}
