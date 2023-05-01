import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'task';
  is_Online: boolean | undefined;

  isOnline(): Observable<boolean> {
    return new Observable<boolean>(observer => {
      observer.next(navigator.onLine);
      console.log('navigator: ', navigator);
      window.addEventListener('online', () => observer.next(true));
      window.addEventListener('offline', () => observer.next(false));
    });
  }
  ngOnInit(): void {
    this.isOnline().subscribe(isOnline => {
      console.log('isOnline: ', isOnline);
      this.is_Online = isOnline;
    });
  }
}
