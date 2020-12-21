### TODO

- investigate using extension storage instead of local storage.
- Generecize watch logic so that we don't have to watch every key in our state
- Make format input provide an autocomplete list of variables when you type "%"
- Get Vue devtools working
- add a dotenv and make a publish npm script
- Add a permanent addon id
  - https://extensionworkshop.com/documentation/develop/extensions-and-the-add-on-id/
  - Need to do this when publishing via AMO API otherwise it publishes a new extension each time rather than updating the original one
- Settings export / import
  - So I can update versions without losing my settings
- How to deploy this?
  - web-ext sign with api-key and api-secret from https://addons.mozilla.org/en-US/developers/addon/api/key/
  - signed extension file (.xpi) is on github for now

* Is there any sort of security implications or protections provided by executeScript

### BUGS

- Clipboard background image doesn't load when installed on local FF

### IDEAS

- Browseraction could only include template selection and clip it button and the rest could be moved to a dedicated tab.
- Left-click browseraction icon to clip it with currently selected template; right-click to select the template.
- Assign colors and monikers to templates that could display in the browseraction icon so you know which template you're clipping when left-clicking.
- Use templates within other templates? Maybe another symbol for using template names like "#"
- Store of premade templates
  - Could support versioning in case a website's markup changes
  - Probably a HUGE security concern

### DONE

x Errors are shown if any variable cannot be run on a page even if it's unused by the current template. Seems like all variables are being evaluated?
  - Fixed by only running query for variables in use by the current template in the executed script in App.vue
x First template doesn't clipit?
x Can't add templates after deleting them sometimes because id generation is not unique
x Need keys for variables, and therefore need ids?
x variable queries are not run in the content script
x use result of variable queries in format
x investigate using a framework
x be able to delete variables
x weird fields population when there's no localStorage value.
x Display errors in UI
x Divide app into two tabs: one for templates and one for a global set of variables
