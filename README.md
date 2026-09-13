div align="center">

# AI CV Builder

### Build a professional, ATS-optimized CV in minutes — powered by Kimi K2 AI

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![OpenRouter](https://img.shields.io/badge/OpenRouter%20%2B%20Kimi%20K2-FF6B35?style=flat-square)](https://openrouter.ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 🇬🇧 English

### ✨ What is this?

**AI CV Builder** is a browser-based CV/resume generator that uses **Kimi K2** (via OpenRouter) to automatically write a compelling professional summary from your information. Fill in your details, pick a template and color, and download a pixel-perfect PDF — all in real time, entirely in the browser.

### 🚀 Features

- **AI-Powered Summary** — One click generates a professional, ATS-optimized 3–4 sentence summary using Kimi K2 via OpenRouter (free tier available)
- - **3 CV Templates** — Modern (dark header), Classic (serif), and Minimal (clean white)
  - - **5 Accent Colors** — Blue, Green, Purple, Red, Orange — applied instantly across the whole CV
    - - **PDF Export** — Download a high-quality, print-ready A4 PDF with one click (via html2pdf.js)
      - - **Fully Responsive** — Mobile-friendly with Edit / Preview toggle
        - - **Real-time Preview** — Every keystroke updates the CV preview instantly
          - - **Privacy First** — Your API key and data never leave your browser; no backend, no tracking
           
            - ### 🛠️ Tech Stack
           
            - | Layer | Technology |
            - |---|---|
            - | Framework | React 19 + Vite 8 |
            - | Styling | Tailwind CSS 3 |
            - | AI Model | Kimi K2 (moonshotai/kimi-k2) via OpenRouter |
            - | PDF Export | html2pdf.js |
            - | Font | Inter (Google Fonts) |
           
            - ### 📦 Getting Started
           
            - **Prerequisites**
            - - Node.js 18+
              - - A free OpenRouter API key
               
                - ```bash
                  # Clone the repository
                  git clone https://github.com/elbatin/ai-cv-builder.git
                  cd ai-cv-builder

                  # Install dependencies
                  npm install

                  # Start the dev server
                  npm run dev
                  ```

                  Open `http://localhost:5173` in your browser.

                  **Usage**
                  1. Click the ⚙️ Settings icon (top-right of the sidebar)
                  2. 2. Paste your OpenRouter API key (`sk-or-v1-...`)
                     3. 3. Fill in your personal details, work experience, education, and skills
                        4. 4. Click **⚡ Generate AI Summary** to let Kimi K2 write your professional summary
                           5. 5. Choose a Template and Accent Color from the toolbar
                              6. 6. Click **📄 Download as PDF** — done!
                                
                                 7. ### 🔑 Getting a Free API Key
                                
                                 8. 1. Go to [openrouter.ai/keys](https://openrouter.ai/keys)
                                    2. 2. Sign up for a free account
                                       3. 3. Create a new API key
                                         
                                          4. The Kimi K2 model has a generous free tier — no credit card required.
                                         
                                          5. ### 📁 Project Structure
                                         
                                          6. ```
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

                                             ### 🏗️ Build for Production

                                             ```bash
                                             npm run build
                                             # Output in /dist — deploy to Netlify, Vercel, or any static host
                                             ```

                                             ---

                                             ## 🇹🇷 Türkçe

                                             ### ✨ Bu Nedir?

                                             **AI CV Builder**, **Kimi K2** yapay zeka modelini (OpenRouter üzerinden) kullanarak bilgilerinden otomatik olarak etkileyici bir profesyonel özet oluşturan, tamamen tarayıcı tabanlı bir CV oluşturucudur. Bilgilerini gir, şablon ve renk seç, tek tıklamayla PDF olarak indir — gerçek zamanlı, tamamen tarayıcında.

                                             ### 🚀 Özellikler

                                             - **Yapay Zeka Destekli Özet** — Kimi K2 ile ATS uyumlu profesyonel 3–4 cümlelik özet (ücretsiz kullanım mevcut)
                                             - - **3 CV Şablonu** — Modern (koyu başlık), Klasik (serif) ve Minimal (sade beyaz)
                                               - - **5 Vurgu Rengi** — Mavi, Yeşil, Mor, Kırmızı, Turuncu
                                                 - - **PDF İndirme** — Baskıya hazır A4 PDF (html2pdf.js)
                                                   - - **Tam Responsive** — Mobil uyumlu, Düzenle / Önizleme geçişi
                                                     - - **Gerçek Zamanlı Önizleme** — Her tuş vuruşunda anında güncellenir
                                                       - - **Gizlilik Öncelikli** — API anahtarın tarayıcıdan çıkmaz; backend yok, takip yok
                                                        
                                                         - ### 🛠️ Kurulum
                                                        
                                                         - ```bash
                                                           git clone https://github.com/elbatin/ai-cv-builder.git
                                                           cd ai-cv-builder
                                                           npm install
                                                           npm run dev
                                                           ```

                                                           ---

                                                           Built by [Batın](https://elbatin.com)
