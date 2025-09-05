/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row: must match block name exactly
  const headerRow = ['Hero (hero1)'];

  // 2. Image row: extract the <img> element (reference, not clone)
  const img = element.querySelector('img');
  const imageRow = [img || ''];

  // 3. Content row: heading, subheading, CTAs
  let contentCell = document.createElement('div');
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find the content div (not the image)
    const contentDiv = Array.from(grid.children).find(
      (child) => child !== img && child.querySelector('h1, h2, h3, h4, h5, h6')
    );
    if (contentDiv) {
      // Heading
      const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentCell.appendChild(heading);
      // Subheading (paragraph)
      const subheading = contentDiv.querySelector('p');
      if (subheading) contentCell.appendChild(subheading);
      // CTA buttons (all <a> inside .button-group)
      const buttonGroup = contentDiv.querySelector('.button-group');
      if (buttonGroup) {
        Array.from(buttonGroup.children).forEach((btn) => {
          contentCell.appendChild(btn);
        });
      }
    }
  }
  // If nothing was appended, leave cell blank
  if (!contentCell.hasChildNodes()) contentCell = '';
  const contentRow = [contentCell];

  // 4. Assemble the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the new table
  element.replaceWith(table);
}
