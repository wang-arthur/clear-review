# Post45 Published Articles

<!-- 
import {googleFonts} from "@arthurzwang-workspace/styles"
``` -->

```js
import {palettes} from "./components/patterns/cheysson.js";
import {FileAttachment} from "observablehq:stdlib";

// Load article and issue data
const articles = (await FileAttachment("./data/articles.json").json());
var issues_by_name = {};
for (const a of articles) {
  if (a["issue"] && !(a["issue"]["name"] in issues_by_name)) issues_by_name[a["issue"]["name"]] = a["issue"];
}

// Set up palette scheme
const PALETTES = ["sequential12521025", "grouped12516011"];

function renderPatterns() {
  const patternArray = PALETTES.map(p => palettes[p].patterns);
  const parser = new DOMParser();
  const fragment = document.createDocumentFragment();
  
  patternArray.forEach(patternString => {
    const patterns = parser.parseFromString(patternString, "image/svg+xml").querySelectorAll("pattern");
    patterns.forEach(pattern => fragment.appendChild(pattern))
  });
  
  return fragment;
}


function compareArticles(a, b) {
  if (a.clusterPosition && b.clusterPosition) {
    return a.clusterPosition - b.clusterPosition;
  } else if (a.clusterPosition && !b.clusterPosition) {
    return 1;
  } else if (!a.clusterPosition && b.clusterPosition) {
    return -1;
  } else {
    return new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day);
  }
}

// we're cherry-picking the solid pattern from sequential12521025 to use for "individual articles"
const rangeURLs = [
  palettes[PALETTES[0]].rangeURLs[0],
  ...PALETTES.slice(1).map(p => palettes[p].rangeURLs).flat(),
  ...palettes[PALETTES[0]].rangeURLs.slice(1)
];

function articleChart(as) {
  return Plot.plot({
    color: {
      legend: true,
      range: rangeURLs,
    },
    style: {
      backgroundColor: "#fcf5f0",
      fontSize: 12,
      fontFamily: "Roboto",
    },
    tip: true,
    x: {
      tickFormat: "",
      interval: 1
    },
    y: {
      label: "↑ Number of Articles",
      labelAnchor: "center",
      grid: true,
      axis: "both",
    },
    marks: [
      renderPatterns,
      Plot.barY(as, 
        Plot.groupX(
          {y: "count",
           sort: (d) => -1 * d[0].month,
           title: function(d) {
              var count = d.length;
              var text = d.length == 1 ? "1 Article" : `${d.length} Articles`;
              if (d[0].issue) {
                text = `${d[0].issue.name} \n` + text
              }
             return text;
            },
          },
          {
            x: "year",
            fill: (d) => d.issue ? d.issue.name : "Individual Articles",
            tip: true,
            channels: {
              articles: { value: (d) => d.toSorted(compareArticles)},
              issue_uri: { value: (d) => d[0].issue ? d[0].issue.uri : null}
            },

            render: (index, scales, values, dimensions, context, next) => {
              const g = next(index, scales, values, dimensions, context);
              // // Click handler
              // const bars = g.querySelectorAll("rect");
              // for (let i = 0; i < bars.length; i++) {
              //   const d = {articles: values.channels.articles.value[i]}
              //   bars[i].addEventListener("click", (event) => {
              //     const articles = d["articles"];
              //     const bar = event.currentTarget;
              //     const svg = context.ownerSVGElement;
              //     const container = document.querySelector('.card');
              //     // Hide other bars
              //     d3.selectAll("rect").style("opacity", 0);
              //     d3.select(bar).style("opacity", 1);

              //     d3.select(bar)
              //       .transition()
              //       .duration(750)
              //       .attr("x", 0)
              //       .attr("width", svg.clientWidth)
              //       .attr("y", 0)
              //       .attr("height", svg.clientHeight)
              //   });
              // }
              return g;
            }
          }
        )
      ),
      Plot.ruleY([0]),
    ]
  });
}

```

<div class="card">${
  resize((width) => articleChart(articles))
}</div>




