// Page references
const welcomePage = document.getElementById("welcomePage");
const authPage = document.getElementById("authPage");
const selectionPage = document.getElementById("selectionPage");
const passwordPage = document.getElementById("passwordPage");
const emailPage = document.getElementById("emailPage");

function hideAllPages() {
  [welcomePage, authPage, selectionPage, passwordPage, emailPage].forEach(
    (p) => (p.style.display = "none")
  );
}

function goToWelcome() {
  hideAllPages();
  welcomePage.style.display = "block";
}

function goToAuth() {
  hideAllPages();
  authPage.style.display = "block";
}

function goToSelection() {
  hideAllPages();
  selectionPage.style.display = "block";
}

function showPasswordPage() {
  hideAllPages();
  passwordPage.style.display = "block";
}

function showEmailPage() {
  hideAllPages();
  emailPage.style.display = "block";
}

function backToSelection() {
  goToSelection();
}

goToWelcome();

/* ----------------- TABS ----------------- */
const tabLogin = document.getElementById("tabLogin");
const tabSignup = document.getElementById("tabSignup");
const authSlider = document.getElementById("authSlider");

tabLogin.onclick = () => {
  tabLogin.classList.add("active");
  tabSignup.classList.remove("active");
  authSlider.style.transform = "translateX(0%)";
};

tabSignup.onclick = () => {
  tabSignup.classList.add("active");
  tabLogin.classList.remove("active");
  authSlider.style.transform = "translateX(-50%)";
};

/* ----------------- LOGIN MODE ----------------- */
const loginModeEmailBtn = document.getElementById("loginModeEmailBtn");
const loginModePhoneBtn = document.getElementById("loginModePhoneBtn");
const loginEmailSection = document.getElementById("loginEmailSection");
const loginPhoneSection = document.getElementById("loginPhoneSection");

loginModeEmailBtn.onclick = () => {
  loginModeEmailBtn.classList.add("active");
  loginModePhoneBtn.classList.remove("active");
  loginEmailSection.classList.remove("hidden");
  loginPhoneSection.classList.add("hidden");
};

loginModePhoneBtn.onclick = () => {
  loginModePhoneBtn.classList.add("active");
  loginModeEmailBtn.classList.remove("active");
  loginEmailSection.classList.add("hidden");
  loginPhoneSection.classList.remove("hidden");
};

/* ----------------- EMAIL LOGIN ----------------- */
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginToggle = document.getElementById("loginToggle");
const authMessage = document.getElementById("authMessage");

loginToggle.onclick = () => {
  const type = loginPassword.type === "password" ? "text" : "password";
  loginPassword.type = type;
  loginToggle.textContent = type === "password" ? "Show" : "Hide";
};

function handleEmailLogin() {
  authMessage.textContent = "";
  authMessage.className = "small-msg";

  const email = loginEmail.value.trim();
  const pass = loginPassword.value.trim();

  if (!email || !pass) {
    authMessage.textContent = "Please enter email and password.";
    authMessage.classList.add("error");
    return;
  }

  authMessage.textContent = "Login successful (demo).";
  authMessage.classList.add("success");
  setTimeout(goToSelection, 700);
}

/* ----------------- PHONE OTP ----------------- */
const phoneInput = document.getElementById("phoneInput");
const sendOtpBtn = document.getElementById("sendOtpBtn");
const otpSection = document.getElementById("otpSection");
const otpInput = document.getElementById("otpInput");
const verifyOtpBtn = document.getElementById("verifyOtpBtn");

let generatedOTP = null;

sendOtpBtn.onclick = () => {
  authMessage.textContent = "";
  authMessage.className = "small-msg";

  const phone = phoneInput.value.trim();
  if (!/^\d{10}$/.test(phone)) {
    authMessage.textContent = "Enter valid 10-digit phone number.";
    authMessage.classList.add("error");
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  otpSection.classList.remove("hidden");

  authMessage.textContent = "Demo OTP: " + generatedOTP;
  authMessage.classList.add("success");
};

verifyOtpBtn.onclick = () => {
  const entered = otpInput.value.trim();
  authMessage.textContent = "";
  authMessage.className = "small-msg";

  if (!generatedOTP) {
    authMessage.textContent = "Please send OTP first.";
    authMessage.classList.add("error");
    return;
  }

  if (entered !== generatedOTP) {
    authMessage.textContent = "Incorrect OTP. Try again.";
    authMessage.classList.add("error");
    return;
  }

  authMessage.textContent = "Phone login successful (demo).";
  authMessage.classList.add("success");
  setTimeout(goToSelection, 700);
};

/* ----------------- SIGNUP ----------------- */
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPhone = document.getElementById("signupPhone");
const signupPassword = document.getElementById("signupPassword");
const signupConfirm = document.getElementById("signupConfirm");
const signupBtn = document.getElementById("signupBtn");
const signupMessage = document.getElementById("signupMessage");

signupBtn.onclick = () => {
  signupMessage.textContent = "";
  signupMessage.className = "small-msg";

  const name = signupName.value.trim();
  const email = signupEmail.value.trim();
  const phone = signupPhone.value.trim();
  const pass = signupPassword.value.trim();
  const conf = signupConfirm.value.trim();

  if (!name || !email || !phone || !pass || !conf) {
    signupMessage.textContent = "Please fill all fields.";
    signupMessage.classList.add("error");
    return;
  }

  if (pass !== conf) {
    signupMessage.textContent = "Passwords do not match.";
    signupMessage.classList.add("error");
    return;
  }

  if (!/^\d{10}$/.test(phone)) {
    signupMessage.textContent = "Phone must be 10 digits.";
    signupMessage.classList.add("error");
    return;
  }

  signupMessage.textContent = "Account created (demo). You can now login.";
  signupMessage.classList.add("success");

  setTimeout(() => tabLogin.click(), 800);
};

/* ----------------- PASSWORD STRENGTH ----------------- */
const passwordInput = document.getElementById("passwordInput");
const toggleVisibility = document.getElementById("toggleVisibility");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const pwnedStatus = document.getElementById("pwnedStatus");
const pwnedCount = document.getElementById("pwnedCount");
const checkBtn = document.getElementById("checkBtn");

toggleVisibility.onclick = () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  toggleVisibility.textContent = type === "password" ? "Show" : "Hide";
};

passwordInput.oninput = () => {
  const pwd = passwordInput.value;
  let score = 0;

  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  const percent = (score / 6) * 100;
  strengthBar.style.width = percent + "%";

  if (score <= 2) {
    strengthBar.style.background = "red";
    strengthText.textContent = "Weak";
  } else if (score <= 4) {
    strengthBar.style.background = "orange";
    strengthText.textContent = "Medium";
  } else {
    strengthBar.style.background = "limegreen";
    strengthText.textContent = "Strong";
  }
};

/* ----------------- SHA1 for HIBP ----------------- */
async function sha1(message) {
  const buffer = new TextEncoder().encode(message);
  const hash = await crypto.subtle.digest("SHA-1", buffer);

  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
}

/* ----------------- PASSWORD BREACH CHECK ----------------- */
async function checkPasswordPwned(password) {
  const hash = await sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await res.text();

  let found = 0;

  text.split("\n").forEach((line) => {
    const [h, count] = line.split(":");
    if (h === suffix) found = parseInt(count);
  });

  if (found > 0) {
    pwnedStatus.textContent = "⚠️ Found in breaches!";
    pwnedCount.textContent = `Seen ${found.toLocaleString()} times`;
  } else {
    pwnedStatus.textContent = "✔ Safe password!";
    pwnedCount.textContent = "";
  }
}

checkBtn.onclick = () => {
  const pwd = passwordInput.value.trim();
  if (!pwd) return alert("Enter a password!");
  checkPasswordPwned(pwd);
};

/* ----------------- EMAIL BREACH CHECK ----------------- */
const emailInput = document.getElementById("emailInput");
const emailStatus = document.getElementById("emailStatus");
const emailResult = document.getElementById("emailResult");
const emailCheckBtn = document.getElementById("emailCheckBtn");

emailCheckBtn.onclick = async () => {
  const email = emailInput.value.trim();
  if (!email) return alert("Enter email");

  emailStatus.textContent = "Checking…";
  emailResult.textContent = "";

  try {
    const res = await fetch("/api/checkEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.breached === false) {
      emailStatus.textContent = "✔ Email safe!";
    } else if (data.breached === true) {
      emailStatus.textContent = "⚠ Email found!";
      emailResult.innerHTML = data.breaches
        .map((b) => `• ${b.Name} — ${b.BreachDate}`)
        .join("<br>");
    } else {
      emailStatus.textContent = "Error checking email.";
    }
  } catch (err) {
    emailStatus.textContent = "Server error.";
  }
};
