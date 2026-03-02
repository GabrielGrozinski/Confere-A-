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

      console.log("Status do pagamento:", payment.status);

      if (payment.status === "approved") {
        console.log("Pagamento aprovado!");

        console.log('pronto pra ir pro supabase')

      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Erro no webhook:", err);
    return res.status(500).json({ error: "Erro interno" });
  }
}