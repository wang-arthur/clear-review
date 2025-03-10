// <!-- 
//   To Do
//   - Include/exclude special issues
//   - Special issue display (see all special issues)
//   - article display (d3 / svg rather than observable plot?)
//  -->

import {palettes, renderPatterns} from "/components/patterns/cheysson.js";
import {resize} from "observablehq:stdlib";
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

// Set up palette scheme
const PALETTES = ["sequential12521025", "grouped12516011"];

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

function idFromIssueName(name) {
  const re = /Issue (\d)+:/;
  const match = name.match(re);
  return match ? match[1] : null;
}

function articleGrid(as, fill, {width} = {}) {
  var title = "Articles";
  const firstArticle = as[0];
  if (firstArticle.issue) {
    title = firstArticle.issue.name;
    firstArticle.issue.description ? title += "\n\n" + firstArticle.issue.description : null;
  }

  return Plot.plot({
    title: title,
    width,
    style: {
      backgroundColor: fill,
      fontSize: 12,
      fontFamily: "Roboto",
    },
    x: {axis: null},
    y: {axis: null},
    fy: {axis: null},
    fill: fill,
    marks: [
      Plot.cell(as, {
        x: (d, i) => i % 3,
        fy: (d, i) => Math.floor(i  / 3),
        height: 10,
        title: (d) => d.title,
        fill: "white",
        
        text: (d) => d.title,
      }),
      Plot.text(as, {
        x: (d, i) => i % 3,
        fy: (d, i) => Math.floor(i  / 3),
        text: (d) => d.title,
        fill: "black",
        dx: 5,
        dy: 5,
        lineWidth: width ? width / 3 : 20,
        align: "start",
        baseline: "hanging",
        font: "12px sans-serif",
      }),
    ]
  });
  
  // use scaleBand to create a grid layout
  // possibly with Cell?

  // return Plot.plot({
  //   padding: 0,
  //   y: {tickFormat: Plot.formatMonth("en", "short")},
  //   marks: [
  //     Plot.cell(, Plot.group({fill: "max"}, {
  //       x: (d) => d.date.getUTCDate(),
  //       y: (d) => d.date.getUTCMonth(),
  //       fill: "temp_max",
  //       inset: 0.5
  //     }))
  //   ]
  // });
}

export function createBarChart(as) {
  // we're cherry-picking the solid pattern from sequential12521025 to use for "individual articles"
  const rangeURLs = [
    palettes[PALETTES[0]].rangeURLs[0],
    ...PALETTES.slice(1).map(p => palettes[p].rangeURLs).flat(),
    ...palettes[PALETTES[0]].rangeURLs.slice(1)
  ];
  // var issues_by_name = {};
  // for (const a of as) {
  //   if (a["issue"] && !(a["issue"]["name"] in issues_by_name)) issues_by_name[a["issue"]["name"]] = a["issue"];
  // }

  return Plot.plot({
    color: {
      legend: true,
      range: rangeURLs,
      swatchSize: 20,
      columns: 4,
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
      () => renderPatterns(PALETTES),
      Plot.barY(as, 
        Plot.groupX(
          {
            y: "count",
            sort: (d) => d[0].issue ? idFromIssueName(d[0].issue.name) : -1,
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
            fill: (d) => d.issue ? d.issue.name.split(":")[0] : "Individual Articles",
            tip: true,
            channels: {
              articles: { value: (d) => d.toSorted(compareArticles)},
              issue_uri: { value: (d) => d[0].issue ? d[0].issue.uri : null},
            },

            render: (index, scales, values, dimensions, context, next) => {
              const g = next(index, scales, values, dimensions, context);
              // Click handler
              const bars = g.querySelectorAll("rect");
              for (let i = 0; i < bars.length; i++) {
                const d = {articles: values.channels.articles.value[i]}
                // bars[i].addEventListener("click", (event) => {
                //   const articles = d["articles"];
                //   const bar = event.currentTarget;
                //   const svg = context.ownerSVGElement;
                //   const container = document.querySelector('.card');

                //   d3.select(container).html("");

                //   const card = d3.select(container)
                //       .append("div")
                //       .classed("card", true)
                //       .append(() => resize((width) => articleGrid(articles, bar.getAttribute("fill"), width)));
                // });
                // bars[i].addEventListener("click", (event) => {
                //   const articles = d["articles"];
                //   const bar = event.currentTarget;
                //   const svg = context.ownerSVGElement;
                //   const container = document.querySelector('.card');
                
                //   // Create a new container for the expanded rectangle
                //   const backgroundContainer = d3.select(container)
                //     .append("div")
                //     .classed("background-container", true)
                //     .style("position", "absolute")
                //     .style("top", 0)
                //     .style("left", 0)
                //     .style("width", "100%")
                //     .style("height", "100%")
                //     .style("z-index", -1);
                
                //   // Expand the clicked rectangle to fill the whole container
                //   const rect = d3.select(bar);
                //   rect.transition()
                //       .duration(500)
                //       .attr("x", 0)
                //       .attr("y", 0)
                //       .attr("width", container.clientWidth)
                //       .attr("height", container.clientHeight)
                //       .on("end", () => {
                //         // Move the expanded rectangle to the new container
                //         backgroundContainer.node().appendChild(bar);
                
                //         // Clear the original container and add the new visualization
                //         d3.select(container).selectAll("*:not(div.background-container)").remove();
                
                //         const card = d3.select(container)
                //             .append("div")
                //             .classed("card", true)
                //             .style("position", "absolute")
                //             .style("top", 0)
                //             .style("left", 0)
                //             .style("width", "100%")
                //             .style("height", "100%")
                //             .append(() => resize((width) => articleGrid(articles, bar.getAttribute("fill"), width)));
                //       });
                // });
              }
              return g;
            }
          }
        )
      ),
      Plot.ruleY([0]),
    ]
  });
}