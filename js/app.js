// Application logic for Chicken Boom Boom Menu

// Modal Handlers (e.g. Call Modal)
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on click outside
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Search & Filter items
function initSearch() {
  const searchInput = document.getElementById('menuSearchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  const sections = document.querySelectorAll('.category-section');
  const noResults = document.getElementById('noResultsMsg');

  if (!searchInput) return;

  function filterItems() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;

    if (query.length > 0) {
      clearBtn.style.display = 'block';
    } else {
      clearBtn.style.display = 'none';
    }

    sections.forEach(section => {
      let sectionHasVisible = false;
      const items = section.querySelectorAll('.menu-item-card');

      items.forEach(item => {
        const name = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
        const price = item.querySelector('.item-price')?.textContent.toLowerCase() || '';

        if (name.includes(query) || price.includes(query)) {
          item.style.display = 'flex';
          sectionHasVisible = true;
          anyVisible = true;
        } else {
          item.style.display = 'none';
        }
      });

      if (sectionHasVisible) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = anyVisible ? 'none' : 'block';
    }
  }

  searchInput.addEventListener('input', filterItems);

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      filterItems();
      searchInput.focus();
    });
  }
}

// Active category pill highlight on scroll
function initScrollSpy() {
  const sections = document.querySelectorAll('.category-section');
  const pills = document.querySelectorAll('.cat-pill');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      pills.forEach(pill => {
        if (pill.getAttribute('href') === `#${currentId}`) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }
  });
}

// Document Ready Initialization
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initScrollSpy();
});
