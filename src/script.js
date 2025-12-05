// Minimal interactivity for the landing page
document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

// ========== AIRTABLE CONFIG ==========
// Replace these with your actual Airtable credentials:
const AIRTABLE_CONFIG = {
  baseId: "appyiHQFSWbzh1VV1", // e.g., 'appXXXXXXXXXXXXXX'
  tableName: "Waitlist", // e.g., 'Emails' or 'Waitlist'
  apiKey:
    "patNmQ6UEx3BOpm2F.564c8c6dcf4ce68e874ee44719d5ca8b6479697b7ba274ed47b13765f2d27d96", // e.g., 'patXXXXXXXXXXXXXX' (Personal Access Token)
};
// =====================================

async function signup() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Please enter your name and email");
    return;
  }

  const btn = document.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  // Validate config
  if (
    AIRTABLE_CONFIG.baseId === "YOUR_BASE_ID" ||
    AIRTABLE_CONFIG.apiKey === "YOUR_API_KEY"
  ) {
    alert("⚠️ Please configure your Airtable credentials in src/script.js");
    return;
  }

  try {
    btn.disabled = true;
    btn.textContent = "Submitting...";

    const response = await fetch(
      `https://api.airtable.com/v0/${
        AIRTABLE_CONFIG.baseId
      }/${encodeURIComponent(AIRTABLE_CONFIG.tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_CONFIG.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error(
        "Airtable API Error - Full Details:",
        JSON.stringify(error, null, 2)
      );
      console.error("Status Code:", response.status);
      throw new Error(
        error.error?.message || `Failed to submit (${response.status})`
      );
    }

    btn.textContent = "Signed up ✓";
    nameInput.value = "";
    emailInput.value = "";
    alert("Thanks! We'll email you updates soon.");

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
    }, 2500);
  } catch (error) {
    console.error("Airtable submission error:", error);
    alert("Something went wrong. Please try again.");
    btn.disabled = false;
    btn.textContent = originalText;
  }
}
