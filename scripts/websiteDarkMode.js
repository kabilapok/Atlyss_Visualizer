(function darkModeOption() {
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    const ICONS = {
        light: "assets/images/misc/_ico_night.png",
        dark: "assets/images/misc/_ico_day.png"    
    };

    function applyTheme(theme) {
        body.classList.remove("light-mode", "dark-mode");
        if (theme === "dark") {
            body.classList.add("dark-mode");
            themeIcon.src = ICONS.dark;
        } else {
            body.classList.add("light-mode");
            themeIcon.src = ICONS.light;
        }
    }

    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
        applyTheme(prefersDark.matches ? "dark" : "light");

        prefersDark.addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                applyTheme(e.matches ? "dark" : "light");
            }
        });
    }

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
            applyTheme(newTheme);
            localStorage.setItem("theme", newTheme);
        });
    }
})();
