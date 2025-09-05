/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be 2: left content, right image)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // First column: left text content (heading, subheading, buttons)
  const leftCol = cols[0];
  // Second column: right image
  const rightCol = cols[1];

  // Extract all relevant content from leftCol
  const leftContent = document.createElement('div');
  if (leftCol) {
    // Heading
    const heading = leftCol.querySelector('h1');
    if (heading) leftContent.appendChild(heading.cloneNode(true));
    // Subheading
    const subheading = leftCol.querySelector('p');
    if (subheading) leftContent.appendChild(subheading.cloneNode(true));
    // Buttons
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.appendChild(buttonGroup.cloneNode(true));
  }

  // Extract the image from rightCol
  let rightContent = null;
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) {
      rightContent = document.createElement('div');
      rightContent.appendChild(img.cloneNode(true));
    }
  }

  // Table header row
  const headerRow = ['Columns (columns15)'];

  // Table content row: only include non-empty columns
  const contentRow = [leftContent];
  if (rightContent && rightContent.querySelector('img')) {
    contentRow.push(rightContent);
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
