// تحميل الاقتباسات من Local Storage عند بدء التشغيل
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// حفظ الاقتباسات إلى Local Storage
function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

// إنشاء العناصر الأساسية
const body = document.body;
const title = document.createElement("h1");
title.textContent = "Dynamic Quote Generator";
body.appendChild(title);

// إنشاء حاوية لعرض الاقتباس
const quoteDisplay = document.createElement("div");
quoteDisplay.id = "quoteDisplay";
body.appendChild(quoteDisplay);

// زر عرض اقتباس جديد
const newQuoteBtn = document.createElement("button");
newQuoteBtn.textContent = "Show New Quote";
body.appendChild(newQuoteBtn);

// إنشاء نموذج إضافة اقتباس جديد
const inputContainer = document.createElement("div");

const newQuoteText = document.createElement("input");
newQuoteText.id = "newQuoteText";
newQuoteText.type = "text";
newQuoteText.placeholder = "Enter a new quote";
inputContainer.appendChild(newQuoteText);

const newQuoteCategory = document.createElement("input");
newQuoteCategory.id = "newQuoteCategory";
newQuoteCategory.type = "text";
newQuoteCategory.placeholder = "Enter quote category";
inputContainer.appendChild(newQuoteCategory);

const addQuoteBtn = document.createElement("button");
addQuoteBtn.textContent = "Add Quote";
inputContainer.appendChild(addQuoteBtn);

body.appendChild(inputContainer);

// زر تصدير JSON
const exportBtn = document.createElement("button");
exportBtn.textContent = "Export Quotes"; // بدلاً من "Export JSON"
body.appendChild(exportBtn);


// زر استيراد JSON
const importInput = document.createElement("input");
importInput.type = "file";
importInput.accept = ".json";
body.appendChild(importInput);

// دالة لعرض اقتباس عشوائي
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><small>- ${randomQuote.category}</small>`;

    // حفظ آخر اقتباس في Session Storage
    sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// دالة لإضافة اقتباس جديد
function addNewQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text === "" || category === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    quotes.push({ text, category });
    saveQuotes();

    newQuoteText.value = "";
    newQuoteCategory.value = "";

    alert("Quote added successfully!");
    showRandomQuote();
}

// دالة لتصدير الاقتباسات إلى ملف JSON
function exportToJsonFile() {
    const jsonString = JSON.stringify(quotes, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quotes.json";
    a.click();
}

// دالة لاستيراد الاقتباسات من ملف JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (!Array.isArray(importedQuotes)) throw new Error("Invalid JSON format");

            quotes.push(...importedQuotes);
            saveQuotes();
            alert('Quotes imported successfully!');
        } catch (error) {
            alert('Error importing JSON file: ' + error.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// تحميل آخر اقتباس من Session Storage (إن وجد)
const lastQuote = JSON.parse(sessionStorage.getItem("lastQuote"));
if (lastQuote) {
    quoteDisplay.innerHTML = `<p>"${lastQuote.text}"</p><small>- ${lastQuote.category}</small>`;
} else {
    quoteDisplay.textContent = "Click 'Show New Quote' to see a quote!";
}

// إضافة الأحداث للأزرار
newQuoteBtn.addEventListener("click", showRandomQuote);
addQuoteBtn.addEventListener("click", addNewQuote);
exportBtn.addEventListener("click", exportToJsonFile);
importInput.addEventListener("change", importFromJsonFile);

index.html doesn't contain: ["Export Quotes", "button"]

