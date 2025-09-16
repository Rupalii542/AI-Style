document.getElementById("profileForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const chest = parseFloat(document.getElementById("chest").value);
  const waist = parseFloat(document.getElementById("waist").value);

  let bodyType = "";
  let stylingTips = "";

  // Body type logic without hips
  if (waist < chest - 10) {
    bodyType = "V Shape / Athletic";
    stylingTips = "Fitted shirts and tailored jackets will highlight your upper body.";
  } else if (waist > chest + 10) {
    bodyType = "Round Shape";
    stylingTips = "Go for vertical stripes and dark colors to create a slimming effect.";
  } else {
    bodyType = "Rectangle Shape";
    stylingTips = "Use layers and patterns to create an illusion of shape.";
  }

  // Show result card
  const resultCard = document.getElementById("result");
  document.getElementById("bodyType").textContent = `Your Body Type: ${bodyType}`;
  document.getElementById("stylingTips").textContent = stylingTips;

  resultCard.classList.remove("hidden");
  resultCard.style.animation = "fadeInUp 0.6s forwards";

  // Save to localStorage
  const userProfile = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    gender: document.getElementById("gender").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    chest,
    waist,
    bodyType
  };

  localStorage.setItem("userProfile", JSON.stringify(userProfile));
});
