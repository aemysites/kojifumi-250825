/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container which holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Prepare the header row
  const headerRow = ['Columns (columns32)'];

  // Prepare the content row: each cell is a column's content
  // Use the original elements directly for resilience
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
