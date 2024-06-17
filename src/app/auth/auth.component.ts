import {Component, ComponentFactory, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {Observable, Subscription} from 'rxjs';

import { AuthService, AuthResponseData } from './auth.service';
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceHolderDirective} from "../shared/placeholder/placeholder.directive";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceHolderDirective, {static:false}) alertHost: PlaceHolderDirective;

  private closeSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private componentFactoryresolver: ComponentFactoryResolver,
              private dataStorageService: DataStorageService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);

    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
        this.dataStorageService.fetchRecipes().subscribe();
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  private showErrorAlert(message: string){
    // const alertCmp = new AlertComponent();
    const alertCmpFactory:ComponentFactory<AlertComponent>= this.componentFactoryresolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSubscription = componentRef.instance.close.subscribe(()=>{
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

}
