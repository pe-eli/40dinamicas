import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
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
  assert.match(html, /R\$ 19,90/);
  assert.match(html, /og:image/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Lorem Ipsum/i);
});

test("keeps calls to action safe and the FAQ accessible", async () => {
  const [page, faq, config] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/FAQ.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/offer-config.ts", import.meta.url), "utf8"),
  ]);
  assert.match(config, /NEXT_PUBLIC_CHECKOUT_URL/);
  assert.match(config, /\|\| "#oferta"/);
  assert.match(page, /href=\{checkoutUrl\}/);
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
