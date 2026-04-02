const observer = new IntersectionObserver(
    entries => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        }
    },
    { threshold: 0.18 }
);

document.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element));

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

function closeLightbox() {
    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
}

document.querySelectorAll("[data-lightbox-link]").forEach(link => {
    link.addEventListener("click", event => {
        if (!lightbox || !lightboxImage || !lightboxCaption) {
            return;
        }

        event.preventDefault();
        lightboxImage.src = link.getAttribute("href") || "";
        lightboxImage.alt = link.dataset.lightboxAlt || "";
        lightboxCaption.textContent = link.dataset.lightboxCaption || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
    });
});

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });
}
