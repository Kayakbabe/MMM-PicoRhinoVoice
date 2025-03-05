# MMM-PicoRhinoVoice
Use this template for creating new MagicMirror² modules.

See the [wiki page](https://github.com/Kayakbabe/MMM-PicoRhinoVoice/wiki) for an in depth overview of how to get started.

# MMM-PicoRhinoVoice

![Example of MMM-PicoRhinoVoice](./example_1.png)

[Module description]

## Installation

### Install

In your terminal, go to your [MagicMirror²][mm] Module folder and clone MMM-PicoRhinoVoice:

```bash
cd ~/MagicMirror/modules
git clone https://github.com/Kayakbabe/MMM-PicoRhinoVoice.git

and
npm install @picovoice/rhino-node

```

### Update

```bash
cd ~/MagicMirror/modules/MMM-PicoRhinoVoice
git pull
```

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:

```js
    {
        module: 'MMM-PicoRhinoVoice',
        position: 'lower_third',
        accessKey: '',
    },
```

Or you could use all the options:

```js
    {
        module: 'MMM-PicoRhinoVoice',
        position: 'lower_third',
        accessKey: '', //your own picovoice access key that you obtain from picovoice.com
        config: {
            exampleContent: 'Welcome world'
        }
    },
```

## Configuration options

Option|Possible values|Default|Description
------|------|------|-----------
`exampleContent`|`string`|not available|The content to show on the page
`accessKey`|`string`|not available|REQUIRED your own accesskey obtained from picovoice.ai

## Sending notifications to the module

Notification|Description
------|-----------
`TEMPLATE_RANDOM_TEXT`|Payload must contain the text that needs to be shown on this module

## Notifications sent to MagicMirror by this module

Notification|Description
------|-----------
`Page:{n}`|Payload send notificaiton to pages module to go to page number specified
`Page:forward{n}`|Payload send notificaiton to pages module to go to page number specified
`Page:back{n}`|Payload send notificaiton to pages module to go to page number specified
`Page:home`|Payload send notificaiton to pages module to go to page named "home" in pages module
`Page:admin`|Payload send notificaiton to pages module to go to page named "admin" in pages module
`Page:main`|Payload send notificaiton to pages module to go to page named "main" in pages module
`Page:first`|Payload send notificaiton to pages module to go "first" page as defined in pages module
`Page:last`|Payload send notificaiton to pages module to go to "last" page as defined in pages module
`Page:bob`|Payload send notificaiton to pages module to go to a page "bob" as defined in pages module

## Notes
This module waits until ALL_MODULES_STARTED and DOM_OBJECTS_CREATED are send by the MagicMirror system 
for two reasons. One, it doesn't make sense to use voice until you can actually do something to the mirror and 
Two, this module contains a few add-ons which require the DOM to be fully loaded.



## Developer commands

- `npm install` - Install devDependencies like ESLint.
- `npm run lint` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

[mm]: https://github.com/MagicMirrorOrg/MagicMirror
