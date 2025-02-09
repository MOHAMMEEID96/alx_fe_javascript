// مصفوفة تحتوي على الاقتباسات مع تصنيفاتها
const quotes = [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Inspiration" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

// دالة لعرض اقتباس عشوائي
function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");

    if (quotes.length === 0) {
        quoteDisplay.textContent = "No quotes available.";
        return;
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    quoteDisplay.innerHTML = `<p>"${randomQuote.text}"</p><small>- ${randomQuote.category}</small>`;
}

// دالة لإنشاء نموذج إضافة اقتباس جديد
function createAddQuoteForm() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    alert("Quote added successfully!");

    // عرض الاقتباس الجديد مباشرة بعد إضافته
    showRandomQuote();
}

// إضافة الأحداث للأزرار
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
document.getElementById("createAddQuoteFormBtn").addEventListener("click", createAddQuoteForm);