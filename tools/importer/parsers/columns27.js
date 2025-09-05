/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // For this block, we want two columns: left (content), right (image)
  // The left column is the first div, the right column is the img
  // Defensive: find the first div and the first img
  let leftCol = null;
  let rightCol = null;
  for (const col of columns) {
    if (!leftCol && col.tagName === 'DIV') leftCol = col;
    if (!rightCol && col.tagName === 'IMG') rightCol = col;
    if (leftCol && rightCol) break;
  }
  if (!leftCol || !rightCol) return;

  // Build the table rows
  const headerRow = ['Columns (columns27)'];
  const contentRow = [leftCol, rightCol];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
