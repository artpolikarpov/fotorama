A [DocPad](https://github.com/bevry/docpad) plugin that automatically generates menu structure from `documents` folder for your web-site.

## Installation ##

Run `npm install --save docpad-plugin-menu` command in your DocPad project root.
    
## How it works ##

This plugin takes a plain list of document files and creates structured menu. The `templateData` object of your DocPad config is extended with `generateMenu(url)` which takes passed URL (in most cases, the URL of rendered document) and generates menu aginst it. Each menu item contains `state` property that holds highlighting state of item.

Possible values:

* `"current"`: item is a currently viewed document
* `"parent"`: item contains currently viewed document
* `false`: regular item

The best way to output menu is to use [partials](https://github.com/docpad/docpad-plugin-partials):

1. Create `menu.html.eco` partial (I’m using [Eco](https://github.com/sstephenson/eco) templates, but you can use any other):

```html
<!-- Define `renderMenu` partial -->
<% renderMenu = (items) => %>
<ul class="nav">
    <% for item in items: %>
        <!-- Highlight menu item if its `item.state` is not false -->
        <li<% if item.state: %> class="selected"<% end %>>
            <!-- Remove link if we’re currently viewing this document -->
            <% if item.state != 'current': %>
                <a href="<%= item.url %>"><%= item.title %></a>
            <% else: %>
                <strong><%= item.title %></strong>
            <% end %>
            <!-- Render submenu if item has children -->
            <% if item.children: %>
                <%- renderMenu(item.children) %>
            <% end %>
        </li>
    <% end %>
</ul>   
<% end %>
<!-- Run `renderMenu` partial aginst passed `menuItems` meta-data  -->
<%= renderMenu @menuItems %>
```

2. In your template, invoke `menu.html.eco` partial and pass `menuItems` context object containing menu state for currently viewed document:

```html
<!doctype html>
<html lang="en">
<head>
    <title>Document</title>
</head>
<body>
    <nav>
        <%- @partial('menu.html.eco', {menuItems: @generateMenu(@document.url)}) %>
    </nav>
</body>
</html>
```

## Document meta-data ##

You can supply your document headers with menu-specific meta-data:

* `menuTitle`: string. Title of menu item. If not defined, document’s `title` property is used.
* `menuHidden`: boolean. Should current item and its children appear in menu
* `menuOrder`: number. Order of menu item in its parent. Sorting is ascending.

## Plugin configuration ##

In DocPad config file, you can add `menuOptions` object with the following properties:

* `optimize`: boolean. Optimize menu structure: items like `/about/index.html` will be omitted in favour of parent’s `/about/` item. E.g. this option will remove all `index.html` file names from generated structure. Default is `true`.
* `skipEmpty`: boolean. Removes indermediate items from menu structure that has no content. Default is `true`.
* `skipFiles`: regexp. Regular expression to skip files from generated menu structure. If document full url matches this regexp, it will not appear in menu.

Plugin usage examples can be found in [Emmet Documentation](https://github.com/emmetio/emmet-docs) web-site source.
