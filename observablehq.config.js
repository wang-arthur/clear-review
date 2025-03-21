// See https://observablehq.com/framework/config for documentation.
export default {
  // The app’s title; used in the sidebar and webpage titles.
  title: "Clear Review",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Peer Review",
      pages: [
        {name: "Process Diagram", path: "/peer-review/process"},
      ]
    },
    {
      name: "Post45",
      pages: [
        {name: "Articles", path: "/post45/articles"},
      ]
    },
    {
      name: "About",
      pages: [
        {name: "Credits", path: "/about/credits"},
      ],
      path: "/about/"
    }
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="images/noun-open-book-7606344.svg" type="image/png" sizes="32x32">' + 
        // temporary approach to add tailwindcss
        '<script src="https://unpkg.com/@tailwindcss/browser@4"></script>',

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "parchment", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer: '<a href="https://arthurzwang.com">Arthur Z. Wang</a>',
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  pager: false, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
