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
