const qrTextInput = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");
const qrCodeBox = document.getElementById("qrCodeBox");
const qrImage = document.getElementById("qrImage");
const downloadBtn = document.getElementById("downloadBtn");
const pdfBtn = document.getElementById("pdfBtn");

let qrCode;

generateBtn.addEventListener("click", () => {
  const text = qrTextInput.value.trim();
  if (!text) return alert("Please enter text or a URL.");

  qrCodeBox.innerHTML = "";

  qrCode = new QRCode(qrCodeBox, {
    text: text,
    width: 256,
    height: 256,
    correctLevel: QRCode.CorrectLevel.H
  });

setTimeout(() => {
  const generatedImg = qrCodeBox.querySelector("img");
  if (generatedImg && generatedImg.src) {
    qrImage.src = generatedImg.src;
    qrImage.style.display = "block";
    downloadBtn.classList.remove("hidden");
    pdfBtn.classList.remove("hidden");
  }
}, 100);

});


downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = "qr-code.png";
  link.click();
});


pdfBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.addImage(qrImage.src, "PNG", 40, 40, 130, 130);
  pdf.save("qr-code.pdf");
});
