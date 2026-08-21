export const OFFER = { productName: "40 Dinâmicas para Festas Infantis sem Eletrônicos", currentPrice: "R$ 19,90", previousPrice: null as string | null, guaranteeDays: 7, format: "E-book digital", delivery: "Acesso digital após a confirmação do pagamento" } as const;
export const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL?.trim() || "#oferta";
export const checkoutUrl = CHECKOUT_URL;
