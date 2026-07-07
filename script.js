/* ============================================================
   MOVIE DATA
   Single source of truth. Add/remove/edit a movie here and both
   the trending card and its modal content update automatically —
   no repeated markup anywhere (DRY).
============================================================ */
const movies = [
  {
    rank: 1,
    title: "Bhooth Bangla",
    poster: "./src/trending/Bhooth-Bangla1-1.jpeg",
    banner: "./src/trending/Bhooth-Bangla1-1.jpeg",
    year: 2025,
    rating: "U/A 13+",
    genres: ["Comedy", "Horror", "Bollywood"],
    synopsis: "A haunted mansion, a reluctant family, and a night of laughs and scares collide in this comedy-horror hit that keeps you guessing until the last door creaks open."
  },
  {
    rank: 2,
    title: "Lock Upp",
    poster: "./src/trending/lockupp.jpeg",
    banner: "./src/trending/lockupp.jpeg",
    year: 2024,
    rating: "A",
    genres: ["Reality", "Drama"],
    synopsis: "Contestants are locked away from the outside world in a high-stakes reality show where alliances shift fast and only the sharpest minds survive till the end."
  },
  {
    rank: 3,
    title: "Avatar",
    poster: "./src/trending/avatar.jpeg",
    banner: "./src/trending/avatar.jpeg",
    year: 2022,
    rating: "PG-13",
    genres: ["Sci-Fi", "Adventure", "Action"],
    synopsis: "A paraplegic Marine dispatched to the moon Pandora becomes torn between following his orders and protecting the world he feels is his home."
  },
  {
    rank: 4,
    title: "Tech You a Lesson",
    poster: "./src/trending/tech you  a lesson.jpeg",
    banner: "./src/trending/tech you  a lesson.jpeg",
    year: 2025,
    rating: "U/A 16+",
    genres: ["Drama", "Thriller"],
    synopsis: "A rising tech founder learns the hard way that ambition without ethics comes at a steep price, in this gripping look at the underbelly of the startup world."
  },
  {
    rank: 5,
    title: "Dhurandar",
    poster: "./src/trending/dhurandar.jpeg",
    banner: "./src/trending/dhurandar.jpeg",
    year: 2025,
    rating: "U/A 16+",
    genres: ["Action", "Drama"],
    synopsis: "An elite operative goes rogue after a mission gone wrong, racing against time to clear his name while uncovering a conspiracy that reaches the top."
  }
];

/* ============================================================
   ELEMENT REFERENCES
============================================================ */
const trendingTrack = document.getElementById("trendingTrack");
const sliderArrowRight = document.getElementById("sliderArrowRight");

const modal = document.getElementById("movieModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalBanner = document.getElementById("modalBanner");
const modalTitle = document.getElementById("modalTitle");
const modalTags = document.getElementById("modalTags");
const modalSynopsis = document.getElementById("modalSynopsis");

/* ============================================================
   FEATURE 1: RENDER TRENDING CARDS FROM DATA (DRY)
============================================================ */
function renderTrendingCards() {
  // Build all card markup in one string, then a single DOM write.
  const cardsHTML = movies.map((movie, index) => `
    <article class="trending-card" data-index="${index}" tabindex="0" role="button" aria-label="View details for ${movie.title}">
      <span class="rank">${movie.rank}</span>
      <div class="poster" style="background-image: url('${movie.poster}');"></div>
    </article>
  `).join("");

  trendingTrack.innerHTML = cardsHTML;

  // Attach one click + keyboard listener per card, opening the shared modal.
  trendingTrack.querySelectorAll(".trending-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.index));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.index);
      }
    });
  });
}

/* ============================================================
   FEATURE 1: SLIDER ARROW — SMOOTH SCROLL RIGHT
============================================================ */
function initSliderArrow() {
  sliderArrowRight.addEventListener("click", () => {
    trendingTrack.scrollBy({
      left: 420,        // roughly one card + gap per click
      behavior: "smooth"
    });
  });
}

/* ============================================================
   FEATURE 3: MODAL OPEN / CLOSE + SCROLL LOCK
============================================================ */
function openModal(index) {
  const movie = movies[index];
  if (!movie) return;

  // Populate modal content from the single data source.
  modalBanner.style.backgroundImage = `url('${movie.banner}')`;
  modalTitle.textContent = movie.title;
  modalSynopsis.textContent = movie.synopsis;

  const genreText = movie.genres.join(", ");
  modalTags.innerHTML = `
    <span class="tag-year">${movie.year}</span>
    <span class="tag-rating">${movie.rating}</span>
    <span class="tag-dot">&bull;</span>
    <span class="tag-genres">${genreText}</span>
  `;

  modal.classList.add("is-open");
  modalOverlay.classList.add("is-open");

  // Lock the page scrollbar while the modal is open.
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";

  // Reset modal's internal scroll position each time it opens.
  modal.querySelector(".modal-scroll").scrollTop = 0;
}

function closeModal() {
  modal.classList.remove("is-open");
  modalOverlay.classList.remove("is-open");

  // Restore the main page scrollbar.
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
}

function initModalCloseHandlers() {
  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", closeModal);

  // Also allow closing with the Escape key for accessibility.
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}

/* ============================================================
   INIT
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  renderTrendingCards();
  initSliderArrow();
  initModalCloseHandlers();
});