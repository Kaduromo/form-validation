document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form")
  const formButton = form.querySelector(".form__button")
  const data = {}

  formButton.addEventListener("click", () => {
    form.addEventListener("submit", (e) => e.preventDefault())

    if (data?.name?.length && data?.email?.length) {
      formButton.classList.add("_success")
      alert(`Имя ${data.name}, Email ${data.email}`)
      form.reset()
    } else {
      formButton.classList.add("_error")
      alert("Пожалуйста,заполните поля формы")
    }
  })

  form.addEventListener("keyup", (e) => {
    e.preventDefault()
    formValidate()
  })

  function formValidate() {
    let error = 0
    const formReq = document.querySelectorAll("[data-req]")

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index]

      formRemoveError(input)
      input.classList.remove("_success")

      if (input.focus) {
        if (input.id === "name") {
          removeErrorMessage(input)

          if (input.value.trim() === "") {
            addErrorMessage(input, "Имя обязательно для заполнения")
            error++
          }

          if (minValue(input, 3)) {
            addErrorMessage(input, "Имя должно состаять минимум из 3 символов")
            error++
          }

          if (input.value.trim().length >= 3) {
            data.name = input.value
            input.classList.add("_success")
            error = 0
          }
        }

        if (input.name === "email") {
          const emailRegExp = /^\S+@\S+\.\S+$/g.test(input.value)
          removeErrorMessage(input)

          if (input.value.trim() === "") {
            addErrorMessage(
              input,
              "Электронная почта обязательна для заполнения"
            )
            error++
          }

          if (!emailRegExp) {
            addErrorMessage(input, "Email введено некорректно")
            error++
          } else {
            data.email = input.value
            input.classList.add("_success")
            error = 0
          }
        }

        if (input.name === "password") {
          const capitalRegExp = /[A-Z]+/g.test(input.value)
          const digitRegExp = /\d+/g.test(input.value)

          removeErrorMessage(input)

          if (input.value.trim() === "") {
            addErrorMessage(input, "Пароль обязателен для заполнения")
            error++
          }

          if (!capitalRegExp) {
            addErrorMessage(
              input,
              "Пароль должен содержать хотя бы одну заглавную букву"
            )
            error++
          }

          if (!digitRegExp) {
            addErrorMessage(input, "Пароль должен содержать хотя бы одно число")
            error++
          }

          if (minValue(input, 8)) {
            addErrorMessage(
              input,
              "Пароль должен состаять минимум из 8 символов"
            )
            error++
          }

          if (input.value.trim().length >= 8 && capitalRegExp && digitRegExp) {
            input.classList.add("_success")
            error = 0
          }
        }
      }
    }

    return error
  }
})

function removeErrorMessage(input) {
  input.parentElement.querySelector("span") &&
    input.parentElement.querySelector("span").remove()
}

function minValue(input, min) {
  return input.value.trim().length >= 1 && input.value.trim().length < min
}

function formAddError(input) {
  input.parentElement.classList.add("_error")
  input.classList.add("_error")
}

function formRemoveError(input) {
  input.parentElement.classList.remove("_error")
  input.classList.remove("_error")
}

function addErrorMessage(input, message) {
  const span = document.createElement("span")

  span.innerHTML = message
  formAddError(input)

  if (!input.nextElementSibling) {
    input.parentElement.append(span)
  }
}
