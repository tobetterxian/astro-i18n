import { defineMiddleware } from 'astro/middleware';
import { defaultLocale, locales } from './i18n/utils';

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, redirect } = context;
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  console.log("[Middleware] Start - URL:", pathname);
  
  try {
    // 提取URL中的第一段作为可能的语言代码
    const [, firstSegment] = pathname.split('/');
    console.log("[Middleware] First segment:", firstSegment);
    
    // 如果路径以 /quotes 开头，内部重写到默认语言版本
    if (pathname.startsWith('/quotes/') || pathname === '/quotes') {
      const newPath = pathname.replace('/quotes', `/${defaultLocale}/quotes`);
      console.log("[Middleware] Redirecting quotes path to:", newPath);
      return redirect(newPath);
    }

    // 如果是默认语言的前缀，重定向到无前缀版本
    if (firstSegment === defaultLocale) {
      const newPath = pathname.replace(`/${defaultLocale}`, '');
      console.log("[Middleware] Redirecting default locale to:", newPath);
      return redirect(newPath);
    }
    
    // 如果不是有效的语言代码，继续正常处理
    if (!locales.includes(firstSegment)) {
      console.log("[Middleware] Not a locale path, continuing");
      return next();
    }

    const response = await next();
    
    // 记录响应状态
    console.log("[Middleware] Response status:", response.status);
    if (response.status === 404) {
      console.log("[Middleware] Page not found:", pathname);
    }
    
    return response;
  } catch (error) {
    console.error("[Middleware] Error:", error);
    return next();
  }
}); 