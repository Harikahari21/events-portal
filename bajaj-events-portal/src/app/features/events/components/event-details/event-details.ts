import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { EventsApi } from '../../services/events-api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnInit, OnDestroy {
  private _eventApiServiceSubscription: Subscription;
  private _eventsApi = inject(EventsApi);

  private _activatedRoute = inject(ActivatedRoute);

  protected title: string = 'Details Of - ';
  // @Input() public eventId: number;
  protected event: Event;
  // @Input() public subTitle: string;
  // @Output() sendConfirmationMessage: EventEmitter<string> = new EventEmitter<string>();

  // protected onEventProcessed(): void {
  //   //this will fire an evenht to send data to parent component
  //   this.sendConfirmationMessage.emit(
  //     `Event${this.event.eventName}" Event has been processed ND stored in Oracle DB`
  //   );
  // }

  ngOnInit(): void {
    let eventId = this._activatedRoute.snapshot.params['id'];

    this._activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
    this._eventApiServiceSubscription = this._eventsApi.getEventDetails(eventId).subscribe({
      next: (data) => {
        console.log(data);
        this.event = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    if (this._eventApiServiceSubscription) {
      this._eventApiServiceSubscription.unsubscribe();
    }
  }
}
