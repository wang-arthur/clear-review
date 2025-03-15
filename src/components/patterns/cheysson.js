/*
## License

ISC License (ISC)
Copyright 2021 Tom Shanley

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
https://observablehq.com/@tomshanley/cheysson-color-palettes
*/

import {FileAttachment} from "observablehq:stdlib";
import * as d3 from "npm:d3";

export const palettes = {
  diverging12541021: {
    displayName: "Diverging 12541.021",
    day: 1,
    type: "diverging",
    patterns: await FileAttachment("dec01.svg").text(),
    range: [
        "diverging-12541021-1",
        "diverging-12541021-2",
        "diverging-12541021-3",
        "diverging-12541021-4",
        "diverging-12541021-5",
        "diverging-12541021-6",
        "diverging-12541021-7"
    ],
    rangeURLs: [
        "url(#diverging-12541021-1)",
        "url(#diverging-12541021-2)",
        "url(#diverging-12541021-3)",
        "url(#diverging-12541021-4)",
        "url(#diverging-12541021-5)",
        "url(#diverging-12541021-6)",
        "url(#diverging-12541021-7)"
    ]
  },
  grouped12516024: {
    displayName: "Grouped 12541.021",
    day: 2,
     type: "grouped",
    patterns: await FileAttachment("dec02.svg").text(),
    range: [
      "grouped-12516024-1",
      "grouped-12516024-2",
      "grouped-12516024-3",
      "grouped-12516024-4",
      "grouped-12516024-5",
      "grouped-12516024-6",
      "grouped-12516024-7",
      "grouped-12516024-8"
    ],
    rangeURLs: [
      "url(#grouped-12516024-1)",
      "url(#grouped-12516024-2)",
      "url(#grouped-12516024-3)",
      "url(#grouped-12516024-4)",
      "url(#grouped-12516024-5)",
      "url(#grouped-12516024-6)",
      "url(#grouped-12516024-7)",
      "url(#grouped-12516024-8)"
    ]
  },
  sequential12512012: {
    displayName: "Sequential 12512.012",
    day: 3,
    type: "sequential",
    patterns: await FileAttachment("dec03.svg").text(),
    range: [
      "sequential-12512012-1",
      "sequential-12512012-2",
      "sequential-12512012-3"
    ],
    rangeURLs: [
      "url(#sequential-12512012-1)",
      "url(#sequential-12512012-2)",
      "url(#sequential-12512012-3)"
    ]
  },
  grouped12516017: {
    displayName: "Grouped 12541.021",
    day: 4,
    type: "grouped",
    patterns: await FileAttachment("dec04.svg").text(),
    range: [
      "grouped-12516017-1",
      "grouped-12516017-2",
      "grouped-12516017-3",
      "grouped-12516017-4"
    ],
    rangeURLs: [
      "url(#grouped-12516017-1)",
      "url(#grouped-12516017-2)",
      "url(#grouped-12516017-3)",
      "url(#grouped-12516017-4)"
    ]
  },
  category12516028: {
    displayName: "Category 12516.028",
    day: 5,
    type: "category",
    patterns: await FileAttachment("dec05.svg").text(),
    range: [
      "category-12516028-1",
      "category-12516028-2",
      "category-12516028-3",
      "category-12516028-4",
      "category-12516028-5",
      "category-12516028-6"
    ],
    rangeURLs: [
      "url(#category-12516028-1)",
      "url(#category-12516028-2)",
      "url(#category-12516028-3)",
      "url(#category-12516028-4)",
      "url(#category-12516028-5)",
      "url(#category-12516028-6)"
    ]
  },
  grouped12511007: {
    displayName: "Grouped 12511.007",
    day: 6,
    type: "grouped",
    patterns: await FileAttachment("dec06@5.svg").text(),
    range: [
      "grouped-12511007-1",
      "grouped-12511007-2",
      "grouped-12511007-3",
      "grouped-12511007-4",
      "grouped-12511007-5",
      "grouped-12511007-6",
      "grouped-12511007-7"
    ],
    rangeURLs: [
      "url(#grouped-12511007-1)",
      "url(#grouped-12511007-2)",
      "url(#grouped-12511007-3)",
      "url(#grouped-12511007-4)",
      "url(#grouped-12511007-5)",
      "url(#grouped-12511007-6)",
      "url(#grouped-12511007-7)"
    ]
  },
  grouped12516011: {
    displayName: "Grouped 12511.007",
    day: 7,
    type: "grouped",
    patterns: await FileAttachment("dec07@4.svg").text(),
    range: [
      "grouped-12516011-1",
      "grouped-12516011-2",
      "grouped-12516011-3",
      "grouped-12516011-4",
      "grouped-12516011-5",
      "grouped-12516011-6",
      "grouped-12516011-7",
      "grouped-12516011-8"
    ],
    rangeURLs: [
      "url(#grouped-12516011-1)",
      "url(#grouped-12516011-2)",
      "url(#grouped-12516011-3)",
      "url(#grouped-12516011-4)",
      "url(#grouped-12516011-5)",
      "url(#grouped-12516011-6)",
      "url(#grouped-12516011-7)",
      "url(#grouped-12516011-8)"
    ]
  },
  grouped12518022: {
    displayName: "Grouped 12518.022",
    day: 8,
    type: "grouped",
    patterns: await FileAttachment("dec08@1.svg").text(),
    range: [
      "grouped-12518022-1",
      "grouped-12518022-2",
      "grouped-12518022-3",
      "grouped-12518022-4",
      "grouped-12518022-5",
      "grouped-12518022-6"
    ],
    rangeURLs: [
      "url(#grouped-12518022-1)",
      "url(#grouped-12518022-2)",
      "url(#grouped-12518022-3)",
      "url(#grouped-12518022-4)",
      "url(#grouped-12518022-5)",
      "url(#grouped-12518022-6)"
    ]
  },
  sequential12519027: {
    displayName: "Sequential 12519.027",
    day: 9,
    type: "sequential",
    patterns: await FileAttachment("dec09.svg").text(),
    range: [
      "sequential-12519027-1",
      "sequential-12519027-2",
      "sequential-12519027-3",
      "sequential-12519027-4",
      "sequential-12519027-5"
    ],
    rangeURLs: [
      "url(#sequential-12519027-1)",
      "url(#sequential-12519027-2)",
      "url(#sequential-12519027-3)",
      "url(#sequential-12519027-4)",
      "url(#sequential-12519027-5)"
    ]
  },
  sequential12524016: {
    displayName: "Sequential 12524.016",
    day: 10,
    type: "sequential",
    patterns: await FileAttachment("dec10.svg").text(),
    range: [
      "sequential-12524016-1",
      "sequential-12524016-2",
      "sequential-12524016-3",
      "sequential-12524016-4"
    ],
    rangeURLs: [
      "url(#sequential-12524016-1)",
      "url(#sequential-12524016-2)",
      "url(#sequential-12524016-3)",
      "url(#sequential-12524016-4)"
    ]
  },
  grouped12521014: {
    displayName: "Grouped 12521.014",
    day: 11,
    type: "grouped",
    patterns: await FileAttachment("dec11.svg").text(),
    range: ["grouped-12521014-1", "grouped-12521014-2", "grouped-12521014-3"],
    rangeURLs: [
      "url(#grouped-12521014-1)",
      "url(#grouped-12521014-2)",
      "url(#grouped-12521014-3)"
    ]
  },
  sequential12521025: {
    displayName: "Sequential 12521.025",
    day: 12,
    type: "sequential",
    patterns: await FileAttachment("dec12@5.svg").text(),
    range: [
      "sequential-12521025-1",
      "sequential-12521025-2",
      "sequential-12521025-3",
      "sequential-12521025-4",
      "sequential-12521025-5",
      "sequential-12521025-6",
      "sequential-12521025-7"
    ],
    rangeURLs: [
      "url(#sequential-12521025-1)",
      "url(#sequential-12521025-2)",
      "url(#sequential-12521025-3)",
      "url(#sequential-12521025-4)",
      "url(#sequential-12521025-5)",
      "url(#sequential-12521025-6)",
      "url(#sequential-12521025-7)"
    ]
  },
  category12526006: {
    displayName: "Category 12526.006",
    day: 13,
    type: "category",
    patterns: await FileAttachment("dec13.svg").text(),
    range: [
      "category-12526006-1",
      "category-12526006-2",
      "category-12526006-3",
      "category-12526006-4",
      "category-12526006-5",
      "category-12526006-6"
    ],
    rangeURLs: [
      "url(#category-12526006-1)",
      "url(#category-12526006-2)",
      "url(#category-12526006-3)",
      "url(#category-12526006-4)",
      "url(#category-12526006-5)",
      "url(#category-12526006-6)"
    ]
  },
  grouped12513018: {
    displayName: "Grouped 12513.018",
    day: 14,
    type: "grouped",
    patterns: await FileAttachment("dec14.svg").text(),
    range: [
      "grouped-12513018-1",
      "grouped-12513018-2",
      "grouped-12513018-3",
      "grouped-12513018-4"
    ],
    rangeURLs: [
      "url(#grouped-12513018-1)",
      "url(#grouped-12513018-2)",
      "url(#grouped-12513018-3)",
      "url(#grouped-12513018-4)"
    ]
  },
  grouped12516018: {
    displayName: "Grouped 12516.018",
    day: 15,
    type: "grouped",
    patterns: await FileAttachment("dec15@1.svg").text(),
    range: [
      "grouped-12516018-1",
      "grouped-12516018-2",
      "grouped-12516018-3",
      "grouped-12516018-4"
    ],
    rangeURLs: [
      "url(#grouped-12516018-1)",
      "url(#grouped-12516018-2)",
      "url(#grouped-12516018-3)",
      "url(#grouped-12516018-4)"
    ]
  },
  diverging12514031: {
    displayName: "Diverging 12514.031",
    day: 16,
    type: "diverging",
    patterns: await FileAttachment("dec16.svg").text(),
    range: [
      "diverging-12514031-1",
      "diverging-12514031-2",
      "diverging-12514031-3",
      "diverging-12514031-4"
    ],
    rangeURLs: [
      "url(#diverging-12514031-1)",
      "url(#diverging-12514031-2)",
      "url(#diverging-12514031-3)",
      "url(#diverging-12514031-4)"
    ]
  },
  category1252605: {
    displayName: "Category 12526.05",
    day: 17,
    type: "category",
    patterns: await FileAttachment("dec17.svg").text(),
    range: [
      "category-1252605-1",
      "category-1252605-2",
      "category-1252605-3",
      "category-1252605-4"
    ],
    rangeURLs: [
      "url(#category-1252605-1)",
      "url(#category-1252605-2)",
      "url(#category-1252605-3)",
      "url(#category-1252605-4)"
    ]
  },
  sequential13188028: {
    displayName: "Sequential 13188.028",
    day: 18,
    type: "sequential",
    patterns: await FileAttachment("dec18@3.svg").text(),
    range: [
      "sequential-13188028-1",
      "sequential-13188028-2",
      "sequential-13188028-3",
      "sequential-13188028-4",
      "sequential-13188028-5",
      "sequential-13188028-6"
    ],
    rangeURLs: [
      "url(#sequential-13188028-1)",
      "url(#sequential-13188028-2)",
      "url(#sequential-13188028-3)",
      "url(#sequential-13188028-4)",
      "url(#sequential-13188028-5)",
      "url(#sequential-13188028-6)"
    ]
  },
  sequential12516026: {
    displayName: "Sequential 12516.026",
    day: 19,
    type: "sequential",
    patterns: await FileAttachment("dec19.svg").text(),
    range: [
      "sequential-12516026-1",
      "sequential-12516026-2",
      "sequential-12516026-3",
      "sequential-12516026-4"
    ],
    rangeURLs: [
      "url(#sequential-12516026-1)",
      "url(#sequential-12516026-2)",
      "url(#sequential-12516026-3)",
      "url(#sequential-12516026-4)"
    ]
  },
  sequential12521019: {
    displayName: "Sequential 12521.019",
    day: 20,
    type: "sequential",
    patterns: await FileAttachment("dec20@4.svg").text(),
    range: [
      "sequential-12521019-1",
      "sequential-12521019-2",
      "sequential-12521019-3",
      "sequential-12521019-4",
      "sequential-12521019-5",
      "sequential-12521019-6"
    ],
    rangeURLs: [
      "url(#sequential-12521019-1)",
      "url(#sequential-12521019-2)",
      "url(#sequential-12521019-3)",
      "url(#sequential-12521019-4)",
      "url(#sequential-12521019-5)",
      "url(#sequential-12521019-6)"
    ]
  },
  grouped12512014: {
    displayName: "Grouped 12512.014",
    day: 21,
    type: "grouped",
    patterns: await FileAttachment("dec21@1.svg").text(),
    range: [
      "grouped-12512014-1",
      "grouped-12512014-2",
      "grouped-12512014-3",
      "grouped-12512014-4"
    ],
    rangeURLs: [
      "url(#grouped-12512014-1)",
      "url(#grouped-12512014-2)",
      "url(#grouped-12512014-3)",
      "url(#grouped-12512014-4)"
    ]
  },
  category12512013: {
    displayName: "Category 12512.013",
    day: 22,
    type: "category",
    patterns: await FileAttachment("dec22.svg").text(),
    range: [
      "category-12512013-1",
      "category-12512013-2",
      "category-12512013-3",
      "category-12512013-4",
      "category-12512013-5"
    ],
    rangeURLs: [
      "url(#category-12512013-1)",
      "url(#category-12512013-2)",
      "url(#category-12512013-3)",
      "url(#category-12512013-4)",
      "url(#category-12512013-5)"
    ]
  },
  grouped1251203: {
    displayName: "Grouped 12512.03",
    day: 23,
    type: "grouped",
    patterns: await FileAttachment("dec23.svg").text(),
    range: [
      "grouped-1251203-1",
      "grouped-1251203-2",
      "grouped-1251203-3",
      "grouped-1251203-4",
      "grouped-1251203-5",
      "grouped-1251203-6",
      "grouped-1251203-7",
      "grouped-1251203-8"
    ],
    rangeURLs: [
      "url(#grouped-1251203-1)",
      "url(#grouped-1251203-2)",
      "url(#grouped-1251203-3)",
      "url(#grouped-1251203-4)",
      "url(#grouped-1251203-5)",
      "url(#grouped-1251203-6)",
      "url(#grouped-1251203-7)",
      "url(#grouped-1251203-8)"
    ]
  },
  category12511021: {
    displayName: "Category 12511.021",
    day: 24,
    type: "category",
    patterns: await FileAttachment("dec24@1.svg").text(),
    range: [
      "category-12511021-1",
      "category-12511021-2",
      "category-12511021-3",
      "category-12511021-4",
      "category-12511021-5",
      "category-12511021-6",
      "category-12511021-7"
    ],
    rangeURLs: [
      "url(#category-12511021-1)",
      "url(#category-12511021-2)",
      "url(#category-12511021-3)",
      "url(#category-12511021-4)",
      "url(#category-12511021-5)",
      "url(#category-12511021-6)",
      "url(#category-12511021-7)"
    ]
  },
  category12512022: {
    displayName: "Category 12512.022",
    day: 25,
    type: "category",
    patterns: await FileAttachment("dec25.svg").text(),
    range: [
      "category-12512022-1",
      "category-12512022-2",
      "category-12512022-3",
      "category-12512022-4"
    ],
    rangeURLs: [
      "url(#category-12512022-1)",
      "url(#category-12512022-2)",
      "url(#category-12512022-3)",
      "url(#category-12512022-4)"
    ]
  },
}

export function renderPatterns(selectedPatterns) {
  const patternArray = selectedPatterns.map(p => palettes[p].patterns);
  const parser = new DOMParser();
  const fragment = document.createDocumentFragment();
  
  patternArray.forEach(patternString => {
    const patterns = parser.parseFromString(patternString, "image/svg+xml").querySelectorAll("pattern");
    patterns.forEach(pattern => fragment.appendChild(pattern))
  });
  
  return fragment;
}

export function applySvgPatternAsBg(patternString, element) {
  const patternID = patternString.match(/id="([^"]+)"/)[1];
  // Create an SVG wrapper for the pattern
  const svgWrapper = `
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
          <defs>${patternString}</defs>
          <rect width="100%" height="100%" fill="url(#${patternID})"></rect>
      </svg>
  `;

  // 2️⃣ Encode the SVG for a data URL
  const encodedSvg = encodeURIComponent(svgWrapper)
      .replace(/'/g, "%27")
      .replace(/"/g, "%22");

  // 3️⃣ Construct the data URL
  const dataUrl = `data:image/svg+xml,${encodedSvg}`;

  // 4️⃣ Apply the pattern as a CSS background
  element
      .style("background-image", `url("${dataUrl}")`)
      .style("background-size", "100px 100px")
      .style("background-repeat", "repeat");
}