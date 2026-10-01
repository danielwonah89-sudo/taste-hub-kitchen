const whatsappNumber = "2348000000000";
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const toast = document.querySelector(".toast");
let toastTimer;

document.querySelector("#year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isOpen);
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  });
});

document.querySelectorAll(".add-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.dataset.item;
    const price = Number(button.dataset.price);
    const discountPrice = Math.round(price * 0.8 / 100) * 100;
    const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;
    const message = `Hi Taste Hub Kitchen! I'd like to order ${item} (${formatNaira(price)}). I’m a first-time customer—please apply the 20% opening offer. My offer price is ${formatNaira(discountPrice)}.`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    toast.textContent = `${item} added to your WhatsApp order.`;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2500);
  });
});