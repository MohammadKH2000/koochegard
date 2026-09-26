import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  DoorOpen,
  ExternalLink,
  Heart,
  House,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { Combobox } from "@/components/ui/combobox";
import { SiteLogo } from "@/components/site-logo";
import { DateRangePicker, formatJalaliRange } from "@/components/ui/date-range-picker";
import type { DateRange } from "@/components/ui/date-range-picker";
import { Sheet } from "@/components/ui/sheet";
import { Stepper } from "@/components/ui/stepper";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { Reveal } from "@/components/animations/reveal";
import { GirihBackground } from "@/components/backgrounds/girih";
import { fa } from "@/lib/utils";

type Stay = {
  id: string;
  name: string;
  city: string;
  neighborhood: string;
  description: string;
  image: string;
  imageAlt: string;
  sourceName: string;
  sourceHref: string;
  bookingHref: string;
  label: string;
  details: string[];
  bookingNote: string;
};

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const STAYS: Stay[] = [
  {
    id: "kohan",
    name: "هتل سنتی کوهان",
    city: "یزد",
    neighborhood: "خیابان امام · کوچه‌ی ۴۰ · کنار موزه‌ی سکه",
    description: "هتل خانوادگی در بافت تاریخی یزد؛ با حیاط سنتی، کافه و رستوران.",
    image: publicAsset("images/kohan-courtyard.jpg"),
    imageAlt: "حیاط گل‌کاری‌شده‌ی هتل سنتی کوهان با آب‌نما و تخت‌های چوبی",
    sourceName: "گالری رسمی هتل کوهان",
    sourceHref: "https://kohanhotel.ir/en/gallery-2/",
    bookingHref: "https://kohanhotel.ir/en/",
    label: "در بافت تاریخی",
    details: ["حیاط سنتی", "کافه و رستوران", "رزرو از وب‌سایت هتل"],
    bookingNote: "نوع اتاق و شرایط رزرو را در وب‌سایت رسمی هتل بررسی کن.",
  },
  {
    id: "moshir",
    name: "هتل باغ مشیرالممالک",
    city: "یزد",
    neighborhood: "بلوار مشیر · خیابان انقلاب",
    description: "هتل باغی در یزد؛ بعضی اتاق‌ها از بالکن به باغ مرکزی دید دارند.",
    image: publicAsset("images/moshir-courtyard.jpg"),
    imageAlt: "نمای ورودی و حوض آبی در حیاط هتل باغ مشیرالممالک یزد",
    sourceName: "وب‌سایت رسمی هتل مشیرالممالک",
    sourceHref: "https://hotelgardenmoshir.com/en/portfolio/room-2/",
    bookingHref: "https://hotelgardenmoshir.com/en/",
    label: "هتل باغی",
    details: ["باغ و حوض مرکزی", "اتاق‌های رو به باغ", "رستوران و کافه"],
    bookingNote: "تصاویر، امکانات اتاق و راه ارتباط را از وب‌سایت خود هتل ببین.",
  },
  {
    id: "narenjestan",
    name: "خانه‌ی سنتی نارنجستان",
    city: "یزد",
    neighborhood: "کوچه‌ی شهید صدوقی · خیابان امام",
    description: "خانه‌ای قاجاری که در ۲۰۱۵ مرمت شده؛ سه اتاق رو به حیاط مرکزی و حوض آبی.",
    image: publicAsset("images/narenjestan-courtyard.png"),
    imageAlt: "حیاط مرکزی خانه‌ی سنتی نارنجستان در یزد با حوض آبی و ایوان‌های آجری",
    sourceName: "وب‌سایت رسمی نارنجستان",
    sourceHref: "https://narenjestanhouse.com/about-us-2/",
    bookingHref: "https://narenjestanhouse.com/",
    label: "خانه‌ی مرمت‌شده",
    details: ["۳ اتاق", "حیاط و حوض", "آشپزخانه‌ی مشترک"],
    bookingNote: "اطلاعات اقامت و راه تماس با میزبان در وب‌سایت رسمی خانه قرار دارد.",
  },
  {
    id: "nartitee",
    name: "اقامتگاه بوم‌گردی نار تی‌تی",
    city: "تفت",
    neighborhood: "حدود ۲۰ کیلومتری یزد",
    description: "اقامتی ساده در خانه‌ای محلی؛ با باغ میوه و فضاهای مشترک.",
    image: publicAsset("images/nartitee-courtyard.jpg"),
    imageAlt: "حیاط اقامتگاه بوم‌گردی نار تی‌تی با دیوار کاهگلی و نشیمن‌های چوبی",
    sourceName: "وب‌سایت رسمی نار تی‌تی",
    sourceHref: "https://nartitee.ir/gallery/",
    bookingHref: "https://nartitee.ir/booking/",
    label: "بوم‌گردی در تفت",
    details: ["باغ میوه", "تشک سنتی و چند تخت", "سرویس مشترک"],
    bookingNote: "رزرو از راه تماس مستقیم با میزبان انجام می‌شود؛ جزئیات در صفحه‌ی رسمی رزرو است.",
  },
];

const CITIES = ["همه‌ی مقصدها", ...Array.from(new Set(STAYS.map((stay) => stay.city)))];
const EMPTY_RANGE = (): DateRange => ({ from: null, to: null });
const TODAY = () => new Date();

const SAMPLE_EXPERIENCES = [
  {
    id: "yazd-walk",
    city: "یزد",
    title: "قدم‌زدن و دیدن جزئیات کوچه‌ها",
    category: "گشت و گفت‌وگو",
    description: "یک قرار گروهی نمونه برای گشت آرام و یادداشت‌برداری از بافت شهر.",
    duration: "حدود ۹۰ دقیقه · نمونه",
    interestCount: 12,
    icon: <MapPin aria-hidden="true" />,
  },
  {
    id: "taft-table",
    city: "تفت",
    title: "قصه و چای در حیاط",
    category: "دورهمی محلی",
    description: "نمونه‌ای از یک جمع کوچک برای هم‌صحبتی و آشنایی با رسم‌های منطقه.",
    duration: "یک عصر · نمونه",
    interestCount: 8,
    icon: <Users aria-hidden="true" />,
  },
  {
    id: "meybod-clay",
    city: "میبد",
    title: "آشنایی با سفال و نقش‌های کویری",
    category: "یادگیری و ساختن",
    description: "کارت نمایشی یک کارگاه دست‌ساز؛ میزبان و زمان‌بندی واقعی ندارد.",
    duration: "حدود ۲ ساعت · نمونه",
    interestCount: 10,
    icon: <Sparkles aria-hidden="true" />,
  },
  {
    id: "ardakan-stories",
    city: "اردکان",
    title: "گفت‌وگوی سفر و روایت محلی",
    category: "هم‌سفری و یادگیری",
    description: "نمونه‌ای برای دیدار مسافران و تبادل تجربه‌های سفر در کویر.",
    duration: "حدود ۶۰ دقیقه · نمونه",
    interestCount: 6,
    icon: <Leaf aria-hidden="true" />,
  },
];

function PhotoCredit({
  href,
  source,
}: {
  href: string;
  source: string;
}) {
  return (
    <a
      className="photo-credit"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={"منبع تصویر: " + source}
      title={"منبع تصویر: " + source}
    >
      تصویر: {source}
    </a>
  );
}

function PageContent() {
  const { toast } = useToast();
  const [theme, setTheme] = useState<"paper" | "dark">(() =>
    typeof window !== "undefined" && window.localStorage.getItem("koochegard-theme") === "dark" ? "dark" : "paper",
  );
  const [searchCity, setSearchCity] = useState(CITIES[0]);
  const [searchRange, setSearchRange] = useState<DateRange>(EMPTY_RANGE);
  const [guestCount, setGuestCount] = useState(2);
  const [activeCity, setActiveCity] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [interestedExperiences, setInterestedExperiences] = useState<string[]>([]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme === "dark" ? "dark" : "light";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#17231e" : "#f6f2e8");
    window.localStorage.setItem("koochegard-theme", theme);
  }, [theme]);

  const filteredStays = useMemo(
    () => STAYS.filter((stay) => !activeCity || stay.city === activeCity),
    [activeCity],
  );

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveCity(searchCity === CITIES[0] ? "" : searchCity);
    toast({
      title: "اقامتگاه‌های واقعی پیدا شدند",
      description: `${searchCity === CITIES[0] ? "همه‌ی مقصدها" : searchCity}${searchRange.from && searchRange.to ? " · " + formatJalaliRange(searchRange) : ""} — قیمت و ظرفیت را مستقیم از میزبان بپرس.`,
      variant: "success",
    });
    document.getElementById("stays")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openStayDetails(stay: Stay) {
    setSelectedStay(stay);
    setDetailsOpen(true);
  }

  function toggleSaved(stay: Stay) {
    const isSaved = saved.includes(stay.id);
    setSaved((items) => (isSaved ? items.filter((id) => id !== stay.id) : [...items, stay.id]));
    toast({
      title: isSaved ? "از نشان‌شده‌ها برداشته شد" : "برای بعد نشان شد",
      description: stay.name + " · " + stay.city,
      variant: "success",
    });
  }

  function toggleExperienceInterest(id: string, title: string) {
    const isInterested = interestedExperiences.includes(id);
    setInterestedExperiences((items) => (isInterested ? items.filter((item) => item !== id) : [...items, id]));
    toast({
      title: isInterested ? "از علاقه‌مندی‌ها برداشته شد" : "به علاقه‌مندی‌های نمونه اضافه شد",
      description: title + " · این بخش فقط نمایشی است.",
      variant: "success",
    });
  }

  const nartiteeGallery: ReactNode[] = [
    { image: "/images/nartitee-courtyard.jpg", alt: "حیاط ساده‌ی نار تی‌تی با دیوار کاهگلی و نشیمن‌های چوبی", caption: "حیاط و دورهم‌نشینی" },
    { image: "/images/nartitee-pomegranate-tree.jpg", alt: "اناری روی شاخه‌ی درخت در باغ نار تی‌تی", caption: "باغ میوه‌ی تفت" },
    { image: "/images/nartitee-interior.jpg", alt: "اتاقی در اقامتگاه نار تی‌تی با پنجره‌ی آبی و خمره‌ی سفالی", caption: "جزئیات خانه" },
  ].map((photo) => (
    <Card className="gallery-card" key={photo.image}>
      <figure>
        <img src={photo.image} alt={photo.alt} loading="lazy" />
        <figcaption>{photo.caption}<PhotoCredit href="https://nartitee.ir/gallery/" source="وب‌سایت رسمی نار تی‌تی" /></figcaption>
      </figure>
    </Card>
  ));

  return (
    <div id="top" className="site-shell" data-theme={theme}>
      <div className="top-note">
        <Sparkles aria-hidden="true" />
        <span>اقامتگاه واقعی، با نام و تصویر همان میزبان</span>
        <span className="top-note__divider" />
        <span>یزد و تفت · رزرو مستقیم</span>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <SiteLogo />
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            <a href="#stays">اقامتگاه‌ها</a>
            <a href={`${import.meta.env.BASE_URL}about.html`}>درباره‌ی ما</a>
            <a href="#experiences">تجربه‌های جمعی</a>
            <a href="#story">قصه‌ی یک اقامت</a>
            <a href="#guide">راهنمای رزرو</a>
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
              className="header-cta"
              variant="brand"
              onClick={() => document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" })}
            >
              دیدن اقامتگاه‌ها
              <ArrowLeft aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="mobile-menu-trigger"
              aria-label="باز کردن منو"
              onClick={() => setMobileNavOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-pattern" aria-hidden="true">
            <GirihBackground size={78} />
          </div>
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <Badge variant="brand" className="eyebrow">
                <span className="eyebrow-dot" />
                معرفی اقامتگاه‌های واقعی در یزد و تفت
              </Badge>
              <h1 id="hero-title">
                چند شب، مهمانِ
                <br />
                یک <em>خانه‌ی واقعی</em>
                <br />
                در یزد و تفت باش.
              </h1>
              <p className="hero-description">
                عکس‌ها و نام اقامتگاه‌ها از صفحه‌های خود میزبان آمده‌اند. ویژگی‌ها را بخوان، مقصد را پیدا کن و برای قیمت و ظرفیت روز با خودشان هماهنگ شو.
              </p>
              <div className="hero-actions">
                <a href="#stays" className="text-link">
                  دیدن اقامتگاه‌ها
                  <ArrowLeft aria-hidden="true" />
                </a>
                <span className="hero-note">
                  <CheckCircle2 aria-hidden="true" />
                  <span>پیوند به منبع رسمی هر خانه</span>
                </span>
              </div>
              <div className="hero-proof">
                <span><House aria-hidden="true" /> خانه‌ی سنتی</span>
                <span><Leaf aria-hidden="true" /> بوم‌گردی</span>
                <span><MapPin aria-hidden="true" /> یزد و تفت</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-photo-frame">
                <img
                  className="hero-photo"
                  src={publicAsset("images/narenjestan-courtyard.png")}
                  alt="حیاط واقعی خانه‌ی سنتی نارنجستان در یزد؛ حوض آبی و ایوان‌های آجریِ اقامتگاه"
                />
                <div className="hero-photo-shade" />
                <div className="hero-photo-caption">
                  <span className="caption-pin"><MapPin aria-hidden="true" /></span>
                  <span>
                    <strong>یزد</strong>
                    <small>خانه‌ی سنتی نارنجستان</small>
                  </span>
                </div>
                <PhotoCredit
                  href="https://narenjestanhouse.com/about-us-2/"
                  source="وب‌سایت رسمی خانه‌ی نارنجستان"
                />
              </div>
              <div className="hero-mini-photo">
                <img src={publicAsset("images/nartitee-interior.jpg")} alt="اتاقی در اقامتگاه نار تی‌تی با پنجره‌ی آبی و خمره‌ی سفالی" />
                <div className="mini-photo-seal">
                  <House aria-hidden="true" />
                </div>
                <PhotoCredit
                  href="https://nartitee.ir/gallery/"
                  source="وب‌سایت رسمی نار تی‌تی"
                />
              </div>
              <div className="hero-price-note">
                <span className="price-note-icon"><House aria-hidden="true" /></span>
                <span className="price-note-copy">
                  <small>خانه‌ی سنتی نارنجستان</small>
                  <strong>۳ اتاق · حیاط مرکزی</strong>
                </span>
                <span className="price-note-flower" aria-hidden="true">✳</span>
              </div>
              <div className="hero-vertical-note" aria-hidden="true">
                <span />
                یزد · خانه‌ی واقعی برای اقامت
              </div>
            </div>
          </div>

          <form className="search-panel page-width" onSubmit={handleSearch}>
            <div className="search-field search-field--city">
              <label className="field-label" htmlFor="destination-search">
                <MapPin aria-hidden="true" />
                مقصد
              </label>
              <Combobox
                id="destination-search"
                aria-label="مقصد سفر"
                options={CITIES}
                value={searchCity}
                onChange={setSearchCity}
                placeholder="مثلاً یزد"
                emptyText="شهری با این نام پیدا نشد"
                className="search-combobox"
              />
            </div>
            <div className="search-field search-field--date">
              <span className="field-label">
                <CalendarIcon />
                تاریخ سفر
              </span>
              <DateRangePicker
                value={searchRange}
                onChange={setSearchRange}
                min={TODAY()}
                months={1}
                presets={[]}
                placeholder="رفت و برگشت را انتخاب کن"
                className="search-date-picker"
              />
            </div>
            <div className="search-field search-field--guests">
              <span className="field-label">
                <Users aria-hidden="true" />
                هم‌سفرها
              </span>
              <div className="guest-control">
                <button
                  type="button"
                  aria-label="کم کردن تعداد هم‌سفرها"
                  disabled={guestCount <= 1}
                  onClick={() => setGuestCount((count) => Math.max(1, count - 1))}
                >
                  <Minus aria-hidden="true" />
                </button>
                <span>{fa(guestCount)} نفر</span>
                <button
                  type="button"
                  aria-label="زیاد کردن تعداد هم‌سفرها"
                  disabled={guestCount >= 8}
                  onClick={() => setGuestCount((count) => Math.min(8, count + 1))}
                >
                  <Plus aria-hidden="true" />
                </button>
              </div>
            </div>
            <Button type="submit" variant="brand" size="lg" className="search-submit">
              <Search aria-hidden="true" />
              دیدن اقامتگاه‌ها
            </Button>
          </form>
        </section>

        <section className="stays-section page-width" id="stays" aria-labelledby="stays-title">
          <Reveal>
            <div className="section-heading stays-heading">
              <div>
                <span className="section-kicker"><span /> اقامتگاه‌های واقعی</span>
                <h2 id="stays-title">نام و عکس، از خودِ میزبان.</h2>
                <p>چهار اقامتگاه واقعی در یزد و تفت؛ قیمت و ظرفیت روز را از منبع اصلی بررسی کن.</p>
              </div>
              <span className="verified-note"><CheckCircle2 aria-hidden="true" /> پیوند به صفحه‌ی رسمی</span>
            </div>
          </Reveal>

          <div className="stay-toolbar">
            <SegmentedControl
              className="city-tabs"
              aria-label="فیلتر بر اساس مقصد"
              value={activeCity || "همه"}
              onChange={(city) => setActiveCity(city === "همه" ? "" : city)}
              options={["همه", ...Array.from(new Set(STAYS.map((stay) => stay.city)))].map((city) => ({
                value: city,
                label: city === "همه" ? <>{city}<span>{fa(STAYS.length)}</span></> : city,
              }))}
            />
            <span className="results-count" aria-live="polite">
              {fa(filteredStays.length)} اقامتگاه با منبع مستقیم
            </span>
          </div>

          {filteredStays.length > 0 ? (
            <div className="stays-grid">
              {filteredStays.map((stay, index) => {
                const isSaved = saved.includes(stay.id);
                return (
                  <Reveal key={stay.id} delay={index * 100}>
                    <Card className="stay-card">
                      <div className="stay-image-wrap">
                        <img src={stay.image} alt={stay.imageAlt} loading="lazy" />
                        <Badge variant="brand" className="stay-label">{stay.label}</Badge>
                        <button
                          type="button"
                          className={isSaved ? "favorite-button favorite-button--saved" : "favorite-button"}
                          aria-label={isSaved ? "برداشتن از نشان‌شده‌ها" : "نشان کردن اقامتگاه"}
                          aria-pressed={isSaved}
                          onClick={() => toggleSaved(stay)}
                        >
                          <Heart aria-hidden="true" />
                        </button>
                        <PhotoCredit href={stay.sourceHref} source={stay.sourceName} />
                      </div>
                      <CardContent className="stay-card__content">
                        <div className="stay-title-row">
                          <div>
                            <div className="stay-location"><MapPin aria-hidden="true" /> {stay.city} <i /> {stay.neighborhood}</div>
                            <h3>{stay.name}</h3>
                          </div>
                        </div>
                        <p className="stay-description">{stay.description}</p>
                        <div className="stay-detail-tags">
                          {stay.details.map((detail) => <span key={detail}><Check aria-hidden="true" /> {detail}</span>)}
                        </div>
                        <div className="stay-card__footer">
                          <a className="stay-source-link" href={stay.sourceHref} target="_blank" rel="noreferrer">
                            منبع و تصاویر <ExternalLink aria-hidden="true" />
                          </a>
                          <Button variant="outline" size="md" className="stay-book-button" onClick={() => openStayDetails(stay)}>
                            جزئیات اقامت
                            <ArrowLeft aria-hidden="true" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <div className="no-results">
              <House aria-hidden="true" />
              <strong>در این مقصد هنوز اقامتگاهی اضافه نکرده‌ایم.</strong>
              <span>فعلاً فقط خانه‌هایی را نشان می‌دهیم که منبع مشخص دارند.</span>
              <Button variant="outline" onClick={() => setActiveCity("")}>دیدن همه‌ی اقامتگاه‌ها</Button>
            </div>
          )}

          <div className="image-note">
            نام، جزئیات و عکس هر کارت به وب‌سایت خودِ اقامتگاه پیوند دارد. این صفحه قیمت، ظرفیت یا امتیاز مهمانان را حدس نمی‌زند.
          </div>
        </section>

        <Reveal>
          <section className="story-section page-width" id="story" aria-labelledby="story-title">
            <div className="story-copy">
              <span className="section-kicker section-kicker--light"><span /> یک اقامت واقعی · تفت</span>
              <h2 id="story-title">نار تی‌تی؛ مکثی میان باغ‌های تفت.</h2>
              <p>
                این خانه‌ی بوم‌گردی حدود ۲۰ کیلومتر از یزد فاصله دارد. چند تخت در کنار تشک‌های سنتی، فضای جمعی و سرویس‌های مشترک دارد؛ جزئیاتی که پیش از هماهنگی بهتر است بدانی.
              </p>
              <a href="https://nartitee.ir/booking/" className="story-link" target="_blank" rel="noreferrer">
                دیدن راه رزرو رسمی
                <ExternalLink aria-hidden="true" />
              </a>
              <div className="story-ornament" aria-hidden="true">
                <span>تفت</span><i /><span>۲۰ کیلومتر</span><i /><span>یزد</span>
              </div>
            </div>
            <div className="nartitee-gallery-wrap">
              <Carousel className="nartitee-gallery" slideWidth={0.88} showDots>
                {nartiteeGallery}
              </Carousel>
              <span className="story-sun" aria-hidden="true">✳</span>
            </div>
          </section>
        </Reveal>

        <section className="promise-strip page-width" aria-label="چطور اطلاعات را نشان می‌دهیم">
          <div className="promise-item">
            <span className="promise-icon"><ShieldCheck aria-hidden="true" /></span>
            <span><strong>نام و تصویر قابل‌پیگیری</strong><small>پیوند مستقیم به صفحه‌ی همان اقامتگاه</small></span>
          </div>
          <div className="promise-item">
            <span className="promise-icon"><Leaf aria-hidden="true" /></span>
            <span><strong>جزئیات کاربردی</strong><small>نوع اقامت، موقعیت و امکانات ثبت‌شده</small></span>
          </div>
          <div className="promise-item">
            <span className="promise-icon"><Clock3 aria-hidden="true" /></span>
            <span><strong>هماهنگی مستقیم</strong><small>قیمت و موجودی را از میزبان بپرس</small></span>
          </div>
        </section>

        <section className="experiences-section page-width" id="experiences" aria-labelledby="experiences-title">
          <Reveal>
            <div className="section-heading experiences-heading">
              <div>
                <span className="section-kicker"><span /> آدم‌ها و تجربه‌ها</span>
                <h2 id="experiences-title">سفر را با هم یاد بگیریم.</h2>
                <p>قرارهای کوچک برای گشتن، گفت‌وگو و آموختن؛ این کارت‌ها فقط نمونه‌ی طراحی هستند.</p>
              </div>
              <span className="mock-data-pill"><Sparkles aria-hidden="true" /> داده‌ی نمایشی</span>
            </div>
          </Reveal>
          <div className="experience-grid">
            {SAMPLE_EXPERIENCES.map((experience, index) => {
              const isInterested = interestedExperiences.includes(experience.id);
              const interestCount = experience.interestCount + (isInterested ? 1 : 0);
              return (
                <Reveal key={experience.id} delay={index * 70}>
                  <Card className="experience-card">
                    <div className="experience-card__top">
                      <span className="experience-icon">{experience.icon}</span>
                      <span className="mock-data-pill mock-data-pill--small">نمونه</span>
                    </div>
                    <span className="experience-category">{experience.category} · {experience.city}</span>
                    <h3>{experience.title}</h3>
                    <p>{experience.description}</p>
                    <div className="experience-meta">
                      <span><Clock3 aria-hidden="true" /> {experience.duration}</span>
                      <span><Users aria-hidden="true" /> {fa(interestCount)} علاقه‌مند در نمونه</span>
                    </div>
                    <Button
                      variant={isInterested ? "brand" : "outline"}
                      className="experience-interest"
                      aria-pressed={isInterested}
                      onClick={() => toggleExperienceInterest(experience.id, experience.title)}
                    >
                      {isInterested ? "علاقه‌مند شدم" : "علاقه‌مندم"}
                      <Heart aria-hidden="true" />
                    </Button>
                  </Card>
                </Reveal>
              );
            })}
          </div>
          <p className="experience-disclaimer"><ShieldCheck aria-hidden="true" /> عنوان‌ها، زمان‌ها و شمار علاقه‌مندان ساختگی‌اند. این دکمه فقط در همین صفحه واکنش نمایشی دارد؛ ثبت‌نام یا ارسال اطلاعات انجام نمی‌شود.</p>
        </section>

        <section className="guestbook-section page-width" id="guide" aria-labelledby="guide-title">
          <Reveal>
            <div className="section-heading guestbook-heading">
              <div>
                <span className="section-kicker"><span /> ساده و روشن</span>
                <h2 id="guide-title">از جست‌وجو تا هماهنگی.</h2>
                <p>فرم این صفحه فقط برای پیدا کردن مقصد است؛ رزرو نهایی با خود اقامتگاه انجام می‌شود.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="guide-card">
              <Stepper
                current={0}
                steps={[
                  { label: "مقصد و تاریخ", description: "با تقویم شمسی" },
                  { label: "بررسی اقامتگاه", description: "امکانات و موقعیت" },
                  { label: "تماس با میزبان", description: "قیمت و ظرفیت روز" },
                ]}
                className="guide-stepper"
              />
              <p><ShieldCheck aria-hidden="true" /> تاریخ و تعداد هم‌سفرها در این پیش‌نمایش ذخیره یا برای میزبان ارسال نمی‌شوند.</p>
            </div>
          </Reveal>
        </section>

        <section className="closing-cta page-width">
          <GirihBackground size={62} className="closing-pattern" />
          <div className="closing-mark" aria-hidden="true"><DoorOpen /></div>
          <div>
            <span>نام واقعی · تصویر واقعی · هماهنگی مستقیم</span>
            <h2>خانه‌ی بعدی را با خیال روشن انتخاب کن.</h2>
          </div>
          <Button variant="brand" size="lg" onClick={() => document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" })}>
            دیدن اقامتگاه‌ها
            <ArrowLeft aria-hidden="true" />
          </Button>
          <span className="closing-flower" aria-hidden="true">✳</span>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner page-width">
          <SiteLogo />
          <p>راهنمای کوچک اقامتگاه‌های مستقل ایران؛ با پیوند مستقیم به منبع هر میزبان.</p>
          <div className="footer-copy">
          <a href={`${import.meta.env.BASE_URL}about.html`}>درباره‌ی کوچه‌گرد</a>
            <span>قیمت و ظرفیت را از اقامتگاه بپرس ✳</span>
          </div>
        </div>
      </footer>

      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen} title="کوچه‌گرد" side="start" className="mobile-nav-sheet">
        <nav className="mobile-nav" aria-label="ناوبری موبایل">
          <a href="#stays" onClick={() => setMobileNavOpen(false)}>اقامتگاه‌ها <ArrowLeft aria-hidden="true" /></a>
          <a href={`${import.meta.env.BASE_URL}about.html`}>درباره‌ی ما <ArrowLeft aria-hidden="true" /></a>
          <a href="#experiences" onClick={() => setMobileNavOpen(false)}>تجربه‌های جمعی <ArrowLeft aria-hidden="true" /></a>
          <a href="#story" onClick={() => setMobileNavOpen(false)}>قصه‌ی نار تی‌تی <ArrowLeft aria-hidden="true" /></a>
          <a href="#guide" onClick={() => setMobileNavOpen(false)}>راهنمای رزرو <ArrowLeft aria-hidden="true" /></a>
        </nav>
        <p className="mobile-nav-note">اطلاعات را از منبع رسمی هر میزبان بررسی کن.</p>
      </Sheet>

      <Sheet
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        title={selectedStay ? selectedStay.name : "جزئیات اقامتگاه"}
        side="start"
        className="stay-detail-sheet"
      >
        {selectedStay && (
          <div className="stay-detail-content">
            <figure className="detail-photo">
              <img src={selectedStay.image} alt={selectedStay.imageAlt} />
              <PhotoCredit href={selectedStay.sourceHref} source={selectedStay.sourceName} />
            </figure>
            <div className="detail-location"><MapPin aria-hidden="true" /> {selectedStay.city} · {selectedStay.neighborhood}</div>
            <h3>{selectedStay.name}</h3>
            <p className="detail-description">{selectedStay.description}</p>
            <ul className="detail-facts">
              {selectedStay.details.map((detail) => <li key={detail}><Check aria-hidden="true" /> {detail}</li>)}
            </ul>
            <div className="detail-source-note"><ShieldCheck aria-hidden="true" /> {selectedStay.bookingNote}</div>
            <p className="detail-disclaimer">قیمت و ظرفیت لحظه‌ای در کوچه‌گرد نمایش داده نمی‌شود. این صفحه‌ی معرفی تاریخ یا اطلاعات تماس شما را ارسال نمی‌کند.</p>
            <a className="detail-book-link" href={selectedStay.bookingHref} target="_blank" rel="noreferrer">
              دیدن صفحه‌ی رسمی و راه هماهنگی
              <ExternalLink aria-hidden="true" />
            </a>
          </div>
        )}
      </Sheet>

    </div>
  );
}

function CalendarIcon() {
  return <span className="calendar-field-icon" aria-hidden="true"><CalendarDays /></span>;
}

function App() {
  return (
    <ToastProvider position="bottom-start">
      <PageContent />
    </ToastProvider>
  );
}

export default App;
