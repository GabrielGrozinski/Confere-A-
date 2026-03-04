import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_KEY!
);


export async function POST(req: Request) {
  console.log("API EXECUTOU");

  try {

    const userId = (req.headers.get('authorization')?.split(' ')[1]);

    const { plano } = await req.json();

    const precos: Record<string, number> = {
      torcedor: 5,
      socio: 9.9
    }

    const amount = precos[plano];

    if (!amount || !plano) {
      return Response.json({ error: "Plano inválido" }, { status: 400 });
    }

    if (!userId) {
      return Response.json({ error: "Usuário inválido" }, { status: 400 });
    }

    const nomePlanos: Record<string, string> = {
      torcedor: 'Torcedor',
      socio: 'Sócio'
    }


    const {data: planoAtivo, error} =
      await supabase
        .from('planos')
        .select('*')
        .eq('user_id', userId)
        .eq('plan_id', nomePlanos[plano])
        .maybeSingle();

    if (error) {
      return Response.json({ error: "Houve um erro ao validar os planos do usuário" }, { status: 400 });
    }

    if (planoAtivo) {
      return Response.json({ error: "O usuário já possui esse plano "}, { status: 400 });
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