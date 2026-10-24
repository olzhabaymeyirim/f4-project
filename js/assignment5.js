
  // TASK 0 — PERSONALIZED WELCOME


const welcomeName = document.getElementById("welcomeName");
const welcomeButton = document.getElementById("welcomeButton");
const welcomeMessage = document.querySelector("#welcomeMessage");

if (welcomeName && welcomeButton && welcomeMessage) {
    welcomeButton.addEventListener("click", function () {
        const name = welcomeName.value.trim();

        if (name === "") {
            welcomeMessage.textContent =
                "Please enter your name first.";
            return;
        }

        welcomeMessage.textContent = `Welcome to Moon & Movies, ${name}! Enjoy your movie night under the stars.`;
    });
}

// TASK 1: Light / Dark Theme
const themeButton = document.getElementById("themeButton");

if (themeButton) {
    function updateThemeButton() {
        const isLight = document.body.classList.contains("light-theme");

        themeButton.textContent = isLight ? "☾" : "☀";
        themeButton.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
        themeButton.setAttribute(
            "title",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    themeButton.addEventListener("click", function () {
        document.body.classList.toggle("light-theme");
        updateThemeButton();
    });

    updateThemeButton();
}



// TASK 2: FAQ — DOM Manipulation & Events 

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const answerId = button.getAttribute("aria-controls");
        const answer = document.getElementById(answerId);

        if (!answer) return;

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isExpanded));
        answer.hidden = isExpanded;
    });
});


// TASK 3: Movie Search

const movieSearch = document.getElementById("movieSearch");
const movieCards = document.querySelectorAll(".movie-list");
const movieCount = document.getElementById("movieCount");
const noResults = document.getElementById("noResults");

if (movieSearch && movieCount && noResults) {
    movieSearch.addEventListener("input", function () {
        const searchText = movieSearch.value.trim().toLowerCase();
        let visibleMovies = 0;

        movieCards.forEach(function (card) {
            const title = card.querySelector("h3").textContent
                .trim()
                .toLowerCase();

            if (title.includes(searchText)) {
                card.hidden = false;
                visibleMovies++;
            } else {
                card.hidden = true;
            }
        });

        movieCount.textContent =
            `Showing ${visibleMovies} of ${movieCards.length} movies`;

        noResults.hidden = visibleMovies !== 0;
    });
}
// TASK 4: Movie Night Wishlist

const wishlistForm = document.getElementById("wishlistForm");
const wishlistInput = document.getElementById("wishlistInput");
const wishlistItems = document.getElementById("wishlistItems");
const wishlistCount = document.getElementById("wishlistCount");
const wishlistMessage = document.getElementById("wishlistMessage");

if (
    wishlistForm &&
    wishlistInput &&
    wishlistItems &&
    wishlistCount &&
    wishlistMessage
) {
    function updateWishlistCount() {
        const count = wishlistItems.children.length;
        wishlistCount.textContent = `Movies in your wishlist: ${count}`;
    }

    wishlistForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const movieTitle = wishlistInput.value.trim();

        // Reject empty input and whitespace
        if (movieTitle === "") {
            wishlistMessage.textContent =
                "Please enter a movie title.";
            wishlistInput.focus();
            return;
        }

        // Create a new list item
        const listItem = document.createElement("li");
        const title = document.createElement("span");
        const removeButton = document.createElement("button");

        title.textContent = movieTitle;

        removeButton.textContent = "Remove";
        removeButton.type = "button";
        removeButton.setAttribute(
            "aria-label",
            `Remove ${movieTitle} from wishlist`
        );

        // Remove only this movie
        removeButton.addEventListener("click", function () {
            listItem.remove();
            updateWishlistCount();

            wishlistMessage.textContent =
                `${movieTitle} was removed from your wishlist.`;
        });

        listItem.append(title, " ", removeButton);
        wishlistItems.append(listItem);

        updateWishlistCount();

        wishlistMessage.textContent =
            `${movieTitle} was added to your wishlist.`;

        wishlistInput.value = "";
        wishlistInput.focus();
    });

    updateWishlistCount();
}
