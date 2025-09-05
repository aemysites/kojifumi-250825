/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (the column content)
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Header row as required
  const headerRow = ['Columns (columns31)'];

  // Second row: each cell is the full content of the corresponding column
  // Use the entire column element for resilience
  const contentRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
