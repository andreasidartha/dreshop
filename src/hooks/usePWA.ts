import { useEffect, useState } from 'react';

export const usePWA = () => {
  const [isPWAInstalled, setIsPWAInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  // Type for BeforeInstallPromptEvent
  type BeforeInstallPromptEvent = Event & {
    prompt: () => void;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; }>
  };
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    // Check if app is installed
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsPWAInstalled(true);
      }
    };

    // Clear old caches
    const clearOldCaches = async () => {
      if ('caches' in window) {
        try {
          const cacheNames = await caches.keys();
          await Promise.all(
            cacheNames.map(cacheName => {
              if (cacheName !== 'dreshop-v2') {
                console.log('Clearing old cache:', cacheName);
                return caches.delete(cacheName);
              }
            })
          );
        } catch (error) {
          console.log('Cache clearing failed:', error);
        }
      }
    };

    // Register service worker
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          // Clear old caches first
          await clearOldCaches();
          
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('SW registered: ', registration);
          
          // Force update if needed
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          }
        } catch (registrationError) {
          console.log('SW registration failed: ', registrationError);
        }
      }
    };

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // Handle app installed
    const handleAppInstalled = () => {
      setIsPWAInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    checkIfInstalled();
    registerSW();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
      setCanInstall(false);
    }
  };

  return {
    isPWAInstalled,
    canInstall,
    installPWA
  };
}; 