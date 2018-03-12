import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  submitted : boolean = false;

  // Variables for encyription
  message: string;
  e : number;
  n : number;
  d : number;
  ciphertext_int : string = '';
  ciphertext_hex : string = '';

  // Variables for decyription
  ciphertext_hex_decyript : string = '';
  plaintext_int;
  plaintext: string = '';


  onSubmit = (form) => {
    console.log(form);
    
    this.submitted = true;

    this.e = form.e;
    this.d = form.d;
    this.n = form.p * form.q;
  
  }
  

  /**
   *  Function to encyript a given plaintext to its ciphertext
   */
  encyript = async (form) => {

    this.message = form.message;
    
    let resultInt = await this.calculate_ency(this.message);
    let resultHex = await this.DecToHex(resultInt);

    this.ciphertext_int = resultInt.toString();
    this.ciphertext_hex = resultHex.toString().split(',').join('');

  }


  /**
   *  Function to decyript a given ciphertext to its plain text
   */
  decyript = async (form) => {
  
    this.ciphertext_hex_decyript = form.ciphertext;
    
    let resultInt = await this.HexToDec(this.ciphertext_hex_decyript);
    let resultPlainText = await this.calculate_decy(resultInt);

    this.plaintext_int = resultInt.toString();
    this.plaintext = resultPlainText.toString().split(',').join('');
  
    }
  

  

  HexToDec = (ciphertext : string) => {
    return new Promise(resolve => {
      let array = [];

    for(let i=0; i<ciphertext.length; i=i+4){
      let substr = ciphertext.substr(i,4);
      let parsed = parseInt(substr,16);
      array.push(parsed);
    }

    resolve(array);
    });
  }




  calculate_decy = (ciphertextInDecArray) => {
    return new Promise(resolve => {
     

      let d = this.d;
      let n = this.n;
      let arr = [];  


      for(let x = 0; x < ciphertextInDecArray.length; x++){
        let member = ciphertextInDecArray[x];
      
        let c = 1 ;
        for (let i=0; i < d; i++){
          c = c * member % n;
        }
        c = c % n; 

        let plain = String.fromCharCode(c);

        arr.push(plain);

      }

      resolve(arr);

    });
    
  }


  /**
   *  Function to calculate ciphertext in Hex
   */
  
  DecToHex = (arr) => {

    return new Promise( resolve => {

      let result = [];
      for(let i=0; i < arr.length; i++){
        let member = arr[i];
        result.push((member+0x10000).toString(16).substr(-4).toUpperCase());
      }

      resolve(result);

    });
    
  }



  /**
   * Function to calculate ciphertext in decimal
   */
  calculate_ency = (message : string)  => {

    return new Promise(resolve => {
     

      let e = this.e;
      let n = this.n;
      let arr = [];  


      for(let x = 0; x < message.length; x++){
        let ch = message.charAt(x);
        let code = ch.charCodeAt(0);
        let c = 1 ;

        for (let i=0; i < e; i++){
          c = c * code % n;
        }
        c = c % n; 

        arr.push(c);

      }

      resolve(arr);

    });

  }

}
