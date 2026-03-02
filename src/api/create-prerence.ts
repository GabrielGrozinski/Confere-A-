import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const response = await fetch(
    'https://api.mercadopago.com/checkout/preferences',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        items: [
          {
            title: 'Produto Teste',
            quantity: 1,
            currency_id: 'BRL',
            unit_price: 10,
          },
        ],
      }),
    }
  );

  const data = await response.json();
  res.status(200).json(data);
}