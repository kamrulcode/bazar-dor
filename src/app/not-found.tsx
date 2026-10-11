"use client";
import Link from "next/link";
import { ArrowLeft, Home, Search, Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <main className="error-page grid place-content-center">
      {/* Animated background */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="error-content">
        {/* Floating illustration */}
        <div className="illustration">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />

          <span className="floating-item item-one">🥬</span>
          <span className="floating-item item-two">🍅</span>
          <span className="floating-item item-three">🥕</span>
          <span className="floating-item item-four">🌿</span>

          <div className="error-number">
            <span>4</span>
            <div className="zero">
              <Leaf size={55} strokeWidth={1.5} />
            </div>
            <span>4</span>
          </div>

          <span className="lost-label">পৃষ্ঠা খুঁজে পাওয়া যায়নি!</span>
        </div>

        {/* Bengali content */}
        <div className="error-message">
          <span className="eyebrow">
            <span className="status-dot" />
            404 • পৃষ্ঠা পাওয়া যায়নি
          </span>

          <h1>
            আরে! এই পৃষ্ঠাটি
            <br />
            <span>বাজারে নেই!</span>
          </h1>

          <p>
            দুঃখিত! আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি হয়তো সরানো হয়েছে অথবা
            ঠিকানাটি ভুল। চলুন, আবার বাজারে ফিরে যাই।
          </p>

          <div className="error-actions">
            <Link href="/" className="home-button">
              <Home size={18} />
              হোম পেজে ফিরে যান
            </Link>

            <button
              className="back-button"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={17} />
              আগের পৃষ্ঠায় ফিরুন
            </button>
          </div>

          <div className="help-note">
            <Search size={15} />
            <span>চিন্তা নেই, আপনার বাজারের সব পথ এখানেই শেষ নয়!</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .error-page {
          --brand: #009b68;
          --brand-dark: #007b51;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5faf6;
          color: #183329;
          font-family: inherit;
          isolation: isolate;
        }

        .error-page * {
          box-sizing: border-box;
        }

        .ambient {
          position: absolute;
          z-index: -1;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          filter: blur(85px);
          opacity: 0.35;
          pointer-events: none;
          animation: ambientFloat 9s ease-in-out infinite alternate;
        }

        .ambient-one {
          top: -180px;
          left: -100px;
          background: #a4f2c5;
        }

        .ambient-two {
          bottom: -180px;
          right: -100px;
          background: #d1f4a9;
          animation-delay: -4s;
        }

        .error-content {
          width: 100%;
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
          animation: enterPage 0.8s ease both;
        }

        .illustration {
          min-width: 0;
          position: relative;
          aspect-ratio: 1;
          max-width: 440px;
          width: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit {
          position: absolute;
          border: 1px dashed #b8ddc5;
          border-radius: 50%;
          animation: rotateOrbit 28s linear infinite;
        }

        .orbit-one {
          width: 90%;
          height: 90%;
        }

        .orbit-two {
          width: 68%;
          height: 68%;
          border-style: solid;
          border-color: #d5eadd;
          animation-direction: reverse;
          animation-duration: 22s;
        }

        .error-number {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: clamp(100px, 15vw, 165px);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -10px;
          color: var(--brand);
          text-shadow: 0 12px 35px #009b681a;
          animation: numberFloat 4s ease-in-out infinite;
        }

        .zero {
          width: 0.76em;
          height: 0.76em;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 9px solid #009b68;
          border-radius: 50%;
          background: #e2f8e9;
          color: #009b68;
          letter-spacing: 0;
          animation: zeroPulse 3s ease-in-out infinite;
        }

        .zero :global(svg) {
          width: 46%;
          height: 46%;
        }

        .floating-item {
          position: absolute;
          z-index: 2;
          display: grid;
          place-items: center;
          width: 58px;
          height: 58px;
          border: 1px solid #e1eee4;
          border-radius: 19px;
          background: #ffffffd9;
          box-shadow: 0 12px 32px #17452b12;
          font-size: 28px;
          backdrop-filter: blur(8px);
          animation: itemFloat 4s ease-in-out infinite;
        }

        .item-one {
          top: 12%;
          left: 11%;
        }

        .item-two {
          top: 17%;
          right: 9%;
          animation-delay: -1.2s;
        }

        .item-three {
          bottom: 17%;
          left: 9%;
          animation-delay: -2s;
        }

        .item-four {
          right: 12%;
          bottom: 12%;
          animation-delay: -0.7s;
        }

        .lost-label {
          position: absolute;
          bottom: 3%;
          padding: 9px 17px;
          border: 1px solid #dcebe0;
          border-radius: 100px;
          background: white;
          color: #52745e;
          font-size: 12px;
          font-weight: 600;
          box-shadow: 0 8px 24px #173f2710;
        }

        .error-message {
          max-width: 450px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 23px;
          padding: 8px 13px;
          border: 1px solid #d5eadb;
          border-radius: 100px;
          background: #eaf7ed;
          color: #26774b;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #00a86b;
          box-shadow: 0 0 0 4px #00a86b20;
          animation: dotPulse 2s ease-in-out infinite;
        }

        .error-message h1 {
          margin: 0;
          color: #183329;
          font-size: clamp(32px, 4vw, 46px);
          font-weight: 850;
          line-height: 1.4;
          letter-spacing: -1.3px;
        }

        .error-message h1 span {
          color: var(--brand);
        }

        .error-message p {
          max-width: 390px;
          margin: 18px 0 27px;
          color: #718078;
          font-size: 15px;
          line-height: 2;
        }

        .error-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .home-button,
        .back-button {
          min-height: 49px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 0 18px;
          border-radius: 13px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .home-button {
          border: 1px solid var(--brand);
          background: var(--brand);
          color: white;
          box-shadow: 0 8px 20px #009b6828;
        }

        .home-button:hover {
          transform: translateY(-3px);
          background: var(--brand-dark);
          box-shadow: 0 12px 25px #009b6835;
        }

        .back-button {
          border: 1px solid #dce8df;
          background: #ffffffb8;
          color: #385746;
        }

        .back-button:hover {
          transform: translateY(-3px);
          background: white;
        }

        .help-note {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          margin-top: 27px;
          color: #819087;
          font-size: 11px;
          line-height: 1.8;
        }

        .help-note :global(svg) {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--brand);
        }

        .bottom-note {
          position: absolute;
          right: 24px;
          bottom: 23px;
          left: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #718d79;
          font-size: 12px;
          text-align: center;
        }

        .bottom-note :global(svg) {
          color: var(--brand);
        }

        @keyframes enterPage {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes numberFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes itemFloat {
          0%,
          100% {
            transform: translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateY(-12px) rotate(5deg);
          }
        }

        @keyframes rotateOrbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes zeroPulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.06);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px #00a86b20;
          }
          50% {
            box-shadow: 0 0 0 7px #00a86b10;
          }
        }

        @keyframes ambientFloat {
          from {
            transform: translate(0, 0);
          }
          to {
            transform: translate(35px, 25px);
          }
        }

        @media (max-width: 700px) {
          .error-page {
            padding: 30px 22px 78px;
          }

          .error-content {
            grid-template-columns: 1fr;
            gap: 12px;
            max-width: 480px;
          }

          .illustration {
            max-width: 300px;
          }

          .error-number {
            font-size: clamp(100px, 29vw, 140px);
          }

          .floating-item {
            width: 43px;
            height: 43px;
            border-radius: 14px;
            font-size: 22px;
          }

          .lost-label {
            bottom: 0;
            font-size: 11px;
          }

          .error-message {
            text-align: center;
          }

          .error-message h1 {
            font-size: clamp(30px, 8vw, 39px);
          }

          .error-message p {
            margin: 14px auto 23px;
            font-size: 14px;
          }

          .error-actions {
            justify-content: center;
          }

          .help-note {
            justify-content: center;
            margin-top: 20px;
          }

          .bottom-note {
            bottom: 18px;
            font-size: 10px;
          }
        }

        @media (max-width: 380px) {
          .error-actions {
            flex-direction: column;
          }

          .error-actions > * {
            width: 100%;
          }

          .illustration {
            max-width: 250px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .error-page *,
          .error-page *::before,
          .error-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}
