x variable queries are not run in the content script
x use result of variable queries in format
x investigate using a framework
x be able to delete variables
x weird fields population when there's no localStorage value.
x Display errors in UI
x Divide app into two tabs: one for templates and one for a global set of variables

- investigate using extension storage instead of local storage.
- Generecize watch logic so that we don't have to watch every key in our state
- Make format input provide an autocomplete list of variables when you type "%"
- Get Vue devtools working
- add a dotenv and make a publish npm script

- How to deploy this?
  - web-ext sign with api-key and api-secret from https://addons.mozilla.org/en-US/developers/addon/api/key/
  - signed extension file (.xpi) is on github for now

* Is there any sort of security implications or protections provided by executeScript

BUGS

- Clipboard background image doesn't load when installed on local FF

x First template doesn't clipit?

x Can't add templates after deleting them sometimes because id generation is not unique

x Need keys for variables, and therefore need ids?
