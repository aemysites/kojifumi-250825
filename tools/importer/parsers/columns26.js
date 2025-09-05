/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // The first two children are the left and right columns
  // Left column: heading, testimonial
  // Right column: divider, avatar/testimonial author, logo

  // Defensive: ensure enough children
  if (gridChildren.length < 3) return;

  // Left column (heading + testimonial)
  const leftCol = document.createElement('div');
  leftCol.appendChild(gridChildren[0]); // h2-heading
  leftCol.appendChild(gridChildren[1]); // paragraph-lg

  // Right column (divider + avatar/testimonial author + logo)
  const rightGrid = gridChildren[2];
  // Defensive: rightGrid is itself a grid with 3 children
  const rightChildren = Array.from(rightGrid.children);
  if (rightChildren.length < 3) return;

  const rightCol = document.createElement('div');
  rightCol.appendChild(rightChildren[0]); // divider
  rightCol.appendChild(rightChildren[1]); // avatar/testimonial author
  rightCol.appendChild(rightChildren[2]); // logo svg

  // Build table rows
  const headerRow = ['Columns (columns26)'];
  const contentRow = [leftCol, rightCol];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
