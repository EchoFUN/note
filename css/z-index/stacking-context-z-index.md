

### Stack Context & Stacking Levels ###

CSS box dimensions:
  * x axis
  * y axis
  * z axis

Stack Context & Stacking Levels:
  Browser render your design elements along the z-axis it has to deside which element to draw on the canvas first.The order in terms of stacking contexts and stacking levels.


Stacking Context:
One stacking context context created by default with any web page.The root of that stacking context is the html element and elements inside that stacking context are located on different stacking within that default context.

Add a Stacking Context:
When you add css positioning to an element and give it a z-index(other than auto)it creates new stacking context with new stacking levels inside the new context.

The z-index value creates a new integer stacking level for that element with a position along the z-axis set relative to the other boxes within the same stacking context.


Stacking order:

1. Positioned elements without z-index applied or z-index: 0 are on a higher stacking level than non-positioned elements. Even if you don’t specify a z-index (default becomes auto) your positioned element will appear on a higher layer than block level elements in the normal document flow.

1. Floated elements have a higher stacking level than block level elements in the normal document flow, but a lower stacking level than positioned elements without z-index applied.

