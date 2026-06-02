import { useRef, useState } from 'react'

const TABS = [
  { id: 'summary', label: 'Пересказ договора' },
  { id: 'risks', label: 'Анализ рисков' },
  { id: 'finance', label: 'Финансовый аудит' },
  { id: 'chat', label: 'Юридический чат' },
]

const FEATURES = [
  {
    icon: 'clock',
    title: 'Экономия времени',
    text: 'Автоматически сжимает 60 страниц договора в краткий пересказ за 5 секунд.',
  },
  {
    icon: 'search',
    title: 'Поиск ловушек',
    text: 'Сканирует текст и подсвечивает красным скрытые штрафы и юридические риски.',
  },
  {
    icon: 'report',
    title: 'Готовый отчет',
    text: 'Формирует протокол разногласий и график финансовых обязательств в один клик.',
  },
]

function FeatureIcon({ type }) {
  const props = {
    className: 'velius-feature-icon',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  if (type === 'clock') {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  }
  if (type === 'search') {
    return (
      <svg {...props}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-4-4" />
      </svg>
    )
  }
  return (
    <svg {...props}>
      <path d="M8 4h8v16H8z" />
      <path d="M10 8h4M10 12h4M10 16h2" />
    </svg>
  )
}

const PLANS = [
  {
    name: 'Стартовый',
    price: '12 000',
    period: 'руб/мес',
    features: ['До 10 договоров', 'Базовый анализ рисков', 'Экспорт в PDF'],
    featured: false,
  },
  {
    name: 'Профессиональный',
    price: '38 000',
    period: 'руб/мес',
    features: ['Безлимитные договоры', 'Финансовый аудит', 'Приоритетная поддержка'],
    featured: true,
  },
  {
    name: 'Корпоративный',
    price: 'По запросу',
    period: '',
    features: ['On-premise развёртывание', 'SLA 99.9%', 'Персональный менеджер'],
    featured: false,
  },
]

function App() {
  const demoLimit = 3
  const fileInputRef = useRef(null)
  const [activeTab, setActiveTab] = useState('summary')
  const [isDragging, setIsDragging] = useState(false)
  const [chatQuestion, setChatQuestion] = useState('')
  const [chatSubmitted, setChatSubmitted] = useState(false)
  const [remainingChecks, setRemainingChecks] = useState(demoLimit)
  const [leadName, setLeadName] = useState('')
  const [leadContact, setLeadContact] = useState('')

  const hasChecksLeft = remainingChecks > 0

  const handleDragOver = (e) => {
    e.preventDefault()
    if (!hasChecksLeft) return
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const consumeCheck = () => {
    setRemainingChecks((current) => (current > 0 ? current - 1 : 0))
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (!hasChecksLeft) return
    setIsDragging(false)
    consumeCheck()
    setActiveTab('summary')
  }

  const handleFileSelect = (e) => {
    if (!hasChecksLeft) return
    if (e.target.files?.length) {
      consumeCheck()
      setActiveTab('summary')
      e.target.value = ''
    }
  }

  const handleSimulateCheck = () => {
    if (!hasChecksLeft) return
    consumeCheck()
    setActiveTab('summary')
  }

  const handleOpenFilePicker = () => {
    if (!hasChecksLeft) return
    fileInputRef.current?.click()
  }

  const handleLeadSubmit = (e) => {
    e.preventDefault()
  }

  const handleChatSubmit = (e) => {
    e.preventDefault()
    if (!chatQuestion.trim()) return
    setChatSubmitted(true)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        body {
          margin: 0;
          background: #050505;
        }

        #root {
          width: 100%;
          max-width: none;
          margin: 0;
          border: none;
          text-align: initial;
          min-height: 100svh;
        }

        .velius {
          --velius-emerald: #059669;
          --velius-emerald-light: #10b981;
          --velius-emerald-glow: rgba(16, 185, 129, 0.14);
          --velius-emerald-border: rgba(5, 150, 105, 0.45);
          --velius-emerald-faint: rgba(16, 185, 129, 0.28);
          min-height: 100svh;
          background: #050505;
          color: #cbd5e1;
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1.6;
        }

        /* ── Brand Logo ── */
        .velius-hero {
          text-align: center;
          padding: 3.5rem 2rem 2.5rem;
          max-width: 820px;
          margin: 0 auto;
        }

        .velius-brand {
          position: relative;
          display: inline-block;
          margin-bottom: 1.25rem;
        }

        .velius-brand-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.75rem, 7vw, 4.25rem);
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #cbd5e1;
          line-height: 1;
        }

        .velius-brand-ai {
          position: absolute;
          top: 0.1em;
          left: 100%;
          margin-left: 0.35em;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: clamp(0.65rem, 1.6vw, 0.85rem);
          font-weight: 300;
          letter-spacing: 0.28em;
          color: #cbd5e1;
          opacity: 0.75;
        }

        .velius-brand-line {
          width: 5.5rem;
          height: 1px;
          margin: 0 auto 2.75rem;
          background: linear-gradient(
            90deg,
            transparent,
            var(--velius-emerald-faint) 20%,
            var(--velius-emerald-faint) 80%,
            transparent
          );
        }

        /* ── Hero ── */

        .velius-hero h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4.5vw, 3.25rem);
          font-weight: 400;
          letter-spacing: 0.04em;
          line-height: 1.25;
          color: #e2e8f0;
          margin: 0 0 1.25rem;
        }

        .velius-hero p {
          font-size: 1rem;
          font-weight: 300;
          color: rgba(203, 213, 225, 0.55);
          margin: 0;
          letter-spacing: 0.03em;
        }

        /* ── Features ── */
        .velius-features {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 2rem 3rem;
        }

        .velius-features-label {
          text-align: center;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.3);
          margin: 0 0 1.25rem;
        }

        .velius-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        @media (max-width: 768px) {
          .velius-features-grid {
            grid-template-columns: 1fr;
          }
        }

        .velius-feature-card {
          background: #0a0a0a;
          border: 1px solid rgba(203, 213, 225, 0.15);
          padding: 1.75rem 1.5rem;
          transition: border-color 0.4s ease, background 0.4s ease;
        }

        .velius-feature-card:hover {
          border-color: rgba(203, 213, 225, 0.3);
          background: rgba(203, 213, 225, 0.02);
        }

        .velius-feature-title {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(203, 213, 225, 0.85);
          margin: 0 0 0.75rem;
          line-height: 1.4;
        }

        .velius-feature-icon {
          flex-shrink: 0;
          width: 1rem;
          height: 1rem;
          color: var(--velius-emerald-light);
        }

        .velius-feature-text {
          font-size: 0.78rem;
          font-weight: 300;
          line-height: 1.55;
          color: rgba(203, 213, 225, 0.4);
          margin: 0;
          letter-spacing: 0.02em;
        }

        /* ── Drop Zone ── */
        .velius-dropzone-wrap {
          padding: 0 2rem;
          max-width: 720px;
          margin: 0 auto 4rem;
        }

        .velius-demo-indicator {
          max-width: 960px;
          margin: 0 auto 1.1rem;
          border: 1px solid rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.06);
          color: rgba(16, 185, 129, 0.9);
          padding: 0.7rem 1rem;
          font-size: 0.73rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          animation: veliusFadeIn 0.45s ease;
        }

        .velius-demo-value {
          color: #cbd5e1;
          font-weight: 400;
        }

        .velius-dropzone-actions {
          margin-top: 1.25rem;
          display: flex;
          justify-content: center;
        }

        .velius-dropzone-simulate {
          border: 1px solid rgba(16, 185, 129, 0.35);
          background: rgba(16, 185, 129, 0.04);
          color: rgba(16, 185, 129, 0.9);
          padding: 0.55rem 1rem;
          font-size: 0.66rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .velius-dropzone-simulate:hover {
          border-color: rgba(16, 185, 129, 0.55);
          background: rgba(16, 185, 129, 0.1);
        }

        .velius-limit-card {
          border: 1px solid rgba(203, 213, 225, 0.18);
          background: #0a0a0a;
          padding: 2rem;
          animation: veliusFadeIn 0.55s ease;
        }

        .velius-limit-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.7rem;
          letter-spacing: 0.03em;
          color: #e2e8f0;
          margin: 0 0 0.4rem;
        }

        .velius-limit-sub {
          margin: 0 0 1.5rem;
          color: rgba(203, 213, 225, 0.48);
          font-size: 0.82rem;
        }

        .velius-limit-form {
          display: grid;
          gap: 0.8rem;
        }

        .velius-limit-input {
          width: 100%;
          background: rgba(203, 213, 225, 0.02);
          border: 1px solid rgba(203, 213, 225, 0.16);
          color: #cbd5e1;
          padding: 0.85rem 1rem;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.84rem;
          outline: none;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .velius-limit-input:focus {
          border-color: rgba(16, 185, 129, 0.48);
          box-shadow: 0 0 0 1px rgba(16, 185, 129, 0.15);
        }

        .velius-limit-button {
          margin-top: 0.2rem;
          border: 1px solid rgba(16, 185, 129, 0.42);
          background: rgba(16, 185, 129, 0.14);
          color: #b6f7dd;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.85rem 1rem;
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease;
        }

        .velius-limit-button:hover {
          border-color: rgba(16, 185, 129, 0.68);
          background: rgba(16, 185, 129, 0.2);
        }

        .velius-dropzone {
          position: relative;
          padding: 3.5rem 2rem;
          text-align: center;
          border: 1px solid rgba(203, 213, 225, 0.18);
          background: rgba(203, 213, 225, 0.015);
          cursor: pointer;
          transition: border-color 0.45s ease, box-shadow 0.45s ease, background 0.45s ease;
        }

        .velius-dropzone:hover,
        .velius-dropzone.dragging {
          border-color: var(--velius-emerald-border);
          box-shadow:
            0 0 0 1px rgba(16, 185, 129, 0.06),
            0 0 36px var(--velius-emerald-glow),
            inset 0 0 48px rgba(16, 185, 129, 0.025);
          background: rgba(16, 185, 129, 0.02);
        }

        .velius-dropzone-icon {
          width: 2rem;
          height: 2rem;
          margin: 0 auto 1.25rem;
          opacity: 0.35;
          color: #cbd5e1;
          transition: opacity 0.45s ease, color 0.45s ease;
        }

        .velius-dropzone:hover .velius-dropzone-icon,
        .velius-dropzone.dragging .velius-dropzone-icon {
          opacity: 0.75;
          color: var(--velius-emerald-light);
        }

        .velius-dropzone-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: rgba(203, 213, 225, 0.85);
          margin: 0 0 0.6rem;
        }

        .velius-dropzone-hint {
          font-size: 0.78rem;
          color: rgba(203, 213, 225, 0.35);
          letter-spacing: 0.04em;
        }

        .velius-dropzone input {
          display: none;
        }

        /* ── Tabs ── */
        .velius-tabs-section {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 2rem 5rem;
        }

        .velius-tabs-nav {
          display: flex;
          gap: 0;
          border-bottom: 1px solid rgba(203, 213, 225, 0.1);
          overflow-x: auto;
        }

        .velius-tab-btn {
          flex: 1;
          min-width: max-content;
          padding: 1rem 1.25rem;
          background: none;
          border: none;
          border-bottom: 1px solid transparent;
          margin-bottom: -1px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.35);
          cursor: pointer;
          transition: color 0.35s ease, border-color 0.35s ease;
          white-space: nowrap;
        }

        .velius-tab-btn:hover {
          color: rgba(203, 213, 225, 0.65);
        }

        .velius-tab-btn.active {
          color: var(--velius-emerald-light);
          border-bottom-color: var(--velius-emerald);
        }

        .velius-tab-panel {
          animation: veliusFadeIn 0.45s ease;
          padding-top: 2.5rem;
        }

        @keyframes veliusFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Summary cards */
        .velius-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1px;
          background: rgba(203, 213, 225, 0.08);
        }

        .velius-card {
          background: #050505;
          padding: 1.75rem;
        }

        .velius-card-label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.35);
          margin-bottom: 0.75rem;
        }

        .velius-card-value {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.35rem;
          font-weight: 400;
          color: #e2e8f0;
          letter-spacing: 0.03em;
        }

        .velius-card-sub {
          font-size: 0.82rem;
          color: rgba(203, 213, 225, 0.45);
          margin-top: 0.5rem;
        }

        .velius-deadlines {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid rgba(203, 213, 225, 0.08);
        }

        .velius-deadline-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(203, 213, 225, 0.06);
          font-size: 0.85rem;
        }

        .velius-deadline-row:last-child { border-bottom: none; }

        .velius-deadline-date {
          font-family: 'IBM Plex Sans', monospace;
          font-size: 0.78rem;
          color: rgba(203, 213, 225, 0.4);
          letter-spacing: 0.06em;
        }

        /* Risks ribbon */
        .velius-risks-ribbon {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .velius-risk-card {
          padding: 1.75rem 2rem;
          transition: border-color 0.35s ease;
        }

        .velius-risk-critical {
          border: 1px solid rgba(220, 80, 80, 0.4);
          background: rgba(127, 29, 29, 0.14);
        }

        .velius-risk-warning {
          border: 1px solid rgba(251, 191, 36, 0.35);
          background: rgba(113, 85, 0, 0.1);
        }

        .velius-risk-badge {
          display: inline-block;
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }

        .velius-risk-critical .velius-risk-badge {
          color: #fca5a5;
        }

        .velius-risk-warning .velius-risk-badge {
          color: #fcd34d;
        }

        .velius-risk-text {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          letter-spacing: 0.02em;
          line-height: 1.55;
          margin: 0;
        }

        .velius-risk-critical .velius-risk-text {
          color: #fecaca;
        }

        .velius-risk-warning .velius-risk-text {
          color: #fde68a;
        }

        /* Finance audit */
        .velius-finance-block {
          border: 1px solid rgba(203, 213, 225, 0.1);
          background: #0a0a0a;
          padding: 2rem;
        }

        .velius-finance-total {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(203, 213, 225, 0.08);
        }

        .velius-finance-total .velius-finance-amount {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.25rem;
          color: #e2e8f0;
          letter-spacing: 0.02em;
          margin-top: 0.5rem;
        }

        .velius-finance-tranches {
          margin-bottom: 2rem;
        }

        .velius-finance-tranches-title {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.35);
          margin: 0 0 1rem;
        }

        .velius-tranche-row {
          display: grid;
          grid-template-columns: 1fr auto auto;
          gap: 1rem;
          align-items: center;
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(203, 213, 225, 0.06);
          font-size: 0.85rem;
        }

        .velius-tranche-row:last-child {
          border-bottom: none;
        }

        .velius-tranche-name {
          color: rgba(203, 213, 225, 0.7);
        }

        .velius-tranche-pct {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          color: var(--velius-emerald-light);
        }

        .velius-tranche-sum {
          font-family: 'IBM Plex Sans', monospace;
          font-size: 0.78rem;
          color: rgba(203, 213, 225, 0.45);
          text-align: right;
        }

        .velius-finance-safety-label {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.75rem;
        }

        .velius-finance-safety-label span:last-child {
          font-size: 0.78rem;
          color: var(--velius-emerald-light);
          letter-spacing: 0.04em;
        }

        .velius-safety-bar {
          height: 3px;
          background: rgba(203, 213, 225, 0.08);
          position: relative;
          overflow: hidden;
        }

        .velius-safety-bar-fill {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 0;
          background: linear-gradient(90deg, var(--velius-emerald), var(--velius-emerald-light));
          box-shadow: 0 0 16px var(--velius-emerald-glow);
          transition: width 1s ease 0.2s;
        }

        .velius-tab-panel[data-tab="finance"] .velius-safety-bar-fill {
          width: 84%;
        }

        .velius-finance-safety-hint {
          margin-top: 0.65rem;
          font-size: 0.72rem;
          color: rgba(203, 213, 225, 0.35);
          letter-spacing: 0.02em;
        }

        /* Chat */
        .velius-chat-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(203, 213, 225, 0.08);
          min-height: 320px;
        }

        @media (max-width: 768px) {
          .velius-chat-layout { grid-template-columns: 1fr; }
        }

        .velius-chat-input-side {
          background: #050505;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .velius-chat-input-side label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.35);
        }

        .velius-chat-textarea {
          flex: 1;
          min-height: 140px;
          background: rgba(203, 213, 225, 0.02);
          border: 1px solid rgba(203, 213, 225, 0.12);
          padding: 1rem 1.25rem;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 300;
          color: #cbd5e1;
          resize: none;
          outline: none;
          transition: border-color 0.35s ease;
        }

        .velius-chat-textarea::placeholder {
          color: rgba(203, 213, 225, 0.25);
        }

        .velius-chat-textarea:focus {
          border-color: var(--velius-emerald-border);
        }

        .velius-chat-send {
          align-self: flex-start;
          background: none;
          border: 1px solid rgba(16, 185, 129, 0.35);
          padding: 0.7rem 1.5rem;
          color: var(--velius-emerald-light);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.35s ease, background 0.35s ease;
        }

        .velius-chat-send:hover {
          border-color: var(--velius-emerald-light);
          background: rgba(16, 185, 129, 0.06);
        }

        .velius-chat-response-side {
          background: #0a0a0a;
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .velius-chat-ai-label {
          font-size: 0.62rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--velius-emerald-light);
          margin-bottom: 1rem;
        }

        .velius-chat-demo-response {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.2rem;
          line-height: 1.55;
          color: rgba(203, 213, 225, 0.85);
          margin: 0;
          padding-left: 1rem;
          border-left: 2px solid var(--velius-emerald);
        }

        .velius-chat-user-preview {
          font-size: 0.78rem;
          color: rgba(203, 213, 225, 0.4);
          margin-bottom: 1rem;
          font-style: italic;
        }

        /* ── Pricing ── */
        .velius-pricing {
          border-top: 1px solid rgba(203, 213, 225, 0.1);
          padding: 4rem 2rem 5rem;
        }

        .velius-pricing-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .velius-pricing-header h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.75rem;
          font-weight: 400;
          letter-spacing: 0.12em;
          color: #e2e8f0;
          margin: 0 0 0.5rem;
        }

        .velius-pricing-header p {
          font-size: 0.82rem;
          color: rgba(203, 213, 225, 0.35);
          letter-spacing: 0.06em;
        }

        .velius-pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1px;
          max-width: 960px;
          margin: 0 auto;
          background: rgba(203, 213, 225, 0.08);
        }

        .velius-plan {
          background: #050505;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          transition: background 0.35s ease;
        }

        .velius-plan.featured {
          background: #0a0a0a;
        }

        .velius-plan-name {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(203, 213, 225, 0.4);
          margin-bottom: 1.5rem;
        }

        .velius-plan-price {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 2.25rem;
          font-weight: 400;
          color: #e2e8f0;
          letter-spacing: 0.02em;
        }

        .velius-plan-period {
          font-size: 0.78rem;
          color: rgba(203, 213, 225, 0.35);
          margin-top: 0.25rem;
        }

        .velius-plan-features {
          list-style: none;
          padding: 0;
          margin: 2rem 0 0;
          flex: 1;
        }

        .velius-plan-features li {
          font-size: 0.82rem;
          color: rgba(203, 213, 225, 0.5);
          padding: 0.5rem 0;
          border-bottom: 1px solid rgba(203, 213, 225, 0.05);
          letter-spacing: 0.02em;
        }

        .velius-plan-features li:last-child { border-bottom: none; }

        .velius-plan-cta {
          margin-top: 2rem;
          padding: 0.85rem;
          background: none;
          border: 1px solid rgba(203, 213, 225, 0.2);
          color: rgba(203, 213, 225, 0.65);
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.35s ease, color 0.35s ease;
        }

        .velius-plan-cta:hover {
          border-color: rgba(203, 213, 225, 0.5);
          color: #cbd5e1;
        }

        .velius-plan.featured .velius-plan-cta {
          border-color: rgba(203, 213, 225, 0.4);
          color: #cbd5e1;
        }

        /* ── Footer ── */
        .velius-footer {
          text-align: center;
          padding: 2rem;
          border-top: 1px solid rgba(203, 213, 225, 0.06);
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          color: rgba(203, 213, 225, 0.2);
        }
      `}</style>

      <div className="velius">
        {/* Hero */}
        <section className="velius-hero">
          <div className="velius-brand">
            <span className="velius-brand-name">VELIUS</span>
            <span className="velius-brand-ai">AI</span>
          </div>
          <div className="velius-brand-line" aria-hidden="true" />
          <h1>Автоматический анализ юридических рисков в договорах</h1>
          <p>Нейросеть Velius находит скрытые ловушки, штрафы и делает краткий пересказ документа за 5 секунд</p>
        </section>

        {/* Features */}
        <section className="velius-features">
          <p className="velius-features-label">ЧТО ДЕЛАЕТ VELIUS AI</p>
          <div className="velius-features-grid">
            {FEATURES.map((feature) => (
              <div key={feature.title} className="velius-feature-card">
                <h3 className="velius-feature-title">
                  <FeatureIcon type={feature.icon} />
                  {feature.title}
                </h3>
                <p className="velius-feature-text">{feature.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Drop Zone */}
        <div className="velius-dropzone-wrap">
          {hasChecksLeft ? (
            <div
              className={`velius-dropzone${isDragging ? ' dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleOpenFilePicker}
            >
              <input ref={fileInputRef} type="file" accept=".pdf,.docx" onChange={handleFileSelect} />
              <svg className="velius-dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 16V4m0 0l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 20h16" strokeLinecap="round" />
              </svg>
              <p className="velius-dropzone-title">
                Перетащите договор сюда для мгновенного анализа рисков
              </p>
              <p className="velius-dropzone-hint">Поддерживаются форматы PDF, DOCX</p>
              <div className="velius-dropzone-actions">
                <button type="button" className="velius-dropzone-simulate" onClick={handleSimulateCheck}>
                  Симулировать проверку
                </button>
              </div>
            </div>
          ) : (
            <div className="velius-limit-card">
              <h3 className="velius-limit-title">Бесплатный лимит исчерпан</h3>
              <p className="velius-limit-sub">
                Оставьте контакты, и мы откроем безлимитный доступ для вашей команды.
              </p>
              <form className="velius-limit-form" onSubmit={handleLeadSubmit}>
                <input
                  className="velius-limit-input"
                  type="text"
                  placeholder="Ваше Имя"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                />
                <input
                  className="velius-limit-input"
                  type="text"
                  placeholder="Email или Telegram для связи"
                  value={leadContact}
                  onChange={(e) => setLeadContact(e.target.value)}
                />
                <button type="submit" className="velius-limit-button">
                  Запросить безлимитный доступ для компании
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Tabs */}
        <section className="velius-tabs-section">
          <div className="velius-demo-indicator">
            Демо-доступ: Осталось <span className="velius-demo-value">{remainingChecks}</span> из{' '}
            <span className="velius-demo-value">{demoLimit}</span> бесплатных проверок
          </div>
          <nav className="velius-tabs-nav" role="tablist" aria-label="Дашборд VELIUS AI">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                className={`velius-tab-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <div
            className="velius-tab-panel"
            key={activeTab}
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
            data-tab={activeTab}
          >
            {activeTab === 'summary' && (
              <>
                <div className="velius-cards">
                  <div className="velius-card">
                    <div className="velius-card-label">Тип сделки</div>
                    <div className="velius-card-value">Поставка оборудования</div>
                    <div className="velius-card-sub">Договор № 2024/ПО-118 от 14.03.2025</div>
                  </div>
                  <div className="velius-card">
                    <div className="velius-card-label">Стороны</div>
                    <div className="velius-card-value">ООО «Вектор» ↔ АО «ТехноПром»</div>
                    <div className="velius-card-sub">Поставщик несёт расширенную ответственность</div>
                  </div>
                  <div className="velius-card">
                    <div className="velius-card-label">Сумма контракта</div>
                    <div className="velius-card-value">48 600 000 ₽</div>
                    <div className="velius-card-sub">Включая НДС, оплата в 3 транша</div>
                  </div>
                </div>
                <div className="velius-deadlines">
                  <div className="velius-deadline-row">
                    <span>Подписание договора</span>
                    <span className="velius-deadline-date">14.03.2025</span>
                  </div>
                  <div className="velius-deadline-row">
                    <span>Первый транш (30%)</span>
                    <span className="velius-deadline-date">до 28.03.2025</span>
                  </div>
                  <div className="velius-deadline-row">
                    <span>Поставка оборудования</span>
                    <span className="velius-deadline-date">до 15.06.2025</span>
                  </div>
                  <div className="velius-deadline-row">
                    <span>Гарантийный период</span>
                    <span className="velius-deadline-date">24 месяца</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'risks' && (
              <div className="velius-risks-ribbon">
                <div className="velius-risk-card velius-risk-critical">
                  <div className="velius-risk-badge">Критический риск</div>
                  <p className="velius-risk-text">
                    Пункт 14.4 — Штраф 20% при задержке поставки более чем на 3 дня.
                    Рекомендация: снизить до 0.1%
                  </p>
                </div>
                <div className="velius-risk-card velius-risk-warning">
                  <div className="velius-risk-badge">Внимание</div>
                  <p className="velius-risk-text">
                    Пункт 7.2 — Нечетко прописаны условия форс-мажора
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'finance' && (
              <div className="velius-finance-block">
                <div className="velius-finance-total">
                  <div className="velius-card-label">Общая сумма договора</div>
                  <div className="velius-finance-amount">48 600 000 ₽</div>
                  <div className="velius-card-sub">Включая НДС · ООО «Вектор» ↔ АО «ТехноПром»</div>
                </div>
                <div className="velius-finance-tranches">
                  <p className="velius-finance-tranches-title">График из трёх траншей</p>
                  <div className="velius-tranche-row">
                    <span className="velius-tranche-name">Транш 1 · аванс</span>
                    <span className="velius-tranche-pct">30%</span>
                    <span className="velius-tranche-sum">14 580 000 ₽ · до 28.03.2025</span>
                  </div>
                  <div className="velius-tranche-row">
                    <span className="velius-tranche-name">Транш 2 · промежуточный</span>
                    <span className="velius-tranche-pct">40%</span>
                    <span className="velius-tranche-sum">19 440 000 ₽ · до 15.05.2025</span>
                  </div>
                  <div className="velius-tranche-row">
                    <span className="velius-tranche-name">Транш 3 · финальный</span>
                    <span className="velius-tranche-pct">30%</span>
                    <span className="velius-tranche-sum">14 580 000 ₽ · после поставки</span>
                  </div>
                </div>
                <div className="velius-finance-safety">
                  <div className="velius-finance-safety-label">
                    <span className="velius-card-label">Финансовая безопасность сделки</span>
                    <span>84%</span>
                  </div>
                  <div className="velius-safety-bar">
                    <div className="velius-safety-bar-fill" />
                  </div>
                  <p className="velius-finance-safety-hint">
                    Умеренный уровень риска · график платежей сбалансирован, скрытые штрафы выявлены
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="velius-chat-layout">
                <form className="velius-chat-input-side" onSubmit={handleChatSubmit}>
                  <label htmlFor="velius-chat-input">Ваш запрос</label>
                  <textarea
                    id="velius-chat-input"
                    className="velius-chat-textarea"
                    placeholder="Задайте вопрос по договору..."
                    value={chatQuestion}
                    onChange={(e) => setChatQuestion(e.target.value)}
                  />
                  <button type="submit" className="velius-chat-send">Отправить</button>
                </form>
                <div className="velius-chat-response-side">
                  <div className="velius-chat-ai-label">Velius AI</div>
                  {chatSubmitted && chatQuestion.trim() && (
                    <p className="velius-chat-user-preview">«{chatQuestion.trim()}»</p>
                  )}
                  <p className="velius-chat-demo-response">
                    Я проанализировал пункт 5. Изменения внесены. Текст готов к копированию.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Pricing */}
        <section className="velius-pricing">
          <div className="velius-pricing-header">
            <h2>Тарифы</h2>
            <p>Инвестиция в безупречность каждого контракта</p>
          </div>
          <div className="velius-pricing-grid">
            {PLANS.map((plan) => (
              <div key={plan.name} className={`velius-plan${plan.featured ? ' featured' : ''}`}>
                <div className="velius-plan-name">{plan.name}</div>
                <div className="velius-plan-price">{plan.price}</div>
                {plan.period && <div className="velius-plan-period">{plan.period}</div>}
                <ul className="velius-plan-features">
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <button type="button" className="velius-plan-cta">
                  {plan.name === 'Корпоративный' ? 'Связаться' : 'Выбрать'}
                </button>
              </div>
            ))}
          </div>
        </section>

        <footer className="velius-footer">
          VELIUS AI · 2025 · Конфиденциально
        </footer>
      </div>
    </>
  )
}

export default App
