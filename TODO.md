x variable queries are not run in the content script
x use result of variable queries in format
x investigate using a framework
x be able to delete variables
x weird fields population when there's no localStorage value.

- When you first open it there are no variables and no localStorage, if you add a variable and close the popup then reopen it there are TWO variables instead of one.
- investigate using extension storage instead of local storage.
- Generecize watch logic so that we don't have to watch every key in our state
  x Divide app into two tabs: one for templates and one for a global set of variables
- Make format input provide an autocomplete list of variables when you type "%"
- Display errors in UI
- Get Vue devtools working

- How to deploy this?
  - web-ext sign with api-key and api-secret from https://addons.mozilla.org/en-US/developers/addon/api/key/
  - signed extension file (.xpi) is on github for now

* Is there any sort of security implications or protections provided by executeScript

BUGS

x First template doesn't clipit?

- Can't add templates after deleting them sometimes because id generation is not unique
- Need keys for variables, and therefore need ids?
