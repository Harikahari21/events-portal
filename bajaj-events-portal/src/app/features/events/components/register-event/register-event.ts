import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventRegistration } from '../../models/event-registration';
import { Subscription } from 'rxjs';
import { EventsApi } from '../../services/events-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-event',
  imports: [ReactiveFormsModule],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css',
})
export class RegisterEvent {
  protected title: string = 'Register New Bajaj Event';
  protected register: EventRegistration = new EventRegistration();

  private _eventsApi = inject(EventsApi);
  private _router = inject(Router);
  private _eventsApiSubscription: Subscription;

  protected onEventSubmit(): void {
    this._eventsApiSubscription = this._eventsApi
      .scheduleNewEvent(this.register.eventForm.value)
      .subscribe({
        next: (data) => {
          if (data.acknowledged === true) {
            this._router.navigate(['/events']);
          }
        },
      });
  }
  ngOnDestroy(): void {
    if (this._eventsApiSubscription) {
      this._eventsApiSubscription.unsubscribe();
    }
  }
}
