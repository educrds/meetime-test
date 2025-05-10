import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CyclesStateService } from '../../services/cycles-state.service';
import { ApiService } from '../../services/api.service';
import { map, tap } from 'rxjs';
import { Structure } from '../../models/cycle.model';
import { Events } from '../../models/projection.model';
import Utils from '../../utils/utils';

@Component({
  selector: 'meet-events-chart',
  imports: [BaseChartDirective],
  templateUrl: './events-chart.component.html',
  styleUrl: './events-chart.component.scss',
})
export class EventsChartComponent implements OnInit {
  protected chartData!: ChartConfiguration<'bar'>['data'];
  protected eventsProjection: WritableSignal<Structure[]> = signal([]);
  
  private _cyclesStateService = inject(CyclesStateService);
  private _apiService = inject(ApiService);

  constructor() {
    effect(() => {
      const cycles = this._cyclesStateService.cyclesValue();
      const unifiedCyclesStructure: Structure[] = [...cycles, ...this.eventsProjection()]
      this._processData(unifiedCyclesStructure)
    });
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  /**
   * Loads projected events data from the API,
   * transforms the data structure, and stores it in the local state.
   * After loading, processes the data for chart display.
  */
  private loadChartData(): void {
    this._apiService
      .getEventsProjection()
      .pipe(
        map((data) =>
          data.map((item) => ({
            day: item.day,
            ...item.events,
          }))
        ),
        tap((eventsProjection) => {
          this.eventsProjection.set(eventsProjection);
          this._processData(eventsProjection);
        })
      ).subscribe();
  }

  /**
   * Processes the events data by grouping and summing values by day (Monday to Friday),
   * starting from the current day. Prepares labels and datasets
   * for chart rendering.
   *
   * @param eventsData Array of event objects, each representing one day.
  */
  private _processData(eventsData: Structure[]): void {
    const currentDay = Utils.getCurrentDay() 
    
    // Create ordered days array starting from today
    const daysOrder = [1, 2, 3, 4, 5];
    const startIndex = daysOrder.indexOf(currentDay);
    const orderedDays = [
      ...daysOrder.slice(startIndex),
      ...daysOrder.slice(0, startIndex),
    ];

    const eventsMap: Record<number, Events> = {
      1: { meetings: 0, emails: 0, calls: 0, follows: 0 },
      2: { meetings: 0, emails: 0, calls: 0, follows: 0 },
      3: { meetings: 0, emails: 0, calls: 0, follows: 0 },
      4: { meetings: 0, emails: 0, calls: 0, follows: 0 },
      5: { meetings: 0, emails: 0, calls: 0, follows: 0 }
    };

    // Sum values by event type for each weekday    
    eventsData.forEach(item => {
      eventsMap[item.day].meetings += item.meetings || 0;
      eventsMap[item.day].emails += item.emails || 0;
      eventsMap[item.day].calls += item.calls || 0;
      eventsMap[item.day].follows += item.follows || 0;
    });

    const labels = orderedDays.map((day, i) => i === 0 ? 'Hoje' : ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][day - 1]);

    this.chartData = {
      labels: labels,
      datasets: [
        this._createDataset('Encontros', orderedDays, eventsMap, 'meetings', '#2ca02c'),
        this._createDataset('Emails', orderedDays, eventsMap, 'emails', '#7f7f7f'),
        this._createDataset('Ligações', orderedDays, eventsMap, 'calls', '#49c3d1'),
        this._createDataset('Seguidores', orderedDays, eventsMap, 'follows', '#968cf0'),
      ],
    };
  }

  /**
   * Creates a dataset for the chart using a specific event type and color.
   *
   * @param label Display name for the dataset.
   * @param days Ordered list of weekdays (1-5).
   * @param data Map of aggregated event values by day.
   * @param key Event type to extract from the data.
   * @param color Color used to render the dataset in the chart.
   * @returns A formatted dataset object for chart display.
  */
  private _createDataset(label: string, days: number[], data: any, key: string, color: string) {
    return {
      label: label,
      data: days.map((day) => data[day]?.[key] || 0),
      backgroundColor: color,
    };
  }

  protected barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Quantidade de Eventos',
        },
        ticks: {
          stepSize: 50,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 13,
          boxHeight: 13,
        },
      },
    },
  };
}
