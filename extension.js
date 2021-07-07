/* Library imports */
const St = imports.gi.St;
const Clutter =imports.gi.Clutter;
const Lang = imports.lang;
const Main = imports.ui.main;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;
const Gio = imports.gi.Gio;
const PanelMenu = imports.ui.panelMenu;
const PopupMenu = imports.ui.popupMenu;
const WorkspaceManager = global.workspace_manager || global.screen;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Keybindings = Extension.imports.keybindings;

// Get the GSchema for our settings
let gschema = Gio.SettingsSchemaSource.new_from_directory(
    Extension.dir.get_child('schemas').get_path(),
    Gio.SettingsSchemaSource.get_default(),
    false
);

// Create a new settings object
let settings = new Gio.Settings({
    settings_schema: gschema.lookup('org.gnome.shell.extensions.tiler', true)
});

// tiling options
const tiling_callbacks = {
    'left'             : function() {tileWindow(0.5, 1, 0, 0);},
    'right'            : function() {tileWindow(0.5, 1, 0.5, 0);},
    'top'              : function() {tileWindow(1, 0.5, 0, 0);},
    'bottom'           : function() {tileWindow(1, 0.5, 0, 0.5);},
    'top-left'         : function() {tileWindow(0.5, 0.5, 0, 0);},
    'top-right'        : function() {tileWindow(0.5, 0.5, 0.5, 0);},
    'bottom-left'      : function() {tileWindow(0.5, 0.5, 0, 0.5);},
    'bottom-right'     : function() {tileWindow(0.5, 0.5, 0.5, 0.5);},
    'left-third'       : function() {tileWindow(0.34, 1, 0, 0);},
    'two-left-thirds'  : function() {tileWindow(0.67, 1, 0, 0);},
    'middle-third'     : function() {tileWindow(0.33, 1, 0.34, 0);},
    'two-right-thirds' : function() {tileWindow(0.66, 1, 0.34, 0);},
    'right-third'      : function() {tileWindow(0.33, 1, 0.67, 0);},
    'maximize'         : function() {nativeMaximize();}
}

// Option names displayed in the menu. Change them to fit your prefered language.
const tiling_names = {
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

const TilerIndicator = new Lang.Class({
    Name: 'TilerIndicator',
    Extends: PanelMenu.Button,
    
    _init: function(keymanager) {
        this.parent(0.0, "Magnet", false);
        this.add_style_class_name('tiling-icon');
        this.buildUI(keymanager);
    },

    buildUI: function(keymanager) {
        for (var key in tiling_callbacks) {
            let name = tiling_names[key];
            let callback = tiling_callbacks[key];
            let accel = settings.get_strv(key)[0];

            let menu_item = this.make_menu_item(name, accel);
            menu_item.connect('activate', Lang.bind(menu_item, callback));
            this.menu.addMenuItem(menu_item);

            keymanager.add(accel, callback);
        }
    },

    make_menu_item: function(name, accelerator_name) {
        let menu_item = new PopupMenu.PopupBaseMenuItem();

        let menu_label = new St.Label({
            text: name,
            x_expand: true,
            y_align: Clutter.ActorAlign.CENTER,
        });
        menu_item.add(menu_label);

        let accelerator_label = new St.Label({
            text: accelerator_name,
            x_expand: false,
            y_align: Clutter.ActorAlign.CENTER,
        });
        accelerator_label.add_style_class_name('accelerator-label');
        menu_item.add(accelerator_label);

        return menu_item;
    },
});

function nativeMaximize() {
    let window = get_focused_window();
    if (window.can_maximize()) {
        window.maximize(Meta.MaximizeFlags.HORIZONTAL | Meta.MaximizeFlags.VERTICAL);
    }
}

function tileWindow(width, height, xoffs, yoffs) {
    let window = get_focused_window();    
    let workarea = window.get_work_area_current_monitor();
    
    window.unmaximize(Meta.MaximizeFlags.BOTH);

    let windowPosX = workarea.x + (workarea.width * xoffs);
    let windowPosY = workarea.y + (workarea.height * yoffs);
    let windowWidth = workarea.width * width;
    let windowHeight = workarea.height * height;
    
    window.move_resize_frame(false, windowPosX, windowPosY, windowWidth, windowHeight);
}

function get_focused_window() {
    return global.display.focus_window;
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


