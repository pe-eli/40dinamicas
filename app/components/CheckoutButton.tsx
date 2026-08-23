"use client";

import { OFFER, checkoutUrl } from "../offer-config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function CheckoutButton({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  function trackInitiateCheckout() {
    window.fbq?.("track", "InitiateCheckout", {
      content_name: OFFER.productName,
      content_type: "product",
      currency: "BRL",
      value: OFFER.priceValue,
    });
  }

  return (
    <a
      className={`button ${light ? "button-light" : "button-primary"}`}
      href={checkoutUrl}
      onClick={trackInitiateCheckout}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
