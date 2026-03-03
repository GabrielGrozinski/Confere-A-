import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_KEY
);

export default async function handler(req, res) {

  console.log("Webhook recebido:", req.method);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { type, data } = req.body;

    // Mercado Pago envia vários tipos de evento
    if (type === "payment") {
      const paymentId = data.id;

      console.log("Pagamento recebido:", paymentId);

      // Consultar pagamento na API oficial
      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
          },
        }
      );

      const payment = await mpResponse.json();
      let plano = 'indefinido';
      let userId = 'indefinido';
      if (payment.external_reference) {
        [userId, plano] = payment.external_reference.split('|');
      } else if (payment.order && payment.order.external_reference) {
        [userId, plano] = payment.order.external_reference.split('|');
      }
      
      console.log("Status do pagamento:", payment.status);

      if (payment.status === "approved") {
        console.log("Pagamento aprovado!");

        const {data, error} = await supabase
            .from('planos')
            .insert({
                user_id: userId,
                payment_id: `${paymentId}`,
                plan_id: plano == '5' ? 'Torcedor' : 'Sócio'
            });

        if (error) {
            console.error('Houve um erro ao inserir o plano', error)
        }

      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}