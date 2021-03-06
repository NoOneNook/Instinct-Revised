import '@instinct-web/core';
import './ModernTheme.scss';
import React, {useEffect, useState} from 'react';
import {Client} from './components/template/client/Client';
import {Bootstrap, ContextProviders} from '@instinct-web/core';

export function ModernTheme() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      await import('./pages');
      setLoading(false);
    }

    load();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <ContextProviders>
      <Bootstrap />
      <Client />
    </ContextProviders>
  );
}
