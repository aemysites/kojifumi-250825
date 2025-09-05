/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all direct children of the main grid (should be 2: content and image)
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // First column: content block (heading, paragraph, buttons)
  const contentCol = columns.find(
    (col) => col.querySelector('h2, .h2-heading')
  );
  // Second column: image
  const imageCol = columns.find(
    (col) => col.tagName === 'IMG'
  );

  // Defensive: ensure both columns exist
  if (!contentCol || !imageCol) return;

  // Table header
  const headerRow = ['Columns (columns11)'];
  // Table content row: [content, image]
  const contentRow = [contentCol, imageCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
