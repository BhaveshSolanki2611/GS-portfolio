import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Name length validation
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    // Message length validation
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5000 characters." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email HTML template
    const htmlBody = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: #080B14; }
            .container { max-width: 600px; margin: 0 auto; background: #0D1220; border-radius: 16px; overflow: hidden; border: 1px solid rgba(99,102,241,0.2); }
            .header { background: linear-gradient(135deg, #6366F1, #06B6D4, #A855F7); padding: 30px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
            .content { padding: 30px; color: #F1F5F9; }
            .field { margin-bottom: 20px; }
            .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748B; margin-bottom: 6px; }
            .value { font-size: 16px; color: #F1F5F9; line-height: 1.6; }
            .message-box { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 20px; margin-top: 8px; }
            .footer { text-align: center; padding: 20px; border-top: 1px solid rgba(255,255,255,0.06); color: #64748B; font-size: 12px; }
            .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(99,102,241,0.3), transparent); margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📬 New Portfolio Message</h1>
              <p>Someone reached out via your portfolio website</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #6366F1; text-decoration: none;">${email}</a></div>
              </div>
              <div class="divider"></div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message</div>
                <div class="message-box">
                  <div class="value">${message.replace(/\n/g, "<br>")}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              Sent from Gracy Singh's Portfolio Website &bull; ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
        </body>
      </html>
    `;

    // Send email
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: "gracysingh0601@gmail.com",
      subject: `[Portfolio] ${subject} from ${name}`,
      html: htmlBody,
      text: `New message from ${name} (${email})\n\nSubject: ${subject}\n\nMessage:\n${message}`,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
