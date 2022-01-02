const startAddMovieBnt = document.querySelector("header button");
const addingPopUp = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const cancelAddBnt = addingPopUp.querySelector(".btn--passive");
const addMovieBtn = addingPopUp.querySelector(".btn--success");
const userInputs = addingPopUp.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
	backdrop.classList.toggle("visible");
};

const updateUI = () => {
	if (movies.length === 0) {
		entryTextSection.style.display = "block";
	} else {
		entryTextSection.style.display = "none";
	}
};

const closeMovieModal = () => {
	addingPopUp.classList.remove("visible");
	cancelMovieDeletion();
	toggleBackdrop();
};

const deleteMovie = (movieId) => {
	let movieIndex = 0;
	for (const movie of movies) {
		if (movie.id === movieId) {
			break;
		}
		movieIndex++;
	}
	movies.splice(movieIndex, 1);
	listRoot.children[movieIndex].remove();
	closeMovieModal();
	updateUI();
};

const cancelMovieDeletion = () => {
	deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = (movieId) => {
	deleteMovieModal.classList.add("visible");
	toggleBackdrop();

	const cancelButton = deleteMovieModal.querySelector(".btn--passive");
	let confirmButton = deleteMovieModal.querySelector(".btn--danger");

	confirmButton.replaceWith(confirmButton.cloneNode(true));

	confirmButton = deleteMovieModal.querySelector(".btn--danger");

	cancelButton.removeEventListener("click", closeMovieModal);

	cancelButton.addEventListener("click", closeMovieModal);
	confirmButton.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
	const newMovieElement = document.createElement("li");
	newMovieElement.className = "movie-element";
	newMovieElement.innerHTML = `
        <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}"></img>
        </div>
        <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
        </div>
    `;
	newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
	listRoot.append(newMovieElement);
};

const clearMovieInputs = () => {
	for (const userInput of userInputs) {
		userInput.value = "";
	}
};

const showPopUp = () => {
	addingPopUp.classList.add("visible");
	toggleBackdrop();
	clearMovieInputs();
};

const closePopUpHandler = () => {
	closeMovieModal();
	cancelMovieDeletion();
};

const addMovieHandler = () => {
	const titleValue = userInputs[0].value;
	const imageUrlValue = userInputs[1].value;
	const ratingValue = userInputs[2].value;

	if (
		titleValue.trim() === "" ||
		imageUrlValue.trim() === "" ||
		ratingValue.trim() === "" ||
		+ratingValue < 1 ||
		+ratingValue > 5
	) {
		alert("Please enter valid values (rating between  1 and 5).");
		return;
	}

	const newMovie = {
		id: Math.random().toString(),
		title: titleValue,
		image: imageUrlValue,
		rating: ratingValue,
	};

	movies.push(newMovie);
	console.log(newMovie);
	closeMovieModal();
	renderNewMovieElement(
		newMovie.id,
		newMovie.title,
		newMovie.image,
		newMovie.rating
	);
	updateUI();
};

startAddMovieBnt.addEventListener("click", showPopUp);
backdrop.addEventListener("click", closePopUpHandler);
cancelAddBnt.addEventListener("click", closePopUpHandler);
addMovieBtn.addEventListener("click", addMovieHandler);
