/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid container (the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // There are three main children: left content, contact list, image
  // Let's identify them by tag and structure
  let leftContent = null;
  let contactList = null;
  let image = null;

  gridChildren.forEach(child => {
    if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    } else {
      leftContent = child;
    }
  });

  // Build the table rows
  const headerRow = ['Columns (columns18)']; // header row must be single column
  const firstRow = [leftContent, contactList];
  // Only add the image row if at least one cell is non-empty
  const rows = [headerRow, firstRow];
  if (image) {
    rows.push([image]); // Only one cell, no unnecessary empty columns
  }

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
