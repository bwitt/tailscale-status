
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class TailscaleStatusExtensionPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {

       
        let settings = this.getSettings();
 
        const page = new Adw.PreferencesPage();
        const group = new Adw.PreferencesGroup();

        page.add(group);

        const row = new Adw.ActionRow({ title: 'Login-Server URL' });
        group.add(row);
        const textBox = new Gtk.Entry({
            buffer: new Gtk.EntryBuffer()
        });
        textBox.set_text(settings.get_string ('login-server'));
        textBox.connect("changed", function (w) {
            // .get_buffer().text
            settings.set_string('login-server',w.get_buffer().text)
            
          });
        row.add_suffix(textBox);

        const itemsGroup = new Adw.PreferencesGroup({ title: 'Menu Items' });
        page.add(itemsGroup);

        // Names must match optionalItems in extension.js
        const items = [
            ['nodes', 'Nodes'],
            ['accounts', 'Accounts'],
            ['block-incoming', 'Block Incoming'],
            ['accept-routes', 'Accept Routes'],
            ['allow-lan', 'Allow Direct Lan Access'],
            ['receive-files', 'Accept incoming files'],
            ['send-files', 'Send Files'],
            ['exit-nodes', 'Exit Nodes'],
            ['log-out', 'Log Out'],
            ['about', 'About'],
        ];
        for (const [name, title] of items) {
            const itemRow = new Adw.SwitchRow({
                title: title,
                active: !settings.get_strv('hidden-items').includes(name)
            });
            itemRow.connect('notify::active', (r) => {
                let hidden = settings.get_strv('hidden-items').filter((n) => n != name);
                if (!r.active) {
                    hidden.push(name);
                }
                settings.set_strv('hidden-items', hidden);
            });
            itemsGroup.add(itemRow);
        }
    
        window.add(page);
    }
}






