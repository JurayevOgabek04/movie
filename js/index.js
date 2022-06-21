const elMovieList = document.querySelector(".movie__list");
const elResult = document.querySelector(".movie__result-num");
const elForm = document.querySelector(".form");
const elSelect = document.querySelector(".select");
const elSearch = document.querySelector(".search")
const elulTitle = document.querySelector(".title-ul");

const locolBook = JSON.parse(window.localStorage.getItem("FilmBookmark"))

elResult.textContent = films.length;

elSelect.innerHTML = "";


elulTitle.addEventListener("click", evt => {
  if (evt.target.matches(".remove")) {
    const removeNewId = evt.target.dataset.removeId

    const foundmark = FilmBookmark.findIndex(mark => mark.id === removeNewId)

    FilmBookmark.splice(foundmark, 1)
  }

  window.localStorage.setItem("FilmBookmark", JSON.stringify(FilmBookmark))

  elulTitle.innerHTML = null
  renderbookmark(FilmBookmark, elulTitle)

})


let renderGenres = function (arr) {
  let uniqe = [];
  arr.map((film) => {
    film.genres.filter((genre) => {
      return !uniqe.includes(genre) ? uniqe.push(genre) : uniqe;
    });
  });

  uniqe.forEach((genre) => {
    let genreOption = document.createElement("option");

    genreOption.textContent = genre;
    genreOption.value = genre;
    elSelect.append(genreOption);
  });
};

let FilmBookmark = locolBook || [];
// let FilmBookmark =  [];

const renderbookmark = function (arr, where) {
  arr.forEach(bookmark => {
    newItem = document.createElement("li")
    newtitle = document.createElement("b")
    newremoveBtn = document.createElement("button")


    newremoveBtn.setAttribute(
      "class",
      "remove col-3 btn btn-sm btn-danger border border-danger p-2 mt-2"
    );
    newItem.setAttribute("class", "card border border-primary mb-3 p-3 d-flex");


    newremoveBtn.dataset.removeId = bookmark.id


    newremoveBtn.textContent = "Remove";
    newtitle.textContent = bookmark.title
    newItem.append(newtitle)
    newItem.append(newremoveBtn)
    where.append(newItem)

    window.localStorage.setItem("FilmBookmark", JSON.stringify(FilmBookmark))
  })

}

renderbookmark(locolBook,elulTitle)
// renderbookmark(FilmBookmark,elulTitle)

elMovieList.addEventListener('click', evt => {
  if (evt.target.matches(".bookmarks")) {

    const removeId = evt.target.dataset.BookmarkId

    foundbookmark = films.find(film => film.id === removeId)

    if (!FilmBookmark.includes(foundbookmark)) {
      FilmBookmark.push(foundbookmark)
    }


    window.localStorage.setItem("FilmBookmark", JSON.stringify(FilmBookmark))
    elulTitle.innerHTML = null
    renderbookmark(FilmBookmark, elulTitle)

  }
})


let renderMovies = function (filmArr, where) {
  filmArr.forEach((movie) => {
    //CREATE ELEMENT
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newDiv = document.createElement("div");
    const newTitle = document.createElement("h5");
    const newLanguage = document.createElement("p");
    const newYear = document.createElement("p");
    const newButton = document.createElement("a");
    let genreList = document.createElement("ul");

    // const newBookmarDiv = document.createElement("");
    const newBookmark = document.createElement("li");
    const newName = document.createElement("p");
    const newDeletBtn = document.createElement("button");

    //SET ATTTIBUTE
    newLi.setAttribute("class", "card mb-3");
    newLi.style.width = "16rem";
    newImg.classList.add("card-img-top");
    newImg.setAttribute("src", movie.poster);
    newDiv.classList.add("card-body");
    newTitle.classList.add("card-title");
    newLanguage.classList.add("card-text");
    newYear.classList.add("card-text");

    newBookmark.setAttribute("class", "bookmarks btn btn-outline-success mt-3");
    newName.setAttribute("class", "fs-5 d-block mb-2");

    //  TEXT CONTENT

    newTitle.textContent = movie.title;
    newYear.textContent = movie.year;
    newBookmark.textContent = "Bookmarked";

    newName.textContent = movie.title;




    // DATASET ID
    newBookmark.dataset.BookmarkId = movie.id;
    newDeletBtn.dataset.DeleteId = movie.id;

    //APPEND
    where.appendChild(newLi);
    newLi.appendChild(newImg);
    newLi.appendChild(newDiv);
    newDiv.appendChild(newTitle);
    newDiv.appendChild(newBookmark);
    newDiv.appendChild(genreList);
  });
};




renderMovies(films, elMovieList);
renderGenres(films);

elForm.addEventListener("submit", (event) => {
  event.preventDefault();

  elMovieList.innerHTML = null;

  let selectValue = elSelect.value;
  let selectedMovie = [];

  films.map((film) => {
    film.genres.includes(selectValue)
      ? selectedMovie.push(film)
      : selectedMovie;
  });

  elResult.textContent = selectedMovie.length;

  renderMovies(selectedMovie, elMovieList);
});
