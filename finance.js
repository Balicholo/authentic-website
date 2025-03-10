document.querySelectorAll('.top-part button').forEach(button => {
    button.addEventListener('click', function () {
      const dropdownAnswer = this.parentElement.nextElementSibling;

      // Toggle the visibility of the dropdown answer
      if (dropdownAnswer.style.maxHeight) {
        dropdownAnswer.style.maxHeight = null; // Close the dropdown
        this.textContent = "Read"; // Change button text
      } else {
        dropdownAnswer.style.maxHeight = dropdownAnswer.scrollHeight + "px"; // Open the dropdown
        this.textContent = "Close"; // Change button text
      }
    });
  });

//   BRANDS CAROUSEL
const swiper = new Swiper('.swiper', {
    slidesPerView: 10, // Number of logos visible at a time
    spaceBetween: 30, // Adjust spacing between logos
    loop: true, // Infinite scrolling
    autoplay: {
      delay: 2000, // 2 seconds per slide
      disableOnInteraction: false, // Keeps autoplay running after user interaction
    },
    speed: 800, // Transition speed
    breakpoints: {
      1024: { slidesPerView: 10 },
      768: { slidesPerView: 5 },
      480: { slidesPerView: 4 },
      320: { slidesPerView: 3 }
    }
  });

// HUMBURGER MENU
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    if (hamburger && navLinks) {
        // Toggle the menu on hamburger click
        hamburger.addEventListener("click", function () {
            navLinks.classList.toggle("active");
        });

        // Close menu when a link is clicked (for better UX on mobile)
        navItems.forEach(item => {
            item.addEventListener("click", function () {
                navLinks.classList.remove("active");
            });
        });

        // Close the menu when clicking outside of it
        document.addEventListener("click", function (event) {
            if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
                navLinks.classList.remove("active");
            }
        });

        // Improve accessibility by allowing "Esc" key to close the menu
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                navLinks.classList.remove("active");
            }
        });
    }
});

// FORM
document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const form = document.getElementById("financial-form")
  const dropArea = document.getElementById("drop-area")
  const fileInput = document.getElementById("file-input")
  const browseBtn = document.getElementById("browse-btn")
  const filePreview = document.getElementById("file-preview")
  const submitBtn = document.getElementById("submit-btn")
  const successMessage = document.getElementById("success-message")

  // Form fields
  const formFields = [
    { id: "fullName", required: true, validator: (value) => value.trim() !== "" },
    { id: "phoneNumber", required: true, validator: (value) => /^\d{10,15}$/.test(value.replace(/\D/g, "")) },
    { id: "emailAddress", required: true, validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) },
    { id: "idNumber", required: true, validator: (value) => value.trim() !== "" },
    { id: "billNumber", required: true, validator: (value) => value.trim() !== "" },
    { id: "billName", required: true, validator: (value) => value.trim() !== "" },
  ]

  // Store uploaded files
  let uploadedFiles = []

  // Add event listeners
  browseBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    fileInput.click()
  })

  fileInput.addEventListener("change", handleFileSelect)

  // Drag and drop events
  dropArea.addEventListener("dragenter", handleDragEnter)
  dropArea.addEventListener("dragover", handleDragOver)
  dropArea.addEventListener("dragleave", handleDragLeave)
  dropArea.addEventListener("drop", handleDrop)
  dropArea.addEventListener("click", () => {
    fileInput.click()
  })

  // Form submission
  form.addEventListener("submit", handleSubmit)

  // Add input event listeners for validation
  formFields.forEach((field) => {
    const input = document.getElementById(field.id)
    input.addEventListener("input", () => {
      validateField(field.id)
    })
  })

  // Functions
  function handleDragEnter(e) {
    e.preventDefault()
    e.stopPropagation()
    dropArea.classList.add("dragging")
  }

  function handleDragOver(e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  function handleDragLeave(e) {
    e.preventDefault()
    e.stopPropagation()
    dropArea.classList.remove("dragging")
  }

  function handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    dropArea.classList.remove("dragging")

    const dt = e.dataTransfer
    const files = dt.files

    handleFiles(files)
  }

  function handleFileSelect(e) {
    const files = e.target.files
    handleFiles(files)
  }

  function handleFiles(files) {
    const validFiles = Array.from(files).filter((file) => {
      const isValidType = ["image/jpeg", "image/png", "image/gif"].includes(file.type)
      const isValidSize = file.size <= 2 * 1024 * 1024 // 2MB
      return isValidType && isValidSize
    })

    validFiles.forEach((file) => {
      const fileId = Date.now() + Math.random().toString(36).substring(2)

      // Create file object with ID
      const fileObj = {
        id: fileId,
        file: file,
        url: URL.createObjectURL(file),
      }

      uploadedFiles.push(fileObj)

      // Create preview element
      createPreviewElement(fileObj)
    })

    // Reset file input
    fileInput.value = ""
  }

  function createPreviewElement(fileObj) {
    const previewItem = document.createElement("div")
    previewItem.className = "preview-item"
    previewItem.dataset.id = fileObj.id

    const img = document.createElement("img")
    img.src = fileObj.url
    img.alt = fileObj.file.name

    const removeBtn = document.createElement("div")
    removeBtn.className = "remove-btn"
    removeBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
      `

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation()
      removeFile(fileObj.id)
    })

    previewItem.appendChild(img)
    previewItem.appendChild(removeBtn)
    filePreview.appendChild(previewItem)
  }

  function removeFile(id) {
    // Find file in array
    const fileIndex = uploadedFiles.findIndex((file) => file.id === id)

    if (fileIndex !== -1) {
      // Revoke object URL to free memory
      URL.revokeObjectURL(uploadedFiles[fileIndex].url)

      // Remove from array
      uploadedFiles.splice(fileIndex, 1)

      // Remove preview element
      const previewItem = document.querySelector(`.preview-item[data-id="${id}"]`)
      if (previewItem) {
        filePreview.removeChild(previewItem)
      }
    }
  }

  function validateField(fieldId) {
    const field = formFields.find((f) => f.id === fieldId)
    const input = document.getElementById(fieldId)
    const errorElement = document.getElementById(`${fieldId}-error`)

    let isValid = true

    if (field.required && !field.validator(input.value)) {
      isValid = false
      input.classList.add("error")
      errorElement.style.display = "block"
    } else {
      input.classList.remove("error")
      errorElement.style.display = "none"
    }

    return isValid
  }

  function validateForm() {
    let isValid = true

    formFields.forEach((field) => {
      if (!validateField(field.id)) {
        isValid = false
      }
    })

    return isValid
  }

  // Declare emailjs
  const emailjs = window.emailjs

  function handleSubmit(e) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    // Disable submit button
    submitBtn.disabled = true
    submitBtn.textContent = "Submitting..."

    // Create FormData object for the form
    const formData = new FormData(form)

    // Create an object to hold the form data
    const data = {
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      emailAddress: formData.get("emailAddress"),
      idNumber: formData.get("idNumber"),
      billNumber: formData.get("billNumber"),
      billName: formData.get("billName"),
      attachmentCount: uploadedFiles.length,
    }

    // Add file attachments to the data object
    uploadedFiles.forEach((fileObj, index) => {
      data[`attachment${index + 1}`] = fileObj.file; // Attach files to the data object
    });

    // Send email using EmailJS with file attachments
    emailjs.send("service_lj2ux2q", "template_f0vk1wk", data, "BNpDeq7Eg_HVr2UHA")
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text)
          // Show success message
          form.style.display = "none"
          successMessage.style.display = "flex"
        },
        (error) => {
          console.error("Error sending email:", error.text)
          // Handle error
          alert("There was an error sending your message. Please try again later or check your internet connection")
        },
      )
      .finally(() => {
        // Reset form after 3 seconds
        setTimeout(() => {
          // Reset form fields
          form.reset()

          // Clear file previews
          filePreview.innerHTML = ""

          // Revoke all object URLs
          uploadedFiles.forEach((fileObj) => {
            URL.revokeObjectURL(fileObj.url)
          })

          // Clear uploaded files array
          uploadedFiles = []

          // Reset submit button
          submitBtn.disabled = false
          submitBtn.textContent = "Submit"

          // Hide success message and show form
          successMessage.style.display = "none"
          form.style.display = "block"
        }, 3000)
      })
  }
})

// SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 1000,
  delay: 200,
  reset: true 
  // animations repeat
})

// sr.reveal(`.call-to-action-wrapper`) top
sr.reveal(`.footer-wrapper, .call-to-action-wrapper`, {origin: 'bottom'})
sr.reveal(`.hero-contents`, {origin: 'left'})
// sr.reveal(`.about-img`, {origin: 'right'})
sr.reveal(`.step-card, .top-part`, {interval: 200})
// COROUSEL

window.addEventListener('load', () => {
const preloader = document.getElementById('preloader');
preloader.style.display = 'none';
});