// 定义支持的语言列表
export const locales = ['zh', 'en'] as const;
export type Locale = (typeof locales)[number];

// 设置默认语言
export const defaultLocale: Locale = 'zh';

// 获取当前语言的函数
export function getLocaleFromURL(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (Array.from(locales).includes(locale as Locale)) {
    return locale as Locale;
  }
  return defaultLocale;
}

// 生成引用链接的函数
export function getQuoteUrl(id: string, locale: string) {
  if (locale === defaultLocale) {
    return `/quotes/${id}`;
  }
  return `/${locale}/quotes/${id}`;
} 