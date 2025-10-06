// add-homestay.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("homestayForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("⚠️ Please login first to add a homestay.");
      window.location.href = "login.html";
      return;
    }

    // Collect form data
    const formData = new FormData(form);

    // Collect amenities
    const amenities = Array.from(document.querySelectorAll("input[name='amenities']:checked"))
      .map(cb => cb.value);
    
    formData.delete("amenities");
    if (amenities.length > 0) {
      formData.append("amenities", amenities.join(","));
    }

    // Add homestay-specific fields
    formData.set("gender", "Any"); // Homestays are typically for families/any gender

    // Get availability dates if provided
    const availableFrom = document.querySelector("input[name='availableFrom']").value;
    const availableTo = document.querySelector("input[name='availableTo']").value;
    
    if (availableFrom && availableTo) {
      formData.append("availabilityDates", JSON.stringify({
        from: availableFrom,
        to: availableTo
      }));
    }

    try {
      const response = await fetch("/api/properties/add-property", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("Backend response:", data);

      if (response.ok) {
        alert("✅ Homestay added successfully!");
        window.location.href = "my-properties.html";
      } else {
        alert(`❌ Failed: ${data.message || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error adding homestay:", error);
      alert("⚠️ Server error. Please try again.");
    }
  });

  // Image preview functionality
  const imageInput = document.getElementById("images");
  if (imageInput) {
    imageInput.addEventListener("change", (e) => {
      const files = e.target.files;
      if (files.length > 5) {
        alert("⚠️ You can upload a maximum of 5 images.");
        imageInput.value = "";
        return;
      }

      // Show file count
      const fileCount = files.length;
      const helpText = imageInput.nextElementSibling;
      if (fileCount > 0) {
        helpText.textContent = `${fileCount} image(s) selected`;
        helpText.style.color = "#16a34a";
      }
    });
  }

  // Validate date range
  const dateInputs = document.querySelectorAll("input[type='date']");
  if (dateInputs.length === 2) {
    const [fromDate, toDate] = dateInputs;
    
    fromDate.addEventListener("change", () => {
      toDate.min = fromDate.value;
    });

    toDate.addEventListener("change", () => {
      if (toDate.value && fromDate.value && toDate.value < fromDate.value) {
        alert("⚠️ End date cannot be before start date.");
        toDate.value = "";
      }
    });
  }

  // WhatsApp number auto-fill
  const phoneInput = document.getElementById("phone");
  const whatsappInput = document.getElementById("whatsapp");
  
  if (phoneInput && whatsappInput) {
    phoneInput.addEventListener("blur", () => {
      if (!whatsappInput.value && phoneInput.value) {
        whatsappInput.value = phoneInput.value;
      }
    });
  }
});
