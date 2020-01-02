import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Storage } from "@ionic/storage";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap, map, delay } from 'rxjs/operators';


export interface Memo{
  id:number,
  title:string,
  content:string,
  date:Date
}

export class StorageService {

  memos: Memo[] = [];
  mems = new BehaviorSubject([]);
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private sqlite: SQLite, private plt:Platform) {
    
    console.log("In storage constructorrrrrrrrrrrrr");
    this.plt.ready().then(()=>{
      this.sqlite.create({
        name: "memo.db",
        location: "default",
      })
      .then((db: SQLiteObject) => {
        this.database = db;
  
        db.executeSql('CREATE TABLE IF NOT EXISTS memo(id, title, content, date)', [])
          .then(() => console.log('Successfully created memo table.'))
            .catch(e => console.log(e));
            //this.loadMemos();
            
            this.dbReady.next(true);
            
        }).catch(e => console.log(e));
    });
  }

  addMemo(id,title,content,date){
    let data = [id,title,content,date];
    this.database.executeSql('INSERT INTO memo(id, title, content, date) VALUES (?, ?, ?, ?)',data);
  }

  loadMemos(){
    this.database.executeSql('SELECT * FROM memo', []).then(data => {
      for (var i = 0; i < data.rows.length; i++) {
        this.memos.push({
          id:data.rows.item(i).id,
          title:data.rows.item(i).title,
          content:data.rows.item(i).content,
          date:data.rows.item(i).date
        });
      }
      this.mems.next(this.memos);
      //return this.memos;
  });
  return this.mems.asObservable();
}

getDatabaseState() {
  return this.dbReady.asObservable();
}

getMemos(){
  return this.mems.asObservable();
}

}

// this.database.transaction((tx) => {
//   tx.executeSql("SELECT * FROM memo", [], (tx, result) => {
//     for (let i = 0; i < result.rows.length; i++) {
//       console.log("Dataaaaaaaaaaaaaa:"+result.rows.item(i));

//     }
//   });
// });



// addItem(item:Item): Promise<any>{
//   return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
//     if(items){
//       items.push(item);
//       return this.storage.set(ITEMS_KEY,items);
//     }
//     else{
//       return this.storage.set(ITEMS_KEY,[item]);
//     }
//   });
// }

// getItems(): Promise<Item[]>{
//   return this.storage.get(ITEMS_KEY);
// }

// updateItem(item:Item): Promise<any>{
//   return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
//     if(!items || items.length === 0){
//       return null;
//     }

//     let newItems: Item[]=[];

//     for(let i of items){
//       if(i.id==item.id){
//         newItems.push(item);
//       }
//       else{
//         newItems.push(i);
//       }
//     }
//     return this.storage.set(ITEMS_KEY,newItems);
//   });
// }

// deleteItem(id:number): Promise<Item>{
//   return this.storage.get(ITEMS_KEY).then((items:Item[])=>{
//     if(!items || items.length === 0){
//       return null;
//     }

//     let toKeep: Item[]=[];

//     for(let i of items){
//       if(i.id!=id){
//         toKeep.push(i);
//       }
//     }
//     return this.storage.set(ITEMS_KEY,toKeep);
//   });
// }