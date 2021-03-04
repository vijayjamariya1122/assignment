import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'assignment';
  showfirstform = true;
  showsecondform = false;
  freetrialform: FormGroup;
  userdata: any;
  budget = [{
    id: 1,
    name: 1000
  },
  {
    id: 2,
    name: 2000
  },
  {
    id: 3,
    name: 3000
  },]
  cities = [{
    id: 1,
    name: "Mumbai"
  },
  {
    id: 1,
    name: "Pune"
  },
  {
    id: 1,
    name: "Kolkata"
  },]



  constructor(private http: HttpClient)
  {
    this.getUser();
  }

  ngOnInit()
  {
    this.freetrialform = new FormGroup({
      'radiobutton': new FormControl('no', Validators.required),
      'selectbudget': new FormControl(null, Validators.required),
      'firstname': new FormControl(null, Validators.required),
      'lastname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'city': new FormControl(null, Validators.required),
      'phoneno': new FormControl(null, Validators.required),
      'enterbudget': new FormControl(null, Validators.required)
    });
    
  }

  onSubmit()
  {
    this.http.post('https://assignment-a0e0c-default-rtdb.firebaseio.com/user.json',this.freetrialform.value)
    .subscribe(data => {
      console.log(data);
    })
    this.freetrialform.reset();
  }

  getUser()
  {
    this.http.get('https://assignment-a0e0c-default-rtdb.firebaseio.com/user.json')
    .pipe(map(responsedata => {
      const users = [];
      for(const key in responsedata)
      {
        if(responsedata.hasOwnProperty(key))
        {
        users.push({ ...responsedata[key], id:key});
        }
      }
      return users;
    }))
    .subscribe(data => {
     this.userdata = data[0];
     console.log(this.userdata);
    })
  }


  gotoSecondForm()
  {
    this.showfirstform = false;
    this.showsecondform = true;
  }


}
