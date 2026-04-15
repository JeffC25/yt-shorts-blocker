// Selectors that target Shorts elements in YouTube's DOM
const SHORTS_SELECTORS = [
  'ytd-rich-shelf-renderer[is-shorts]',        // Shorts shelf on homepage
  'ytd-reel-shelf-renderer',                   // Reel shelf
  'a[href^="/shorts"]',                        // Any link to a /shorts URL
  'ytd-guide-entry-renderer a[href="/shorts"]' // Sidebar nav entry
];

function removeShorts(): void {
  for (const selector of SHORTS_SELECTORS) {
    document.querySelectorAll<HTMLElement>(selector).forEach(el => {
      // Walk up to the nearest meaningful container and hide it
      const container = el.closest<HTMLElement>(
        'ytd-rich-item-renderer, ytd-rich-shelf-renderer, ytd-reel-shelf-renderer, li'
      ) ?? el;
      container.style.display = 'none';
    });
  }
}

// Block navigation to /shorts URLs
function blockShortsNavigation(): void {
  if (window.location.pathname.startsWith('/shorts')) {
    window.location.replace('https://www.youtube.com');
  }
}

// Run on load
removeShorts();
blockShortsNavigation();

// Watch for DOM mutations (YouTube is a SPA)
const observer = new MutationObserver(() => {
  removeShorts();
  blockShortsNavigation();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});
