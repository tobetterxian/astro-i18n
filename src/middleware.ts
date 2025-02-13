import { defineMiddleware } from "astro:middleware";
import { defaultLocale, locales } from './i18n/utils';

export const onRequest = defineMiddleware(async ({ request, redirect }, next) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  
  // 提取URL中的第一段作为可能的语言代码
  const firstSegment = pathname.split('/')[1];
  
  // 如果是默认语言的前缀，重定向到无前缀版本
  if (firstSegment === defaultLocale) {
    return redirect(pathname.replace(`/${defaultLocale}`, ''));
  }
  
  // 如果不是有效的语言代码，继续正常处理
  if (!locales.includes(firstSegment)) {
    return next();
  }

  return next();
}); 