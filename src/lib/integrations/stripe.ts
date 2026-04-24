export async function createInvoice(customerEmail: string, amount: number, description: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe not configured");

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const customerRes = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers,
    body: new URLSearchParams({ email: customerEmail }),
  });
  const customer = await customerRes.json();

  const invoiceRes = await fetch("https://api.stripe.com/v1/invoices", {
    method: "POST",
    headers,
    body: new URLSearchParams({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: "30",
    }),
  });
  const invoice = await invoiceRes.json();

  await fetch("https://api.stripe.com/v1/invoiceitems", {
    method: "POST",
    headers,
    body: new URLSearchParams({
      customer: customer.id,
      invoice: invoice.id,
      amount: String(amount),
      currency: "usd",
      description,
    }),
  });

  return invoice;
}
