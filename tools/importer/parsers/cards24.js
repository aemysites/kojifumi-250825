/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCardInfo(cardEl) {
    // Find the image (first div > img)
    const imgDiv = cardEl.querySelector('div.utility-aspect-2x3');
    let img = imgDiv ? imgDiv.querySelector('img') : null;

    // Find the tag/date row (second div)
    const tagRow = cardEl.querySelector('div.flex-horizontal');
    // Find the heading (h3)
    const heading = cardEl.querySelector('h3');

    // Compose the text cell: tag/date row + heading
    // Defensive: Only include if exists
    const textContent = [];
    if (tagRow) textContent.push(tagRow);
    if (heading) textContent.push(heading);

    return [img, textContent];
  }

  // Get all card anchors (direct children)
  const cardEls = element.querySelectorAll(':scope > a.utility-link-content-block');

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards24)']);

  // Card rows
  cardEls.forEach(cardEl => {
    const [img, textContent] = extractCardInfo(cardEl);
    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
