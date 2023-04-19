if (localStorage.getItem("name") == null) {
  const name = prompt("enter your name", "new user");
  if (name == null || name == "") {
    document.querySelector(".user").innerHTML = "new user";
  } else {
    localStorage.setItem("name", name);
    document.querySelector(".user").innerHTML = name;
  }
} else {
  const newName = localStorage.getItem("name");
  document.querySelector(".user").innerHTML = newName;
}

const userChange = document.querySelector(".user");
userChange.addEventListener("click", () => {
  const name = prompt("enter your name", localStorage.getItem("name"));
  if (name != null || name == "") {
    localStorage.clear();
    localStorage.setItem("name", name);
    document.querySelector(".user").innerHTML = name;
  } else {
    document.querySelector(".user").innerHTML = localStorage.getItem("name");
  }
});
