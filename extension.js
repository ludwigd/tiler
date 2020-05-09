/* Library imports */
const St = imports.gi.St;
const Lang = imports.lang;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const WorkspaceManager = global.workspace_manager || global.screen;

/* KeyManager class */
const Extension = imports.misc.extensionUtils.getCurrentExtension();
imports.searchPath.unshift(Extension.path);
const Keybindings = imports.keybindings;

/* Offered tiling options */
const tiling_options = {
    'left'             : function() {do_tile(0.5, 1, 0, 0);},
    'right'            : function() {do_tile(0.5, 1, 0.5, 0);},
    'top'              : function() {do_tile(1, 0.5, 0, 0);},
    'bottom'           : function() {do_tile(1, 0.5, 0, 0.5);},
    'top-left'         : function() {do_tile(0.5, 0.5, 0, 0);},
    'top-right'        : function() {do_tile(0.5, 0.5, 0.5, 0);},
    'bottom-left'      : function() {do_tile(0.5, 0.5, 0, 0.5);},
    'bottom-right'     : function() {do_tile(0.5, 0.5, 0.5, 0.5);},
    'left-third'       : function() {do_tile(0.34, 1, 0, 0);},
    'two-left-thirds'  : function() {do_tile(0.67, 1, 0, 0);},
    'middle-third'     : function() {do_tile(0.33, 1, 0.34, 0);},
    'two-right-thirds' : function() {do_tile(0.66, 1, 0.34, 0);},
    'right-third'      : function() {do_tile(0.33, 1, 0.67, 0);},
    'maximize'         : function() {native_maximize();}
}

/* Option names displayed in the menu. Change them to fit your prefered language. */
const tiling_option_names = {
    'left'             : 'Left',
    'right'            : 'Right',
    'top'              : 'Top',
    'bottom'           : 'Bottom',
    'top-left'         : 'Top left',
    'top-right'        : 'Top right',
    'bottom-left'      : 'Bottom left',
    'bottom-right'     : 'Bottom right',
    'left-third'       : 'Left third',
    'two-left-thirds'  : 'Two left thirds',
    'middle-third'     : 'Middle third',
    'two-right-thirds' : 'Two right thirds',
    'right-third'      : 'Right third',
    'maximize'         : 'Maximize'
}

/* Keybindings. Change to fit your needs. */
const tiling_option_bindings = {
    'left'             : '<super><alt>left',
    'right'            : '<super><alt>right',
    'top'              : '<super><alt>up',
    'bottom'           : '<super><alt>down',
    'top-left'         : '<super><alt>u',
    'top-right'        : '<super><alt>i',
    'bottom-left'      : '<super><alt>j',
    'bottom-right'     : '<super><alt>k',
    'left-third'       : '<super><alt>d',
    'two-left-thirds'  : '<super><alt>e',
    'middle-third'     : '<super><alt>f',
    'two-right-thirds' : '<super><alt>t',
    'right-third'      : '<super><alt>g',
    'maximize'         : '<super><alt>return'
}

const TilerMenuItem = new Lang.Class({
    Name: 'TilerMenuItem',
    Extends: PopupMenu.PopupBaseMenuItem,
    _init: function(name, callback) {
        this.parent();

        this.label = new St.Label({ text: name });
        this.actor.add(this.label, { expand: true });
        this.actor.label_actor = this.label;

        this.connect('activate', Lang.bind(this, callback));
    },
});

const TilerIndicator = new Lang.Class({
    Name: 'TilerIndicator',
    Extends: PanelMenu.Button,
    
    _init: function(keymanager) {
        this.parent(0.0, "Magnet", false);

        this.actor.add_style_class_name('tiling-icon');

        this.buildUI(keymanager);
    },
    
    buildUI: function(keymanager) {
        for (var key in tiling_options) {
            let name = tiling_option_names[key];
            let func = tiling_options[key];
            let accel = tiling_option_bindings[key];
            this.menu.addMenuItem(new TilerMenuItem(name, func));

            keymanager.add(accel, func);
        }
    },
});

function native_maximize() {
    let window = get_focused_window();
    window.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
}

function do_tile(width, height, xoffs, yoffs) {
    let window = get_focused_window();

    reset_window(window);
    
    let monitor = window.get_monitor();
    let workspace = WorkspaceManager.get_active_workspace();
    let workarea = workspace.get_work_area_for_monitor(monitor);

    let coordinates = {
        x: workarea.x,
        y: workarea.y,
        width: workarea.width,
        height: workarea.height
    };

    window.move_resize_frame(true,
                             coordinates.x + xoffs * coordinates.width,
                             coordinates.y + yoffs * coordinates.height,
                             coordinates.width * width,
                             coordinates.height * height);
}

function reset_window(window) {
    //window.unmaximize(Meta.MaximizeFlags.HORIZONTAL);
    //window.unmaximize(Meta.MaximizeFlags.VERTICAL);
    window.unmaximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
}


function get_focused_window() {
    let windows = WorkspaceManager.get_active_workspace().list_windows();
    let focused = false;
    for (let i=0;i<windows.length; i++) {
        if (windows[i].has_focus())
            return windows[i];
    }
}

function init() {
}

let _indicator;
let _keymanager;

function enable() {
    if (!_keymanager) {
        _keymanager = new Keybindings.Manager();
    }
    _indicator = new TilerIndicator(_keymanager);
    Main.panel.addToStatusArea('tiler-indicator', _indicator);
}

function disable() {
    if (_keymanager) {
        _keymanager.removeAll();
        _keymanager.destroy();
        _keymanager = null;
    }
    _indicator.destroy();
}


