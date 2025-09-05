/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from a card root element
  function extractCard(cardDiv) {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    // Find the text container (optional)
    let textContent = '';
    // The text is usually inside a .utility-position-relative > .utility-padding-all-2rem
    const textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      // Use the wrapper directly for resilience
      textContent = textWrapper;
    }
    return [img, textContent];
  }

  // Get all direct children of the grid
  const cards = [];
  const children = element.querySelectorAll(':scope > div');
  children.forEach((child) => {
    // Only treat as a card if it has an image
    const img = child.querySelector('img');
    if (img) {
      cards.push(extractCard(child));
    }
  });

  // Build the table rows
  const headerRow = ['Cards (cards25)'];
  const tableRows = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
