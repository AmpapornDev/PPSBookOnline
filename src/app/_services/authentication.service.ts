import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private storage: Storage
    ) { 
      this.initStorage();
    }

    // Initialize Ionic Angular storage
    async initStorage() {
      await this.storage.create();
    }
    /** เซ็ตค่าเข้าไปใน storage **/
    public setValue(key:any , value:any) {
      this.storage?.set(key,value);
    }

    public getValue(key:any){
      this.storage.get(key)
    }

    /**
     * Remove an item from storage
     */
    removeName() {
      this.storage.remove('userName');
    }
    /**
   * Clear everything from storage
   */
  clearAll() {
    this.storage.clear();
  }

}
