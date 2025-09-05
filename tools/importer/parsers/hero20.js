/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing images and content
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');
  if (!gridLayout) return;

  // The first child is the image grid wrapper
  const imageGridWrapper = gridLayout.children[0];
  // The second child is the text/content wrapper
  const contentWrapper = gridLayout.children[1];

  // Defensive: find the grid-layout with desktop-3-column for the images
  let imageGrid = null;
  if (imageGridWrapper) {
    imageGrid = imageGridWrapper.querySelector('.grid-layout.desktop-3-column');
  }

  // Use the image grid wrapper as the background cell (preserves all images)
  const backgroundCell = imageGridWrapper ? imageGridWrapper : '';

  // For the content cell, use the container with headline, subheading, and CTAs
  let contentCell = '';
  if (contentWrapper) {
    const contentContainer = contentWrapper.querySelector('.container');
    contentCell = contentContainer ? contentContainer : contentWrapper;
  }

  // Build the table rows
  const headerRow = ['Hero (hero20)'];
  const backgroundRow = [backgroundCell];
  const contentRow = [contentCell];

  const cells = [headerRow, backgroundRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
