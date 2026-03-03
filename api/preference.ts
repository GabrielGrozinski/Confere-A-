export async function POST(req: Request) {
  console.log("API EXECUTOU");

  try {
    const body = await req.json();

    const userId = body.userId ?? 'falhou_preference';

    const mpResponse = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          items: [
            {
              title: "Plano",
              quantity: 1,
              unit_price: 10,
              currency_id: "BRL",
            },
          ],
          notification_url: "https://confere-ae-psi.vercel.app/api/webhook",
          external_reference: userId
        }),
      }
    );

    const data = await mpResponse.json();

    return Response.json(data);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}