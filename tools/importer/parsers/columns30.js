/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Ensure we have at least one column
  if (columns.length === 0) return;

  // Build the header row
  const headerRow = ['Columns (columns30)'];

  // Build the columns row
  // Each cell is the full content of a column (reference the element directly)
  const columnsRow = columns.map((col) => col);

  // Compose the table data
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
