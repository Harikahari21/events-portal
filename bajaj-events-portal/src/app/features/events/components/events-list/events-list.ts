import { Component, inject, OnInit } from '@angular/core';
import { Event } from '../../models/event';
// import { EventDetails } from '../event-details/event-details';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DateGlobalizationPipe } from '../../../../shared/pipes/date-globalization-pipe';
import { LowercaseTruncPipe } from '../../../../shared/pipes/lowercase-trunc-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { EventsApi } from '../../services/events-api';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.html',
  styleUrl: './events-list.css',
  imports: [
    CommonModule,
    /* EventDetails, */
    DateGlobalizationPipe,
    LowercaseTruncPipe,
    FormsModule,
    NgxPaginationModule,
    RouterLink,
  ],
})
export class EventsList implements OnInit {
  private eventsApi = inject(EventsApi);

  private _eventServiceSubscription: Subscription;

  protected role: string | null;

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    console.log(this.role);
    if (this.role === 'Employee') {
      this.columns = this.columns.filter((col) => col !== 'Cancel Event');
    }

    this._eventServiceSubscription = this.eventsApi.getAllEvents().subscribe({
      next: (eventsData) => {
        console.log(eventsData);
        this.events = eventsData;
        this.filteredEvents = [...this.events];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    if (this._eventServiceSubscription) {
      this._eventServiceSubscription.unsubscribe();
    }
  }
  protected title: string = 'Welcome to Bajaj Finserv Events List';

  protected subtitle: string = 'Published by Bajaj Finserv Hr Department !';

  protected columns: string[] = [
    'Event Code',
    'Event Name',
    'Start Date',
    'Fees',
    'Show Details',
    'Cancel Event',
  ];

  protected events: Event[] = [];

  protected filteredEvents: Event[];

  protected searchChars: string = '';

  // protected selectedEvent: Event;

  // protected selectedEventId: number;

  protected childSubTitle: string = 'Details of selected event !';

  protected childMessage: string;

  protected pageNumber: number = 1;

  protected pageSize: number = 2;

  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }

  // protected onEventSelection(id: number): void {
  //   this.selectedEventId = id;
  // }

  // protected searchEvents(): void {
  //   if (!this.searchChars || this.searchChars == '') {
  //     console.log(this.searchChars);
  //     this.filteredEvents = [...this.events];
  //   } else {
  //     this.filteredEvents = this.events.filter((event) =>
  //       event.eventName.toLocaleLowerCase().includes(this.searchChars.toLocaleLowerCase())
  //     );
  //     console.log(this.filteredEvents);
  //   }

  // }
  protected isSearching: boolean = false; // Track if a search is active
  protected previousPageNumber: number = 1; // Store page before search

  protected searchEvents(): void {
    const searchText = this.searchChars?.trim().toLowerCase();

    if (searchText) {
      if (!this.isSearching) {
        this.previousPageNumber = this.pageNumber;
        this.isSearching = true;
      }

      this.pageNumber = 1;

      this.filteredEvents = this.events.filter((event) =>
        event.eventName.toLowerCase().includes(searchText)
      );
    } else {
      this.filteredEvents = this.events;
      this.pageNumber = this.previousPageNumber;
      this.isSearching = false;
    }
  }

  protected sortColumn: string = '';
  protected sortDirection: 'asc' | 'desc' = 'asc';

  protected sortEvents(column: string): void {
    // If clicking the same column, toggle the direction
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Apply sorting
    this.filteredEvents.sort((a: any, b: any) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return this.sortDirection === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        return this.sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      } else if (valueA instanceof Date && valueB instanceof Date) {
        return this.sortDirection === 'asc'
          ? valueA.getTime() - valueB.getTime()
          : valueB.getTime() - valueA.getTime();
      } else {
        return 0;
      }
    });
  }
}
