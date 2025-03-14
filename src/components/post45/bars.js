import {palettes, renderPatterns} from "/components/patterns/cheysson.js";
import {resize} from "observablehq:stdlib";
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import { FileAttachment } from "observablehq:stdlib";

const backIcon = await FileAttachment("/images/noun-back-7647782.svg").image();

// Set up palette scheme
const PALETTES = ["sequential12521025", "grouped12516011"];

const ARTICLE_CATEGORIES = ["Introduction", "Article"]; //, "Afterword", "Interview"];
const CATEGORY_SCALE = d3.scaleOrdinal()
    .domain(ARTICLE_CATEGORIES)
    .range(["bg-rose-100", "bg-indigo-100"]);

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

function formatArticleDate(a) {
  return new Date(a.year, a.month, a.day).toLocaleString('default', {year: 'numeric', month: 'long', day: 'numeric'});
}

function articleGrid(as, fill, width) {
  var titleText,
      titleURL = null,
      description = "",
      date = ""
  const firstArticle = as[0];
  if (firstArticle.issue) {
    titleText = firstArticle.issue.name;
    titleURL = firstArticle.issue.uri;
    description = firstArticle.issue.description ? firstArticle.issue.description : "";
    date = formatArticleDate(firstArticle);
  } else {
    titleText = `Articles published in ${firstArticle.year}`;
    // We don't currently have a year archive for journal articles
    // titleURL = "https://post45.org/"
  }

  const gridFigure = d3.select(".bars-card")
      .append("figure")
      .classed("article-grid", true)
      .style("max-width", "initial")
      .style("position", "relative")

  const gridContainer = gridFigure.append("div")
      .append("div")
      .classed("mx-auto max-w-7xl px-2 lg:px-4", true);

  const gridHeader = gridContainer.append("div")
      .classed("py-2", true);
      
  if (titleURL) {
    gridHeader.append("h2")
        .append("a")
        .classed("font-bold text-2xl", true)
        .attr("href", titleURL)
        .attr("target", "_blank")
        .text(titleText);
  } else {
    gridHeader.append("h2")
        .append("span")
        .classed("font-bold text-2xl", true)
        .text(titleText);
  }

  if (description) {
    gridHeader.append("h3")
        .text(description);
  }
  if (date) {
    gridHeader.append("h3")
        .text(date);
  }

  const gridDisplay = gridContainer.append("div")
      .classed("mx-auto grid auto-rows-max max-w-2xl grid-cols-1 gap-x-8 gap-y-8 border-t border-gray-200 pt-2 sm:pt-2 lg:mx-0 lg:max-w-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", true)

  as.forEach((d, i) => {
    const article = gridDisplay.append("article")
        .classed("flex **:!no-underline max-w-xl bg-gray-100 flex-col items-start justify-between rounded-lg has-hover:bg-gray-200", true)
        .append("a")
        .classed("w-full h-full p-3 flex flex-col", true)
        .attr("href", d.uri)
        .attr("target", "_blank")

    const metaDiv = article.append("div")
        .classed("items-center gap-x-4 text-xs", true);

    // add date if this isn't a special issue
    if (!firstArticle.issue) {
      metaDiv.append("time")
      .classed("text-gray-500 px-1.5 py-1", true)
      .text(formatArticleDate(d));
    }

    let title = d.title,
        category = "Article";

    // A better way to check article type would be to add a tag to the article metadata
    if (d.issue && d.title.includes("Introduction")) {
      category = "Introduction";
      if (d.title.startsWith("Introduction: ")) title = d.title.slice("Introduction: ".length);
    }
    metaDiv.append("span")
        .classed(`z-10 rounded-full ${CATEGORY_SCALE(category)} px-1.5 py-1 text-gray-600`, true)
        .text(category);

    article.append("div")
        .classed("mx-1.5 text-lg/6 font-semibold mt-3 text-gray-900", true)
        .append("h3")
        .html(title);
      
    // add author
    article.append("div")
        .classed("w-full flex flex-col flex-1", true)
        .append("p")
        .classed("mt-auto self-end text-sm/4 text-gray-600", true)
        .text(d.author);
  });
  return gridFigure.node();


}

export function createBarChart(as, width=1000) {
  // we're cherry-picking the solid pattern from sequential12521025 to use for "individual articles"
  const rangeURLs = [
    palettes[PALETTES[0]].rangeURLs[0],
    ...PALETTES.slice(1).map(p => palettes[p].rangeURLs).flat(),
    ...palettes[PALETTES[0]].rangeURLs.slice(1)
  ];
  const chartNode = Plot.plot({
    className: "bars",
    color: {
      legend: true,
      range: rangeURLs,
      swatchSize: 20,
      columns: 4,
    },
    width: Math.max(width, 500),
    style: {
      backgroundColor: "#fcf5f0",
      fontSize: 12,
      fontFamily: "Roboto",
    },
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
            title: function(d) {
              var text = d.length == 1 ? "1 Article" : `${d.length} Articles`;
              if (d[0].issue) {
                text = `${d[0].issue.name} \n` + text
              }
             return text;
            },
          },
          {
            x: "year",
            tip: "xy",
            fill: (d) => d.issue ? d.issue.name.split(":")[0] : "Individual Articles",
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
                bars[i].addEventListener("pointerdown", (event) => {
                  event.stopPropagation();
                  const articles = d["articles"];
                  const fill = event.currentTarget.getAttribute("fill");
                  const container = d3.select('.card');

                  container.select("figure")
                      .transition()
                      .duration(500)
                      .style("opacity", 0)
                      .on("end", () => {
                        container.select("figure")
                            .remove();
                        container.append(() => articleGrid(articles, fill, width))
                            // add back button
                            .style("position", "relative")
                            .append("img")
                            .attr("src", backIcon.src)
                            .style("cursor", "pointer")
                            .style("width", "25px")
                            .style("height", "25px")
                            .style("position", "absolute")
                            .style("top", 0)
                            .style("right", 0)
                            .on("click", () => {
                              // transition back to the original bar chart
                              container.select("figure")
                                  .transition()
                                  .duration(500)
                                  .style("opacity", 0)
                                  .on("end", () => {
                                    container.select("figure")
                                        .remove();
                                    container.append(() => createBarChart(as, width));
                                  });
                            });
                    });
                });
              }
              return g;
            }
          }
        )
      ),
      Plot.ruleY([0]),
    ]
  });

  
  const chart = d3.select(chartNode)
  chart.selectAll("rect")
      .style("cursor", "pointer");

  return chartNode;
}