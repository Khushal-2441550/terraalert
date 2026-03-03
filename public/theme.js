document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;

    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        updateToggleButton(true);
    } else {
        updateToggleButton(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = body.classList.toggle("dark-theme");
            localStorage.setItem("theme", isDark ? "dark" : "light");
            updateToggleButton(isDark);
        });
    }

    function updateToggleButton(isDark) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector("i");
        if (icon) {
            if (isDark) {
                icon.className = "fas fa-sun";
            } else {
                icon.className = "fas fa-moon";
            }
        }
    }
});
