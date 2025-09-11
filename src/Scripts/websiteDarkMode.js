export function darkModeOption() {
    const toggleBtn = document.getElementById("theme-toggle");
    const body = document.body;

    // Load preference from localStorage
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    if (!localStorage.getItem("theme")) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            body.classList.add("dark-mode");
        }
    }

    toggleBtn.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        const theme = body.classList.contains("dark-mode") ? "dark" : "light";
        localStorage.setItem("theme", theme);
    });

}