export async function findOrCreateCustomer(email: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe not configured");

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const searchRes = await fetch(
    `https://api.stripe.com/v1/customers/search?query=email:'${encodeURIComponent(email)}'`,
    { headers: { Authorization: `Bearer ${key}` } }
  );
  const searchData = await searchRes.json();

  if (searchData.data?.length > 0) return searchData.data[0];

  const createRes = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers,
    body: new URLSearchParams({ email }),
  });
  return createRes.json();
}

export async function createInvoice(customerEmail: string, amount: number, description: string) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe not configured");

  const headers = {
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const customer = await findOrCreateCustomer(customerEmail);

  await fetch("https://api.stripe.com/v1/invoiceitems", {
    method: "POST",
    headers,
    body: new URLSearchParams({
      customer: customer.id,
      amount: String(amount),
      currency: "usd",
      description,
    }),
  });

  const invoiceRes = await fetch("https://api.stripe.com/v1/invoices", {
    method: "POST",
    headers,
    body: new URLSearchParams({
      customer: customer.id,
      collection_method: "send_invoice",
      days_until_due: "30",
    }),
  });

  return invoiceRes.json();
}
