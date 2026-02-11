/**
 * Tab Navigation with Performance Optimization
 * - Event delegation for efficient event handling
 * - DOM caching to minimize queries
 * - URL hash support for shareable links and browser history
 * - ARIA attributes for accessibility
 */

(function() {
  'use strict';

  // ========== DOM CACHING ==========
  // Query once on initialization, reuse throughout lifecycle
  const tabContainer = document.querySelector('.content-nav');
  const tabs = document.querySelectorAll('.nav-tab');
  const sections = document.querySelectorAll('.content-section');

  // Early return if required elements don't exist
  if (!tabContainer || tabs.length === 0 || sections.length === 0) {
    console.warn('Tab navigation: Required elements not found');
    return;
  }

  // ========== CORE FUNCTIONS ==========

  /**
   * Switch to a specific tab and show its corresponding section
   * @param {string} targetId - The ID of the section to show (without #)
   */
  function switchTab(targetId) {
    // Find the matching tab and section
    const targetTab = document.querySelector(`.nav-tab[href="#${targetId}"]`);
    const targetSection = document.getElementById(targetId);

    // Validate both exist before proceeding
    if (!targetTab || !targetSection) {
      console.warn(`Tab navigation: Target "${targetId}" not found`);
      return;
    }

    // PERFORMANCE: Batch DOM operations to minimize reflows
    // Remove .active class from all tabs
    tabs.forEach(tab => tab.classList.remove('active'));

    // Hide all sections using hidden attribute (browser-optimized)
    sections.forEach(section => {
      section.hidden = true;
    });

    // Activate the target tab and show its section
    targetTab.classList.add('active');
    targetSection.hidden = false;

    // Update ARIA attributes for accessibility
    updateAriaAttributes(targetId);
  }

  /**
   * Handle URL hash changes (browser back/forward, direct links)
   */
  function handleHashChange() {
    // Get hash from URL and remove the # symbol
    const hash = window.location.hash.slice(1);

    // Valid section IDs
    const validSections = ['projects', 'coded-components', 'writings'];

    // Default to 'projects' if hash is empty or invalid
    const targetId = validSections.includes(hash) ? hash : 'projects';

    // Update the hash if it was invalid or empty
    if (!hash || !validSections.includes(hash)) {
      window.location.hash = targetId;
    }

    switchTab(targetId);
  }

  /**
   * Handle tab click events using event delegation
   * @param {Event} e - The click event
   */
  function handleTabClick(e) {
    // Only process clicks on .nav-tab elements
    if (!e.target.classList.contains('nav-tab')) {
      return;
    }

    // Prevent default anchor behavior (stops page jump/scroll)
    e.preventDefault();

    // Extract the section ID from the href attribute
    const targetId = e.target.getAttribute('href').slice(1);

    // Update URL hash manually without scrolling
    if (history.pushState) {
      history.pushState(null, null, `#${targetId}`);
    } else {
      // Fallback for older browsers
      window.location.hash = targetId;
    }

    switchTab(targetId);
  }

  /**
   * Update ARIA attributes for screen reader accessibility
   * @param {string} targetId - The ID of the active section
   */
  function updateAriaAttributes(targetId) {
    // Update aria-selected on tabs
    tabs.forEach(tab => {
      const tabHref = tab.getAttribute('href');
      const isActive = tabHref === `#${targetId}`;
      tab.setAttribute('aria-selected', isActive.toString());
    });

    // Update aria-hidden on sections
    sections.forEach(section => {
      section.setAttribute('aria-hidden', section.hidden.toString());
    });
  }

  /**
   * Initialize tab navigation functionality
   */
  function init() {
    // PERFORMANCE: Event delegation - single listener on parent instead of individual tabs
    tabContainer.addEventListener('click', handleTabClick);

    // Support browser back/forward buttons
    window.addEventListener('hashchange', handleHashChange);

    // Initialize correct tab based on URL hash on page load
    handleHashChange();
  }

  // ========== INITIALIZATION ==========
  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded, run immediately
    init();
  }

})();
