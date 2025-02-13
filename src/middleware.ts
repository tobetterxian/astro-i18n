import { defineMiddleware } from "astro:middleware";
import { defaultLocale, locales } from './i18n/utils';

export const onRequest = defineMiddleware(async ({ request, redirect, rewrite }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // 提取URL中的第一段作为可能的语言代码
  const [, firstSegment] = pathname.split('/');
  
  // 添加响应头来标记中间件执行
  const response = await next();
  response.headers.set('X-Middleware-Active', 'true');
  
  console.log("defineMiddleware")
  // 如果路径以 /quotes 开头，内部重写到默认语言版本
  if (pathname.startsWith('/quotes/') || pathname === '/quotes') {
    const newPath = pathname.replace('/quotes', `/${defaultLocale}/quotes`);
    console.log("newPath:", newPath)
    // 添加一个临时重定向，这样我们可以在浏览器中看到重定向过程
    return Response.redirect(new URL(newPath, url.origin), 302);
  }

  // 如果是默认语言的前缀，重定向到无前缀版本
  if (firstSegment === defaultLocale) {
    return Response.redirect(new URL(pathname.replace(`/${defaultLocale}`, ''), url.origin), 302);
  }
  
  // 如果不是有效的语言代码，继续正常处理
  if (!locales.includes(firstSegment)) {
    return response;
  }

  return response;
}); 