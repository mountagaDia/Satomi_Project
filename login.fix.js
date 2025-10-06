// =======================
// Satomi Project - login fix
// =======================

// Mock data for general users (ID required)
const generalUsers = [
  { id: "SP001", firstname: "Mariame", lastname: "Tiane", password: "p1" },
  { id: "SP001", firstname: "Mariame", lastname: "Tiane", password: "p1", redirect: "https://satomilanguageschool.github.io/class/Students/Home/Tiane.html" },
  { id: "SP002", firstname: "Sarr", lastname: "Abdoulaye", password: "p2" },
  { id: "SP002", firstname: "Sarr", lastname: "Abdoulaye", password: "p2", redirect: "https://satomilanguageschool.github.io/class/Students/Home/Abdoulaye.html"  },
  
];

// Teacher accounts (kept for simple client-side prototype)
// NOTE: Passwords remain CASE-SENSITIVE by design.

const teacherAccounts = [
  { firstname: "Satomi", lastname: "Hirose",    password: "sp1", redirect: "https://satomiproject.github.io/class/Satomi.html" },
  { firstname: "Celine", lastname: "Diop",      password: "sp4", redirect: "https://satomiproject.github.io/class/Celine.html" },
  { firstname: "Fatima", lastname: "Coulibaly", password: "sp2", redirect: "https://satomiproject.github.io/class/Teacher/Home/Moeko.html" },
  { firstname: "Moeko",  lastname: "Gningue",   password: "sp3", redirect: "https://satomiproject.github.io/class/Teacher/Home/Moeko.html" },
];

// -----------------------
// Normalization helpers
// -----------------------
function normalizeName(str) {
  // Trim, collapse spaces, Unicode normalize, and lower-case for case-insensitive compare
  return (str ?? "")       // 1) si str est null/undefined → "", sinon garde str
    .normalize("NFKC")     // 2) normalisation Unicode (forme NFKC)
    .trim()                // 3) enlève espaces au début/à la fin
    .replace(/\s+/g, " ")  // 4) remplace tout groupe d’espaces (tab, retour ligne…) par un seul espace
    .toLowerCase();        // 5) met en minuscules (comparaison insensible à la casse)
}

function normalizeId(str) {
  // Trim, remove inner spaces, Unicode normalize, and upper-case for case-insensitive ID compare
  return (str ?? "")
    .normalize("NFKC")
    .trim()
    .replace(/\s+/g, "")
    .toUpperCase();
}

// Optional: uncomment if you want accent-insensitive matching for names
// function stripDiacritics(str) {
//   return (str ?? "").normalize("NFD").replace(/\p{Mn}/gu, "");
// }

// -----------------------
// Login form handler
// -----------------------
document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form reload

  const firstnameInput = document.getElementById("firstname").value;
  const lastnameInput  = document.getElementById("lastname").value;
  const idInput        = document.getElementById("id").value;
  const password       = document.getElementById("password").value.trim();

  // Normalize for comparison
  const fnNorm = normalizeName(firstnameInput);
  const lnNorm = normalizeName(lastnameInput);
  const idNorm = normalizeId(idInput);

  // -----------------------
  // 1) Teachers (name match is case-insensitive, password is case-sensitive)
  // -----------------------
  const teacher = teacherAccounts.find(t =>
    normalizeName(t.firstname) === fnNorm &&
    normalizeName(t.lastname)  === lnNorm  &&
    t.password === password
    //t.password == password
  );

  if (teacher) {
    window.location.href = teacher.redirect;
    return;
  }

  // -----------------------
  // 2) General users (ID + name case-insensitive, password case-sensitive)
  // -----------------------
  const generalUser = generalUsers.find(user =>
    normalizeId(user.id)        === idNorm &&
    normalizeName(user.firstname) === fnNorm &&
    normalizeName(user.lastname)  === lnNorm &&
    user.password === password
  );

  if (generalUser) {
    // Redirect to the general student entrance
    window.location.href = "https://satomilanguageschool.github.io/class/Students/Home/StudentEntrancePortal.html";
    return;
  }

  // If none matched
  alert("Identifiants invalides. Note : le prénom/nom et l'ID ne sont plus sensibles à la casse (majuscules/minuscules).");
});
