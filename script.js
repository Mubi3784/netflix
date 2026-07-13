 
const movies = [
  {
    rank: 1,
    title: "Bhooth Bangla",
    poster: "./src/bhotBangla",
    banner: "./src/bhotBangla",
    year: 2025,
    rating: "U/A 13+",
    genres: ["Comedy", "Horror", "Bollywood"],
    synopsis: "A haunted mansion, a reluctant family, and a night of laughs and scares collide in this comedy-horror hit that keeps you guessing until the last door creaks open."
  },
  {
    rank: 2,
    title: "Lock Upp",
    poster: "./src/lockupp",
    banner: "./src/lockupp",
    year: 2024,
    rating: "A",
    genres: ["Reality", "Drama"],
    synopsis: "Contestants are locked away from the outside world in a high-stakes reality show where alliances shift fast and only the sharpest minds survive till the end."
  },
  {
    rank: 3,
    title: "Avatar",
    poster: "./src/theLastAirBender",
    banner: "./src/theLastAirBender",
    year: 2022,
    rating: "PG-13",
    genres: ["Sci-Fi", "Adventure", "Action"],
    synopsis: "A paraplegic Marine dispatched to the moon Pandora becomes torn between following his orders and protecting the world he feels is his home."
  },
  {
    rank: 4,
    title: "Dhurandar",
    poster: "./src/dhurandar",
    banner: "./src/dhurandar",
    year: 2025,
    rating: "U/A 16+",
    genres: ["Action", "Drama"],
    synopsis: "An elite operative goes rogue after a mission gone wrong, racing against time to clear his name while uncovering a conspiracy that reaches the top."
  },
  {
    rank: 5,
    title: "Tech You a Lesson",
    poster: "./src/techYou",
    banner: "./src/techYou",
    year: 2025,
    rating: "U/A 16+",
    genres: ["Drama", "Thriller"],
    synopsis: "A rising tech founder learns the hard way that ambition without ethics comes at a steep price, in this gripping look at the underbelly of the startup world."
  },
  {
    rank: 6,
    title: "Maa Behn",
    poster: "./src/maaBehn",
    banner: "./src/maaBehn",
    year: 2025,
    rating: "U/A 16+",
    genres: ["Action", "Drama"],
    synopsis: "When trouble knocks on her door, a mother and her estranged daughters attempt to cover up a crime in a nosy colony where no secret is safe."
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
      <img class="poster" src="${movie.poster}" alt="${movie.title} poster" loading="lazy">
      <span class="rank">${movie.rank}</span>
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
 
function initSliderArrow() {
  sliderArrowRight.addEventListener("click", () => {
    
    const firstCard = trendingTrack.querySelector(".trending-card");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 6 : 420;
    trendingTrack.scrollBy({
      left: step,
      behavior: "smooth"
    });
  });
}
 
function openModal(index) {
  const movie = movies[index];
  if (!movie) return;
 
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
 
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
 
  modal.querySelector(".modal-scroll").scrollTop = 0;
}

function closeModal() {
  modal.classList.remove("is-open");
  modalOverlay.classList.remove("is-open");
 
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
 
document.addEventListener("DOMContentLoaded", () => {
  renderTrendingCards();
  initSliderArrow();
  initModalCloseHandlers();
});