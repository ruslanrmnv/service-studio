import Image from "next/image";

/* Windows of real work. Each is a screenshot (or a sketch) in the lightest
   chrome that still reads as "a live site on a screen" — a title bar with
   three dots for a browser, a rounded bezel for a phone — rather than as a
   decorated picture. The site sells websites; these are the product shown in
   its own packaging.

   Both windows load like the product too (.window-progress / .window-page in
   globals.css): chrome first, a progress line, then the page paints in. Set
   --load-s on the window or any ancestor to time it. */

export function BrowserWindow({
  url,
  live = false,
  className = "",
  children,
}: {
  /* Address pill text. A real address, or nothing — never lorem. */
  url?: string;
  /* The pulsing dot from the About card: this one is deployed and breathing. */
  live?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-line bg-surface-2 ${className}`}
    >
      {/* relative, so the progress line can sit on the bar's bottom edge. */}
      <div className="relative flex items-center gap-1.5 border-b border-line bg-surface-3 px-3.5 py-2.5">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-line-strong" />
        {url && (
          <span className="ml-1.5 min-w-0 flex-1 truncate rounded-full bg-surface px-3 py-0.5 text-[11px] leading-4 text-faint">
            {url}
          </span>
        )}
        {live && (
          <span
            aria-hidden="true"
            className="node-pulse ml-auto h-2 w-2 rounded-full bg-accent"
          />
        )}
        <span aria-hidden="true" className="window-progress" />
      </div>
      <div className="window-page">{children}</div>
    </div>
  );
}

const PHONE_SIZES = {
  /* Hero: a phone leaning on the desktop window. */
  md: { frame: "rounded-[1.6rem] p-1.5", screen: "rounded-[1.2rem]" },
  /* Case covers: the same phone at a quarter of the card. */
  sm: { frame: "rounded-[1.05rem] p-1", screen: "rounded-[0.75rem]" },
} as const;

export function PhoneWindow({
  src,
  alt = "",
  size = "md",
  aspectClass = "aspect-[9/17]",
  className = "",
  priority = false,
}: {
  src: string;
  alt?: string;
  size?: keyof typeof PHONE_SIZES;
  /* The screenshots run the phone's whole page; the bezel shows the top of it. */
  aspectClass?: string;
  className?: string;
  priority?: boolean;
}) {
  const s = PHONE_SIZES[size];
  /* No position of its own: the case cards pin it absolutely over a cover,
     the hero wraps it in a positioned drift layer. No progress line either —
     a phone has no chrome to run one under, its screen simply comes on — so
     window-page-solo drops the beat a browser window spends waiting for its
     line to finish, and the screen lights at --load-s itself. */
  return (
    <div
      className={`overflow-hidden border border-line bg-surface-3 ${s.frame} ${className}`}
    >
      <div
        className={`window-page window-page-solo overflow-hidden ${s.screen} ${aspectClass}`}
      >
        <Image
          src={src}
          alt={alt}
          width={480}
          height={1039}
          priority={priority}
          className="h-full w-full object-cover object-top"
        />
      </div>
    </div>
  );
}
