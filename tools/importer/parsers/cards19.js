/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container of cards
  if (!element || !element.querySelectorAll) return;

  // Table header row as specified
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all direct card elements (each card is a flex-horizontal)
  const cardElements = element.querySelectorAll(':scope > div');

  cardElements.forEach((card) => {
    // Defensive: ensure card structure
    // Icon: first child div > .icon (contains SVG)
    let iconDiv = null;
    let icon = null;
    let text = null;
    try {
      iconDiv = card.querySelector(':scope > div');
      if (iconDiv) {
        icon = iconDiv.querySelector('.icon');
      }
    } catch (e) {
      icon = null;
    }

    // Text: p tag (description)
    try {
      text = card.querySelector('p');
    } catch (e) {
      text = null;
    }

    // Defensive: fallback if not found
    if (!icon && iconDiv) icon = iconDiv;
    if (!text) text = document.createElement('span');

    // Each row: [icon, text]
    rows.push([
      icon || document.createElement('span'),
      text
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
