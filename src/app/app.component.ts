import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion:string = 'pet';
  answer:string = '';
  genders:string[] = ['male', 'female'];
  user:{username:string, email:string, secretQuestion:string, answer:string, gender:string}   = {
    username:'',
    email:'',
    secretQuestion:'',
    answer:'',
    gender:''
  };
  submitted:boolean = false;

  suggestUserName():void {
    const suggestedName:string = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
      }
    });
  }

  // onSubmit(form: NgForm):void {
  //   console.log(form);
  // }
  onSubmit():void{
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.username;
    this.user.secretQuestion = this.signupForm.form.value.secret;
    this.user.answer = this.signupForm.form.value.questionAnswer;
    this.user.gender = this.signupForm.form.value.gender;

    this.signupForm.reset();

  }
}
