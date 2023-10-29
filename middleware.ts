import { NextResponse } from 'next/server';
import { verifyJwtToken } from '@/lib/facilityAuth';

export async function middleware(request: {
  url: any;
  nextUrl: any;
  cookies: any;
}) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get('token') ?? { value: null };
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  const isAuthPages = (pathname: string) => {
    return ['/facility/sign-in', '/facility/sign-up'].includes(pathname);
  };
  const isAuthPageRequested = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequested) {
    if (!hasVerifiedToken) {
      const response = NextResponse.next();
      response.cookies.delete('token');
      return response;
    }
    const response = NextResponse.redirect(new URL(`/`, url));
    return response;
  }

  //   if (!hasVerifiedToken) {
  //     const searchParams = new URLSearchParams(nextUrl.searchParams);
  //     searchParams.set('next', nextUrl.pathname);
  //     const response = NextResponse.redirect(
  //       new URL(`/facility/sign-in?${searchParams}`, url)
  //     );
  //     response.cookies.delete('token');
  //     return response;
  //   }

  return NextResponse.next();
}
