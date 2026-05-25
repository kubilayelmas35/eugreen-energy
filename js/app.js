(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  let lang = window.eugreenDetectLang?.() || "de";
  let theme = localStorage.getItem("eugreen-theme") || "light";
  const locations = window.EUR_LOCATIONS || {};
  const mapCountries = window.EUR_MAP_COUNTRIES || [];
  const deCities = window.EUR_DE_CITIES || [];
  const FORM_STEPS = 6;

  function t(key) {
    return (window.EUGREEN_T?.[lang] || window.EUGREEN_T?.en || {})[key] ?? key;
  }

  function applyI18n() {
    const pack = window.EUGREEN_T?.[lang] || window.EUGREEN_T?.en;
    if (!pack) return;
    document.documentElement.lang = lang;
    document.title = pack.metaTitle;
    const meta = $('meta[name="description"]');
    if (meta) meta.content = pack.metaDesc;
    $$("[data-i18n]").forEach((el) => {
      const v = pack[el.dataset.i18n];
      if (v != null) el.textContent = v;
    });
    $$("[data-i18n-placeholder]").forEach((el) => {
      const v = pack[el.dataset.i18nPlaceholder];
      if (v) el.placeholder = v;
    });
    $$("[data-i18n-option]").forEach((el) => {
      const v = pack[el.dataset.i18nOption];
      if (v) el.textContent = v;
    });
    renderTimeline(pack.timeline || []);
    renderFaq(pack.faqItems || []);
    updateWizardLabels();
    $("#panel-close")?.setAttribute("aria-label", t("panel_close"));
    applyTheme();
  }

  function renderTimeline(items) {
    const box = $("#timeline");
    if (!box) return;
    box.className = "timeline-animated";
    box.innerHTML = items
      .map(
        (it, i) => `
      <article class="timeline-item" data-tl="${i}" style="--i:${i}">
        <div class="tl-marker"><span class="tl-dot"></span><span class="tl-year">${it.y}</span></div>
        <div class="tl-body"><h3>${it.t}</h3><p>${it.d}</p></div>
      </article>`
      )
      .join("");
    initTimelineObserver();
  }

  function renderFaq(items) {
    const box = $("#faq-list");
    if (!box) return;
    box.innerHTML = items
      .map(
        (it, i) => `
      <div class="faq-item">
        <button type="button" class="faq-q" aria-expanded="false"><span>${escapeHtml(it.q)}</span><span class="faq-chevron">▼</span></button>
        <div class="faq-a"><p>${escapeHtml(it.a)}</p></div>
      </div>`
      )
      .join("");
    bindFaqHandlers();
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function bindFaqHandlers() {
    $$(".faq-q").forEach((btn) => {
      btn.addEventListener("click", () => {
        const item = btn.closest(".faq-item");
        const open = item.classList.contains("open");
        $$(".faq-item").forEach((i) => {
          i.classList.remove("open");
          i.querySelector(".faq-q")?.setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initTimelineObserver() {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("tl-visible");
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
    );
    $$(".timeline-item").forEach((el) => io.observe(el));
  }

  function initLangSelect() {
    const sel = $("#lang-select");
    if (!sel) return;
    sel.innerHTML = "";
    Object.entries(window.EUGREEN_LANGS || {}).forEach(([code, label]) => {
      const o = document.createElement("option");
      o.value = code;
      o.textContent = label;
      if (code === lang) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener("change", () => {
      lang = sel.value;
      localStorage.setItem("eugreen-lang", lang);
      applyI18n();
    });
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = $("#theme-toggle");
    if (btn) {
      btn.setAttribute("aria-pressed", theme === "dark");
      btn.title = theme === "light" ? t("theme_dark") : t("theme_light");
    }
    localStorage.setItem("eugreen-theme", theme);
  }

  $("#theme-toggle")?.addEventListener("click", () => {
    theme = theme === "light" ? "dark" : "light";
    applyTheme();
  });

  const topbar = $(".topbar");
  $(".nav-toggle")?.addEventListener("click", () => topbar?.classList.toggle("open"));
  $$("[data-scroll]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const href = el.getAttribute("href") || el.dataset.scroll;
      if (href?.startsWith("#")) {
        e.preventDefault();
        $(href)?.scrollIntoView({ behavior: "smooth" });
        topbar?.classList.remove("open");
      }
    });
  });

  const yearSlider = $("#year-slider");
  const savingsPct = $("#savings-pct");
  const data = [12, 18, 24, 32, 38];
  yearSlider?.addEventListener("input", () => {
    if (savingsPct) savingsPct.textContent = data[Number(yearSlider.value)] ?? 32;
  });

  /* ── Map ── */
  let selectedCountry = null;

  function closeLocationPanel() {
    $("#location-panel")?.classList.remove("visible");
    $$(".map-dot").forEach((d) => d.classList.remove("active"));
    selectedCountry = null;
  }

  function openLocationPanel(code) {
    const data = locations[code];
    if (!data) return;
    selectedCountry = code;
    $$(".map-dot").forEach((d) => {
      d.classList.toggle("active", d.dataset.country === code && !d.dataset.city);
    });
    const panel = $("#location-panel");
    const title = $("#panel-title");
    const offices = $("#panel-offices");
    if (title) title.textContent = data.flag + " " + data.name;
    if (offices) {
      offices.innerHTML = data.offices
        .map(
          (o, i) => `
        <div class="office-card" data-country="${code}" data-index="${i}">
          <strong>${o.city}</strong>
          <small>${o.address}</small>
          <small>${o.phone}</small>
        </div>`
        )
        .join("");
      offices.querySelectorAll(".office-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          e.stopPropagation();
          pickOffice(card);
        });
      });
    }
    panel?.classList.add("visible");
    const sel = $("#wizard-country");
    if (sel) sel.value = code;
    $("#field-country").value = code;
  }

  function pickOffice(card) {
    const code = card.dataset.country;
    const idx = card.dataset.index;
    const office = locations[code]?.offices[idx];
    if (office && $("#wizard-city")) $("#wizard-city").value = office.city;
    if ($("#wizard-country")) $("#wizard-country").value = code;
    closeLocationPanel();
    goToStep(0);
    $("#anfrage")?.scrollIntoView({ behavior: "smooth" });
  }

  function renderMap() {
    const svg = $("#europe-map");
    if (!svg || svg.querySelector("#map-dots")) return;
    svg.setAttribute("viewBox", "0 0 483 480");
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.id = "map-dots";

    mapCountries.forEach((c) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("class", "map-dot map-dot-country");
      circle.setAttribute("cx", c.x);
      circle.setAttribute("cy", c.y);
      circle.setAttribute("r", "5");
      circle.dataset.country = c.id;
      g.appendChild(circle);
    });

    deCities.forEach((c) => {
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("class", "map-dot map-dot-city");
      circle.setAttribute("cx", c.x);
      circle.setAttribute("cy", c.y);
      circle.setAttribute("r", "3.5");
      circle.dataset.country = c.id;
      circle.dataset.city = c.index;
      circle.dataset.title = c.city;
      g.appendChild(circle);
    });

    svg.appendChild(g);
    g.addEventListener("click", (e) => {
      const dot = e.target.closest(".map-dot");
      if (!dot) return;
      e.stopPropagation();
      if (dot.dataset.city != null) {
        openLocationPanel("DE");
        const card = $("#panel-offices")?.querySelector(`[data-index="${dot.dataset.city}"]`);
        card?.classList.add("selected");
      } else {
        openLocationPanel(dot.dataset.country);
      }
    });
  }

  $("#panel-close")?.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLocationPanel();
  });

  $(".map-stage")?.addEventListener("click", (e) => {
    if (e.target.closest("#location-panel") || e.target.closest(".map-dot")) return;
    closeLocationPanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLocationPanel();
  });

  const countrySel = $("#wizard-country");
  if (countrySel) {
    Object.keys(locations).forEach((code) => {
      const o = document.createElement("option");
      o.value = code;
      o.textContent = locations[code].flag + " " + locations[code].name;
      countrySel.appendChild(o);
    });
  }
  renderMap();

  /* ── Globe animation ── */
  const GLOBE_SPOTS = [
    { x: 48, y: 42, type: "solar" }, { x: 52, y: 38, type: "power" }, { x: 46, y: 45, type: "heat" },
    { x: 55, y: 40, type: "solar" }, { x: 44, y: 48, type: "power" }, { x: 58, y: 44, type: "heat" }
  ];

  function runGlobeAnimation() {
    const fx = $("#globe-fx");
    const brand = $("#globe-brand");
    const label = $("#globe-phase-label");
    if (!fx) return;
    fx.innerHTML = "";
    brand?.classList.remove("show");

    const phases = [
      { key: "globe_solar", icon: "☀️", type: "solar" },
      { key: "globe_power", icon: "⚡", type: "power" },
      { key: "globe_heat", icon: "🌡️", type: "heat" }
    ];
    let idx = 0;

    function nextPhase() {
      if (idx >= phases.length) {
        if (label) label.textContent = "";
        brand?.classList.add("show");
        return;
      }
      const p = phases[idx++];
      if (label) label.textContent = t(p.key);
      GLOBE_SPOTS.filter((s) => s.type === p.type).forEach((s, i) => {
        setTimeout(() => {
          const el = document.createElement("div");
          el.className = `globe-pin globe-pin-${s.type}`;
          el.style.left = s.x + "%";
          el.style.top = s.y + "%";
          el.innerHTML = `<span>${p.icon}</span>`;
          fx.appendChild(el);
          requestAnimationFrame(() => el.classList.add("pop"));
        }, i * 220);
      });
      setTimeout(nextPhase, 2100);
    }
    nextPhase();
  }

  const globeIo = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runGlobeAnimation();
          globeIo.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );
  const globeStage = $("#globe-stage");
  if (globeStage) globeIo.observe(globeStage);

  /* ── Form wizard ── */
  let step = 0;
  const flowFill = $("#flow-fill");
  const flowBulb = $("#flow-bulb");
  const bulbLabel = $("#bulb-label");

  function updateWizardLabels() {
    const titles = ["form_step_country", "form_step_property", "form_step_services", "form_step_usage", "form_step_contact", "form_step_extra"];
    $$(".wizard-step").forEach((el, i) => {
      const h = el.querySelector("[data-step-title]");
      if (h) h.textContent = t(titles[i]);
    });
    const back = $("#btn-back");
    const next = $("#btn-next");
    if (back) back.textContent = t("form_back");
    if (next) next.textContent = step === FORM_STEPS - 1 ? t("form_submit") : t("form_next");
  }

  function updateFlow() {
    const pct = (step / (FORM_STEPS - 1)) * 100;
    if (flowFill) flowFill.style.width = pct + "%";
    $$(".flow-node").forEach((n, i) => {
      n.classList.toggle("done", i < step);
      n.classList.toggle("active", i === step);
    });
    const lit = step >= FORM_STEPS - 1;
    flowBulb?.classList.toggle("lit", lit);
    if (bulbLabel) bulbLabel.textContent = lit ? t("bulb_ready") : t("bulb_charge");
    const back = $("#btn-back");
    if (back) back.style.visibility = step === 0 ? "hidden" : "visible";
    updateWizardLabels();
  }

  function goToStep(n) {
    step = Math.max(0, Math.min(FORM_STEPS - 1, n));
    $$(".wizard-step").forEach((s, i) => s.classList.toggle("active", i === step));
    updateFlow();
  }

  function validateStep() {
    const active = $(".wizard-step.active");
    if (!active) return true;
    let ok = true;
    active.querySelectorAll("[required]").forEach((inp) => {
      if (inp.type === "checkbox" || inp.type === "radio") return;
      if (!String(inp.value || "").trim()) {
        inp.style.borderColor = "#ff6b6b";
        ok = false;
      } else inp.style.borderColor = "";
    });
    if (step === 2 && !active.querySelector('input[name="service"]:checked')) ok = false;
    return ok;
  }

  $("#btn-next")?.addEventListener("click", () => {
    if (!validateStep()) return;
    if (step < FORM_STEPS - 1) goToStep(step + 1);
    else submitForm();
  });
  $("#btn-back")?.addEventListener("click", () => goToStep(step - 1));

  $$(".choice-card").forEach((card) => {
    card.addEventListener("click", () => {
      const inp = card.querySelector("input");
      if (inp?.type === "radio") {
        $$('input[name="' + inp.name + '"]').forEach((r) => r.closest(".choice-card")?.classList.remove("selected"));
        inp.checked = true;
        card.classList.add("selected");
      } else if (inp?.type === "checkbox") {
        inp.checked = !inp.checked;
        card.classList.toggle("selected", inp.checked);
      }
    });
  });

  function submitForm() {
    const form = $("#eugreen-form");
    const fd = new FormData(form);
    const payload = Object.fromEntries(fd.entries());
    payload.services = $$('input[name="service"]:checked').map((i) => i.value);
    payload.lang = lang;
    payload.submittedAt = new Date().toISOString();
    window.EuGreenLastSubmission = payload;
    window.parent?.postMessage?.({ type: "EUGREEN_FORM_SUBMIT", payload }, "*");
    flowBulb?.classList.add("lit");
    $("#success-modal")?.classList.add("visible");
    form.reset();
    goToStep(0);
  }

  $("#modal-close")?.addEventListener("click", () => $("#success-modal")?.classList.remove("visible"));

  initLangSelect();
  applyTheme();
  applyI18n();
  goToStep(0);
})();
