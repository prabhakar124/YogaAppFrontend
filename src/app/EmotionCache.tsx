'use client';
import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import type { EmotionCache, Options as OptionsOfCreateCache } from '@emotion/cache';

export type NextAppDirEmotionCacheProviderProps = {
  /** This is the options passed to createCache() from 'import createCache from "@emotion/cache"' */
  options: Omit<OptionsOfCreateCache, 'insertionPoint'>;
  /** By default <CacheProvider /> from 'import { CacheProvider } from "@emotion/react"' */
  CacheProvider?: (props: {
    value: EmotionCache;
    children: React.ReactNode;
  }) => React.JSX.Element | null;
  children: React.ReactNode;
};

// Adapted from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export function NextAppDirEmotionCacheProvider(props: NextAppDirEmotionCacheProviderProps) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;

  const [cache] = React.useState(() => {
    const cache = createCache(options);
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${flush().join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: cache.inserted ? Object.values(cache.inserted).join(' ') : '',
        }}
      />
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}

function DefaultCacheProvider({
  value,
  children,
}: {
  value: EmotionCache;
  children: React.ReactNode;
}) {
  return <CacheProvider value={value}>{children}</CacheProvider>;
}