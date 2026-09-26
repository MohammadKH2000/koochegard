import { DoorOpen } from "lucide-react";

export function SiteLogo({ href = "#top" }: { href?: string }) {
  return (
    <a className="brand-lockup" href={href} aria-label="کوچه‌گرد، صفحه‌ی نخست">
      <span className="brand-mark">
        <DoorOpen aria-hidden="true" />
        <i />
      </span>
      <span className="brand-copy">
        <strong>کوچه‌گرد</strong>
        <small>راهی به دلِ خانه‌ها</small>
      </span>
    </a>
  );
}
