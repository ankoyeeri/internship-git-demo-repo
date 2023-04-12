import AlertErrorHandler from "./common/error.js";

class ProfilePage {
  #nameParagraph = null;
  #surnameParagraph = null;
  #emailnameParagraph = null;

  constructor() {
    this.#parsePage();
  }

  set Name(value) {
    this.#nameParagraph.innerHTML = `<b>Name:</b> ${value}`;
  }

  set Surname(value) {
    this.#surnameParagraph.innerHTML = `<b>Surname:</b> ${value}`;
  }

  set Email(value) {
    this.#emailnameParagraph.innerHTML = `<b>Email:</b> ${value}`;
  }

  #parsePage() {
    const profileInfoContainer =
      document.getElementsByClassName("profile-info")[0];
    const profileInfoParagraphs =
      profileInfoContainer.getElementsByTagName("p");

    for (let paragraph of profileInfoParagraphs) {
      paragraph.innerHTML += " ";
      for (let item of paragraph.children) {
        if (item.innerHTML.search("Name") !== -1)
          this.#nameParagraph = paragraph;
        if (item.innerHTML.search("Surname") !== -1)
          this.#surnameParagraph = paragraph;
        if (item.innerHTML.search("Email") !== -1)
          this.#emailnameParagraph = paragraph;
      }
    }
  }
}

function fillUserData() {
  const name = "John";
  const surname = "Newman";
  const email = "john.newman@mail.com";

  let profilePage = new ProfilePage();

  profilePage.Name = name;
  profilePage.Surname = surname;
  profilePage.Email = email;
}

function changeEmail() {
  let newEmail = prompt("Type your new email");

  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(newEmail)) {
    alert("Wrong email format");
    return;
  }

  let profilePage = new ProfilePage();

  profilePage.Email = newEmail;
}

(function build() {
  fillUserData();
})();

window.changeEmail = changeEmail;
