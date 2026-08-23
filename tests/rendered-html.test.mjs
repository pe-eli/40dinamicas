import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const filename = path === "/" ? "index.html" : `${path.slice(1)}.html`;
  const html = await readFile(new URL(`../.next/server/app/${filename}`, import.meta.url), "utf8");
  return new Response(html, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } });
}

test("renders the complete sales page with product metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /<title>40 Dinâmicas para Festas Infantis sem Eletrônicos<\/title>/);
  assert.match(html, /Transforme a festa em uma/);
  assert.match(html, /id="oferta"/);
  assert.match(html, /R\$ 10,00/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Lorem Ipsum/i);
});

test("keeps calls to action tracked and the FAQ accessible", async () => {
  const [page, faq, config, checkoutButton] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/FAQ.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/offer-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/CheckoutButton.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(config, /https:\/\/pay\.cakto\.com\.br\/okev54k_1055057/);
  assert.match(page, /<CheckoutButton/);
  assert.match(checkoutButton, /href=\{checkoutUrl\}/);
  assert.match(checkoutButton, /"InitiateCheckout"/);
  assert.match(checkoutButton, /value: OFFER\.priceValue/);
  assert.match(faq, /aria-expanded=\{expanded\}/);
  assert.match(faq, /aria-controls=/);
  assert.match(faq, /role="region"/);
});

test("renders the clearly marked legal routes", async () => {
  for (const path of ["/termos", "/privacidade"]) {
    const response = await render(path);
    assert.equal(response.status, 200);
    assert.match(await response.text(), /Conteúdo a configurar/);
  }
});
