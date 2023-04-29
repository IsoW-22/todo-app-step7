// Get the modal
const modal = document.querySelectorAll('[class|="modal"]');

// Get the <span> element that closes the modal
const span = document.querySelectorAll(".close-modal");

// When the user clicks on <span> (x), close the modal
span.forEach(element => {
    element.addEventListener("click", () => {
        modal.forEach((elem) => {
          elem.style.display = "none";
        });
      });
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (evt) => {
  if (evt.target === modal) {
    modal.forEach((elem) => {
      elem.style.display = "none";
    });
  }
});