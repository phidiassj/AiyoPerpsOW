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
const lightboxImage = lightbox?.querySelector("[data-lightbox-image]") || null;
const lightboxCaption = lightbox?.querySelector("[data-lightbox-caption]") || null;
const lightboxClose = lightbox?.querySelector("[data-lightbox-close]") || null;

function closeLightbox() {
    if (!lightbox || !lightboxImage || !lightboxCaption) {
        return;
    }

    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxCaption.textContent = "Screenshot preview";
    lightboxImage.removeAttribute("src");
    lightboxImage.alt = "";
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

document.querySelectorAll(".code-block").forEach((block, index) => {
    if (block.querySelector(".code-toolbar")) {
        return;
    }

    const title = block.dataset.codeTitle || "code";
    const code = block.querySelector("code");

    if (!code) {
        return;
    }

    const toolbar = document.createElement("div");
    toolbar.className = "code-toolbar";

    const titleBadge = document.createElement("span");
    titleBadge.className = "code-title";
    titleBadge.textContent = title;

    const copyButton = document.createElement("button");
    copyButton.className = "code-copy";
    copyButton.type = "button";
    copyButton.setAttribute("aria-label", `Copy ${title} code`);
    copyButton.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 9.75A2.25 2.25 0 0 1 11.25 7.5h7.5A2.25 2.25 0 0 1 21 9.75v9A2.25 2.25 0 0 1 18.75 21h-7.5A2.25 2.25 0 0 1 9 18.75v-9Z" stroke="currentColor" stroke-width="1.5"/>
            <path d="M15 7.5V5.25A2.25 2.25 0 0 0 12.75 3h-7.5A2.25 2.25 0 0 0 3 5.25v9A2.25 2.25 0 0 0 5.25 16.5H9" stroke="currentColor" stroke-width="1.5"/>
        </svg>`;

    copyButton.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(code.textContent.trim());
            copyButton.classList.add("is-copied");
            copyButton.setAttribute("aria-label", "Copied");
            window.setTimeout(() => {
                copyButton.classList.remove("is-copied");
                copyButton.setAttribute("aria-label", `Copy ${title} code`);
            }, 1600);
        } catch {
            copyButton.setAttribute("aria-label", "Copy failed");
        }
    });

    toolbar.append(titleBadge, copyButton);
    block.prepend(toolbar);
    block.dataset.codeEnhanced = String(index);
});
