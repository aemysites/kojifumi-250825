/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image from a card block
  function getImage(card) {
    // Look for the first img inside the card
    return card.querySelector('img');
  }

  // Helper to extract text content from a card block
  function getTextContent(card) {
    // We'll collect heading, paragraph, and button (if present)
    const textContent = document.createElement('div');
    // Heading: h2 or h3 or h4
    const heading = card.querySelector('h2, h3, h4');
    if (heading) textContent.appendChild(heading);
    // Paragraph(s)
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => textContent.appendChild(p));
    // Button or CTA (could be a div.button or a link)
    const button = card.querySelector('.button, .cta, a.button, button');
    if (button) textContent.appendChild(button);
    return textContent;
  }

  // Find the grid containing the cards
  const container = element.querySelector('.container');
  if (!container) return;
  // The main grid is the first .grid-layout inside the container
  const mainGrid = container.querySelector('.grid-layout');
  if (!mainGrid) return;

  // The first card is a large card (with a nested grid for the rest)
  const cards = [];
  const gridChildren = Array.from(mainGrid.children);
  // The first child is the large card
  const firstCard = gridChildren[0];
  if (firstCard && firstCard.classList.contains('utility-link-content-block')) {
    cards.push(firstCard);
  }
  // The second child is a nested grid with the rest of the cards
  const nestedGrid = gridChildren.find(
    el => el.classList.contains('grid-layout')
  );
  if (nestedGrid) {
    Array.from(nestedGrid.children).forEach(card => {
      if (card.classList.contains('utility-link-content-block')) {
        cards.push(card);
      }
    });
  }

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards37)']);
  // Card rows
  cards.forEach(card => {
    // Image cell
    const imgDiv = card.querySelector('img')?.closest('div') || getImage(card);
    const imageCell = imgDiv || getImage(card);
    // Text cell
    const textCell = getTextContent(card);
    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
