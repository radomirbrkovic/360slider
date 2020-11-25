# 360° Slider

This is a simple jQuery plugin for 360° image slider which provides you easy implementation and a lot of control options. 

## Dependencies

- jQuery 3.*
- Bootstrap CSS 
- Font awesome v-4.*


## Features
- **Smooth animation**
- **Navigation buttons**
- **Play/Pause button**
- **Scroller and cursor control**


## Implementation

Just add a link to the css file in your `<head>`

```
<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css"  href="./src/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css"  href="./src/css/three-sixty-slider.css">
```

Then, before your closing `<body>` tag add: 

```
<script src="./src/js/jquery-3.3.1.min.js"></script>
      <script src="./src/js/ThreeSixtySlider.js"></script>
```

For initialize three sixty slider you need call: `$(element).threeSixtySlider()`

## Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
images | array | [] | List of images which will be showing. 
autoplay | boolean | true | Enables auto play of slides
image.width | int | 600 | Width of images in slider  
image.height | int | 300 | Height of images in slider
image.id_prefix | string | `__three-sixty-image` | Image id prefix 
navigation.control_panel | string | `__three-sixty-control-panel` | Id of navigation bar wrapper 
navigation.play| string | `__three-sixty-play-button` | Id of play/pause button 
navigation.left| string | `__three-sixty-arrow-left` | Id of "pervious" button
navigation.right| string | `__three-sixty-arrow-right` | Id of "next" button
navigation.scroll_bar| string | `__three-sixty-scroll-bar` | Id of scroll bar 
navigation.scroller| string | `__three-sixty-scroller` | Id of scroll pointer

