// ===========================
// PropEdge Realty – script.js
// ===========================

// ---- SAMPLE PROPERTIES DATA ----
const properties = [
    {
        id: 1, type: 'apartment', image: 'images/work1.jpeg', status: 'For Sale', price: '₹3.8 Cr',
        title: '4 BHK Premium Apartment', location: 'panathur road, Bangalore',
        beds: 4, baths: 4, area: '2333-2482 sq ft', year: 2026,
        desc: 'A spacious 4 BHK apartment with modern interiors, dedicated parking, and excellent connectivity to Embassy tech village and Outer Ring Road.',
        icon: 'fa-building'
    },
    {
        id: 2, type: 'villa', image: 'images/work2.png', status: 'For Sale', price: '₹6 Cr',
        title: '4 BHK Independent Villa', location: 'Sarjapur Road, Bangalore',
        beds: 4, baths: 3, area: '2800 sq ft', year: 2021,
        desc: 'Luxurious independent villa in a gated community with private garden, rooftop access, and 24/7 security.',
        icon: 'fa-home'
    },
    {
        id: 3, type: 'apartment', image: 'images/work3.png', status: 'For Sale', price: '₹3.6',
        title: '3.5 BHK Fully Furnished', location: 'panathur road, Bangalore',
        beds: 3, baths: 3, area: '2150-2178 sq ft', year: 2026,
        desc: '80% work done ready to hand over in months .',
        icon: 'fa-building'
    },
    {
        id: 4, type: 'plot', image: 'images/work4.png', status: 'For Sale', price: '₹42 Lakhs',
        title: 'Residential BDA Site', location: 'JP Nagar, Bangalore',
        beds: null, baths: null, area: '1200 sq ft (30×40)', year: null,
        desc: 'BDA approved residential plot in JP Nagar with clear title, facing 30ft road. Ideal for self-construction.',
        icon: 'fa-map'
    },
    {
        id: 5, type: 'commercial', tatus: 'For Rent', price: '₹65,000 / mo',
        title: 'Prime Commercial Space', location: 'Indiranagar, Bangalore',
        beds: null, baths: 2, area: '2200 sq ft', year: 2019,
        desc: 'Ground floor commercial space on 100 Feet Road, ideal for showroom, clinic, or premium office setup.',
        icon: 'fa-store'
    },
    {
        id: 6, type: 'apartment', image: 'images/work6.png', status: 'For Sale', price: '₹2.9 Cr',
        title: '2 BHK New Launch', location: 'panathur road, Bangalore',
        beds: 2, baths: 2, area: '1611 sq ft', year: 2025,
        desc: 'Under-construction 2 BHK apartment by a reputed developer. RERA approved. OC expected by Dec 2025.',
        icon: 'fa-building'
    }
];

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- HAMBURGER ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id], div[id="searchResults"]');
const navItems = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
});

// ---- SEARCH TABS ----
document.querySelectorAll('.stab').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.stab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ---- RENDER PROPERTY CARD ----
function renderCard(prop) {
    const isRent = prop.status === 'For Rent';
    const metaHTML = [];
    if (prop.beds) metaHTML.push(`<span class="pmeta"><i class="fa fa-bed"></i>${prop.beds} Beds</span>`);
    if (prop.baths) metaHTML.push(`<span class="pmeta"><i class="fa fa-bath"></i>${prop.baths} Baths</span>`);
    if (prop.area) metaHTML.push(`<span class="pmeta"><i class="fa fa-vector-square"></i>${prop.area}</span>`);


    return `
    <div class="prop-card" data-id="${prop.id}">
      <div class="prop-img">
        <i class="fa ${prop.icon}"></i>
        <span class="prop-badge ${isRent ? 'rent' : ''}">${prop.status}</span>
        <button class="prop-wishlist"><i class="fa fa-heart"></i></button>
      </div>
      <div class="prop-body">
        <div class="prop-price">${prop.price}</div>
        <div class="prop-title">${prop.title}</div>
       <div class="prop-img-container">
          <img src="${prop.image}" alt="${prop.title}" style="width:100%;height:200px;object-fit:cover;" />
        </div>
        <div class="prop-loc"><i class="fa fa-map-marker-alt"></i>${prop.location}</div>
        <div class="prop-meta">${metaHTML.join('')}</div>
      </div>
    </div>
  `;
}

// ---- LOAD FEATURED PROPERTIES ----
function loadProperties(filter = 'all') {
    const grid = document.getElementById('propertiesGrid');
    const filtered = filter === 'all' ? properties : properties.filter(p => p.type === filter);
    grid.innerHTML = filtered.map(renderCard).join('');
    attachCardClicks(grid);
}
loadProperties();

// ---- FILTER BUTTONS ----
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadProperties(btn.dataset.filter);
    });
});

// ---- SEARCH ----
document.getElementById('searchBtn').addEventListener('click', () => {
    const loc = document.getElementById('searchLocation').value.toLowerCase().trim();
    const type = document.getElementById('searchType').value.toLowerCase();
    const budget = document.getElementById('searchBudget').value;

    let results = properties.filter(p => {
        const matchLoc = !loc || p.location.toLowerCase().includes(loc) || p.title.toLowerCase().includes(loc);
        const matchType = !type || p.type === type;
        return matchLoc && matchType;
    });

    const resultsSection = document.getElementById('searchResults');
    const resultsGrid = document.getElementById('resultsGrid');
    const countEl = document.getElementById('resultCount');

    resultsSection.style.display = 'block';
    countEl.textContent = `(${results.length} found)`;

    if (results.length) {
        resultsGrid.innerHTML = results.map(renderCard).join('');
        attachCardClicks(resultsGrid);
    } else {
        resultsGrid.innerHTML = '<p style="color:#6b7280;grid-column:1/-1;text-align:center;padding:40px 0;">No properties found. Try a different search.</p>';
    }

    resultsSection.scrollIntoView({ behavior: 'smooth' });
});

// Also trigger search on Enter key
document.getElementById('searchLocation').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('searchBtn').click();
});

// ---- MODAL ----
const overlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalContent = document.getElementById('modalContent');

function openModal(prop) {
    const metaHTML = [
        prop.beds ? `<div class="mdetail"><strong>${prop.beds}</strong>Bedrooms</div>` : '',
        prop.baths ? `<div class="mdetail"><strong>${prop.baths}</strong>Bathrooms</div>` : '',
        prop.area ? `<div class="mdetail"><strong>${prop.area}</strong>Area</div>` : '',
        prop.year ? `<div class="mdetail"><strong>${prop.year}</strong>Year Built</div>` : '',
    ].filter(Boolean).join('');

    modalContent.innerHTML = `
    <div class="modal-prop-header"><i class="fa ${prop.icon}"></i></div>
    <div class="modal-body">
      <div class="modal-price">${prop.price}</div>
      <div class="modal-title">${prop.title}</div>
      <div class="modal-loc"><i class="fa fa-map-marker-alt"></i> ${prop.location}</div>
      <div class="modal-details">${metaHTML}</div>
      <p class="modal-desc">${prop.desc}</p>
      <div class="modal-actions">
        <button class="modal-btn primary" onclick="document.getElementById('contact').scrollIntoView({behavior:'smooth'}); closeModal();">
          <i class="fa fa-phone"></i> Contact Agent
        </button>
        <button class="modal-btn outline" onclick="closeModal()">Close</button>
      </div>
    </div>
  `;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

function attachCardClicks(container) {
    container.querySelectorAll('.prop-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('.prop-wishlist')) {
                // Toggle wishlist heart
                const icon = e.target.closest('.prop-wishlist').querySelector('i');
                icon.style.color = icon.style.color === 'var(--gold)' ? '#e74c3c' : 'var(--gold)';
                return;
            }
            const prop = properties.find(p => p.id == card.dataset.id);
            if (prop) openModal(prop);
        });
    });
}

// ---- CONTACT FORM ----
document.getElementById('sendBtn').addEventListener('click', () => {
    const name = document.getElementById('fname').value.trim();
    const email = document.getElementById('femail').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const service = document.getElementById('fservice').value;
    const message = document.getElementById('fmessage').value.trim();
    const note = document.getElementById('formNote');

    if (!name || !email || !phone) {
        note.style.color = '#e74c3c';
        note.textContent = 'Please fill in your name, email and phone number.';
        return;
    }

    // Placeholder — replace with your Formspree/Web3Forms endpoint
    note.style.color = '#10b981';
    note.textContent = `Thank you, ${name}! We'll get back to you shortly.`;
    document.getElementById('fname').value = '';
    document.getElementById('femail').value = '';
    document.getElementById('fphone').value = '';
    document.getElementById('fservice').value = '';
    document.getElementById('fmessage').value = '';
});

// ---- ANIMATE ON SCROLL ----
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .prop-card, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});