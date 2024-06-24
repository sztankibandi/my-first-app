import {Component, computed, DestroyRef, effect, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {interval, map, Observable, Subject} from "rxjs";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  private destroyRef = new Subject<number>();
  clickCount = signal(0);
  clickCount$: Observable<number> = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);


  constructor() {effect(() => {
    // console.log(`Clicked button ${this.clickCount()} times.`);

  })

  }

  ngOnInit() {
    // setInterval(() =>{
    //   this.interval.update(prevIntervalNumber => prevIntervalNumber + 1);
    // },1000)
    // const subscription = interval(1000).pipe(
    //   map((val:number) => val * 2)
    // ).subscribe((val)=>{
    //   console.log(val);
    // });
    this.clickCount$.subscribe((val) =>
      console.log(val),
    )

  }

  onClick(){
  this.clickCount.update(prevCount => prevCount + 1);
  }

  ngOnDestroy() {
    this.destroyRef.unsubscribe();
  }



}
