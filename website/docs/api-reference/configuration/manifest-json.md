---
id: manifest-json
title: manifest.json
---

The manifest file describes the properties that a particular component accepts, and which controls to display in the Adalo editor. Think of them like React PropTypes, but with types specific to Adalo. You should have one manifest file per component in your library.

## Keys

Manifests include several important properties that help inform Adalo what to show in the Editor.

### `displayName`

- Type: `String`

The name of the component that will be shown in the editor

#### Example

```json
{
  "displayName": "Your Component Name"
}
```

### `defaultWidth`

- Type: `integer`

The width of a new component instance

#### Example

```json
{
  "defaultWidth": 160
}
```

### `defaultHeight`

- Type: `integer`

The height of a new component instance

#### Example

```json
{
  "defaultHeight": 24
}
```

### `resizeX`

- Type: `Boolean`
- Default: `true`

Whether the component can be horizontally resized

### `resizeY`

- Type: `Boolean`
- Default: `false`

Whether the component can be vertically resized

### `props`

- Type: `Array`

List of top-level props. See [Props](#props-1)

### `childComponents`

- Type: `Array`

List of child components. See [Child Components](#child-components)

Child components are simply a way to organize your props into different sections. See the [philosophy of child components](/docs/interactions/child-components) for a more in-depth explanation.

### `icon`

- Type: `String`
- Format: Relative path to image
- Allowed File Extensions: `.png`
- Dimensions:
  - `min-height: 268px`
  - `min-width: 312px`

The path to the icon for this component. This will be used as a thumbnail in the Components Panel. See the [thumbnail guidelines](/docs/standards/component-listing#thumbnail) for information on the logo guidelines.

#### Example Icon

<img src="/img/example-icon.png" alt="Example icon for a Libraries Component" />

## Props

Props is a list of properties that can be set on a particular component, with their types, default values, and other constraints. Each object inside the `props` array defines a specific prop that shows up in the editor as an adjustable property, and gets passed down to the component inside of the React `props` object.

Here are the different keys you can add to an Adalo prop:

### `name`

- Type: `String`
- **Required**

Technical name of the prop. This will be the same as the react component prop name. The only name you _cannot_ use is `"enabled"`. See [Reserved Prop Names](#reserved-prop-names) for more information.

#### Example

```json
{
  "props": [
    {
      "name": "propName"
    }
  ]
}
```

The props object inside the component's code will then have the format `this.props.propName`.

### `displayName`

- Type: `String`
- **Required**

The name to show in the Adalo editor and displayed to the end user

#### Example

```json
{
  "props": [
    {
      "displayName": "My Property"
    }
  ]
}
```

### `type`

- Type: `String`
- **Required**

The type of value that is expected. These follow Adalo's datatypes. The type will change what gets rendered in the left panel in the editor.

| Type      | Description                                                                                                                                                                                                |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `text`    | Arbitrary text. This may be either static or dynamic.                                                                                                                                                      |
| `number`  | Arbitrary number.                                                                                                                                                                                          |
| `boolean` | Boolean value. This will display a checkbox.                                                                                                                                                               |
| `icon`    | The name of a material icon to use. For a full list of possible icon name, see [Material Icons](https://oblador.github.io/react-native-vector-icons/)                                                      |
| `color`   | A color string: `#ffffff` or `rgba(255, 255, 255, 1)`. See the [colors and branding](/docs/design/colors-branding) reference for more information.                                                         |
| `date`    | An [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date string: `"2018-01-01T00:00:00.000Z"`                                                                                                            |
| `list`    | An array of dynamic data. See [Lists](#lists)                                                                                                                                                              |
| `action`  | A user action such as linking to another page, calling an API, etc. Your component will receive a function returning a promise. The promise will return when all of the associated actions have completed. |

#### Example

```json
{
  "props": [
    {
      "type": "text"
    }
  ]
}
```

### `default`

- Type: `Any`

The default value of this prop. Make sure that the default value follows the prop's type. For example, if the prop has type `number`, make sure that the prop's default value does not include quotes.

### `enabled`

- Type: `Object`

This is used to show or hide this specific prop based on the value of another prop. To use, pass an object with a single key (the prop name) and value (the desired value)

See the docs on [enabled](/docs/interactions/conditional-control) for a more in-depth explanation.

#### Example

For example `{ "showProp": true }` would cause this particular prop to be disabled / invisible unless the prop named "showProp" had the value `true`.

```json
{
  "props": [
    {
      "name": "showProp",
      "type": "boolean",
      "default": false
    },
    {
      "name": "prop2",
      "enabled": {
        "showProp": true
      }
    }
  ]
}
```

### `control`

- Type: `Object`

Customize the type of control presented to the user

| Key       | Type     | Description                                                               |
| --------- | -------- | ------------------------------------------------------------------------- |
| `type`    | `string` | The type of control to use: See [Controls Reference](#controls-reference) |
| `options` |          | Dependent on `type`: See [Controls Reference](#controls-reference)        |

Also see [Control Types](/docs/interactions/control-types) for an explanation of the major control types.

### `role`

- Type: `String`

Designate this as a special prop.

| Key                 | Type | Description                                                                                                                                                                                                                                             |
| ------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `listItem`          |      | This prop will be a list child: See [Lists]()                                                                                                                                                                                                           |
| `formValue`         |      | This prop is the `value` of a controlled input                                                                                                                                                                                                          |
| `formChangeHandler` |      | This prop is the `onChange` of a controlled input: `type` should be `"action"`                                                                                                                                                                          |
| `autosaveInput`     |      | Instead of the normal value, this prop will pass a `{ value, onChange }` object that can be used like a react [Controlled Component](). Value will be typed based on `type`, and `onChange` will be a function that takes a single argument, `newValue` |

Also see [Control Types](/docs/interactions/control-types) for an explanation of the major uses of the `role` prop.

### `reference`

- Type: `String`

Used in conjunction with `role` to reference a related prop.

- If role is `"listItem"` this should be a prop with `type: "list"`
- If role is `"formChangeHandler"` this should be the `"formValue"` prop name

### `helpText`

- Type: `String`

Shows smaller text below the prop in the editor to add additional information. Use this sparingly, and use descriptive display names instead wherever possible.

Help text looks like this in the editor:

<img src="/img/helptext.png" alt="Help Text Example" />

### `hidden`

- Type: `Boolean`
- Default: `false`

Whether or not to show this prop in the UI. Useful for `formChangeHandler` or anywhere that you want the default value to be passed.

#### Example

```json
{
  "props": [
    {
      "hidden": true
    }
  ]
}
```

### `styles`

- type: `Object`
- default: `null`
- required prop type: `text`

The styles property allows for custom edit styles with text properties. Any properties you add to the styles object is what will be available in the "Edit Styles" toolbar.

#### `fontFamily`

- type: `String`
- options: `@body`, `@heading`

#### `fontWeight`

- type: `Number`
- options: `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`

#### `fontSize`

- type: `Number`

#### `textAlignment`

- type: `String`
- options: `left`, `center`, `right`

#### `color`

- type: `String`
- options: `@primary`, `@secondary`, `@text`

#### Example

```json
{
  "props": [
    {
      "name": "title",
      "displayName": "Title",
      "type": "text",
      "styles": {
        "fontFamily": "@body",
        "fontSize": 16,
        "fontWeight": 500,
        "textAlignment": "center",
        "color": "@primary"
      }
    }
  ]
}
```

## Reserved Prop Names

### `enabled`

- Type: `Boolean`

This will be displayed as a switch if present in a child component's props

## Controls Reference

To customize the control for a prop, you can pass an object containing type and options to the control key of a prop. The available types of controls are:

| Type       | Description                                                                   | Keys                                                                            |
| ---------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `text`     | the default for text and number props                                         | `dynamic` (`Boolean` \| Default: `true`) - whether or not to allow dynamic text |
| `checkbox` | the default for boolean props                                                 | _no options_                                                                    |
| `icon`     | the default for icon props                                                    | _no options_                                                                    |
| `color`    | the default for color props                                                   | _no options_                                                                    |
| `action`   | the default for action props                                                  | _no options_                                                                    |
| `menu`     | special control type for text and number props                                | `options` (`Array`) - see [Menu Example](#menu-example) below                   |
| `slider`   | special control type for number props that adds a slider to control the value | `min` / `max`                                                                   |

Menu and Slider are by far the most used control types.

### Menu Example

```json
[{ "label": "Hello World", "value": "helloWorld" }]
```

### Slider Example

```json
{
  ...,
  "name": "slider",
  "displayName": "Slider",
  "type": "number",
  "control": {
    "type": "slider",
    "min": 1,
    "max": 100
  }
}
```

See [Control Types](/docs/interactions/control-types) for more in-depth examples.

## Child Components

Child components allow you to specify props for child components within your component. For example, if you create a button component, and have props specific to the icon in that button, you can optionally place those props within the `childComponents` section.

See [Child Components](/docs/interactions/child-components) for a more in-depth explanation.

### Example

Child component props will then be passed to your component in a nested format.

If you have the following in your `manifest.json` file:

```json
{
  ...,
  childComponents: [
    {
      "name": "rightIcon",
      "displayName": "Right Icon",
      "props": [
        {
          "name": "icon",
          "displayName": "Icon",
          "type": "icon",
          "default": "arrow-back"
        }
      ]
    }
  ]
}
```

Then your component will receive the following props:

```json
{
  ...,
  "rightIcon": {
    "icon": "arrow-back"
  }
}
```

### Keys

| Name          | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| `name`        | the technical name of the child component                                                    |
| `displayName` | the name to display in the Adalo editor                                                      |
| `props`       | a list of props for the child component. See [Props](#props)                                 |
| `role`        | the role of this child component. See [Lists](#lists)                                        |
| `reference`   | the `name` of a top-level prop to which this child component is related. See [Lists](#lists) |

## Lists

Components that intend to display dynamic lists of content must conform to a particular format in order to receive the necessary information.

### List Prop Type

Lists must have one top-level prop of type `list`. The name of this prop will be referenced in child components.

### Other Props

Other top-level `props` that related to the `list` prop can be denoted with the following attributes:

- `role: "listItem"`
- `reference: "YOUR_LIST_PROP"`

Inside the editor, that prop will now have access to "current list item", and inside the code the prop will now be nested inside each individual list item.

For example, if your list is called "list", and the prop you just added the role and reference to is called "prop", you would access that prop with: `this.props.list[i].prop`, where `i` is an index.

### Child Components

`childComponents` items can also be given the `role: "listItem"` and `ref` attributes to be considered list item props.

- `role: "listItem"`
- `reference: "YOUR_LIST_PROP"`

Then the props passed to your component will be nested within the list items of `YOUR_LIST_PROP` instead of at the top level.

### Example

The easiest way to understand this is by looking at a simple example. Let's say you are building a simple list component.

#### `manifest.json`

```json
{
  ...
  props: [
    {
      "name": "listItems",
      "displayName": "Select list items",
      "type": "list"
    }
  ],
  "childComponents: [
  	 {
  	   "name": "itemTitle",
  	   "role": "listItem",
  	   "reference": "listItems",
  	   "props": [
  	     {
  	       "name": "text",
  	       "displayName": "Text",
  	       "type": "text",
  	       "default": "Some title text"
  	     }
  	   ]
  	 }
  ]
}
```

#### Props

Then our component would receive the following props:

```json
{
  "listItems": [
    "id": "1",
    "itemTitle": {
    	"text": "Some title text"
    }
  ]
}
```

## Actions

Props with type `action` get passed as functions which, when called, return a promise that resolves once the actions finish.

### Arguments

Whenever you call Adalo actions, you can give that action arguments, and those arguments will be available as magic text in the edit action panel.

To make the argument to show up in the magic text selector, you must specify the argument in the manifest.json:

```json
{
  ...
  "props": [
    {
      "name": "testAction",
      "displayName": "Action",
      "type": "action",
      "arguments": [
        {
          "type": "number",
          "displayName": "Time (milliseconds)",
        },
      ]
    }
  ]
}
```

Each argument needs two options: displayName and type. Type refers to the [Adalo datatypes](#type), excluding list and action.

When you call the action in your code, you just have to call the action with the intended arguments:

```javascript
const { testAction } = this.props;
testAction(arg1, arg2);
```
