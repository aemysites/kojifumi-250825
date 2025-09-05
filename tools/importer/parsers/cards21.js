/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the card root (may be nested)
  let cardRoot = element;
  // Look for the card container inside the sticky wrapper
  const cardRotate = element.querySelector('.ix-card-rotate-2');
  if (cardRotate) cardRoot = cardRotate;

  // Find the card body
  let cardBody = cardRoot.querySelector('.card-body');
  if (!cardBody) cardBody = cardRoot;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading, h4, h3, h2, h1');

  // Find description (optional, below heading, not the heading itself or image)
  // In this HTML, there is no extra description, but code defensively
  let description = null;
  if (heading) {
    // Look for siblings after heading, but before image
    let next = heading.nextElementSibling;
    while (next && next !== img) {
      // Only pick non-empty elements
      if (next.textContent.trim()) {
        description = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  // Compose the text cell: heading + description (if any)
  const textCellContent = [];
  if (heading) textCellContent.push(heading);
  if (description) textCellContent.push(description);

  // If no heading or description, fallback to all text nodes except image
  if (textCellContent.length === 0) {
    Array.from(cardBody.childNodes).forEach((node) => {
      if (node !== img && node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
        textCellContent.push(node);
      }
    });
  }

  // Build the table rows
  const headerRow = ['Cards (cards21)'];
  const cardRow = [img, textCellContent.length > 0 ? textCellContent : ''];
  const rows = [headerRow, cardRow];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
