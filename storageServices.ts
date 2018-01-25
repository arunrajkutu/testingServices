import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class storageService {
    constructor(private storage: Storage) { };

    checkStorage(keys:any, value: any){
     return new Promise(resolve => {
       this.storage.ready().then((LocalForage) => {
         //console.log(LocalForage)
         this.storage.length().then((number) => {
           if(number > 0){
             this.storage.clear().then(() => {
               this.setStorage(keys, value);
               resolve();
             });
           }else{
             this.setStorage(keys , value);
             resolve();
           }
         });
       });
      });
    }

    setStorage(key:any, value:any){
        this.storage.set(key, value).then(()=>{ });
    }

  getStorage(key: any): Promise<any>{
    return new Promise((resolve) => {
      this.storage.get(key).then((val) => {
        return resolve(val);
      })
      .catch((ex) => {
          console.log(ex);
        });
    });
  }
}
