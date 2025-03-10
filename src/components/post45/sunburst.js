/*
Copyright 2018–2023 Observable, Inc.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


Check https://observablehq.com/@kerryrodden/sequences-sunburst

Possible with Observable Plot? https://github.com/observablehq/plot/issues/133
*/
import * as d3 from "npm:d3";
import {palettes, renderPatterns} from "/components/patterns/cheysson.js";
import {wrap} from "/components/utils.js";

// const newWindowIcon = FileAttachment("/images/noun-new-window-2440242.svg").image({width: 15, height: 15});
// const newWindowIconURL = await FileAttachment("/images/noun-new-window-2440242.svg").url();

function toMarkdown(text) {
  return text.replace(/<i>(.*?)<\/i>/g, (match, p1) => {
    return p1.split(' ').map(word => `*${word}*`).join(' ');
  });
}

function fromMarkdown(text) {
  return text.replace(/\*(.*?)\*/g, (match, p1) => {
    return p1.split(' ').map(word => `<tspan font-style="italic">${word}</tspan>`).join(' ');
  });
}

function articleCount(node) {
  return node.descendants().filter(d => !d.children).length;
}

export function createSunburst(articles) {
  const NO_ISSUE_STRING = "Individual Articles";
  const PALETTES = ["category12511021", "category12512022", "grouped12511007"];
  const rangeURLs = PALETTES.map(p => palettes[p].rangeURLs).flat();

  const groupedArticles = d3.group(articles, d => d.year, d => d.issue ? d.issue.name : NO_ISSUE_STRING);
  const data = {
    name: "Articles",
    children: [],
  };
  for (const [year, issues] of groupedArticles) {
    if (!data.children.find(d => d.name === year)) {
      data.children.push({name: year, children: []});
    }
    for (const [issue, articles] of issues) {
        if (issue === NO_ISSUE_STRING) {
          data.children.find(d => d.name === year).children.push(...articles.map(a => ({...a, name: a.title, value: 1})));
        } else {
          data.children.find(d => d.name === year).children.push({name: issue, children: articles.map(a => ({...a, name: a.title, value: 1}))});
        }
    }
  }
    // Specify the chart’s dimensions.
    const width = 928;
    const height = width + 100;
    const radius = width / 6;
    // Create the color scale.
    const color = d3.scaleOrdinal(data.children.map(d => d.name), rangeURLs);
  
    // Compute the layout.
    const hierarchy = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => {
          // ADJUST THIS TO ACCOUNT FOR COMPARISONS BETWEEN ISSUES AND ARTICLES / ARTICLES AND ARTICLES
          const nameA = a.data.name;
          const nameB = b.data.name;
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
    const root = d3.partition()
        .size([2 * Math.PI, hierarchy.height + 1])
      (hierarchy);
    root.each(d => d.current = d);
  
    // Create the arc generator.
    const arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -height / 2 - 50, width, height])
        .style("font", "15px sans-serif");

    // Add area for info on hover
    const infoArea = svg.append("text")
        .attr("class", "info-area")
        .attr("x", 0)
        .attr("y", -height / 2 + 8)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("fill", "#000");

    // Add the patterns to the SVG
    svg.node().append(renderPatterns(PALETTES));

    // TO DO: ADD SORTING HERE BY YEAR AND ISSUE NUMBER
    // Append the arcs.
    const path = svg.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("pointer-events", d => arcVisible(d.current) ? "auto" : "none")
        .attr("d", d => arc(d.current))
        .on("mouseover", (event, d) => {
          var text = d.data.name;
          if (typeof text == "string" && text.includes("Issue ")) {
            if (d.data.children[0].issue.description) {
              text += `\n\n${d.data.children[0].issue.description}`;
            }
          } else if (!d.children) {
            text += `\n\n${d.data.author}`;
          }
          infoArea.html(text);
          wrap(infoArea, 30);
        })
        .on("mouseout", (event, d) => {
          infoArea.text("");
        });
  
    // Make them clickable if they have children.
    path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);
  
    // ADD ARTICLE LINKS IF NO CHILDREN (consider adding a link to issues -- need to create a little click target to visit the issue rather than zooming into the chart)
    path.filter(d => !d.children)
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          window.open(d.data.uri, "_blank");
        });

    const format = d3.format(",d");
    path.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
    const label = svg.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("dy", "0.3em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .each(function(d) {
          var text = d.data.name
          if (typeof text == "string") {
            if (!text.startsWith("Issue ")) text = d.data.name.split(":")[0];
            if (!text.includes("*")) text = toMarkdown(text);
          }
          this.innerHTML = text;
        })
        .call(wrap, 10)
        .each(function(d){
          if (typeof d.data.name == "string" && !d.data.name.includes("*")) {
            this.innerHTML = fromMarkdown(this.innerHTML);
          }
        });

    const centerLabel = svg.append("text")
        .attr("text-anchor", "middle")
        // .style("visibility", "hidden");

    centerLabel.append("tspan")
        .attr("class", "scope")
        .attr("x", 0)
        .attr("y", 0)
        .attr("dy", "-0.1em")
        .attr("font-size", "1.5em")
        .text(`${articleCount(root)} Articles`);


    const parent = svg.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);
  
    // Handle zoom on click.
    function clicked(event, p) {
      parent.datum(p.parent || root);
  
      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth),
        depth: d.depth - p.depth,
        name: d.data.name,
      });
  
      const t = svg.transition().duration(event.altKey ? 7500 : 750);
  
      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
          .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
          .attr("pointer-events", d => arcVisible(d.target) ? "auto" : "none") 
  
          .attrTween("d", d => () => arc(d.current));
  
      label.filter(function(d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));

      var centerText = p.data.name;
      if (!p.parent) {
        centerText = `${articleCount(p)} Articles`;
      } else {
        const firstArticle = p.data.children[0];
        if (firstArticle.issue?.description) {
          centerText += "\n\n" + firstArticle.issue.description;
        }
        centerText += `\n\n${articleCount(p)} Articles`;
      }
       
      centerLabel
          .style("visibility", null)
          .select(".scope")
          .text(centerText)
          .call(wrap, 9);
    }
    
    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.depth == 1 || d.x1 - d.x0 > 0.05);
    }
  
    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03 && (d.depth == 1 || d.x1 - d.x0 > 0.05);
    }
  
    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  
    return svg.node();
}