export async function POST(req: Request) {
  console.log("API EXECUTOU");

  try {

    const userId = (req.headers.get('authorization')?.split(' ')[1]) ?? 'falhou_conference';

    const { plano } = await req.json();

    const precos: Record<string, number> = {
      torcedor: 5,
      socio: 9.9
    }

    const amount = precos[plano];

    if (!amount) {
      return Response.json({ error: "Plano inválido" }, { status: 400 });
    }

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
              unit_price: amount,
              currency_id: "BRL",
            },
          ],
          notification_url: "https://confere-ae-psi.vercel.app/api/webhook",
          external_reference: `${userId}|${amount}`
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