'use client'

import type { NextRequest } from 'next/server';
import { redirectMiddleware } from './middlewares/customMiddleware';

export function middleware(request: NextRequest) {
    return (redirectMiddleware(request));
}

export const config = {
    matcher: ['/admin/:path*', "/"],
}