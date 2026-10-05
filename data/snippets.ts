export type Snippet = {
  id: string;
  file: string;
  language: string;
  note: string;
  code: string;
};

export const snippets: Snippet[] = [
  {
    id: "api",
    file: "app/api/orders/route.ts",
    language: "TypeScript",
    note: "Validated route handler: every order is checked before it touches the database.",
    code: `import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";

const OrderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().min(1).max(99),
  })).min(1),
  address: z.object({
    name: z.string().min(2),
    phone: z.string().regex(/^\\+?[0-9\\- ]{7,15}$/),
    city: z.string().min(2),
  }),
  payment: z.enum(["cod", "card"]),
});

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = OrderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const order = await db.order.create({
    data: { ...parsed.data, userId: session.user.id, status: "PENDING" },
  });

  return NextResponse.json({ order }, { status: 201 });
}`,
  },
  {
    id: "component",
    file: "components/ProductCard.tsx",
    language: "TypeScript",
    note: "Server component: data fetches on the server, zero client JS for the card itself.",
    code: `import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "./AddToCart";
import type { Product } from "@/types";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <div className="product-media">
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={480}
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>

      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="price">{formatPrice(product.price)}</p>
        <AddToCart productId={product.id} />
      </div>
    </article>
  );
}`,
  },
  {
    id: "hook",
    file: "hooks/useCart.ts",
    language: "TypeScript",
    note: "Cart state with localStorage persistence and derived totals.",
    code: `import { useCallback, useEffect, useMemo, useState } from "react";

export type CartItem = { id: string; quantity: number };
const STORAGE_KEY = "store:cart:v1";

function readStored(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readStored());
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((id: string) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  }, []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return { items, add, count };
}`,
  },
];
