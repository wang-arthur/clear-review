import * as d3 from 'npm:d3';
import * as Plot from "npm:@observablehq/plot";
// https://gist.github.com/mbostock/7555321

export function wrap(input, width) {
  input.each(function(d) {
    if (d !== undefined && Number.isInteger(d.data.name)) return;
    
    let text = d3.select(this);
    // Create a dummy text plot to handle wrapping
    // inefficient hack, but fine for small number of text elements
    let textPlot = Plot.text([text.text()], {
      lineWidth: width,
      lineHeight: 1.15,
    }).plot({x: {type: "point"}, y: {type: "point"}}); // set x/y type to point to avoid Observable Plot warnings
    
    // replace text with wrapped text from Plot.text
    let wrappedHTML = d3.select(textPlot).select("g:last-of-type").select("text").html();
    text.html(wrappedHTML);
    
    const tspan = text.select("tspan");
    if (!tspan.empty()) {
      tspan.attr("dy", tspan.attr("y"));
      tspan.attr("y", null);
    }
  });
}
