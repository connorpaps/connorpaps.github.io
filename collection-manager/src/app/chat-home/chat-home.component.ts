import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from '../Message';
import { Replies } from '../Replies';
import { ConversationService } from '../conversation.service';
import { UserService } from '../user.service';
import { UserDetails } from '../UserDetails';

@Component({
  selector: 'app-chat-home',
  templateUrl: './chat-home.component.html',
  styleUrls: ['./chat-home.component.css']
})
export class ChatHomeComponent implements OnInit {

  filteredString: string = '';
  conversations: Array<Message> = [];
  replies: Array<Replies> = [];
  public warning: string;

  // subscriptions
  private messageSub: any;
  private sendSub: any;
  private repliesSub: any;  
  private userSub: any ;
  
  author: any;
  author_id: any;
  current_conversation_id: any;
  reply_body: any;
  other_participant_id: any;
  userId: any;
  userName: any;

  // Search Users
  public users:Array<UserDetails> = []; // currently showing
  public gridColumns = 3; 
  public query = "";   

  constructor(private routing: Router, private route: ActivatedRoute, private conversationService: ConversationService, private userService:UserService) { }

  ngOnInit(): void {
    this.messageSub = this.conversationService.getConversationList().subscribe(
      (response) => {
        this.conversations = response;
        this.author = this.conversations[0].username;
        this.author_id = this.conversations[0].other_participant_id;
        this.current_conversation_id = this.conversations[0]._id;
        this.other_participant_id = this.conversations[0].other_participant_id;
        this.loadMessages(this.conversations[0]._id, this.author, this.other_participant_id);      
      },
      (error) => {
        this.warning = error.error;
        console.log(error);
      }
    );

    this.userSub = this.userService.getMyDetails().subscribe(
      (response) => {
        this.userId = response._id; 
        this.userName = response.username;
      }, 
      (error) => {
        this.warning = error.error;
        console.log(error);
      }
    );
  }

  sendMessage(): void {
    this.sendSub = this.conversationService.addToConversation(this.current_conversation_id, this.reply_body).subscribe(
      (response) => {
        this.reply_body = ""; 
        this.loadMessages(this.current_conversation_id, this.author, this.other_participant_id);
      },
      (error) => {
        this.warning = error.error;
      }
    );
  }

  //update the shown users using the search query
  search(): void { 
    this.userSub = this.userService.findUser(this.query).subscribe(
        (response) => {
          this.users = response;           
        },
        (error) => {
          this.warning = error.error;           
        }
    );
  }

  createConversation(id): void {
    var flag: boolean = false;

    // Checking for duplicates and conversations with self
    for (var conversation of this.conversations)
    {
      if (conversation.other_participant_id == id || this.userId == id) {
        flag = true;
      }   
    }
    if (flag == false) {
      this.sendSub = this.conversationService.createConversation(id).subscribe(
        (response) => {
          window.location.reload();
          this.userName = this.sendSub.username;
        },
        (error) => {
          this.warning = error.error;
        }
      ); 
      console.log("userId",this.userId);
      console.log("userName",this.sendSub.userName);
      console.log("Id", id);
      this.loadMessages(this.userId, this.userName, id);
    }    
  }    

  loadMessages(id, username, other_participant): void {
    console.log("userId", id);
    console.log("userName", username);
    console.log("Other Id", other_participant);
    this.current_conversation_id = id;
    this.other_participant_id = other_participant;
    this.author = username;
    this.repliesSub = this.conversationService.getMessagesWithUser(this.other_participant_id).subscribe(
      (response) => {
        this.replies = response.messages; 
       },
      (error) => {
        this.warning = error.error;
      }
    ); 
  }

  onDelete(id): void {
    this.messageSub = this.conversationService.deleteConversation(id).subscribe(
      (response) => {
          console.log(response);
          console.log("successfully deleted conversation");
          window.location.reload(); // reload the page
      },
      (error) => {
          console.log("failed deleting conversation");
          this.warning = error.error;
      }
  );
  }

  //unsubscribe upon being destroyed
  ngOnDestroy() {
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.sendSub) this.sendSub.unsubscribe();
    if (this.repliesSub) this.repliesSub.unsubscribe();
  }
}
