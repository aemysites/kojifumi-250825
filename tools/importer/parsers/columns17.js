/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid (each column cell)
  const gridChildren = Array.from(grid.children);

  // For each grid child, find the image inside (may be nested)
  const images = gridChildren.map(child => {
    // Defensive: find the first img in the child
    const img = child.querySelector('img');
    return img || document.createTextNode('');
  });

  // Table header row
  const headerRow = ['Columns (columns17)'];
  // Table content row: one cell per image
  const contentRow = images;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
