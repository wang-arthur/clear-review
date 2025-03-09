# [*Post45*](https://post45.org/journal) Articles

```js
import {articles, articleChart} from "/components/post45/bars.js";
import {sunburst} from "/components/post45/sunburst.js";
```

# Articles by year (Sunburst)
```js
display(sunburst)
```
<div class="card">${
  resize((width) => sunburst)
}</div>

## Articles by year (Bars)
<div class="card">${
  resize((width) => articleChart(articles))
}</div>