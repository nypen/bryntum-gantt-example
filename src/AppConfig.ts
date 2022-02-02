/**
 * Application configuration
 */
import { DateHelper, GanttConfig, SimpleEventEdit, StringHelper } from '@bryntum/gantt/gantt.umd.js';
// import { GanttConfig } from '@bryntum/gantt/gantt.umd.js';

const ganttConfig: Partial<GanttConfig> = {
    tbar: {
        type: 'buttonGroup',
        items: [
            {
                ref: 'zoomInButton',
                icon: 'b-fa b-fa-search-plus',
                tooltip: 'Zoom in',
                onAction: 'up.onZoomInClick'
            },
            {
                ref: 'zoomOutButton',
                icon: 'b-fa b-fa-search-minus',
                tooltip: 'Zoom out',
                onAction: 'up.onZoomOutClick'
            },
            {
                ref: 'zoomToFitButton',
                icon: 'b-fa b-fa-compress-arrows-alt',
                tooltip: 'Zoom to fit',
                onAction: 'up.onZoomToFitClick'
            },
        ]
    },
    infiniteScroll: true,
    project: {
        autoLoad: true,
        transport: {
            load: {
                url: 'data/launch-saas.json'
            }
        },
        // This config enables response validation and dumping of found errors to the browser console.
        // It's meant to be used as a development stage helper only so please set it to false for production systems.
        validateResponse: true
    },
    columns: [
        { type: 'name', field: 'name', text: 'Location', width: 250 },
        { type: 'location', field: 'location', width: 250 }
    ],
    presets: [
        {
            base: 'hourAndDay',
            id: 'MyHourAndDay',
            tickWidth: 24,                // Time column width in horizontal mode
            tickHeight: 50,                // Time column height in vertical mode
            displayDateFormat: 'HH:mm',    // Controls how dates will be displayed in tooltips etc

            shiftIncrement: 1,             // Controls how much time to skip when calling shiftNext and shiftPrevious.
            shiftUnit: 'day',         // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
            defaultSpan: 12,            // By default, if no end date is supplied to a view it will show 12 hours

            timeResolution: {              // Dates will be snapped to this resolution
                unit: 'minute',       // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
                increment: 15
            },

            columnLinesFor: 1              // Defines header level column lines will be drawn for. Defaults to the last level.
        },
        {
            base: 'weekAndMonth',
            id: 'MyWeekAndMonth',
            tickWidth: 24,                // Time column width in horizontal mode
            tickHeight: 50,                // Time column height in vertical mode
            displayDateFormat: 'HH:mm',    // Controls how dates will be displayed in tooltips etc

            shiftIncrement: 1,             // Controls how much time to skip when calling shiftNext and shiftPrevious.
            shiftUnit: 'day',         // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
            defaultSpan: 12,            // By default, if no end date is supplied to a view it will show 12 hours

            timeResolution: {              // Dates will be snapped to this resolution
                unit: 'minute',       // Valid values are 'millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year'.
                increment: 15
            },

            // headers: [                     // This defines your header rows from top to bottom
            //     {                           // For each row you can define 'unit', 'increment', 'dateFormat', 'renderer', 'align', and 'thisObj'
            //         unit: 'day',
            //         dateFormat: 'ddd DD/MM'
            //     },
            //     {
            //         unit: 'hour',
            //         dateFormat: 'HH:mm'
            //     }
            // ],

            columnLinesFor: 1              // Defines header level column lines will be drawn for. Defaults to the last level.
            // other preset configs....
        }
    ],
    viewPreset: {
        id: 'MyHourAndDay',              // Unique id value provided to recognize your view preset. Not required, but having it you can simply set new view preset by id: scheduler.viewPreset = 'myPreset'
    },
    barMargin: 10,
    //contextMenuTriggerEvent: 'click' changes how context menu is opened - right click is the default

    // customize task Menu: https://www.bryntum.com/docs/gantt/#Gantt/feature/TaskMenu
    features: {
        taskTooltip: {
            // check if we can have access to custom fields e.g. location
            template: () => "tooltip"



            // (""data: SimpleEventEdit) => (`<dl>
            //     <dt>Assigned to:</dt>
            //     <dd>
            //          ${StringHelper.encodeHtml(data.eventRecord.resource.name)}
            //     </dd>
            //     <dt>Time:</dt>
            //     <dd>
            //         ${DateHelper.format((data.eventRecord as any).startDate, 'LT')}
            //     </dd>
            //     </dl>
            //     `)
            // ${data.eventRecord.get('location') ? `<dt>Location:</dt><dd>${(data.eventRecord as any).location}</dd>` : ''}
            // You can also use Tooltip configs here, for example:
            // anchorToTarget : false,
            // trackMouse     : true
        },
        // https://www.bryntum.com/docs/gantt/api/Gantt/feature/TaskMenu
        taskMenu: {
            items: {
                addDemand: {
                    text: 'Add Demand',
                    onItem(context: object) {
                        alert("Add Demand");
                        // (context as any).contextRecord.cat = false;
                    },
                    disabled: true,
                    weight: 500     // Make this second from end
                },
                edit: {
                    text: 'Edit',
                    icon: 'b-fa b-fa-fw b-fa-pencil',
                    onItem(context: object) {

                        alert("Edit demand");
                        // (context as any).cat = true;
                    },
                    weight: 510     // Make this sink to end
                },
                deleteDemand: {
                    text: 'Delete',
                    icon: 'b-fa b-fa-fw b-fa-pencil',
                    onItem(context: object) {

                        alert("Delete demand");
                        // (context as any).cat = true;
                    },
                    weight: 520     // Make this sink to end
                },
                add: false, // We do not want the "Add" submenu to be available
                convertToMilestone: false,
                indent: false,
                outdent: false,
                editTask: false,
                deleteTask: false,
            }
        },
        taskEdit: {
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
        },
    },

};

const toolbarItems = [
    {
        type: 'buttonGroup',
        items: [
            {
                color: 'b-green',
                ref: 'addTaskButton',
                icon: 'b-fa b-fa-plus',
                text: 'Create',
                tooltip: 'Create new task',
                onAction: 'up.onAddTaskClick'
            }
        ]
    },
    {
        ref: 'undoRedo',
        type: 'undoredo',
        items: {
            transactionsCombo: null
        }
    },
    {
        type: 'buttonGroup',
        items: [
            {
                ref: 'expandAllButton',
                icon: 'b-fa b-fa-angle-double-down',
                tooltip: 'Expand all',
                onAction: 'up.onExpandAllClick'
            },
            {
                ref: 'collapseAllButton',
                icon: 'b-fa b-fa-angle-double-up',
                tooltip: 'Collapse all',
                onAction: 'up.onCollapseAllClick'
            }
        ]
    },
    {
        type: 'buttonGroup',
        items: [
            {
                ref: 'zoomInButton',
                icon: 'b-fa b-fa-search-plus',
                tooltip: 'Zoom in',
                onAction: 'up.onZoomInClick'
            },
            {
                ref: 'zoomOutButton',
                icon: 'b-fa b-fa-search-minus',
                tooltip: 'Zoom out',
                onAction: 'up.onZoomOutClick'
            },
            {
                ref: 'zoomToFitButton',
                icon: 'b-fa b-fa-compress-arrows-alt',
                tooltip: 'Zoom to fit',
                onAction: 'up.onZoomToFitClick'
            },
            {
                ref: 'previousButton',
                icon: 'b-fa b-fa-angle-left',
                tooltip: 'Previous time span',
                onAction: 'up.onShiftPreviousClick'
            },
            {
                ref: 'nextButton',
                icon: 'b-fa b-fa-angle-right',
                tooltip: 'Next time span',
                onAction: 'up.onShiftNextClick'
            }
        ]
    },
    {
        type: 'datefield',
        ref: 'startDateField',
        label: 'Project start',
        // required  : true, (done on load)
        flex: '0 0 17em',
        listeners: {
            change: 'up.onStartDateChange'
        }
    },
    {
        type: 'combo',
        ref: 'projectSelector',
        label: 'Choose project',
        editable: false,
        width: '20em',
        displayField: 'name',
        value: 1,
        store: {
            data: [
                {
                    id: 1,
                    name: 'Launch SaaS',
                    url: '../_datasets/launch-saas.json'
                },
                {
                    id: 2,
                    name: 'Build web app for customer',
                    url: '../_datasets/tasks-workedhours.json'
                }
            ]
        },
        listeners: {
            select: 'up.onProjectSelected'
        }
    },
    '->',
    {
        type: 'textfield',
        ref: 'filterByName',
        cls: 'filter-by-name',
        flex: '0 0 13.5em',
        // Label used for material, hidden in other themes
        label: 'Find tasks by name',
        // Placeholder for others
        placeholder: 'Find tasks by name',
        clearable: true,
        keyStrokeChangeDelay: 100,
        triggers: {
            filter: {
                align: 'end',
                cls: 'b-fa b-fa-filter'
            }
        },
        onChange: 'up.onFilterChange'
    },
]

export {
    ganttConfig,
    toolbarItems
};
