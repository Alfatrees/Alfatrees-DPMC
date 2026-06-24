import { NextResponse } from "next/server";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

export async function POST(req: Request) {
  try {
    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay is not configured." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { fullName, email } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    const auth = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64");

    const orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: 5000, // $50 in cents (Razorpay uses smallest currency unit)
        currency: "USD",
        receipt: `discovery_${Date.now()}`,
        notes: {
          purpose: "Discovery Call - $50",
          client_name: fullName,
          client_email: email,
        },
      }),
    });

    if (!orderRes.ok) {
      const errData = await orderRes.json().catch(() => ({}));
      console.error("Razorpay order creation failed:", errData);
      return NextResponse.json(
        { error: "Failed to create payment order." },
        { status: 500 }
      );
    }

    const order = await orderRes.json();

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
