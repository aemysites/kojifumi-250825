/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid container (the columns root)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // We'll build two columns:
  // - Left: the large feature card (first child, an <a>)
  // - Right: everything else (the next two divs)

  // Left column: the big feature card
  const leftCol = columns[0];

  // Right column: a vertical stack of cards and a vertical stack of links
  // We'll combine the next two columns into a single container for the right cell
  const rightColWrapper = document.createElement('div');
  for (let i = 1; i < columns.length; i++) {
    rightColWrapper.appendChild(columns[i]);
  }

  // Build the table rows
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightColWrapper];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
