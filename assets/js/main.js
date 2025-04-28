class FormValidator {
  constructor() {
    this.form = document.querySelector(".formulario");
    this.addEvents();
  }

  addEvents() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const fieldsValid = this.areFieldsValid();
    const passwordsValid = this.arePasswordsValid();

    if (fieldsValid && passwordsValid) {
      window.location.href = "submitAvailable.html";
    }
  }

  arePasswordsValid() {
    let valid = true;

    const password = this.form.querySelector(".senha");
    const repeatPassword = this.form.querySelector(".repetir-senha");

    if (password.value !== repeatPassword.value) {
      valid = false;
      this.createError(
        password,
        "Campos senha e repetir senha precisam ser iguais."
      );
      this.createError(
        repeatPassword,
        "Campos senha e repetir senha precisam ser iguais."
      );
    }

    if (password.value.length < 6 || password.value.length > 12) {
      valid = false;
      this.createError(password, "Senha precisa estar entre 6 e 12 caracteres");
    }

    return valid;
  }

  areFieldsValid() {
    let valid = true;

    for (let errorText of this.form.querySelectorAll(".error-text")) {
      errorText.remove();
    }

    for (let field of this.form.querySelectorAll(".validar")) {
      const label = field.previousElementSibling.innerHTML;
      if (!field.value) {
        this.createError(field, `Campo "${label}" não pode estar vazio.`);
        valid = false;
      }

      if (field.classList.contains(".cpf")) {
        if (!this.validateCPF(field)) valid = false;
      }

      if (field.classList.contains(".usuario")) {
        if (!this.validateUser(field)) valid = false;
      }
    }
    return valid;
  }

  validateUser(field) {
    const user = field.value;
    let valid = true;

    if (user.length < 3 || user.length > 12) {
      this.createError(field, "Usuário precisa ter entre 3 e 12 caracteres.");
      valid = false;
    }

    if (!user.match(/[a-zA-Z0-9]+$/g)) {
      this.createError(
        field,
        "Nome de usuário precisa conter apenas letras e/ou números."
      );
      valid = false;
    }

    return valid;
  }

  validateCPF(field) {
    const cpf = new CPFValidator(field.value);

    if (!cpf.validate()) {
      this.createError(field, "CPF inválido");
      return false;
    }
    return true;
  }

  createError(field, msg) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.classList.add("error-text");
    field.insertAdjacentElement("afterend", div);
  }
}

const validator = new FormValidator();
