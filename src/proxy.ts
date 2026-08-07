import { NextResponse, type NextRequest } from "next/server";
import { detectLocale, isLocale } from "@/i18n/config";

// The pages that exist under every locale. An unprefixed link to one of these
// is a link someone shared without the /ru; anything outside the list is a
// path this site has never had.
const LOCALIZED_PATHS = new Set(["/", "/privacy", "/upwork"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  // Already on a valid localized path (/ru..., /en...) — let it through.
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // A page we do have, missing its locale -> the visitor's locale of it.
  const bare = pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : "/";
  if (LOCALIZED_PATHS.has(bare)) {
    const locale = detectLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = bare === "/" ? `/${locale}` : `/${locale}${bare}`;
    return NextResponse.redirect(url);
  }

  // Everything else is a path that doesn't exist. Let it fall through to the
  // 404 rather than redirecting it to the home page: a redirect answers 200,
  // so every typo and every dead old URL looks to a crawler like a live page.
  return NextResponse.next();
}

export const config = {
  // Skip API routes, Next internals, and any file with an extension.
  // `apple-icon` is listed by name because it's the one asset Next serves from
  // an extensionless path — without it the touch icon gets redirected to a
  // locale page and Safari receives HTML where it asked for a PNG.
  matcher: ["/((?!api|_next|apple-icon|.*\\..*).*)"],
};
