import { NextResponse, type NextRequest } from "next/server";
import { detectLocale, isLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];

  // Already on a valid localized path (/ru..., /en...) — let it through.
  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  // Root or any unknown non-asset path -> detected locale root.
  // (Avoids producing nested paths like /en/de for unknown segments.)
  const locale = detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals, and any file with an extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
