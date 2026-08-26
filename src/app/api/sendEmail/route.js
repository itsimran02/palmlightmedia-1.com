import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const dynamic = 'force-dynamic';

function generateLeadEmailHTML(lead) {
  const { name, business, service, budget, email, phone, message } = lead;
  const cleanPhone = phone ? phone.replace(/[^0-9+]/g, '') : '';
  const whatsappURL = cleanPhone ? `https://wa.me/${cleanPhone.replace('+', '')}?text=Hello%20${encodeURIComponent(name || '')}%2C%20thank%20you%20for%20contacting%20Palmlight%20Media!` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request — Palmlight Media</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0c10; font-family: 'Poppins', 'Roboto', Helvetica, Arial, sans-serif; color: #ffffff; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0c10; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- CONTAINER -->
        <table role="presentation" width="100%" style="max-width: 600px; background: #12131a; border: 1px solid #2a2b3d; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
          
          <!-- HEADER -->
          <tr>
            <td style="background: linear-gradient(135deg, #181926, #0f1017); padding: 36px 32px 28px; text-align: center; border-bottom: 1px solid #252738;">
              <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="vertical-align: middle;">
                    <img src="https://agency-mocha-theta.vercel.app/_next/image?url=%2Flogo.jpeg&w=96&q=100" alt="Palmlight Media" width="48" height="48" style="display: block; border-radius: 50%; border: 2px solid #a855f7;">
                  </td>
                  <td style="vertical-align: middle; padding-left: 12px;">
                    <span style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; font-family: sans-serif;">
                      Palmlight <span style="color: #a855f7;">Media</span>
                    </span>
                  </td>
                </tr>
              </table>
              <h1 style="margin: 20px 0 6px; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.3px;">
                🚀 New Client Consultation Request
              </h1>
              <p style="margin: 0; font-size: 14px; color: #94a3b8;">
                Submitted on ${new Date().toLocaleString()}
              </p>
            </td>
          </tr>

          <!-- BADGES ROW -->
          <tr>
            <td style="padding: 24px 32px 0;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 14px; text-align: center;" width="48%">
                    <span style="font-size: 12px; text-transform: uppercase; color: #a855f7; font-weight: 700; display: block; margin-bottom: 4px;">Service Requested</span>
                    <strong style="font-size: 15px; color: #ffffff;">${service || 'General Inquiry'}</strong>
                  </td>
                  <td width="4%"></td>
                  <td style="background: rgba(168, 85, 247, 0.12); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 12px; padding: 14px; text-align: center;" width="48%">
                    <span style="font-size: 12px; text-transform: uppercase; color: #a855f7; font-weight: 700; display: block; margin-bottom: 4px;">Budget Range</span>
                    <strong style="font-size: 15px; color: #ffffff;">${budget || 'Not Specified'}</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLIENT DETAILS TABLE -->
          <tr>
            <td style="padding: 28px 32px 16px;">
              <h3 style="margin: 0 0 16px; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #cbd5e1; font-weight: 700;">
                👤 Client Details
              </h3>
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #171824; border-radius: 12px; border: 1px solid #232536; padding: 16px 20px;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #232536; color: #94a3b8; font-size: 14px;" width="35%">Client Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #232536; color: #ffffff; font-size: 14px; font-weight: 600;">${name || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #232536; color: #94a3b8; font-size: 14px;">Business Name:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #232536; color: #ffffff; font-size: 14px; font-weight: 600;">${business || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #232536; color: #94a3b8; font-size: 14px;">Email Address:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #232536; font-size: 14px; font-weight: 600;">
                    <a href="mailto:${email}" style="color: #a855f7; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">Phone Number:</td>
                  <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">
                    ${phone ? `<a href="tel:${cleanPhone}" style="color: #a855f7; text-decoration: none;">${phone}</a>` : 'N/A'}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PROJECT MESSAGE QUOTE -->
          <tr>
            <td style="padding: 0 32px 24px;">
              <h3 style="margin: 0 0 12px; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; color: #cbd5e1; font-weight: 700;">
                💬 Project Details / Message
              </h3>
              <div style="background: #171824; border-left: 4px solid #a855f7; border-radius: 0 12px 12px 0; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #e2e8f0; font-style: italic;">
                "${message ? message : 'No additional message provided.'}"
              </div>
            </td>
          </tr>

          <!-- ACTION BUTTONS -->
          <tr>
            <td style="padding: 0 32px 32px; text-align: center;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  ${whatsappURL ? `
                  <td style="padding-right: 8px;">
                    <a href="${whatsappURL}" target="_blank" style="display: block; background: #25D366; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center;">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                  ` : ''}
                  <td style="padding-left: 8px;">
                    <a href="mailto:${email}" style="display: block; background: #a855f7; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 12px; font-weight: 700; font-size: 14px; text-align: center;">
                      ✉️ Reply via Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background: #0d0e14; padding: 24px 32px; text-align: center; border-top: 1px solid #1e202e; color: #64748b; font-size: 13px;">
              <p style="margin: 0 0 6px;">
                © 2026 <strong style="color: #94a3b8;">Palmlight Media</strong> • Global / Remote
              </p>
              <p style="margin: 0; font-size: 12px; color: #475569;">
                Automatic Lead Delivery System • <a href="https://palmlightmedia.com" style="color: #a855f7; text-decoration: none;">palmlightmedia.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, business, service, budget, email, phone, message } = body;

    const recipientEmail = process.env.RECIPIENT_EMAIL || "info@palmlightmedia.com";
    const leadHTML = generateLeadEmailHTML(body);

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
          from: `"Palmlight Media Leads" <${process.env.SENDER_EMAIL || recipientEmail}>`,
          to: recipientEmail,
          replyTo: email,
          subject: `🚀 New Lead from ${name || email}: ${service || 'General Inquiry'}`,
          html: leadHTML,
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
            from: `Palmlight Media Leads <${process.env.SENDER_EMAIL || 'info@palmlightmedia.com'}>`,
            to: [recipientEmail],
            reply_to: email,
            subject: `🚀 New Lead from ${name || email}: ${service || 'General Inquiry'}`,
            html: leadHTML,
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
