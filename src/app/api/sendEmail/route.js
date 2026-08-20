import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, business, service, budget, email, phone, message } = body;

    const recipientEmail = process.env.RECIPIENT_EMAIL || "info@palmlightmedia.com";

    // Log lead to server console
    console.log("----------------------------------------");
    console.log("📥 NEW CLIENT CONSULTATION REQUEST:");
    console.log(`- Recipient:      ${recipientEmail}`);
    console.log(`- Name:           ${name || 'N/A'}`);
    console.log(`- Business:       ${business || 'N/A'}`);
    console.log(`- Service:        ${service || 'N/A'}`);
    console.log(`- Budget:         ${budget || 'N/A'}`);
    console.log(`- Client Email:   ${email}`);
    console.log(`- Client Phone:   ${phone || 'N/A'}`);
    console.log(`- Message:        ${message || 'N/A'}`);
    console.log(`- Submitted At:   ${new Date().toLocaleString()}`);
    console.log("----------------------------------------");

    // 1. Send via Nodemailer (if SMTP settings configured in .env.local)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: Number(process.env.SMTP_PORT) === 465 || !process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Palmlight Media Leads" <${process.env.SMTP_USER}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `🚀 New Lead from ${name || email}: ${service || 'General Inquiry'}`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
              <h2 style="color: #7819ff;">New Client Consultation Request</h2>
              <p><strong>Name:</strong> ${name || 'N/A'}</p>
              <p><strong>Business:</strong> ${business || 'N/A'}</p>
              <p><strong>Service Required:</strong> ${service || 'N/A'}</p>
              <p><strong>Estimated Budget:</strong> ${budget || 'N/A'}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f4f4f5; padding: 12px; border-left: 4px solid #7819ff;">
                ${message || 'N/A'}
              </blockquote>
            </div>
          `,
        });
        console.log(`✅ Email sent successfully via SMTP to ${recipientEmail}`);
      } catch (smtpErr) {
        console.error("❌ SMTP send error:", smtpErr);
      }
    }

    // 2. Send via Resend API (if RESEND_API_KEY configured in .env.local)
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Palmlight Media Leads <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: email,
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
        console.log(`✅ Email sent successfully via Resend to ${recipientEmail}`);
      } catch (err) {
        console.error("❌ Resend API error:", err);
      }
    }

    return NextResponse.json(
      { success: true, message: `Lead submitted to ${recipientEmail}` },
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
