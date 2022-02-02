/**
 * Main Application script
 */
import React, { Fragment, FunctionComponent } from 'react';

import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { ganttConfig } from './AppConfig';
import './App.scss';
import { Column, ColumnConfig, ColumnStore, NonWorkingTimeConfig, ScheduleTooltipConfig, StringHelper, EventEditConfig, EventMenuConfig, EventModel, EventStore, EventTooltipConfig, TimeRangesConfig, ToolbarConfig, ViewPreset } from '@bryntum/schedulerpro/schedulerpro.umd.js';
import { DateHelper, PresetManager, ProjectModel, ViewPresetConfig } from '@bryntum/schedulerpro';
import { start } from 'repl';
// import { data } from "./data";

class MyEventModel extends EventModel {

    static get fields() {
        return [
            { name: 'location' },
            { name: 'demandCategory' },
            { name: 'startDateTime', type: 'date' }
        ]
    }
}

class LocationColumn extends Column {
    // unique alias of the column
    static get type() {
        return 'location';
    }

    static get $name() {
        return 'LocationColumn';
    }

    static get isGanttColumn() {
        return true;
    }

    static get defaults() {
        return {
            // Set your default instance config properties here
            field: 'location',
            text: 'Location',
            editor: false,
            cellCls: 'b-status-column-cell',
            htmlEncode: false,
            filterable: {
                filterField: {
                    type: 'combo',
                    items: ['Not Started', 'Started', 'Completed', 'Late']
                }
            }
        };
    }
}

interface MyEventModelType extends EventModel {
    location: string;
    demandCategory: string;
    startDateTime: string;
}

interface EventToolTipData {
    eventRecord: MyEventModelType;
    startClockHtml: String;
    endClockHtml: String;
}

interface CellClickData {
    record: MyEventModelType;
}


const MySchedulerPro: FunctionComponent = () => {
    const schedulerRef = React.createRef();
    const [zoomLevel, setZoomLevel] = React.useState(0)
    ColumnStore.registerColumnType(LocationColumn);
    // PresetManager.add(presets);

    const presets: Partial<ViewPresetConfig>[] = [
        {
            id: 'hourAndDay2',
            tickWidth: 60,                  // Time column width in horizontal mode
            tickHeight: 80,                 // Time column height in vertical mode
            displayDateFormat: 'HH:mm',     // Controls how dates will be displayed in tooltips etc

            shiftIncrement: 1,              // Controls how much time to skip when calling shiftNext and shiftPrevious.
            shiftUnit: 'minute',            // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
            defaultSpan: 1,                 // By default, if no end date is supplied to a view it will show 12 hours

            timeResolution: {               // Dates will be snapped to this resolution
                unit: 'hour',               // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
                increment: 12
            },

            headers: [                      // This defines your header rows from top to bottom
                {                           // For each row you can define 'unit', 'increment', 'dateFormat', 'renderer', 'align', and 'thisObj'
                    unit: 'day',
                    dateFormat: 'ddd, MMM D'  // Formating dates: https://bryntum.com/docs/gantt/api/Core/helper/DateHelper#formatting-dates
                },
                {
                    unit: 'hour',
                    dateFormat: 'h a'
                }
            ],

            columnLinesFor: 1              // Defines header level column lines will be drawn for. Defaults to the last level.
        },
        {
            // base: 'hourAndDay',
            id: 'hourAndDay1',
            tickWidth: 50,
            tickHeight: 80,
            displayDateFormat: 'HH:mm',

            defaultSpan: 1,
            shiftIncrement: 1,
            shiftUnit: 'minute',

            timeResolution: {
                unit: 'hour',
                increment: 12
            },

            headers: [
                {
                    unit: 'day',
                    dateFormat: 'ddd, MMM D'
                },
                {
                    unit: 'hour',
                    increment: 12,              // intervals
                    dateFormat: 'h a'
                }
            ],

            columnLinesFor: 1
        }
    ];

    const addEvent = () => {
        const scheduler = (schedulerRef.current as any).instance;

        const startDate = new Date("2022-01-14T20:15:00");
        const endDate = new Date("2022-01-15T20:15:00");
        console.log(startDate)
        const resource = scheduler.resourceStore.first;

        scheduler.eventStore.add({
            resourceId: resource.id,
            startDate: startDate,
            endDate: endDate,
            location: "Location 1",
            name: 'Location 1',
        });

    }

    // https://www.bryntum.com/docs/gantt/api/Gantt/feature/TaskMenu
    const eventMenuFeature: Partial<EventMenuConfig> = {
        // custom items of task menu context
        items: {
            add: {
                text: 'Add Demand',
                onItem(context: object) {
                    alert("Add Demand with location: " + ((context as any).eventRecord as MyEventModelType).location);
                    addEvent();
                    // (context as any).contextRecord.property = false;
                },
                weight: 500                         // weights determine the index of the options
            },
            edit: {
                text: 'Edit',
                icon: 'b-fa b-fa-fw b-fa-pencil',
                disabled: true,
                onItem(context: object) {
                    alert("Edit demand with location: " + ((context as any).eventRecord as MyEventModelType).location);
                },
                weight: 510
            },
            delete: {
                text: 'Delete',
                icon: 'b-fa b-fa-fw b-fa-pencil',
                onItem(context: object) {
                    alert("Delete demand with location: " + ((context as any).eventRecord as MyEventModelType).location);
                },
                weight: 520
            },
            // Remove default options on event menu context
            deleteEvent: false,
            editEvent: false,
            copyEvent: false,
            cutEvent: false,
        },
    }

    const disableZoomInButton = () => {
        return zoomLevel === presets.length - 1
    }

    const disableZoomOutButton = () => {
        return zoomLevel === 0
    }

    const tbar: Partial<ToolbarConfig> = {
        //type: 'buttonGroup',
        items: [
            {
                ref: 'zoomInButton',
                icon: 'b-fa b-fa-search-plus',
                tooltip: 'Zoom in',
                // disabled: disableZoomInButton(),
                onAction: () => {
                    (schedulerRef.current as any).instance.zoomIn()
                    console.log((schedulerRef.current as any)?.instance.zoomLevel)
                    // setZoomLevel((ganttRef.current as any)?.instance.zoomLevel)
                }
            },
            {
                ref: 'zoomOutButton',
                icon: 'b-fa b-fa-search-minus',
                tooltip: 'Zoom out',
                // disabled: disableZoomOutButton(),
                onAction: () => {
                    (schedulerRef.current as any).instance.zoomOut()
                    console.log((schedulerRef.current as any)?.instance.zoomLevel)
                    // setZoomLevel((ganttRef.current as any)?.instance.zoomLevel)
                }
            },
            {
                ref: 'zoomToFitButton',
                icon: 'b-fa b-fa-compress-arrows-alt',
                tooltip: 'Zoom to reset',
                onAction: () => {
                    (schedulerRef.current as any).instance.zoomTo('hourAndDay1')
                    console.log((schedulerRef.current as any)?.instance.zoomLevel)
                    // setZoomLevel((ganttRef.current as any)?.instance.zoomLevel)
                }
            },
        ]
    };

    const taskTooltipFeature: Partial<EventTooltipConfig> = {
        // check if we can have access to custom fields e.g. location
        // integrate our tooltip? ==> https://www.bryntum.com/forum/viewtopic.php?f=44&t=13554
        template: (data: EventToolTipData) => {
            const task: MyEventModelType = data.eventRecord

            return (`<dl>
                 <dt>Location:</dt>
                      ${StringHelper.encodeHtml(task.location)}
                 <dt>Demand Category:</dt>
                 <dd>
                     ${StringHelper.encodeHtml(task.demandCategory)}
                 </dd>
                <dt>Start:</dt>
                 <dd>
                     ${StringHelper.encodeHtml(task.startDateTime)}
                 </dd>
                 </dl>
                 `)
        }

        // You can also use Tooltip configs here, for example:
        // anchorToTarget : false,
        // trackMouse     : true
    }

    // https://bryntum.com/docs/gantt/api/Gantt/model/ProjectModel
    const project: ProjectModel | object = {
        // https://bryntum.com/docs/gantt/api/Gantt/model/ProjectModel#working-with-inline-data
        // inlineData: data,

        // this is used only for demo purposes
        autoLoad: true,
        transport: {
            load: {
                url: 'data/launch-saas-scheduler-pro.json'
            }
        },
        eventModelClass: MyEventModel,
        validateResponse: true
    };

    const taskEditFeature: Partial<EventEditConfig> = {
        items: {
            generalTab: {
                items: {
                    // Remove "% Complete","Effort", and the divider in the "General" tab
                    percentDone: false,
                    effort: false,
                    divider: false
                }
            },
            // Remove all tabs except the "General" tab
            notesTab: false,
            predecessorsTab: false,
            successorsTab: false,
            resourcesTab: false,
            advancedTab: false
        },
        triggerEvent: 'taskclick', // https://www.bryntum.com/docs/gantt/api/Gantt/feature/TaskEdit#config-triggerEvent
        editorConfig: {
            title: 'Demand',
            height: 500
        }
    };

    const columns: object[] = [
        { type: 'resourceInfo', text: "Location", field: 'location', width: 250, showEventCount: false, showImage: false }
    ];

    //https://bryntum.com/docs/gantt/#Scheduler/feature/TimeRanges#config-showCurrentTimeLine
    const timeRangesFeature: Partial<TimeRangesConfig> = {
        showCurrentTimeLine: true,
        currentDateFormat: 'hh:mm a',       // use the format you need
        enableResizing: false,              // expand drag timeRanges
    };

    const scheduleTooltipFeature: Partial<ScheduleTooltipConfig> = {
        disabled: false
    }

    // disable default project start - end time markers
    // const projectLinesFeature: Partial<ProjectLinesConfig> = {
    //     disabled: true
    // }

    // remove weekend layout
    const nonWorkingTimeFeature: Partial<NonWorkingTimeConfig> = {
        disabled: true,
    }

    return (
        <Fragment>
            <BryntumSchedulerPro
                ref={schedulerRef}
                viewPreset='hourAndDay1'              // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
                presets={presets}
                tbar={tbar}
                infiniteScroll={true}
                barMargin={10}
                project={project}
                columns={columns}
                eventTooltipFeature={taskTooltipFeature}
                timeRangesFeature={timeRangesFeature}
                // scheduleTooltipFeature ={scheduleTooltipFeature}
                eventEditFeature={taskEditFeature}
                eventMenuFeature={eventMenuFeature}
                // projectLinesFeature={projectLinesFeature}
                onCellClick={({ record }: CellClickData) => { console.log(record.demandCategory) }}

            />
        </Fragment>
    );
};

export { MySchedulerPro };
