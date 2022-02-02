/**
 * Main Application script
 */
import React, { Fragment, FunctionComponent } from 'react';

import { BryntumDemoHeader, BryntumThemeCombo, BryntumGanttBase, BryntumToolbar } from '@bryntum/gantt-react';
import { ganttConfig } from './AppConfig';
import './App.scss';
import * as GanttLibrary from '@bryntum/gantt/gantt.umd.js';
import { PresetManager, ViewPresetConfig } from '@bryntum/gantt';

class LocationColumn extends GanttLibrary.Column {
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

const App: FunctionComponent = () => {
    const ganttRef = React.createRef();
    GanttLibrary.ColumnStore.registerColumnType(LocationColumn);
    // PresetManager.add(presets);

    const baselinesFeature: Partial<GanttLibrary.BaselinesConfig> = {}
    const cellEditFeature: Partial<GanttLibrary.CellEditConfig> = {}
    const cellMenuFeature: Partial<GanttLibrary.CellMenuConfig> = {}
    const cellTooltipFeature: Partial<GanttLibrary.CellTooltipConfig> = {}
    const columnAutoWidthFeature: Partial<GanttLibrary.ColumnAutoWidthConfig> = {}
    const columnDragToolbarFeature: Partial<GanttLibrary.ColumnDragToolbarConfig> = {}
    const columnLinesFeature: Partial<GanttLibrary.ColumnLinesConfig> = {}
    const columnPickerFeature: Partial<GanttLibrary.ColumnPickerConfig> = {}
    const columnReorderFeature: Partial<GanttLibrary.ColumnReorderConfig> = {}
    const columnResizeFeature: Partial<GanttLibrary.ColumnResizeConfig> = {}
    const contextMenuFeature: Partial<GanttLibrary.ContextMenuConfig> = {}
    const criticalPathsFeature: Partial<GanttLibrary.CriticalPathsConfig> = {}
    const dependenciesFeature: Partial<GanttLibrary.DependenciesConfig> = {}
    const dependencyEditFeature: Partial<GanttLibrary.DependencyEditConfig> = {}
    const eventFilterFeature: Partial<GanttLibrary.EventFilterConfig> = {}
    const excelExporterFeature: Partial<GanttLibrary.ExcelExporterConfig> = {}
    const filterFeature: Partial<GanttLibrary.FilterConfig> = {}
    const filterBarFeature: Partial<GanttLibrary.FilterBarConfig> = {}
    const groupFeature: Partial<GanttLibrary.GroupConfig> = {}
    const groupSummaryFeature: Partial<GanttLibrary.GroupSummaryConfig> = {}
    const headerContextMenuFeature: Partial<GanttLibrary.HeaderContextMenuConfig> = {}
    const headerMenuFeature: Partial<GanttLibrary.HeaderMenuConfig> = {}
    const headerZoomFeature: Partial<GanttLibrary.HeaderZoomConfig> = {}
    const indicatorsFeature: Partial<GanttLibrary.IndicatorsConfig> = {}
    const labelsFeature: Partial<GanttLibrary.LabelsConfig> = {}
    const mspExportFeature: Partial<GanttLibrary.MspExportConfig> = {}
    const nonWorkingTimeFeature: Partial<GanttLibrary.NonWorkingTimeConfig> = {}
    const panFeature: Partial<GanttLibrary.PanConfig> = {}
    const pdfExportFeature: Partial<GanttLibrary.PdfExportConfig> = {}
    const percentBarFeature: Partial<GanttLibrary.PercentBarConfig> = {}
    const progressLineFeature: Partial<GanttLibrary.ProgressLineConfig> = {}
    const projectLinesFeature: Partial<GanttLibrary.ProjectLinesConfig> = {}
    const quickFindFeature: Partial<GanttLibrary.QuickFindConfig> = {}
    const regionResizeFeature: Partial<GanttLibrary.RegionResizeConfig> = {}
    const rowCopyPasteFeature: Partial<GanttLibrary.RowCopyPasteConfig> = {}
    const rollupsFeature: Partial<GanttLibrary.RollupsConfig> = {}
    const rowReorderFeature: Partial<GanttLibrary.RowReorderConfig> = {}
    const scheduleMenuFeature: Partial<GanttLibrary.ScheduleMenuConfig> = {}
    const scheduleTooltipFeature: Partial<GanttLibrary.ScheduleTooltipConfig> = {}
    const searchFeature: Partial<GanttLibrary.SearchConfig> = {}
    const sortFeature: Partial<GanttLibrary.SortConfig> = {}
    const stickyCellsFeature: Partial<GanttLibrary.StickyCellsConfig> = {}
    const stripeFeature: Partial<GanttLibrary.StripeConfig> = {}
    const summaryFeature: Partial<GanttLibrary.SummaryConfig> = {}
    const taskContextMenuFeature: Partial<GanttLibrary.TaskContextMenuConfig> = {}
    const taskCopyPasteFeature: Partial<GanttLibrary.TaskCopyPasteConfig> = {}
    const taskDragFeature: Partial<GanttLibrary.TaskDragConfig> = {}
    const taskDragCreateFeature: Partial<GanttLibrary.TaskDragCreateConfig> = {}
    const taskEditFeature: Partial<GanttLibrary.TaskEditConfig> = {}
    const taskMenuFeature: Partial<GanttLibrary.TaskMenuConfig> = {}
    const taskResizeFeature: Partial<GanttLibrary.TaskResizeConfig> = {}
    const taskTooltipFeature: Partial<GanttLibrary.TaskTooltipConfig> = {}
    const timeAxisHeaderMenuFeature: Partial<GanttLibrary.TimeAxisHeaderMenuConfig> = {}
    const timeRangesFeature: Partial<GanttLibrary.TimeRangesConfig> = {}
    const treeFeature: Partial<GanttLibrary.TreeConfig> = {}

    const presets: Partial<GanttLibrary.ViewPresetConfig>[] = [];
    const alignSelf: string = "";
    const allowDropOnEventBar: boolean = false;
    const barMargin: number = 10;
    const columnLines: boolean = false;
    const content: string = "";
    const data: object[] = [];
    const dataset: object = {};
    const disabled = {};
    const displayDateFormat = {};
    const endDate = {};
    const extraData = {};
    const flex = {};
    const height = {};
    const hidden = {};
    const html = {};
    const id = {};
    const items = {};
    const layout = {};
    const layoutStyle = {};
    const margin = {};
    const maxHeight = {};
    const maxWidth = {};
    const maxZoomLevel = {};
    const minHeight = {};
    const minWidth = {};
    const minZoomLevel = {};
    const project = {};
    const readOnly = {};
    const rowHeight = {};
    const scrollable = {};
    const snap = {};
    const startDate = {};
    const store = {};
    const tasks = {};
    const taskStore = {};
    const tickSize = {};
    const toggleParentTasksOnClick = {};
    const tools = {};
    const tooltip = {};
    const transitionDuration = {};
    const viewPreset: Partial<ViewPresetConfig> = {};
    const width = {};
    const workingTime = {};
    const x = {};
    const y = {};
    const anchorSize = {}
    const eventColors = {}
    const eventStyles = {}
    const isSettingValues = {}
    const isValid = {}
    const record = {}
    const scrollLeft = {}
    const scrollTop = {}
    const selectedCell = {}
    const selectedRecord = {}
    const selectedRecords = {}
    const state = {}
    const timeResolution = {}
    const values = {}
    const zoomLevel = {}
    const adopt = {}
    const align = {}
    const allowCreate = {}
    const allowOver = {}
    const anchor = {}
    const anchorToTarget = {}
    const animateRemovingRows = {}
    const appendTo = {}
    const autoAdjustTimeAxis = {}
    const autoClose = {}
    const autoHeight = {}
    const autoShow = {}
    const bbar = {}
    const bodyCls = {}
    const bubbleEvents = {}
    const bufferCoef = {}
    const bufferThreshold = {}
    const centered = {}
    const closable = {}
    const closeAction = {}
    const cls = {}
    const collapsed = {}
    const collapsible = {}
    const columns = {}
    const config = {}
    const constrainTo = {}
    const contentElementCls = {}
    const contextMenuTriggerEvent = {}
    const creationTooltip = {}
    const defaultBindProperty = {}
    const defaultRegion = {}
    const defaultResourceImageName = {}
    const defaults = {}
    const dependencyIdField = {}
    const destroyStore = {}
    const disableGridRowModelWarning = {}
    const dismissDelay = {}
    const dock = {}
    const draggable = {}
    const durationDisplayPrecision = {}
    const emptyText = {}
    const enableDeleteKey = {}
    const enableEventAnimations = {}
    const enableRecurringEvents = {}
    const enableSticky = {}
    const enableTextSelection = {}
    const enableUndoRedoKeys = {}
    const eventColor = {}
    const eventStyle = {}
    const features = {}
    const fillLastColumn = {}
    const fixedRowHeight = {}
    const floating = {}
    const focusOnToFront = {}
    const footer = {}
    const forceFit = {}
    const forElement = {}
    const forSelector = {}
    const fullRowRefresh = {}
    const getDateConstraints = {}
    const getHtml = {}
    const getRowHeight = {}
    const header = {}
    const hideAnimation = {}
    const hideDelay = {}
    const hideHeaders = {}
    const hideOnDelegateChange = {}
    const hideWhenEmpty = {}
    const hoverDelay = {}
    const htmlCls = {}
    const infiniteScroll = {}
    const insertBefore = {}
    const insertFirst = {}
    const itemCls = {}
    const lazyItems = {}
    const listeners = {}
    const loadingMsg = {}
    const loadMask = {}
    const loadMaskDefaults = {}
    const loadMaskError = {}
    const localeClass = {}
    const localizableProperties = {}
    const longPressTime = {}
    const managedEventSizing = {}
    const maskDefaults = {}
    const masked = {}
    const maximizable = {}
    const maximized = {}
    const modal = {}
    const monitorResize = {}
    const mouseOffsetX = {}
    const mouseOffsetY = {}
    const namedItems = {}
    const owner = {}
    const partner = {}
    const plugins = {}
    const positioned = {}
    const preserveFocusOnDatasetChange = {}
    const preserveScrollOnDatasetChange = {}
    const preventTooltipOnTouch = {}
    const resizeToFitIncludesHeader = {}
    const resourceImageFolderPath = {}
    const responsiveLevels = {}
    const ripple = {}
    const rootElement = {}
    const scrollAction = {}
    const scrollerClass = {}
    const scrollManager = {}
    const scrollTaskIntoViewOnCellClick = {}
    const selectionMode = {}
    const showAnimation = {}
    const showCreationTooltip = {}
    const showDirty = {}
    const showOnClick = {}
    const showOnHover = {}
    const showRemoveRowInContextMenu = {}
    const showTooltipWhenDisabled = {}
    const snapRelativeToEventStartDate = {}
    const stickyHeaders = {}
    const strips = {}
    const subGridConfigs = {}
    const suppressFit = {}
    const syncMask = {}
    const tab = {}
    const tag = {}
    const taskRenderer = () => {}
    const terminalCls = {}
    const terminalSides = {}
    const textAlign = {}
    const textContent = {}
    const timeAxis = {}
    const title = {}
    const trackMouse = {}
    const trapFocus = {}
    const ui = {}
    const visibleDate = {}
    const visibleZoomFactor = {}
    const weekStartDay = {}
    const weight = {}
    const zoomKeepsOriginalTimespan = {}
    const zoomOnMouseWheel = {}
    const zoomOnTimeAxisDoubleClick = {}

    const tbar: Partial<GanttLibrary.ToolbarConfig> = {
        //type: 'buttonGroup',
        items: [
            {
                ref: 'zoomInButton',
                icon: 'b-fa b-fa-search-plus',
                tooltip: 'Zoom in',
                onAction: () => (ganttRef.current as any).instance.zoomIn()
            },
            {
                ref: 'zoomOutButton',
                icon: 'b-fa b-fa-search-minus',
                tooltip: 'Zoom out',
                onAction: () => (ganttRef.current as any).instance.zoomOut()
            },
            {
                ref: 'zoomToFitButton',
                icon: 'b-fa b-fa-compress-arrows-alt',
                tooltip: 'Zoom to fit',
                onAction: () => (ganttRef.current as any).instance.zoomToFit({
                    leftMargin: 50,
                    rightMargin: 50
                })
            },
        ]
    };

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
                project={{
                    autoLoad: true,
                    transport: {
                        load: {
                            url: 'data/launch-saas.json'
                        }
                    },
                    validateResponse: true
                }}
                columns={[
                    { type: 'name', field: 'name', text: 'Location', width: 250 },
                    { type: 'location', field: 'location', width: 250 }
                ]}
                onAfterDependencyCreateDrop={() => { }}
                onAfterDependencySave={() => { }}
                onAfterDragCreate={() => { }}
                onAfterEventSave={() => { }}
                onAfterTaskDrop={() => { }}
                onAfterTaskSave={() => { }}
                onBeforeAssignmentDelete={() => { }}
                onBeforeCellEditStart={() => { }}
                onBeforeColumnDragStart={() => { }}
                onBeforeColumnDropFinalize={() => { }}
                onBeforeCopy={() => { }}
                onBeforeDependencyAdd={() => { }}
                onBeforeDependencyCreateDrag={() => { }}
                onBeforeDependencyCreateFinalize={() => { }}
                onBeforeDependencyDelete={() => { }}
                onBeforeDependencyEdit={() => { }}
                onBeforeDependencyEditShow={() => { }}
                onBeforeDependencySave={() => { }}
                onBeforeDestroy={() => { }}
                onBeforeDragCreate={() => { }}
                onBeforeDragCreateFinalize={() => { }}
                onBeforeEventDelete={() => { }}
                onBeforeEventResize={() => { }}
                onBeforeEventResizeFinalize={() => { }}
                onBeforeEventSave={() => { }}
                onBeforeExport={() => { }}
                onBeforeFinishCellEdit={() => { }}
                onBeforeHide={() => { }}
                onBeforePaste={() => { }}
                onBeforePresetChange={() => { }}
                onBeforeRenderRow={() => { }}
                onBeforeRenderRows={() => { }}
                onBeforeSetRecord={() => { }}
                onBeforeShow={() => { }}
                onBeforeTaskDelete={() => { }}
                onBeforeTaskDrag={() => { }}
                onBeforeTaskDropFinalize={() => { }}
                onBeforeTaskEdit={() => { }}
                onBeforeTaskEditShow={() => { }}
                onBeforeTaskResize={() => { }}
                onBeforeTaskResizeFinalize={() => { }}
                onBeforeTaskSave={() => { }}
                onBeforeToggleNode={() => { }}
                onCancelCellEdit={() => { }}
                onCatchAll={() => { }}
                onCellClick={() => { }}
                onCellContextMenu={() => { }}
                onCellContextMenuBeforeShow={() => { }}
                onCellContextMenuShow={() => { }}
                onCellDblClick={() => { }}
                onCellMenuBeforeShow={() => { }}
                onCellMenuItem={() => { }}
                onCellMenuShow={() => { }}
                onCellMenuToggleItem={() => { }}
                onCellMouseOut={() => { }}
                onCellMouseOver={() => { }}
                onCollapseNode={() => { }}
                onColumnDragStart={() => { }}
                onColumnDrop={() => { }}
                onContextMenuItem={() => { }}
                onContextMenuToggleItem={() => { }}
                onDataChange={() => { }}
                onDependencyClick={() => { }}
                onDependencyCreateDragStart={() => { }}
                onDependencyCreateDrop={() => { }}
                onDependencyDblClick={() => { }}
                onDependencyMouseOut={() => { }}
                onDependencyMouseOver={() => { }}
                onDependencyValidationComplete={() => { }}
                onDependencyValidationStart={() => { }}
                onDestroy={() => { }}
                onDragCreateEnd={() => { }}
                onDragCreateStart={() => { }}
                onEventMenuBeforeShow={() => { }}
                onEventMenuItem={() => { }}
                onEventMenuShow={() => { }}
                onEventPartialResize={() => { }}
                onEventResizeEnd={() => { }}
                onEventResizeStart={() => { }}
                onExpandNode={() => { }}
                onExport={() => { }}
                onFinishCellEdit={() => { }}
                onFocusIn={() => { }}
                onFocusOut={() => { }}
                onHeaderContextMenuBeforeShow={() => { }}
                onHeaderContextMenuShow={() => { }}
                onHeaderMenuBeforeShow={() => { }}
                onHeaderMenuItem={() => { }}
                onHeaderMenuShow={() => { }}
                onHeaderMenuToggleItem={() => { }}
                onHide={() => { }}
                onMouseOut={() => { }}
                onMouseOver={() => { }}
                onNavigate={() => { }}
                onPaint={() => { }}
                onPresetChange={() => { }}
                onReadOnly={() => { }}
                onReleaseTask={() => { }}
                onRenderRow={() => { }}
                onRenderRows={() => { }}
                onRenderTask={() => { }}
                onResize={() => { }}
                onResponsive={() => { }}
                onScheduleMenuBeforeShow={() => { }}
                onScheduleMenuItem={() => { }}
                onScheduleMenuShow={() => { }}
                onScroll={() => { }}
                onSelectionChange={() => { }}
                onShow={() => { }}
                onStartCellEdit={() => { }}
                onSubGridCollapse={() => { }}
                onSubGridExpand={() => { }}
                onTaskClick={() => { }}
                onTaskContextMenu={() => { }}
                onTaskContextMenuBeforeShow={() => { }}
                onTaskContextMenuItem={() => { }}
                onTaskContextMenuShow={() => { }}
                onTaskDblClick={() => { }}
                onTaskDrag={() => { }}
                onTaskDragStart={() => { }}
                onTaskDrop={() => { }}
                onTaskKeyDown={() => { }}
                onTaskKeyUp={() => { }}
                onTaskMenuBeforeShow={() => { }}
                onTaskMenuItem={() => { }}
                onTaskMenuShow={() => { }}
                onTaskMouseDown={() => { }}
                onTaskMouseOut={() => { }}
                onTaskMouseOver={() => { }}
                onTaskMouseUp={() => { }}
                onTaskPartialResize={() => { }}
                onTaskResizeEnd={() => { }}
                onTaskResizeStart={() => { }}
                onTimeAxisChange={() => { }}
                onTimeAxisHeaderClick={() => { }}
                onTimeAxisHeaderContextMenu={() => { }}
                onTimeAxisHeaderContextMenuBeforeShow={() => { }}
                onTimeAxisHeaderContextMenuItem={() => { }}
                onTimeAxisHeaderContextMenuShow={() => { }}
                onTimeAxisHeaderDblClick={() => { }}
                onTimelineViewportResize={() => { }}
                onToggleNode={() => { }}
                onToolClick={() => { }}

            />
        </Fragment>
    );
};

export default App;
