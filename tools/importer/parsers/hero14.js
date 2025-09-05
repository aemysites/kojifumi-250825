/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row: must match block name exactly
  const headerRow = ['Hero (hero14)'];

  // 2. Background image row: extract the <img> element (reference, not clone)
  let bgImg = null;
  const imgContainer = element.querySelector('.ix-parallax-scale-out-hero');
  if (imgContainer) {
    bgImg = imgContainer.querySelector('img');
  }
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }
  // Use the actual element reference or empty string
  const bgImgRow = [bgImg || ''];

  // 3. Content row: extract the container with heading and possible CTA
  let contentContainer = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridDivs = grid.querySelectorAll(':scope > div');
    if (gridDivs.length > 1) {
      contentContainer = gridDivs[1];
    }
  }
  if (!contentContainer) {
    contentContainer = element.querySelector('.container');
  }
  if (!contentContainer) {
    contentContainer = '';
  }
  const contentRow = [contentContainer];

  // Compose the table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
