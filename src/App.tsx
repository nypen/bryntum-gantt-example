/**
 * Main Application script
 */
import React, { Fragment, FunctionComponent } from 'react';

import { BryntumDemoHeader, BryntumThemeCombo, BryntumGanttBase, BryntumToolbar } from '@bryntum/gantt-react';
import { MySchedulerPro } from './MySchedulerPro';
import './App.scss';
import { Column, ColumnConfig, ColumnStore, NonWorkingTimeConfig, ProjectLinesConfig, ScheduleTooltipConfig, StringHelper, TaskEditConfig, TaskMenuConfig, TaskModel, TaskStore, TaskTooltipConfig, TimeRangesConfig, ToolbarConfig, ViewPreset } from '@bryntum/gantt/gantt.umd.js';
import { DateHelper, PresetManager, ProjectModel, ViewPresetConfig } from '@bryntum/gantt';
// import { data } from "./data";

class MyTaskModel extends TaskModel {

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

interface MyTaskModelType extends TaskModel {
    location: string;
    demandCategory: string;
    startDateTime: string;
}

interface TaskToolTipData {
    taskRecord: MyTaskModelType;
    startClockHtml: String;
    endClockHtml: String;
}

interface CellClickData {
    record: MyTaskModelType;
    }


const App: FunctionComponent = () => {
    const ganttRef = React.createRef();
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

    const addTask = () => {
        const gantt = (ganttRef.current as any).instance;

        const startDate = new Date("2022-01-14T20:15:00");
        const endDate = new Date("2022-01-15T20:15:00");
        console.log(startDate)

        gantt.eventStore.add({
            startDate: startDate,
            endDate: endDate,
            location: "Location 1",
            name: 'Location 1',
        });

    };

    // https://www.bryntum.com/docs/gantt/api/Gantt/feature/TaskMenu
    const taskMenuFeature: Partial<TaskMenuConfig> = {
        // custom items of task menu context
        items: {
            addDemand: {
                text: 'Add Demand',
                onItem(context: object) {
                    alert("Add Demand with location: " + ((context as any).taskRecord as MyTaskModelType).location);
                    // (context as any).contextRecord.property = false;
                    addTask();
                },
                weight: 500                         // weights determine the index of the options
            },
            edit: {
                text: 'Edit',
                icon: 'b-fa b-fa-fw b-fa-pencil',
                disabled: true,
                onItem(context: object) {
                    alert("Edit demand with location: " + ((context as any).taskRecord as MyTaskModelType).location);
                },
                weight: 510
            },
            deleteDemand: {
                text: 'Delete',
                icon: 'b-fa b-fa-fw b-fa-pencil',
                onItem(context: object) {
                    alert("Delete demand with location: " + ((context as any).taskRecord as MyTaskModelType).location);
                },
                weight: 520
            },
            // Remove default options on task menu context
            add: false,
            convertToMilestone: false,
            indent: false,
            outdent: false,
            editTask: false,
            deleteTask: false,
        }
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
                    (ganttRef.current as any).instance.zoomIn()
                    console.log((ganttRef.current as any)?.instance.zoomLevel)
                    // setZoomLevel((ganttRef.current as any)?.instance.zoomLevel)
                }
            },
            {
                ref: 'zoomOutButton',
                icon: 'b-fa b-fa-search-minus',
                tooltip: 'Zoom out',
                // disabled: disableZoomOutButton(),
                onAction: () => {
                    (ganttRef.current as any).instance.zoomOut()
                    console.log((ganttRef.current as any)?.instance.zoomLevel)
                    // setZoomLevel((ganttRef.current as any)?.instance.zoomLevel)
                }
            },
            {
                ref: 'zoomToFitButton',
                icon: 'b-fa b-fa-compress-arrows-alt',
                tooltip: 'Zoom to reset',
                onAction: () => {
                    (ganttRef.current as any).instance.zoomTo('hourAndDay1')
                    console.log((ganttRef.current as any)?.instance.zoomLevel)
                    // setZoomLevel((ganttRef.current as any)?.instance.zoomLevel)
                }
            },
        ]
    };

    const taskTooltipFeature: Partial<TaskTooltipConfig> = {
        // check if we can have access to custom fields e.g. location
        // integrate our tooltip? ==> https://www.bryntum.com/forum/viewtopic.php?f=44&t=13554
        template: (data: TaskToolTipData) => {
            const task: MyTaskModelType = data.taskRecord

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
                url: 'data/launch-saas.json'
            }
        },
        taskModelClass: MyTaskModel,
        validateResponse: true
    };

    const taskEditFeature: Partial<TaskEditConfig> = {
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
        { type: 'name', field: 'name', text: 'Location', width: 250 },
        { type: 'location', field: 'location', width: 250 }
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
    const projectLinesFeature: Partial<ProjectLinesConfig> = {
        disabled: true
    }

    // remove weekend layout
    const nonWorkingTimeFeature: Partial<NonWorkingTimeConfig> ={
        disabled: true,
    }

    return (
        <Fragment>
            <BryntumDemoHeader
                href="../../../../../#example-frameworks-react-typescript-basic"
                children={<BryntumThemeCombo />}
            />
            <BryntumGanttBase
                ref={ganttRef}
                viewPreset='hourAndDay1'              // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
                presets={presets}
                tbar={tbar}
                infiniteScroll={true}
                barMargin={10}
                project={project}
                columns={columns}
                taskTooltipFeature={taskTooltipFeature}
                timeRangesFeature={timeRangesFeature}
                // scheduleTooltipFeature ={scheduleTooltipFeature}
                taskEditFeature={taskEditFeature}
                taskMenuFeature={taskMenuFeature}
                projectLinesFeature={projectLinesFeature}
                onCellClick={({ record }: CellClickData) => { console.log(record.demandCategory)}}

            />
            <MySchedulerPro/>
        </Fragment>
    );
};

export default App;
