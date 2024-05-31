import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
  intercept(request: HttpRequest<any>, next: HttpHandler){
    console.log('Request is on its way');
    console.log(request.url);
    const modifiedRequest = request.clone({headers:request.headers.append('Auth', 'xyz')});
    return next.handle(modifiedRequest).pipe(tap(event => {
      console.log(event);
      if (event.type === HttpEventType.Response){
        console.log('Responsive arrived, body data: ');
        console.log(event.body);
      }
    }));
  }


}
