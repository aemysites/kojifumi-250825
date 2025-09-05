/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  const gridChildren = mainGrid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // First column: text (heading, subheading, buttons)
  const textCol = gridChildren[0];

  // Second column: images grid
  const imagesCol = gridChildren[1];
  const imagesGrid = imagesCol.querySelector('.w-layout-grid');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }

  // Compose the columns row: [textCol, ...images]
  const columnsRow = [textCol, ...images];

  // Build the table
  const headerRow = ['Columns (columns36)'];
  const tableRows = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
