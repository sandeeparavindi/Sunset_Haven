document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const toast = document.querySelector(".toast");

  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    nav?.classList.toggle("is-open");
    document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", nav?.classList.contains("is-open") ? "true" : "false");
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }));

  const showToast = (message) => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 3400);
  };

  document.querySelectorAll("[data-booking-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const checkIn = form.querySelector("[name=checkin]")?.value;
      const checkOut = form.querySelector("[name=checkout]")?.value;
      if (!checkIn || !checkOut) {
        showToast("Please choose your check-in and check-out dates.");
        return;
      }
      const result = form.parentElement.querySelector(".booking-message");
      if (result) result.textContent = "Your dates are available — our reservations team will be in touch shortly.";
      showToast("Availability request received.");
    });
  });

  document.querySelectorAll("[data-filter-group]").forEach(group => {
    const buttons = group.querySelectorAll("[data-filter]");
    const cards = document.querySelectorAll("[data-category]");
    buttons.forEach(button => button.addEventListener("click", () => {
      buttons.forEach(item => item.classList.remove("is-active"));
      button.classList.add("is-active");
      const filter = button.dataset.filter;
      cards.forEach(card => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    }));
  });

  const modal = document.querySelector(".modal");
  const modalImage = modal?.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach(item => item.addEventListener("click", () => {
    if (!modal || !modalImage) return;
    modalImage.src = item.dataset.lightbox;
    modalImage.alt = item.querySelector("img")?.alt || "Sunset Haven gallery image";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }));
  const closeModal = () => {
    modal?.classList.remove("is-open");
    modal?.setAttribute("aria-hidden", "true");
  };
  modal?.addEventListener("click", event => { if (event.target === modal || event.target.closest(".modal-close")) closeModal(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });
});