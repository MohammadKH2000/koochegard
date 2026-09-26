import { useEffect, useState } from "react";
import { ArrowLeft, Check, DoorOpen, Heart, Leaf, Moon, ShieldCheck, Sun } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GirihBackground } from "@/components/backgrounds/girih";

const PROJECT_VALUES = [
  {
    icon: <ShieldCheck aria-hidden="true" />,
    label: "اطلاعات قابل‌پیگیری",
    title: "هر معرفی، یک راه به منبعش دارد.",
    description: "نام، تصویر و ویژگی‌های اقامتگاه به صفحه‌ی میزبان پیوند می‌خورند تا جزئیات را از خودشان بررسی کنی.",
  },
  {
    icon: <Leaf aria-hidden="true" />,
    label: "دیدن زندگی محلی",
    title: "خانه بخشی از خودِ سفر است.",
    description: "حیاط، محله و شیوه‌ی پذیرایی را کنار اطلاعات اقامت می‌بینیم؛ با احترام به تفاوت هر خانه.",
  },
  {
    icon: <Heart aria-hidden="true" />,
    label: "شفافیت در طراحی",
    title: "چیزی را که نمی‌دانیم، نمی‌سازیم.",
    description: "قیمت، ظرفیت و امتیاز مهمانان از خودمان ساخته نمی‌شود. برای شرایط روز، مستقیم به منبع میزبان می‌رویم.",
  },
];

const PROJECT_STEPS = [
  "مقصد را با جست‌وجوی فارسی و تقویم شمسی پیدا کن.",
  "عکس‌ها و امکانات ثبت‌شده‌ی خانه را مرور کن.",
  "برای قیمت، ظرفیت و هماهنگی روز با میزبان ارتباط بگیر.",
];
const HOME_URL = import.meta.env.BASE_URL;

export function AboutPage() {
  const [theme, setTheme] = useState<"paper" | "dark">(() =>
    typeof window !== "undefined" && window.localStorage.getItem("koochegard-theme") === "dark" ? "dark" : "paper",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#17231e" : "#f6f2e8");
    window.localStorage.setItem("koochegard-theme", theme);
  }, [theme]);

  return (
    <div id="top" className="site-shell about-shell" data-theme={theme}>
      <div className="top-note">
        <Heart aria-hidden="true" />
        <span>کوچه‌گرد؛ راهی به دلِ خانه‌ها</span>
        <span className="top-note__divider" />
        <span>درباره‌ی این پروژه</span>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <SiteLogo href={HOME_URL} />
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            <a href={`${HOME_URL}#stays`}>اقامتگاه‌ها</a>
            <a href={`${HOME_URL}#experiences`}>تجربه‌های جمعی</a>
            <a href={`${HOME_URL}#guide`}>راهنمای سفر</a>
          </nav>
          <div className="header-actions">
            <Button
              type="button"
              className="theme-toggle"
              size="icon"
              variant="ghost"
              aria-label={theme === "dark" ? "تغییر به تم روشن" : "تغییر به تم تیره"}
              aria-pressed={theme === "dark"}
              onClick={() => setTheme((current) => current === "dark" ? "paper" : "dark")}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
            <Button
              type="button"
              variant="brand"
              className="header-cta"
              onClick={() => window.location.assign(`${HOME_URL}#stays`)}
            >
              دیدن اقامتگاه‌ها
              <ArrowLeft aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main className="about-main">
        <section className="about-hero page-width" aria-labelledby="about-title">
          <GirihBackground className="about-hero__pattern" size={82} />
          <div className="about-hero__copy">
            <span className="section-kicker"><span /> قصه‌ی کوچه‌گرد</span>
            <h1 id="about-title">سفر را از درِ خانه‌ها شروع کنیم.</h1>
            <p>
              کوچه‌گرد یک راهنمای فارسی برای پیدا کردن اقامتگاه‌های واقعی و آشنایی با تجربه‌های محلی است. هدفش این است که پیش از سفر، تصویر روشن‌تری از خانه، محله و شیوه‌ی اقامت داشته باشی.
            </p>
            <div className="about-hero__actions">
              <a className="about-primary-link" href={`${HOME_URL}#stays`}>گشتن میان اقامتگاه‌ها <ArrowLeft aria-hidden="true" /></a>
              <span><Check aria-hidden="true" /> پیوند مستقیم به منبع میزبان</span>
            </div>
          </div>
          <div className="about-hero__seal" aria-hidden="true">
            <span className="about-hero__seal-mark"><DoorOpen /></span>
            <strong>کوچه‌گرد</strong>
            <small>نام واقعی · خانه‌ی واقعی</small>
            <i>✳</i>
          </div>
          <span className="about-hero__side-note" aria-hidden="true">یزد · تفت · راه‌های تازه</span>
        </section>

        <section className="about-values page-width" aria-labelledby="values-title">
          <div className="section-heading">
            <div>
              <span className="section-kicker"><span /> چیزی که برایمان مهم است</span>
              <h2 id="values-title">راهنمایی روشن، با حال‌وهوای محلی.</h2>
              <p>کوچه‌گرد به جای فهرست بلندِ ادعاها، از خانه‌ها و جزئیاتی می‌گوید که می‌شود منبعشان را دید.</p>
            </div>
          </div>
          <div className="about-value-grid">
            {PROJECT_VALUES.map((value, index) => (
              <Card className="about-value-card" key={value.label} role="article" aria-label={value.title}>
                <div className="about-value-card__top">
                  <span className="about-value-icon">{value.icon}</span>
                  <span className="about-value-number">
                    ۰{String(index + 1).replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])}
                  </span>
                </div>
                <span className="about-value-label">{value.label}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="about-method page-width" aria-labelledby="method-title">
          <div className="about-method__intro">
            <span className="section-kicker section-kicker--light"><span /> یک مسیر ساده</span>
            <h2 id="method-title">از کنجکاوی تا هماهنگی.</h2>
            <p>صفحه‌ی اصلی جست‌وجو را شروع می‌کند؛ رزرو و پرس‌وجوی شرایط روز با میزبان می‌ماند.</p>
            <a href={`${HOME_URL}#guide`} className="about-light-link">راهنمای رزرو را ببین <ArrowLeft aria-hidden="true" /></a>
          </div>
          <ol className="about-method__steps">
            {PROJECT_STEPS.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)])}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="about-transparency page-width" aria-labelledby="transparency-title">
          <span className="about-transparency__icon"><ShieldCheck aria-hidden="true" /></span>
          <div>
            <span className="section-kicker"><span /> یادداشت شفافیت</span>
            <h2 id="transparency-title">این یک نمونه‌ی معرفی است.</h2>
            <p>
              اطلاعات اقامتگاه‌ها به صفحه‌ی رسمی هر مجموعه پیوند دارد. بخش تجربه‌های جمعی در نسخه‌ی فعلی با داده‌های ساختگی برای نمایش ایده طراحی شده؛ هیچ رویداد، میزبان یا ظرفیتی رزرو نمی‌شود و اطلاعاتی برای دیگران فرستاده نمی‌شود.
            </p>
          </div>
          <Button variant="outline" onClick={() => window.location.assign(`${HOME_URL}#experiences`)}>
            دیدن نمونه‌ها <ArrowLeft aria-hidden="true" />
          </Button>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner page-width">
          <SiteLogo href={HOME_URL} />
          <p>راهنمای کوچک اقامتگاه‌های مستقل ایران؛ با پیوند مستقیم به منبع هر میزبان.</p>
          <a className="footer-copy" href={HOME_URL}>بازگشت به کوچه‌گرد <span>✳</span></a>
        </div>
      </footer>
    </div>
  );
}
