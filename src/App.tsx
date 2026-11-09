import { useState, type ReactNode } from "react";
import { Check, ChevronDown, Copy, Gift, Gamepad2, Radio, Trophy, TriangleAlert } from "lucide-react";
import { track } from "@vercel/analytics/react";
import { BOOKMAKER, LAST_UPDATED, OFFERS, PROMO_CODE, REGISTER_URL, SITE_NAME } from "../site.config.ts";
import { useCtaTracking } from "./tracking";

const OFFICIAL = {
  bonuses: "https://paripulse.com/en/bonus/rules",
  responsible: "https://paripulse.com/en/information/rules/31",
};

const TOC = [
  ["how-to-claim", "How to claim the bonus"],
  ["bonuses", "Bonuses and promotions"],
  ["offer", `What ${BOOKMAKER} offers`],
  ["payments", "Deposits and withdrawals"],
  ["review", "Pros and cons"],
  ["responsible", "Play responsibly"],
  ["faq", "FAQ"],
] as const;

const FAQ = [
  [`What is the ${BOOKMAKER} promo code?`, `The promo code is ${PROMO_CODE}. Enter it in the promo code field of the registration form.`],
  ["Where do I enter the code?", "In the registration form, in the field marked promo code (it can be optional, so it is easy to skip). Enter it before you finish signing up, because it usually can't be added afterwards."],
  ["Can I use the code on an existing account?", "Welcome offers are meant for new accounts. Check the bonus terms on the bookmaker's site to see what applies to you."],
  ["Do I have to deposit?", "Welcome offers normally need a qualifying first deposit. The minimum amount and the wagering rules are in the bonus terms, so read them before you accept the offer."],
  [`Is ${BOOKMAKER} available in my country?`, "Availability and offers depend on local law and on the bookmaker's own restrictions. Check the rules where you live and the terms before you register."],
  ["Is the bonus guaranteed?", "No. Offers and conditions are set by the bookmaker and can change at any time, so always read the current terms."],
] as const;

const FEATURES = [
  { icon: Trophy, title: "Sports betting", text: "Football, cricket, tennis, basketball, ice hockey, volleyball and more, before the match." },
  { icon: Radio, title: "Live betting", text: "Bet while the match is on, with a multi-match live view to follow several games." },
  { icon: Gamepad2, title: "Casino and live casino", text: "Slots, live casino, virtual sports, esports, bingo, TV games and toto." },
  { icon: Gift, title: "Promotions", text: "A first-deposit offer for new accounts and other promotions. Terms apply." },
] as const;

const tab = (on: boolean) =>
  `border-b-2 px-4 py-2 text-sm font-semibold transition ${on ? "border-brand text-brand" : "border-transparent text-slate-500 hover:text-slate-800"}`;

function Cta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a href={REGISTER_URL} rel="sponsored nofollow noopener" data-cta
      className={`inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3.5 font-bold text-white transition hover:bg-brand-hover active:scale-95 ${className}`}>
      {children}
    </a>
  );
}

const H2 = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2 id={id} className="mb-3 mt-12 scroll-mt-20 text-2xl font-black">{children}</h2>
);

export default function App() {
  useCtaTracking();
  const [copied, setCopied] = useState(false);
  const [which, setWhich] = useState<0 | 1>(0);
  const copy = async () => {
    try { await navigator.clipboard.writeText(PROMO_CODE); } catch { /* ignore */ }
    track("copy_promo_code");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const offer = OFFERS[which];
  const updated = new Date(LAST_UPDATED).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const p = "mb-4 leading-relaxed text-white/75";
  const li = "mb-2 leading-relaxed text-white/75";

  return (
    <div id="top" className="min-h-screen bg-bg text-white">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="text-lg font-black">BONUS<span className="text-brand-text">DNA</span></a>
          <nav className="hidden items-center gap-5 text-sm text-white/70 md:flex">
            <a href="#code" className="hover:text-white">Promo code</a>
            <a href="#how-to-claim" className="hover:text-white">How to claim</a>
            <a href="#bonuses" className="hover:text-white">Bonuses</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="rounded-md border border-white/20 px-1.5 py-0.5 text-xs font-bold text-white/70">18+</span>
            <Cta className="!px-4 !py-2 text-sm">Register</Cta>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-28 pt-8 md:pb-16">
        <h1 className="text-3xl font-black leading-tight sm:text-4xl">{BOOKMAKER} Promo Code {PROMO_CODE}</h1>
        <p className="mt-2 text-sm text-white/60">By the {SITE_NAME} editorial team · Updated {updated}</p>


        <section id="code" className="mt-6 overflow-hidden rounded-2xl bg-white text-slate-900 shadow-xl">
          <div className="border-b border-slate-200 px-5 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{BOOKMAKER} promo code</p>
            <div className="mt-2 flex">
              <button className={tab(which === 0)} onClick={() => setWhich(0)}>Sports</button>
              <button className={tab(which === 1)} onClick={() => setWhich(1)}>Casino</button>
            </div>
          </div>
          <div className="space-y-4 p-5">
            <div className="rounded-xl border border-slate-200 p-4">
              <p className="text-xs text-slate-500">{which === 0 ? "For sports bettors" : "For casino players"}</p>
              <p className="text-lg font-bold">{offer.name}</p>
              <p className="mt-1 text-sm text-slate-600">{offer.details || `See the current offer for your country on ${BOOKMAKER}.`}</p>
            </div>
            <button onClick={copy}
              className="flex w-full items-center justify-between rounded-xl border-2 border-dashed border-slate-300 px-4 py-3 transition hover:border-brand">
              <span className="text-xl font-black tracking-widest">{PROMO_CODE}</span>
              <span className="flex items-center gap-1 text-sm font-semibold text-brand">
                {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy</>}
              </span>
            </button>
            <Cta className="w-full">Go to {BOOKMAKER}</Cta>
            <p className="text-xs text-slate-500">Use the button above and enter the code when you register so the offer is linked to your account.</p>
          </div>
          <p className="border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500">
            T&amp;Cs: offers, eligibility, minimum deposit and wagering rules are set by {BOOKMAKER}, can change, and apply
            in full. 18+. <a className="underline" href={OFFICIAL.bonuses} target="_blank" rel="noopener nofollow">Read the official bonus terms</a>.
          </p>
        </section>

        <div className="mt-6 flex gap-3 rounded-xl border border-gold/60 bg-gold/10 p-4 text-sm">
          <TriangleAlert className="mt-0.5 shrink-0 text-gold" size={20} />
          <p className="text-white/80">
            <b>18+ only.</b> Offers differ by country, change often and come with wagering rules. Check the current terms
            on {BOOKMAKER} before you deposit. Gambling can be addictive, so play responsibly.
          </p>
        </div>

        <p className={`${p} mt-8`}>
          The {BOOKMAKER} promo code is <b className="text-white">{PROMO_CODE}</b>. Enter it in the promo code field when you
          register to apply the first-deposit offer shown for your country. This guide shows where to enter the code, what{" "}
          {BOOKMAKER} offers and what to check in the terms before you accept a bonus.
        </p>

        {OFFERS.length > 0 && (
          <div className="mb-8 overflow-x-auto rounded-2xl border border-white/10 bg-surface">
            <table className="w-full min-w-[30rem] text-left text-sm">
              <thead className="text-white/60"><tr><th className="p-4">Offer</th><th className="p-4">Details</th><th className="p-4">Promo code</th></tr></thead>
              <tbody>
                {OFFERS.map((o) => (
                  <tr key={o.name} className="border-t border-white/10">
                    <td className="p-4">{o.name}</td>
                    <td className="p-4 text-white/70">{o.details || "See current offer"}</td>
                    <td className="p-4 font-bold">{PROMO_CODE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <nav className="rounded-2xl border border-white/10 bg-panel p-5" aria-label="Contents">
          <p className="mb-3 font-bold">Contents</p>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-white/75">
            {TOC.map(([id, label]) => <li key={id}><a href={`#${id}`} className="hover:text-brand-text">{label}</a></li>)}
          </ol>
        </nav>

        <H2 id="how-to-claim">How to claim the bonus</H2>
        <ol className="list-decimal pl-6">
          <li className={li}>Tap the <b>Register</b> button on this page. It opens {BOOKMAKER} through our link.</li>
          <li className={li}>Choose how you want to sign up. The options shown depend on your country.</li>
          <li className={li}>Enter your details accurately: your name, date of birth and contact details. {BOOKMAKER} has a know-your-customer policy, so real details avoid problems when you withdraw.</li>
          <li className={li}>Type <b className="text-white">{PROMO_CODE}</b> in the promo code field.</li>
          <li className={li}>Finish registering. If the offer needs a first deposit, read the bonus terms before you accept it.</li>
        </ol>

        <H2 id="bonuses">Bonuses and promotions</H2>
        <h3 className="mb-2 mt-6 text-lg font-bold">Sports</h3>
        <p className={p}>New accounts can claim a first-deposit bonus on sports betting. The amount, the minimum deposit and the wagering rules differ by country and by period, so check the details for your country in the table above and on the {BOOKMAKER} bonus page.</p>
        <h3 className="mb-2 mt-6 text-lg font-bold">Casino</h3>
        <p className={p}>Casino players can get a separate welcome offer, often spread over more than one deposit. Free spins and bonus money usually have their own wagering rules and a list of games they apply to.</p>
        <h3 className="mb-2 mt-6 text-lg font-bold">Existing players</h3>
        <p className={p}>{BOOKMAKER} also runs other promotions for existing accounts. They change, so look at its <a className="text-brand-text underline" href={OFFICIAL.bonuses} target="_blank" rel="noopener nofollow">promotions page</a> for what is live now.</p>
        <h3 className="mb-2 mt-6 text-lg font-bold">No-deposit bonus</h3>
        <p className={p}>We don't list a no-deposit offer. Be careful with any site that promises one without showing the terms.</p>

        <H2 id="offer">What {BOOKMAKER} offers</H2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-surface p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand-text"><Icon size={20} /></span>
              <p className="font-bold">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{text}</p>
            </div>
          ))}
        </div>
        <p className={`${p} mt-4`}>The site is available in many languages, including Kiswahili.</p>

        <H2 id="payments">Deposits and withdrawals</H2>
        <p className={p}>Payment methods depend on your country and are shown in your account's cashier after you register. Check the available options, limits and any fees there before you deposit. You may be asked to verify your identity before a withdrawal.</p>

        <H2 id="review">Pros and cons</H2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-surface p-5">
            <p className="mb-2 font-bold text-green-400">Pros</p>
            <ul className="list-disc pl-5 text-sm text-white/75">
              <li className="mb-1.5">Wide choice of sports and casino games</li>
              <li className="mb-1.5">Live betting and a multi-match live view</li>
              <li className="mb-1.5">Available in many languages, including Kiswahili</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-surface p-5">
            <p className="mb-2 font-bold text-brand-text">Cons</p>
            <ul className="list-disc pl-5 text-sm text-white/75">
              <li className="mb-1.5">Bonuses come with wagering requirements</li>
              <li className="mb-1.5">Offers and availability differ by country</li>
              <li className="mb-1.5">We don't list a no-deposit bonus</li>
            </ul>
          </div>
        </div>

        <H2 id="responsible">Play responsibly</H2>
        <ul className="list-disc pl-6">
          <li className={li}>Only bet money you can afford to lose.</li>
          <li className={li}>Set a deposit limit before you start and stick to it.</li>
          <li className={li}>Never chase losses and never borrow to gamble.</li>
          <li className={li}>Take breaks, and stop if gambling stops being fun.</li>
        </ul>
        <p className={p}>Read the bookmaker's <a className="text-brand-text underline" href={OFFICIAL.responsible} target="_blank" rel="noopener nofollow">responsible gaming policy</a>.</p>

        <H2 id="faq">FAQ</H2>
        <div className="space-y-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-white/10 bg-white/5 p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
                {q}<ChevronDown size={18} className="shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-panel p-6 text-center">
          <p className="mb-4 text-lg font-bold">Ready to register with code {PROMO_CODE}?</p>
          <Cta>Go to {BOOKMAKER}</Cta>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-white/10 bg-deep/95 px-4 py-3 backdrop-blur md:hidden">
        <p className="text-sm text-white/70">Promo code <b className="text-white">{PROMO_CODE}</b></p>
        <Cta className="!px-5 !py-2.5 text-sm">Go to {BOOKMAKER}</Cta>
      </div>

      <footer className="border-t border-white/10 bg-deep px-4 py-8 text-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        <p className="mx-auto mt-2 max-w-xl">
          18+ only. Gamble responsibly. {SITE_NAME} is an independent affiliate and is not {BOOKMAKER}. This site contains
          affiliate links; we may earn a commission at no extra cost to you. Betting laws vary by country, so check the
          rules where you live.
        </p>
      </footer>
    </div>
  );
}
