import { Component,OnInit } from '@angular/core';
import { StorageService, Memo } from '../storage.service';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
//import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  memos: Memo[] = [];
  memosreverse: Memo[] =[];

  constructor(private storageservice:StorageService,public navCtrl:NavController,private router: Router, private plt:Platform,
                ) {}

  ngOnInit(){
    
    
  }

  ionViewWillEnter(){
    console.log(" inside will enterrrrrrrrrrrrrrrrrr");
    this.plt.ready().then(()=>{
      
      this.storageservice.getDatabaseState().subscribe(rdy=>{
        if(rdy){
        this.storageservice.loadMemos().subscribe(data=>{
          this.memos=data;
          
          console.log("lengthhhhhhhhhhhhhhh: "+this.memos.length);
        });
        }
      });
  });
   
  }

  leave(){
    
    this.router.navigate(['/add']);
  }

  
  
  
}
