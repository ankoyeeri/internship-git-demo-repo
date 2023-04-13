/**
 * @class Reprpesents Profile page. Alows to work with Name, Surname, Email fields directly
 */
class ProfilePage {
  // private fields
  #nameParagraph = null;
  #surnameParagraph = null;
  #emailnameParagraph = null;

  constructor() {
    this.#parsePage();
  }

  // Reference to name HTML paragraph element
  set Name(value) {
    this.#nameParagraph.innerHTML = `<b>Name:</b> ${value}`;
  }

  // Reference to surname HTML paragraph element
  set Surname(value) {
    this.#surnameParagraph.innerHTML = `<b>Surname:</b> ${value}`;
  }

  // Reference to email HTML paragraph element
  set Email(value) {
    this.#emailnameParagraph.innerHTML = `<b>Email:</b> ${value}`;
  }

  /**
   * Parse page and find Name, Surname and Email fields. Assign elements
   */
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
