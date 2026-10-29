(() => {
  const d = window.PORTFOLIO || {};
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => { const el = $(selector); if (el && value) el.textContent = value; };
  setText("[data-name]", d.name);
  document.querySelectorAll("[data-name-short]").forEach(el => el.textContent = d.shortName || d.name || "");
  setText("[data-status]", d.status);
  setText("[data-intro]", d.intro);
  setText("[data-about-lead]", d.aboutLead);
  setText("[data-about-body]", d.aboutBody);
  setText("[data-education]", d.education);
  setText("[data-focus]", d.focus);
  setText("[data-approach]", d.approach);
  setText("[data-location]", d.location);
  setText("#year", String(new Date().getFullYear()));

  const email = d.email || "";
  const emailHref = email && !email.includes("YOUR_EMAIL") ? `mailto:${email}` : "mailto:YOUR_EMAIL@example.com";
  const emailButton = $("[data-email-button]");
  const emailLink = $("[data-email-link]");
  if (emailButton) emailButton.href = emailHref;
  if (emailLink) emailLink.href = emailHref;
  if (email && !email.includes("YOUR_EMAIL")) {
    emailButton?.setAttribute("aria-label", `Email ${d.name}`);
    emailLink?.setAttribute("title", email);
  }
  const linkedin = $("[data-linkedin]");
  const github = $("[data-github]");
  if (linkedin && d.linkedin && !d.linkedin.includes("YOUR-LINKEDIN")) linkedin.href = d.linkedin;
  else linkedin?.classList.add("is-placeholder");
  if (github && d.github && !d.github.includes("YOUR-GITHUB-USERNAME")) github.href = d.github;
  else github?.classList.add("is-placeholder");

  const safeUrl = (url) => /^https:\/\/(www\.)?(github\.com|linkedin\.com)\//i.test(url || "");
  const journey = $("#journey-list");
  if (journey) journey.innerHTML = (d.journey || []).map((item, i) =>
    `<article class="timeline-item"><div class="timeline-marker">${String(i + 1).padStart(2,"0")}</div><div class="timeline-date">${escapeHtml(item.date)}</div><div class="timeline-copy"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></div></article>`
  ).join("");

  const achievements = $("#achievement-list");
  if (achievements) achievements.innerHTML = (d.achievements || []).map(item =>
    `<article class="achievement-card"><div class="achievement-top"><span>${escapeHtml(item.number)}</span><span>${escapeHtml(item.date)}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></article>`
  ).join("");

  const projects = $("#project-list");
  if (projects) projects.innerHTML = (d.projects || []).map((item, i) => {
    const link = safeUrl(item.url) ? `<a class="project-open" href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeAttr(item.title)}">↗</a>` : `<span class="project-open muted-arrow">↗</span>`;
    return `<article class="project-row"><span class="project-number">${String(i + 1).padStart(2,"0")}</span><div class="project-main"><span class="project-category">${escapeHtml(item.category)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div><span class="project-status">${escapeHtml(item.status)}</span>${link}</article>`;
  }).join("");

  const goals = $("#goal-list");
  if (goals) goals.innerHTML = (d.goals || []).map(item =>
    `<article class="goal-card"><span class="goal-number">${escapeHtml(item.number)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p></article>`
  ).join("");

  // Build structured data using the actual profile links once supplied.
  const schema = $("#person-schema");
  if (schema) {
    const person = { "@context":"https://schema.org", "@type":"Person", name:d.name, description:d.intro, alumniOf:{"@type":"CollegeOrUniversity","name":"Indian Institute of Technology Madras"}, sameAs:[d.linkedin,d.github].filter(u => safeUrl(u)) };
    schema.textContent = JSON.stringify(person);
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }
  function escapeAttr(value) { return escapeHtml(value); }

  const toggle = $(".menu-toggle");
  const nav = $(".nav-links");
  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    nav?.classList.toggle("is-open", open);
  });
  nav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
  }));
})();

/* === Interactive portfolio upgrade === */
(() => {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* 1. Reveal content as visitors scroll */
  const revealItems = document.querySelectorAll(
    ".section-heading, .about-grid, .timeline-item, " +
    ".achievement-card, .project-row, .goal-card, .contact-inner"
  );

  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(item => item.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => {
      item.classList.add("js-reveal");
      observer.observe(item);
    });
  }

  /* 2. Clickable achievement cards and accessible popup */
  const cards = document.querySelectorAll(".achievement-card");
  const dialog = document.createElement("dialog");
  dialog.className = "achievement-dialog";
  dialog.setAttribute("aria-labelledby", "achievement-dialog-title");

  const label = document.createElement("div");
  label.className = "dialog-label";
  label.textContent = "ACHIEVEMENT DETAILS";

  const title = document.createElement("h2");
  title.id = "achievement-dialog-title";

  const description = document.createElement("p");
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "Close";

  dialog.append(label, title, description, close);
  document.body.appendChild(dialog);

  function openAchievement(card) {
    const heading = card.querySelector("h3");
    const paragraph = card.querySelector("p");
    if (!heading || !paragraph) return;

    title.textContent = heading.textContent;
    description.textContent = paragraph.textContent;

    cards.forEach(item => {
      item.classList.toggle("is-selected", item === card);
    });

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
  }

  function closeAchievement() {
    if (typeof dialog.close === "function" && dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
    cards.forEach(item => item.classList.remove("is-selected"));
  }

  cards.forEach(card => {
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("aria-label", "View achievement details");

    card.addEventListener("click", () => openAchievement(card));
    card.addEventListener("keydown", event => {
      if (event.target !== card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openAchievement(card);
      }
    });
  });

  close.addEventListener("click", closeAchievement);

  dialog.addEventListener("click", event => {
    if (event.target === dialog) closeAchievement();
  });

  dialog.addEventListener("close", () => {
    cards.forEach(item => item.classList.remove("is-selected"));
  });

  /* 3. Expand and collapse academic timeline entries */
  document.querySelectorAll(".timeline-item").forEach((item, index) => {
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");

    const initiallyOpen = index === 0;
    item.classList.toggle("is-expanded", initiallyOpen);
    item.setAttribute("aria-expanded", String(initiallyOpen));

    const toggleItem = () => {
      const expanded = item.classList.toggle("is-expanded");
      item.setAttribute("aria-expanded", String(expanded));
    };

    item.addEventListener("click", toggleItem);
    item.addEventListener("keydown", event => {
      if (event.target !== item) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleItem();
      }
    });
  });

  /* 4. Add a one-click copy-email button */
  const emailButton = document.querySelector("[data-email-button]");
  const email = emailButton?.getAttribute("href") || "";
  const emailAddress = email.startsWith("mailto:")
    ? email.slice(7).split("?")[0]
    : "";

  if (emailAddress && !emailAddress.includes("YOUR_EMAIL")) {
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "copy-email-button";
    copyButton.textContent = "Copy email address";
    copyButton.setAttribute("aria-live", "polite");

    emailButton.insertAdjacentElement("afterend", copyButton);

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyButton.textContent = "Email copied!";
      } catch {
        copyButton.textContent = emailAddress;
      }
    });
  }
})();

/* === Reading progress and active navigation === */
(() => {
  const navLinks = [...document.querySelectorAll('a[href^="#"]')]
    .map(link => ({
      link,
      section: document.getElementById(
        link.getAttribute("href").slice(1)
      )
    }))
    .filter(item => item.section);

  function updatePagePosition() {
    // Update the gold reading-progress bar
    const page = document.documentElement;
    const scrollable = page.scrollHeight - window.innerHeight;
    const progress = scrollable > 0
      ? (page.scrollTop / scrollable) * 100
      : 0;

    document.body.style.setProperty(
      "--scroll-progress",
      `${progress}%`
    );

    // Highlight the section currently being viewed
    let current = navLinks[0];

    navLinks.forEach(item => {
      if (item.section.getBoundingClientRect().top <= 160) {
        current = item;
      }
    });

    navLinks.forEach(item => {
      const active = item === current;
      item.link.classList.toggle("is-active", active);

      if (active) {
        item.link.setAttribute("aria-current", "location");
      } else {
        item.link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updatePagePosition, {
    passive: true
  });

  window.addEventListener("resize", updatePagePosition);

  updatePagePosition();
})();
