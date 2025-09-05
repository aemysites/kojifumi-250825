/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Table header row (must match block name exactly)
  const headerRow = ['Columns (columns16)'];

  // 2. Find the main grid (top two columns)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  let leftCol = null;
  let rightCol = null;
  if (mainGrid) {
    const gridChildren = mainGrid.querySelectorAll(':scope > div');
    if (gridChildren.length >= 2) {
      leftCol = gridChildren[0];
      rightCol = gridChildren[1];
    }
  }

  // 3. Find the bottom grid with two images (bottom two columns)
  const imagesGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md');
  let img1 = null;
  let img2 = null;
  if (imagesGrid) {
    const imgDivs = imagesGrid.querySelectorAll(':scope > div');
    if (imgDivs.length >= 2) {
      img1 = imgDivs[0].querySelector('img');
      img2 = imgDivs[1].querySelector('img');
    }
  }

  // 4. Compose left column content (eyebrow, title, description, author, button)
  const leftColContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    const title = leftCol.querySelector('h1');
    if (title) leftColContent.push(title);
  }
  if (rightCol) {
    const desc = rightCol.querySelector('.rich-text');
    if (desc) leftColContent.push(desc);
    const authorBlock = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (authorBlock) leftColContent.push(authorBlock);
    const button = rightCol.querySelector('a.button');
    if (button) leftColContent.push(button);
  }

  // 5. Compose right column content (the two images stacked)
  const rightColContent = [];
  if (img1) rightColContent.push(img1);
  if (img2) rightColContent.push(document.createElement('br'), img2);

  // 6. Build the table rows
  const tableRows = [
    headerRow,
    [leftColContent, rightColContent]
  ];

  // 7. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
