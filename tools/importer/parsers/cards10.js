/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a grid of cards
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row for the block table
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Get all immediate card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');

  cardLinks.forEach((card) => {
    // Find the image container and the image itself
    const imageContainer = card.querySelector('.utility-aspect-3x2');
    let imgEl = imageContainer ? imageContainer.querySelector('img') : null;
    // Defensive: If no image, skip this card
    if (!imgEl) return;

    // Find the text content container
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    // Defensive: If no text container, skip
    if (!textContainer) return;

    // Compose the text cell
    // We'll include the tag, heading, and paragraph in order
    const tagGroup = textContainer.querySelector('.tag-group');
    const heading = textContainer.querySelector('h3, .h4-heading');
    const paragraph = textContainer.querySelector('p');

    // Compose an array for the text cell
    const textCell = [];
    if (tagGroup) textCell.push(tagGroup);
    if (heading) textCell.push(heading);
    if (paragraph) textCell.push(paragraph);

    // Add the row: [image, text content]
    rows.push([
      imgEl,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
