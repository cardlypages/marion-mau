import { useEffect, useState } from "react";
import {
  ArrowDown,
  Heart,
  Music2,
  X,
  MailOpen,
  Sparkles,
  LockKeyhole,
} from "lucide-react";

const START_DATE = new Date("2024-11-20T00:00:00+08:00");
const ANNIVERSARY_DATE = new Date("2026-11-20T00:00:00+08:00");
const SONG_ID = "Hz0qYk1WDEU"; // The Juans — Ngiti (Official Lyric Video)
const STORY_PIN = "112024";

const memories = [
  {
    src: "/images/memory-01.jpeg",
    alt: "Marion and Mau sharing a cozy moment with a book",
    caption: "Little moments, big memories",
  },
  {
    src: "/images/memory-02.jpeg",
    alt: "A portrait of Marion and Mau together",
    caption: "My favorite people, us",
  },
  {
    src: "/images/memory-03.jpeg",
    alt: "Marion and Mau sharing a sweet moment at home with their dog",
    caption: "Our little family",
  },
  {
    src: "/images/memory-04.jpeg",
    alt: "Marion and Mau being playful together",
    caption: "Just being ourselves",
  },
];

const reasons = [
  "The way you make ordinary days feel special.",
  "Your smile, and how it can make my day better.",
  "The little things you do that mean more than you know.",
  "The memories we've made and the stories still ahead.",
  "Being able to be myself with you.",
  "Simply because you are you. And I love you.",
];

function useRelationshipTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const elapsed = Math.max(0, now.getTime() - START_DATE.getTime());
  const totalSeconds = Math.floor(elapsed / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    daysUntil: Math.max(
      0,
      Math.ceil((ANNIVERSARY_DATE.getTime() - now.getTime()) / 86400000),
    ),
    isAnniversary:
      now >= ANNIVERSARY_DATE && now < new Date("2026-11-21T00:00:00+08:00"),
  };
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}

function App() {
  const time = useRelationshipTime();
  const [letterOpen, setLetterOpen] = useState(false);
  const [songStarted, setSongStarted] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [openReasons, setOpenReasons] = useState([]);
  const [introVisible, setIntroVisible] = useState(true);
  const [pinPromptVisible, setPinPromptVisible] = useState(false);
  const [pinValue, setPinValue] = useState("");
  const [pinError, setPinError] = useState("");
  const [surpriseOpen, setSurpriseOpen] = useState(false);
  const [activeLetter, setActiveLetter] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [draggedPhoto, setDraggedPhoto] = useState(null);
  const [photoOrder, setPhotoOrder] = useState([0, 1, 2, 3]);

  const toggleLetter = () => {
    if (letterOpen) {
      // Closing the letter also unmounts the embedded video, stopping its audio.
      setLetterOpen(false);
      setSongStarted(false);
      return;
    }

    setLetterOpen(true);
    // Loading the player only after a visitor click gives autoplay the best chance.
    setSongStarted(true);
  };

  const toggleReason = (index) => {
    setOpenReasons((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  return (
    <>
      {/* Original falling sakura petal effect: individual drifting petal shapes. */}
      <div className="petal-layer" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span
            className="falling-petal"
            key={index}
            style={{
              left: `${(index * 37 + 8) % 100}%`,
              animationDelay: `${(index % 9) * -1.7}s`,
              animationDuration: `${12 + (index % 6) * 2}s`,
              "--petal-drift": `${(index % 2 === 0 ? 1 : -1) * (25 + (index % 5) * 12)}px`,
              opacity: 0.35 + (index % 4) * 0.12,
            }}
          />
        ))}
      </div>

      {introVisible && (
        <section
          className="intro-screen"
          aria-label="Welcome to our anniversary story"
        >
          <span className="intro-petal petal-a" aria-hidden="true">
            ✿
          </span>
          <span className="intro-petal petal-b" aria-hidden="true">
            ✿
          </span>
          <div className="intro-content">
            <p className="eyebrow">A little surprise, made with love</p>
            <h1>
              Hi, Mau<span>.</span>
            </h1>
            <p>I made something for you.</p>
            <div className="intro-heart">
              <Heart fill="currentColor" size={25} />
            </div>
            {!pinPromptVisible ? (
              <>
                <button
                  className="pill-button intro-enter"
                  onClick={() => setPinPromptVisible(true)}
                >
                  Enter Our Story <ArrowDown size={15} />
                </button>
                <small>A little place for our favorite memories</small>
              </>
            ) : (
              <form
                className="pin-card"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (pinValue === STORY_PIN) {
                    setPinError("");
                    setIntroVisible(false);
                  } else {
                    setPinError(
                      "That isn’t quite right. Try our special date. ♡",
                    );
                    setPinValue("");
                  }
                }}
              >
                <div className="pin-lock">
                  <LockKeyhole size={21} />
                </div>
                <h2>Our little secret</h2>
                <p>Enter the date that means everything to us.</p>
                <label className="pin-label" htmlFor="story-pin">
                  Six-digit PIN
                </label>
                <input
                  id="story-pin"
                  className="pin-input"
                  type="password"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  autoComplete="off"
                  placeholder="••••••"
                  value={pinValue}
                  onChange={(event) => {
                    setPinValue(
                      event.target.value.replace(/\D/g, "").slice(0, 6),
                    );
                    setPinError("");
                  }}
                  aria-describedby={pinError ? "pin-error" : undefined}
                  autoFocus
                  required
                />
                {pinError && (
                  <p className="pin-error" id="pin-error" role="alert">
                    {pinError}
                  </p>
                )}
                <button
                  className="pill-button pin-submit"
                  type="submit"
                  disabled={pinValue.length !== 6}
                >
                  Unlock Our Story <Heart size={14} fill="currentColor" />
                </button>
                <button
                  className="pin-back"
                  type="button"
                  onClick={() => {
                    setPinPromptVisible(false);
                    setPinValue("");
                    setPinError("");
                  }}
                >
                  Go back
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      <div
        className={
          introVisible ? "site-content site-content-hidden" : "site-content"
        }
      >
        <nav className="topbar" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#letter">Love letter</a>
          <a href="#our-song">Our song</a>
          <a href="#memories">Memories</a>
          <a href="#reasons">Reasons</a>
        </nav>

        <header className="hero">
          <span className="decor decor-one">✿</span>
          <span className="decor decor-two">✿</span>
          <div className="hero-inner">
            <p className="eyebrow">A little something, just for you</p>
            <h1>
              Marion <span>&</span> Mau
            </h1>
            <p className="hero-subtitle">
              Every love story is special.
              <br />
              I'm happiest that this one is ours.
            </p>
            <p className="hero-date">NOVEMBER 20, 2024 · OUR DAY</p>
            <a className="pill-button" href="#story">
              Open our story <ArrowDown size={15} />
            </a>
            <div className="hero-heart">
              <Heart fill="currentColor" size={17} />
            </div>
          </div>
        </header>

        <main>
          <section id="story" className="section story-section">
            <SectionHeading
              eyebrow="Since the day we became us"
              title="Our little timeline"
            >
              From November 20, 2024, and every little moment after. Here's to
              the memories we've made and all the ones still waiting for us.
            </SectionHeading>
            <div className="counter" aria-live="polite">
              {[
                ["Days together", time.days.toLocaleString()],
                ["Hours", time.hours.toLocaleString()],
                ["Minutes", time.minutes.toLocaleString()],
                ["Seconds", String(time.seconds).padStart(2, "0")],
              ].map(([label, value]) => (
                <div className="countbox" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <p className="counter-note">
              {time.isAnniversary
                ? "Happy 2nd anniversary, Marion & Mau! Today is our day. 💗"
                : time.daysUntil > 0
                  ? `Our second anniversary is in ${time.daysUntil} day${time.daysUntil === 1 ? "" : "s"}! Here's to us. 💗`
                  : "Two years together, and still counting. Here’s to everything ahead. 💗"}
            </p>
            <div className="milestone-line">
              <div className="milestone">
                <span>♡</span>
                <strong>November 20, 2024</strong>
                <small>The day we became us</small>
              </div>
              <div className="milestone">
                <span>✿</span>
                <strong>November 20, 2025</strong>
                <small>Our first trip around the sun</small>
              </div>
              <div className="milestone">
                <span>∞</span>
                <strong>November 20, 2026</strong>
                <small>Two years, and still choosing you</small>
              </div>
            </div>
          </section>

          <section id="letter" className="section letter-section">
            <SectionHeading
              eyebrow="For you, Mau"
              title="A letter from my heart"
            >
              A little envelope, with a lot of love inside.
            </SectionHeading>
            <button
              className={`envelope ${letterOpen ? "opened" : ""}`}
              onClick={toggleLetter}
              aria-expanded={letterOpen}
            >
              <span className="envelope-flap" />
              <span className="envelope-heart">♥</span>
              <span className="envelope-label">
                {letterOpen ? "Tap to close" : "Tap to open"}
              </span>
            </button>
            {!letterOpen && (
              <p className="tap-hint">Tap the envelope to open your letter</p>
            )}
            {letterOpen && (
              <article className="letter-paper">
                <div className="letter-stamp">
                  <MailOpen size={19} />
                </div>
                <p>My Mau,</p>
                <p>
                  Happy anniversary, baby. Two years ago, we chose to make this
                  story ours. Since then, we've collected moments, learned about
                  each other, and kept finding our way together.
                </p>
                <p>
                  Thank you for being part of my days, for the little things
                  that become my favorite memories, and for making this journey
                  meaningful. I may not have the perfect words for everything I
                  feel, but I hope you never doubt how much you mean to me.
                </p>
                <p>
                  Here's to more laughter, more adventures, more quiet moments,
                  and many more anniversaries. Whatever comes next, I hope we
                  keep choosing each other.
                </p>
                <p className="signature">
                  Always yours,
                  <br />
                  Marion ♡
                </p>
              </article>
            )}
          </section>

          <section id="our-song" className="section song-section">
            <SectionHeading
              eyebrow="A melody that reminds me of you"
              title="Our song"
            >
              Some songs just feel like a memory. This one will always remind me
              of you, Mau.
            </SectionHeading>
            <div className="music-card">
              <div className="music-icon">
                <Music2 size={25} />
              </div>
              <p className="music-overline">Our special song</p>
              <h3>Ngiti</h3>
              <p className="music-artist">THE JUANS</p>
              <div className="video-frame">
                {songStarted ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${SONG_ID}?autoplay=1&rel=0`}
                    title="Ngiti — The Juans Official Lyric Video"
                    allow="autoplay; encrypted-media; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                ) : (
                  <button
                    className="song-start"
                    onClick={() => setSongStarted(true)}
                  >
                    <span className="play-symbol">▶</span>
                    <span>Play our song</span>
                  </button>
                )}
              </div>
              <p className="song-quote">
                “Your smile will always be my favorite melody.”
                <br />
                <span>— Marion ♡</span>
              </p>
            </div>
          </section>

          <section id="memories" className="section memories-section">
            <SectionHeading
              eyebrow="Little moments, big feelings"
              title="Our memories"
            >
              A few snapshots of us, saved here so we can come back to these
              little moments whenever we want.
            </SectionHeading>
            <div className="memory-grid">
              {photoOrder.map((photoIndex, position) => {
                const photo = memories[photoIndex];
                return (
                  <button
                    className={`memory-card memory-${position + 1}`}
                    key={photo.src}
                    draggable
                    onDragStart={() => setDraggedPhoto(photoIndex)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => {
                      if (draggedPhoto === null || draggedPhoto === photoIndex)
                        return;
                      setPhotoOrder((current) => {
                        const next = [...current];
                        const from = next.indexOf(draggedPhoto);
                        const to = next.indexOf(photoIndex);
                        next.splice(from, 1);
                        next.splice(to, 0, draggedPhoto);
                        return next;
                      });
                      setDraggedPhoto(null);
                    }}
                    onDragEnd={() => setDraggedPhoto(null)}
                    onClick={() => setActivePhoto(photo)}
                    aria-label={`Open photo: ${photo.caption}. Drag to rearrange.`}
                  >
                    <img src={photo.src} alt={photo.alt} loading="lazy" />
                    <span>{photo.caption}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <section id="reasons" className="section reasons-section">
            <SectionHeading
              eyebrow="A few little reminders"
              title="Reasons I love you"
            >
              Tap each card. And remember, these are only a few of the reasons.
            </SectionHeading>
            <div className="reasons-grid">
              {reasons.map((reason, index) => (
                <button
                  className={`reason-card ${openReasons.includes(index) ? "is-open" : ""}`}
                  key={reason}
                  onClick={() => toggleReason(index)}
                >
                  {openReasons.includes(index) ? (
                    <span className="reason-message">{reason}</span>
                  ) : (
                    <span className="reason-front">
                      <Heart size={25} />
                      <small>
                        {["One", "Two", "Three", "Four", "Five", "Six"][index]}
                      </small>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </main>

        <section id="open-when" className="section open-when-section">
          <SectionHeading
            eyebrow="A little love for every kind of day"
            title="Open when..."
          >
            Little notes from me, for whenever you need them.
          </SectionHeading>
          <div className="open-when-grid">
            {[
              {
                title: "You miss me",
                icon: "♡",
                message:
                  "Close your eyes for a second and imagine me holding your hand. No matter where we are, you are never far from my heart. I can’t wait for our next hug.",
              },
              {
                title: "You feel sad",
                icon: "☁",
                message:
                  "It’s okay not to be okay every day. You don’t have to carry everything alone. I’m here to listen, to hold you, and to remind you how loved you are.",
              },
              {
                title: "You need a hug",
                icon: "♡",
                message:
                  "Sending you the biggest, warmest hug. Imagine my arms around you, a little forehead kiss, and me whispering: we’ve got this, love.",
              },
              {
                title: "You doubt yourself",
                icon: "✿",
                message:
                  "I hope you see even a little of what I see in you: someone wonderful, strong, kind, and so easy to love. I’m always cheering for you.",
              },
            ].map((letter) => (
              <button
                className="open-when-card"
                key={letter.title}
                onClick={() => setActiveLetter(letter)}
              >
                <span>{letter.icon}</span>
                <strong>Open when {letter.title.toLowerCase()}</strong>
                <small>A little note from Marion</small>
              </button>
            ))}
          </div>
        </section>

        <section id="quiz" className="section quiz-section">
          <SectionHeading
            eyebrow="Just for fun"
            title="How well do you know us?"
          >
            A tiny love quiz. Pick your answers and see how many you get!
          </SectionHeading>
          <div className="quiz-card">
            {[
              {
                q: "When did our story officially begin?",
                options: [
                  "November 20, 2024",
                  "November 20, 2025",
                  "December 20, 2024",
                ],
                answer: 0,
              },
              {
                q: "What is our special song?",
                options: ["Mahika", "Ngiti — The Juans", "Dumaloy"],
                answer: 1,
              },
              {
                q: "How many years are we celebrating in 2026?",
                options: ["One year", "Three years", "Two years"],
                answer: 2,
              },
            ].map((question, qIndex) => (
              <div className="quiz-question" key={question.q}>
                <p>
                  <span>{String(qIndex + 1).padStart(2, "0")}</span>{" "}
                  {question.q}
                </p>
                <div className="quiz-options">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={option}
                      className={`quiz-option ${quizAnswers[qIndex] === optionIndex ? "selected" : ""} ${quizSubmitted && optionIndex === question.answer ? "correct" : ""}`}
                      onClick={() => {
                        setQuizAnswers((current) => ({
                          ...current,
                          [qIndex]: optionIndex,
                        }));
                        setQuizSubmitted(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button
              className="pill-button quiz-submit"
              onClick={() => setQuizSubmitted(true)}
            >
              Check my answers ♡
            </button>
            {quizSubmitted && (
              <p className="quiz-result">
                You got{" "}
                {
                  Object.entries(quizAnswers).filter(
                    ([key, value]) => [0, 1, 2][Number(key)] === value,
                  ).length
                }{" "}
                out of 3!
                {Object.keys(quizAnswers).length < 3
                  ? " Answer all three for your final score."
                  : " No matter the score, you’re my favorite person."}
              </p>
            )}
          </div>
        </section>

        <section className="surprise-section">
          <div className="surprise-card">
            <p className="eyebrow">One last little thing</p>
            <h2>A surprise for you, Mau</h2>
            <p>
              There’s something I want you to remember, today and every day.
            </p>
            <button
              className="pill-button"
              onClick={() => setSurpriseOpen(true)}
            >
              Open your little surprise <Heart size={14} />
            </button>
          </div>
        </section>

        <footer className="footer">
          <Sparkles size={19} />
          <h2>
            Marion <span>♡</span> Mau
          </h2>
          <p>Two years down, forever to go.</p>
          <small>NOVEMBER 20, 2026</small>
        </footer>

        {activeLetter && (
          <div
            className="surprise-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={activeLetter.title}
            onClick={() => setActiveLetter(null)}
          >
            <article
              className="open-letter-note"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="surprise-close"
                onClick={() => setActiveLetter(null)}
                aria-label="Close letter"
              >
                <X size={19} />
              </button>
              <div className="surprise-big-heart">♡</div>
              <p className="eyebrow">A note from Marion</p>
              <h2>Open when {activeLetter.title.toLowerCase()}</h2>
              <p>{activeLetter.message}</p>
              <span className="surprise-sign">Always here, Marion ♡</span>
            </article>
          </div>
        )}

        {surpriseOpen && (
          <div
            className="surprise-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="A message for Mau"
            onClick={() => setSurpriseOpen(false)}
          >
            <div
              className="surprise-note"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="surprise-close"
                onClick={() => setSurpriseOpen(false)}
                aria-label="Close surprise"
              >
                <X size={19} />
              </button>
              <div className="surprise-big-heart">♡</div>
              <p className="eyebrow">Just for you</p>
              <h2>
                In every version
                <br />
                of my tomorrow,
                <br />
                <em>I hope it's you.</em>
              </h2>
              <p>
                Thank you for being my favorite person, Mau. I love you — today,
                tomorrow, and in all the little moments in between.
              </p>
              <span className="surprise-sign">Always, Marion ♡</span>
            </div>
          </div>
        )}

        {activePhoto && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Photo preview"
            onClick={() => setActivePhoto(null)}
          >
            <button
              className="lightbox-close"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
            >
              <X />
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              onClick={(event) => event.stopPropagation()}
            />
            <p>{activePhoto.caption}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
