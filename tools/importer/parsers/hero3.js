/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Background image row
  // Find the image inside the first grid cell
  let backgroundImg = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  if (gridDivs.length > 0) {
    backgroundImg = gridDivs[0].querySelector('img');
  }
  const bgImgRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row (headline, subheading, buttons)
  let contentCell = document.createElement('div');
  // Find the card with the text content
  let card = null;
  if (gridDivs.length > 1) {
    const innerGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (innerGrid) {
      card = innerGrid.querySelector('.card');
    }
  }
  if (card) {
    // Append all children of the card (h1, p, button group)
    Array.from(card.children).forEach(child => {
      contentCell.appendChild(child);
    });
  }
  const contentRow = [contentCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
