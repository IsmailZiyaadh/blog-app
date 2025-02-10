document.getElementById("searchBar").addEventListener("input", function() {
    console.log("input searchbar detected");
    let query = this.value.toLowerCase();
    let blogCards = document.querySelectorAll(".card");

    blogCards.forEach((card) => {
        let title = card.getAttribute("data-title")?.toLowerCase(); // Ensure it exists
        if (title && title.includes(query)) {
            card.style.display = "block"; // Show matching cards
        } else {
            card.style.display = "none"; // Hide non-matching cards
        }
    });
});
