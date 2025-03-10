# [*Post45*](https://post45.org/journal) Articles

```js
import {createBarChart} from "/components/post45/bars.js";
import {createSunburst} from "/components/post45/sunburst.js";
import {FileAttachment} from "observablehq:stdlib";

const articles = await FileAttachment("/data/articles.json").json();
```

## Articles by year (Sunburst)
<div class="card sunburst-card">${display(createSunburst(articles))}</div>

## Articles by year (Bars)
<div class="card bars-card">${display(createBarChart(articles))}</div>