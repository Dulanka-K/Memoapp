import { Component, OnInit } from '@angular/core';
import { StorageService, Memo } from '../storage.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  memos: Memo[] = [];
  newMemo: Memo = <Memo>{};

  constructor(private storageservice:StorageService,
              private router: Router,
              public navCtrl:NavController
              ) { }

  ngOnInit() {
  }

  addMemo(){
    let title = this.newMemo.title;
    let content = this.newMemo.content;
    console.log(title);
    console.log(content);

    this.storageservice.addMemo(Date.now(),title,content,Date.now());
      this.newMemo.title="";
      this.newMemo.content="";
    
      
    this.router.navigate(['/home']);
  }
}
