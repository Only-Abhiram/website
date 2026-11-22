
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, contact, message } = await request.json();

    if (
      typeof name !== "string" ||
      typeof contact !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !contact.trim() ||
      !message.trim() ||
      name.length > 100 ||
      contact.length > 200 ||
      message.length > 2000
    ) {
      return Response.json(
        { error: "Invalid input" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL,
      subject: `Portfolio message from ${name}`,
      text: `
Name: ${name}
Contact: ${contact}

Message:
${message}
      `,
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { error: "Unable to send message" },
      { status: 500 }
    );
  }
}
