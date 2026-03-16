<div align="center">

# 🤖 AI CV Builder

### Build a professional, ATS-optimized CV in minutes — powered by Kimi K2 AI

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter%20%2B%20Kimi%20K2-FF6B35?style=flat-square)](https://openrouter.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

**[🎬 Watch the build video on YouTube](https://youtu.be/g-zxLDpSG_Q)** · Built entirely with Vibe Coding — zero manual code written

</div>

---

## 🇬🇧 English

### ✨ What is this?

**AI CV Builder** is a sleek, browser-based CV/resume generator that uses **Kimi K2** (via OpenRouter) to automatically write a compelling professional summary from your information. Fill in your details, pick a template and color, and download a pixel-perfect PDF — all in real time, all in the browser.

> 🎥 This project was built **live on camera** using [Windsurf](https://windsurf.com) and a completely free AI model. Watch the full build: [youtu.be/g-zxLDpSG_Q](https://youtu.be/g-zxLDpSG_Q)

---

### 🚀 Features

- **⚡ AI-Powered Summary** — One click generates a professional, ATS-optimized 3–4 sentence summary using Kimi K2 via OpenRouter (free tier available)
- **🎨 3 CV Templates** — Modern (dark header), Classic (serif), and Minimal (clean white)
- **🌈 5 Accent Colors** — Blue, Green, Purple, Red, Orange — applied instantly across the whole CV
- **📄 PDF Export** — Download a high-quality, print-ready A4 PDF with one click (via html2pdf.js)
- **📱 Fully Responsive** — Mobile-friendly with Edit / Preview toggle
- **⚡ Real-time Preview** — Every keystroke updates the CV preview instantly
- **🔒 Privacy First** — Your API key and data never leave your browser; no backend, no tracking

---

### 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS 3 |
| AI Model | Kimi K2 (moonshotai/kimi-k2) via OpenRouter |
| PDF Export | html2pdf.js |
| Font | Inter (Google Fonts) |

---

### 📦 Getting Started

#### Prerequisites
- Node.js 18+
- A free [OpenRouter](https://openrouter.ai/keys) API key

#### Installation

```bash
# Clone the repository
git clone https://github.com/elbatin/ai-cv-builder.git
cd ai-cv-builder

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

#### Usage

1. Click the **⚙️ Settings** icon (top-right of the sidebar)
2. Paste your **OpenRouter API key** (`sk-or-v1-...`)
3. Fill in your personal details, work experience, education, and skills
4. Click **⚡ Generate AI Summary** to let Kimi K2 write your professional summary
5. Choose a **Template** and **Accent Color** from the toolbar
6. Click **📄 Download as PDF** — done!

---

### 🔑 Getting a Free API Key

1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up for a free account
3. Create a new API key
4. The **Kimi K2** model has a generous free tier — no credit card required

---

### 📁 Project Structure

```
cv-builder/
├── src/
│   ├── App.jsx          # Main application (form, preview, AI call, PDF export)
│   ├── App.css          # Custom animations & print styles
│   ├── index.css        # Base Tailwind styles
│   └── main.jsx         # React entry point
├── public/
│   └── favicon.svg
├── index.html           # HTML shell + html2pdf CDN script
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

### 🏗️ Build for Production

```bash
npm run build
# Output in /dist — deploy to Netlify, Vercel, or any static host
```

---

## 🇹🇷 Türkçe

### ✨ Bu Nedir?

**AI CV Builder**, **Kimi K2** yapay zeka modelini (OpenRouter üzerinden) kullanarak bilgilerinden otomatik olarak etkileyici bir profesyonel özet oluşturan, tamamen tarayıcı tabanlı bir CV/özgeçmiş oluşturucu uygulamasıdır. Bilgilerini gir, şablon ve renk seç, tek tıklamayla PDF olarak indir — gerçek zamanlı, tamamen tarayıcında.

> 🎥 Bu proje [Windsurf](https://windsurf.com) ve tamamen ücretsiz bir yapay zeka modeli kullanılarak **kamera önünde**, tek satır kod yazılmadan geliştirildi. Tüm yapım sürecini izle: [youtu.be/g-zxLDpSG_Q](https://youtu.be/g-zxLDpSG_Q)

---

### 🚀 Özellikler

- **⚡ Yapay Zeka Destekli Özet** — Tek tıklamayla Kimi K2 modeli aracılığıyla ATS uyumlu, profesyonel 3–4 cümlelik bir özet oluşturur (ücretsiz kullanım mevcut)
- **🎨 3 CV Şablonu** — Modern (koyu başlık), Klasik (serif yazı tipi) ve Minimal (sade beyaz)
- **🌈 5 Vurgu Rengi** — Mavi, Yeşil, Mor, Kırmızı, Turuncu — CV geneline anında uygulanır
- **📄 PDF İndirme** — Tek tıklamayla yüksek kaliteli, baskıya hazır A4 PDF (html2pdf.js ile)
- **📱 Tam Responsive** — Mobil uyumlu, Düzenle / Önizleme geçiş butonu
- **⚡ Gerçek Zamanlı Önizleme** — Her tuş vuruşunda CV önizlemesi anında güncellenir
- **🔒 Gizlilik Öncelikli** — API anahtarın ve verilerini tarayıcıdan çıkmaz; backend yok, takip yok

---

### 🛠️ Teknoloji Yığını

| Katman | Teknoloji |
|--------|-----------|
| Framework | React 19 + Vite 8 |
| Stil | Tailwind CSS 3 |
| Yapay Zeka Modeli | Kimi K2 (moonshotai/kimi-k2) — OpenRouter üzerinden |
| PDF Dışa Aktarma | html2pdf.js |
| Font | Inter (Google Fonts) |

---

### 📦 Kurulum

#### Gereksinimler
- Node.js 18+
- Ücretsiz bir [OpenRouter](https://openrouter.ai/keys) API anahtarı

#### Adımlar

```bash
# Repoyu klonla
git clone https://github.com/elbatin/ai-cv-builder.git
cd ai-cv-builder

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcında `http://localhost:5173` adresini aç.

#### Kullanım

1. Kenar çubuğunun sağ üstündeki **⚙️ Ayarlar** simgesine tıkla
2. **OpenRouter API anahtarını** yapıştır (`sk-or-v1-...`)
3. Kişisel bilgilerini, iş deneyimini, eğitimini ve becerilerini doldur
4. **⚡ Generate AI Summary** butonuna bas — Kimi K2 profesyonel özetini yazsın
5. Araç çubuğundan **Şablon** ve **Vurgu Rengi** seç
6. **📄 Download as PDF** ile indir — bitti!

---

### 🔑 Ücretsiz API Anahtarı Nasıl Alınır?

1. [openrouter.ai/keys](https://openrouter.ai/keys) adresine git
2. Ücretsiz hesap oluştur
3. Yeni bir API anahtarı yarat
4. **Kimi K2** modeli ücretsiz kullanım kotasına sahip — kredi kartı gerekmez

---

### 📁 Proje Yapısı

```
cv-builder/
├── src/
│   ├── App.jsx          # Ana uygulama (form, önizleme, AI çağrısı, PDF)
│   ├── App.css          # Özel animasyonlar ve yazdırma stilleri
│   ├── index.css        # Temel Tailwind stilleri
│   └── main.jsx         # React giriş noktası
├── public/
│   └── favicon.svg
├── index.html           # HTML kabuğu + html2pdf CDN scripti
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

### 🏗️ Production Build

```bash
npm run build
# Çıktı /dist klasöründe — Netlify, Vercel veya herhangi bir statik host'a dağıt
```

---

<div align="center">

Made with ❤️ using [Windsurf](https://windsurf.com) + [Kimi K2](https://openrouter.ai) — zero manual code

**[⭐ Star this repo if you found it useful!](https://github.com/elbatin/ai-cv-builder)**

</div>
