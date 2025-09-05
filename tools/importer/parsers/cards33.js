/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all card anchor elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((card) => {
    // Find the image (first child of card's inner grid)
    const innerGrid = card.querySelector(':scope > div');
    if (!innerGrid) return; // Defensive: skip if structure is unexpected
    const img = innerGrid.querySelector('img');

    // Find the text content container (second child of inner grid)
    // In this HTML, it's the div after the image
    const textContainer = img ? img.nextElementSibling : null;
    if (!img || !textContainer) return; // Defensive: skip if missing

    // Compose the text cell
    // We'll include the tag, read time, heading, description, and CTA ("Read")
    // All are inside textContainer, so we can reference it directly
    // But we want only the inner content, not the outer grid
    // So we reference textContainer
    rows.push([img, textContainer]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
