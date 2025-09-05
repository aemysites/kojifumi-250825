/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children by selector
  const directChildren = (parent, selector) =>
    Array.from(parent.children).filter((el) => el.matches(selector));

  // 1. Header row
  const headerRow = ['Hero (hero39)'];

  // 2. Find the background image (row 2)
  // The image is inside the first grid cell
  let bgImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }

  // 3. Find the content (row 3)
  // The second grid cell contains the text and CTA
  let contentCell = null;
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    // The heading is inside a nested grid
    const innerGrid = contentDiv.querySelector('.w-layout-grid');
    if (innerGrid) {
      // Heading
      const heading = innerGrid.querySelector('h1');
      // Paragraph and button group are inside a flex-vertical div
      const flexVert = innerGrid.querySelector('.flex-vertical');
      let para = null;
      let btnGroup = null;
      if (flexVert) {
        para = flexVert.querySelector('p');
        btnGroup = flexVert.querySelector('.button-group');
      }
      // Compose content cell
      const cellContent = [];
      if (heading) cellContent.push(heading);
      if (para) cellContent.push(para);
      if (btnGroup) cellContent.push(btnGroup);
      contentCell = cellContent;
    }
  }

  // Defensive fallback
  if (!bgImg) {
    // Try to find any img in the block
    bgImg = element.querySelector('img');
  }
  if (!contentCell) {
    // Try to find any heading/paragraph/button
    const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
    const para = element.querySelector('p');
    const btn = element.querySelector('a, button');
    const fallback = [];
    if (heading) fallback.push(heading);
    if (para) fallback.push(para);
    if (btn) fallback.push(btn);
    contentCell = fallback;
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell && contentCell.length ? contentCell : ''],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
