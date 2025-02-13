// 定义支持的语言列表
export const locales = ['zh', 'en'] as const;
export type Locale = typeof locales[number];

// 设置默认语言
export const defaultLocale: Locale = 'zh';

// 获取当前语言的函数
export function getLocaleFromURL(url: URL): Locale {
  const [, locale] = url.pathname.split('/');
  if (locales.includes(locale as Locale)) {
    return locale as Locale;
  }
  return defaultLocale;
} 