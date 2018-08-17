import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { subDays, addDays } from 'date-fns';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  
  view: string = 'month';

  viewDate: Date = new Date('2016-01-05');

  events: CalendarEvent[] = [
    {
      start: new Date('2016-01-08'),
      end: new Date('2016-01-10'),
      title: 'One day excluded event',
      color: this.colors.red
    },
    {
      start: new Date('2016-01-01'),
      end: new Date('2016-01-09'),
      title: 'Multiple weeks event'
    }
  ];

  // exclude weekends
  excludeDays: number[] = [0, 6];

  skipWeekends(direction: 'back' | 'forward'): void {
    if (this.view === 'day') {
      if (direction === 'back') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = subDays(this.viewDate, 1);
        }
      } else if (direction === 'forward') {
        while (this.excludeDays.indexOf(this.viewDate.getDay()) > -1) {
          this.viewDate = addDays(this.viewDate, 1);
        }
      }
    }
  }
}
