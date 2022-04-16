import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Template } from '../Template';
import { TemplateService } from '../template.service';
import { Book } from '../Book';
import { Comic } from '../Comic';
import { Storage } from '../Storage';


@Component({
  selector: 'app-add-template-dialog',
  templateUrl: './add-template-dialog.component.html',
  styleUrls: ['./add-template-dialog.component.css']
})
export class AddTemplateDialogComponent implements OnInit {

  constructor(private templateService: TemplateService, private dialog: MatDialogRef<AddTemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.itemId = data.itemId
  }

  itemId: any;
  adding: any;
  selected: any;
  warning: any;
  char: String;
  chars = new Array();

  // subscriptions
  bookSub: any;
  articleSub: any;

  // classes
  book: Book;
  comic: Comic;

  ngOnInit(): void {
    this.book = new Book;
    this.comic = new Comic;
  }

  close(): void {
    this.dialog.close();
  }

  addChar(): void {
    this.chars.push(this.char);

  }

  getChars(): String {
    let charString: String = "";
    this.chars.forEach((element) => {
      charString += " " + element
    }); 
    return charString;
  }

  submitBookTemplate(): void {
    this.book.template_type = "book";
    this.bookSub = this.templateService.addBookTemplate(this.itemId, this.book).subscribe(
      response => {

      }, error => {
          this.warning = error.error;
      }
    );
    this.dialog.close();
  }

  submitComicTemplate(): void {
    this.comic.template_type = "comicBook";
    this.chars.forEach((element) => {
      this.chars.push(element);
    });
    this.articleSub = this.templateService.addComicTemplate(this.itemId, this.comic).subscribe(
      response => {

      }, error => {
          this.warning = error.error;
      }
    );
    this.dialog.close();
  }

}
