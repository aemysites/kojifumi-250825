/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image row (row 2)
  let backgroundImg = '';
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    const bgImg = gridDivs[0].querySelector('img');
    if (bgImg) backgroundImg = bgImg;
  }
  const bgImgRow = [backgroundImg];

  // 3. Content row (row 3)
  // Only include the heading, list, and CTA (NO side image)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      const cardBody = card.querySelector('.card-body');
      if (cardBody) {
        // Find the main heading
        const heading = cardBody.querySelector('h2, h1, h3, h4, h5, h6');
        // Find all list items (icon + text)
        const listItems = Array.from(cardBody.querySelectorAll('.flex-horizontal.flex-gap-xxs')).map(li => {
          const p = li.querySelector('p');
          return p ? p.cloneNode(true) : null;
        }).filter(Boolean);
        // Find the button
        const button = cardBody.querySelector('a.button, button');
        // Compose content cell: heading, list, button (NO side image)
        const textBlock = document.createElement('div');
        if (heading) textBlock.appendChild(heading.cloneNode(true));
        if (listItems.length) {
          const ul = document.createElement('ul');
          listItems.forEach(li => {
            const liEl = document.createElement('li');
            liEl.appendChild(li);
            ul.appendChild(liEl);
          });
          textBlock.appendChild(ul);
        }
        if (button) textBlock.appendChild(button.cloneNode(true));
        contentCell = textBlock.childNodes.length ? textBlock : '';
      } else {
        contentCell = card.cloneNode(true);
      }
    } else {
      contentCell = gridDivs[1].cloneNode(true);
    }
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    bgImgRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
