const menuToggle = document.getElementById("menu-toggle");
const zoneh = document.getElementById("zoneh");
const MenuText1 = document.getElementById("menu-text1");
const MenuText2 = document.getElementById("menu-text2");
const MenuText3 = document.getElementById("menu-text3");

// Ajoute la classe "active" à zoneh et menuToggle lorsque la souris survole l'élément zoneh
zoneh.addEventListener("mouseover", () => {
    zoneh.classList.add("active");
    menuToggle.classList.add("active");
    MenuTexts.classList.add("active");
});

// Retire la classe "active" de zoneh et menuToggle lorsque la souris quitte l'élément zoneh
zoneh.addEventListener("mouseout", () => {
    zoneh.classList.remove("active");
    menuToggle.classList.remove("active");s
    MenuTexts.classList.remove("active");
});
MenuText.addEventListener("mouseover", () => {
    linet.classList.add("active");
});
MenuText.addEventListener("mouseout", () => {
    linet.classList.remove("active");
});
