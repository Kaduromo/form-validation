const data = {}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form")

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    alert(`Имя ${data.name}, Email ${data.email}`)
    setTimeout(() => e.target.reset(), 2000)
  })

  form.addEventListener("keyup", (e) => {
    e.preventDefault()
    // const error = formValidate()
    formValidate()
  })

  function formValidate() {
    let error = 0
    const formReq = document.querySelectorAll("._req")

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index]

      formRemoveError(input)
      input.classList.remove("_succsess")

      if (input.focus) {
        if (input.id === "name") {
          removeErrorMessage(input)

          if (input.value.trim() === "") {
            addErrorMessage(input, "Имя обязательно для заполнения")
          }

          if (minValue(input, 3)) {
            addErrorMessage(input, "Имя должно состаять миниму из 3 символов")
          }

          if (input.value.trim().length >= 3) {
            data.name = input.value
            input.classList.add("_succsess")
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
          }

          if (!emailRegExp) {
            addErrorMessage(input, "Email введено некорректно")
            error++
          } else {
            data.email = input.value
            input.classList.add("_succsess")
          }
        }

        if (input.name === "password") {
          const capitalRegExp = /[A-Z]+/g.test(input.value)
          const digitRegExp = /\d+/g.test(input.value)

          removeErrorMessage(input)

          if (input.value.trim() === "") {
            addErrorMessage(input, "Пароль обязателен для заполнения")
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
              "Пароль должен состаять миниму из 8 символов"
            )
          }

          if (input.value.trim().length >= 8 && capitalRegExp && digitRegExp) {
            input.classList.add("_succsess")
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
