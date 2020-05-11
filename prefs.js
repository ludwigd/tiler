'use strict';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;
const GObject = imports.gi.GObject;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Gettext = imports.gettext;

let gschema = Gio.SettingsSchemaSource.new_from_directory(
    Me.dir.get_child('schemas').get_path(),
    Gio.SettingsSchemaSource.get_default(),
    false
);

const gsettings = new Gio.Settings({
    settings_schema: gschema.lookup('org.gnome.shell.extensions.tiler', true)
});


function init() {
}

function buildPrefsWidget() {
    let layout = new Gtk.Grid({
        margin: 18,
        column_spacing: 12,
        row_spacing: 12,
        visible: true
    });

    let row = 0;

    // Left
    let leftAccel = gsettings.get_strv('left')[0];
    let leftAccelLabel = new Gtk.Label({
        label: "Tile window to the left half",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let leftAccelInput = new Gtk.Entry({
        text: leftAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(leftAccelLabel, 0, row, 1, 1);
    layout.attach(leftAccelInput, 1, row++, 1, 1);

    // Right
    let rightAccel = gsettings.get_strv('right')[0];
    let rightAccelLabel = new Gtk.Label({
        label: "Tile window to the right half",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let rightAccelInput = new Gtk.Entry({
        text: rightAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(rightAccelLabel, 0, row, 1, 1);
    layout.attach(rightAccelInput, 1, row++, 1, 1);

    // Top
    let topAccel = gsettings.get_strv('top')[0];
    let topAccelLabel = new Gtk.Label({
        label: "Tile window to the top half",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let topAccelInput = new Gtk.Entry({
        text: topAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(topAccelLabel, 0, row, 1, 1);
    layout.attach(topAccelInput, 1, row++, 1, 1);

    // Bottom
    let bottomAccel = gsettings.get_strv('bottom')[0];
    let bottomAccelLabel = new Gtk.Label({
        label: "Tile window to the bottom half",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let bottomAccelInput = new Gtk.Entry({
        text: bottomAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(bottomAccelLabel, 0, row, 1, 1);
    layout.attach(bottomAccelInput, 1, row++, 1, 1);

    // Top left
    let topLeftAccel = gsettings.get_strv('top-left')[0];
    let topLeftAccelLabel = new Gtk.Label({
        label: "Tile window to the top left corner",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let topLeftAccelInput = new Gtk.Entry({
        text: topLeftAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(topLeftAccelLabel, 0, row, 1, 1);
    layout.attach(topLeftAccelInput, 1, row++, 1, 1);

    // Top right
    let topRightAccel = gsettings.get_strv('top-right')[0];
    let topRightAccelLabel = new Gtk.Label({
        label: "Tile window to the top right corner",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let topRightAccelInput = new Gtk.Entry({
        text: topRightAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(topRightAccelLabel, 0, row, 1, 1);
    layout.attach(topRightAccelInput, 1, row++, 1, 1);

    // Bottom left
    let bottomLeftAccel = gsettings.get_strv('bottom-left')[0];
    let bottomLeftAccelLabel = new Gtk.Label({
        label: "Tile window to the bottom left corner",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let bottomLeftAccelInput = new Gtk.Entry({
        text: bottomLeftAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(bottomLeftAccelLabel, 0, row, 1, 1);
    layout.attach(bottomLeftAccelInput, 1, row++, 1, 1);

    // Bottom right
    let bottomRightAccel = gsettings.get_strv('bottom-right')[0];
    let bottomRightAccelLabel = new Gtk.Label({
        label: "Tile window to the bottom right corner",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let bottomRightAccelInput = new Gtk.Entry({
        text: bottomRightAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(bottomRightAccelLabel, 0, row, 1, 1);
    layout.attach(bottomRightAccelInput, 1, row++, 1, 1);

    // Left third
    let leftThirdAccel = gsettings.get_strv('left-third')[0];
    let leftThirdAccelLabel = new Gtk.Label({
        label: "Tile window to the left third of the screen",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let leftThirdAccelInput = new Gtk.Entry({
        text: leftThirdAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(leftThirdAccelLabel, 0, row, 1, 1);
    layout.attach(leftThirdAccelInput, 1, row++, 1, 1);

    // Two left thirds
    let twoLeftThirdAccel = gsettings.get_strv('two-left-thirds')[0];
    let twoLeftThirdAccelLabel = new Gtk.Label({
        label: "Tile window to the two left thirds",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let twoLeftThirdAccelInput = new Gtk.Entry({
        text: twoLeftThirdAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(twoLeftThirdAccelLabel, 0, row, 1, 1);
    layout.attach(twoLeftThirdAccelInput, 1, row++, 1, 1);

    // Middle third
    let middleThirdAccel = gsettings.get_strv('middle-third')[0];
    let middleThirdAccelLabel = new Gtk.Label({
        label: "Tile window to the middle third",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let middleThirdAccelInput = new Gtk.Entry({
        text: middleThirdAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(middleThirdAccelLabel, 0, row, 1, 1);
    layout.attach(middleThirdAccelInput, 1, row++, 1, 1);

    // Two right thirds
    let twoRightThirdAccel = gsettings.get_strv('two-right-thirds')[0];
    let twoRightThirdAccelLabel = new Gtk.Label({
        label: "Tile window to the two right thirds",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let twoRightThirdAccelInput = new Gtk.Entry({
        text: twoRightThirdAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(twoRightThirdAccelLabel, 0, row, 1, 1);
    layout.attach(twoRightThirdAccelInput, 1, row++, 1, 1);

    // Right third
    let rightThirdAccel = gsettings.get_strv('right-third')[0];
    let rightThirdAccelLabel = new Gtk.Label({
        label: "Tile window to the right third of the screen",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let rightThirdAccelInput = new Gtk.Entry({
        text: rightThirdAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(rightThirdAccelLabel, 0, row, 1, 1);
    layout.attach(rightThirdAccelInput, 1, row++, 1, 1);

    // Maximize
    let maximizeAccel = gsettings.get_strv('maximize')[0];
    let maximizeAccelLabel = new Gtk.Label({
        label: "Maximize window",
        visible: true,
        hexpand: true,
        halign: Gtk.Align.START
    });
    let maximizeAccelInput = new Gtk.Entry({
        text: maximizeAccel,
        halign: Gtk.Align.END,
        visible: true
    });
    layout.attach(maximizeAccelLabel, 0, row, 1, 1);
    layout.attach(maximizeAccelInput, 1, row++, 1, 1);


    // Add restart notice
    let separator = new Gtk.Separator({
        orientation: Gtk.Orientation.HORIZONTAL,
        visible: true
    });
    layout.attach(separator, 0, row++, 2, 1);
    
    let reload_notice = new Gtk.Label({
        label: `<b>Reloading extension is required for changes to take effect.</b>`,
        halign: Gtk.Align.CENTER,
        use_markup: true,
        visible: true
    });
    layout.attach(reload_notice, 0, row++, 2, 1);

    // bind to gsettings
    leftAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('left', [entry.text]);
    });
    rightAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('right', [entry.text]);
    });
    topAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('top', [entry.text]);
    });
    bottomAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('bottom', [entry.text]);
    });
    topLeftAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('top-left', [entry.text]);
    });
    topRightAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('top-right', [entry.text]);
    });
    bottomLeftAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('bottom-left', [entry.text]);
    });
    bottomRightAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('bottom-right', [entry.text]);
    });
    leftThirdAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('left-third', [entry.text]);
    });
    twoLeftThirdAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('two-left-thirds', [entry.text]);
    });
    middleThirdAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('middle-third', [entry.text]);
    });
    twoRightThirdAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('two-right-thirds', [entry.text]);
    });
    rightThirdAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('right-third', [entry.text]);
    });
    maximizeAccelInput.connect('changed', function(entry) {
        gsettings.set_strv('maximize', [entry.text]);
    });
    
    return layout;
}
