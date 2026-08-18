import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, business, service, budget, email, phone, message } = body;

    // Log lead to server console
    console.log("----------------------------------------");
    console.log("📥 NEW CLIENT CONSULTATION REQUEST:");
    console.log(`- Name:          ${name || 'N/A'}`);
    console.log(`- Business:      ${business || 'N/A'}`);
    console.log(`- Service:       ${service || 'N/A'}`);
    console.log(`- Budget:        ${budget || 'N/A'}`);
    console.log(`- Client Email:  ${email}`);
    console.log(`- Client Phone:  ${phone || 'N/A'}`);
    console.log(`- Message:       ${message || 'N/A'}`);
    console.log(`- Submitted At:  ${new Date().toLocaleString()}`);
    console.log("----------------------------------------");

    // Optional email sending via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.RECIPIENT_EMAIL || "info@palmlightmedia.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Palm Light Media Leads <onboarding@resend.dev>",
            to: [recipientEmail],
            subject: `🚀 New Lead from ${name || email}: ${service || 'General Inquiry'}`,
            html: `
              <h2>New Client Consultation Request</h2>
              <p><strong>Name:</strong> ${name || 'N/A'}</p>
              <p><strong>Business:</strong> ${business || 'N/A'}</p>
              <p><strong>Service Required:</strong> ${service || 'N/A'}</p>
              <p><strong>Estimated Budget:</strong> ${budget || 'N/A'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Message:</strong></p>
              <p>${message || 'N/A'}</p>
            `,
          }),
        });
      } catch (err) {
        console.error("Resend API error:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: "Lead received successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling lead submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
