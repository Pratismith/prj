function goBack() {
  window.history.back();
}

document.addEventListener("DOMContentLoaded", async () => {
  const selectedId = localStorage.getItem("selectedPropertyId");
  console.log("Selected ID:", selectedId);

  if (!selectedId) {
    document.querySelector(".top-row").innerHTML = `<p>No property selected.</p>`;
    return;
  }

  try {
    // Fetch from backend
    const res = await fetch(`/api/properties/${selectedId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to fetch property");
    }

    const property = data.property; // backend returns { property: {...} }

    if (property) {
      // Image Gallery with Lazy Loading
      const gallery = document.getElementById("image-gallery");
      gallery.innerHTML = "";
      
      if (property.images && property.images.length > 0) {
        property.images.forEach((imgSrc, index) => {
          const img = document.createElement("img");
          img.dataset.src = imgSrc;
          img.alt = `${property.title} - Image ${index + 1}`;
          img.loading = "lazy";
          
          // Immediate load for first image, lazy load for rest
          if (index === 0) {
            img.src = imgSrc;
          } else {
            // Use Intersection Observer for lazy loading
            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  img.src = img.dataset.src;
                  observer.unobserve(img);
                }
              });
            }, { rootMargin: "50px" });
            observer.observe(img);
          }
          
          gallery.appendChild(img);
        });
      } else {
        gallery.innerHTML = '<p style="text-align: center; color: #666;">No images available</p>';
      }

      // Right Details Box with proper formatting
      const priceElement = document.getElementById("property-price");
      priceElement.textContent = property.price ? `₹${property.price.toLocaleString('en-IN')}/month` : "Price not available";
      
      const depositElement = document.getElementById("property-deposit");
      depositElement.textContent = property.deposit ? `₹${property.deposit.toLocaleString('en-IN')} deposit` : "No deposit required";
      
      document.getElementById("property-furnishing").textContent = property.furnishing || "Not specified";
      document.getElementById("property-availability").textContent = `Availability: ${property.availability || "Available"}`;
      
      const callBtn = document.getElementById("call-btn");
      callBtn.textContent = property.phone ? `📞 Call ${property.phone}` : "📞 Call Owner";
      
      const whatsappBtn = document.getElementById("whatsapp-btn");
      whatsappBtn.textContent = "💬 WhatsApp";

      // PG Name and Other Details Box
      document.getElementById("property-title").textContent = property.title;
      document.getElementById("property-location").textContent = property.location;
      document.getElementById("bedrooms").textContent = property.beds || "-";
      document.getElementById("bathrooms").textContent = property.baths || "-";
      document.getElementById("area").textContent = property.sqFt ? `${property.sqFt} sq ft` : "-";
      document.getElementById("gender").textContent = property.gender || "Any";
      document.getElementById("property-description").textContent = property.description || "No description available.";

      // Amenities with icons
      if (property.amenities && Array.isArray(property.amenities)) {
        const amenitiesContainer = document.querySelector(".amenities-grid");
        const amenityIcons = {
          'WiFi': '📶',
          'Parking': '🚗',
          'Security': '🛡️',
          'Food': '🍽️',
          'AC': '❄️',
          'Laundry': '🧺',
          'Gym': '💪',
          'Power Backup': '⚡'
        };
        
        amenitiesContainer.innerHTML = property.amenities
          .map(a => {
            const icon = Object.keys(amenityIcons).find(key => a.toLowerCase().includes(key.toLowerCase()));
            return `<div class="amenity-badge"><span class="icon">${icon ? amenityIcons[icon] : '✓'}</span> ${a}</div>`;
          })
          .join("");
      }

      // Button Events - Improved WhatsApp with pre-filled message
      callBtn.addEventListener("click", () => {
        if (property.phone) {
          window.location.href = `tel:${property.phone}`;
        } else {
          alert("Phone number not available for this property.");
        }
      });

      whatsappBtn.addEventListener("click", () => {
        const whatsappNumber = property.whatsapp || property.phone;
        if (whatsappNumber) {
          const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
          const message = `Hi! I'm interested in your property: ${property.title} located at ${property.location}. Is it still available?`;
          const whatsappUrl = `https://wa.me/91${cleanNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, '_blank');
        } else {
          alert("WhatsApp contact not available for this property.");
        }
      });
    }
  } catch (err) {
    console.error("Error loading property details:", err);
    document.querySelector(".top-row").innerHTML = `<p>Error loading property details.</p>`;
  }
});
