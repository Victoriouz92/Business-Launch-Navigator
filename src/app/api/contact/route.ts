import { NextResponse } from "next/server"
import { Resend } from "resend"

/**
 * POST /api/contact
 * Sends a message from the contact form to the site owner via Resend.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, message } = body

    if (!email || !email.includes("@") || email.length > 320) {
      return NextResponse.json(
        { error: "Моля, въведете валиден имейл адрес." },
        { status: 400 }
      )
    }
    if (!message || message.trim().length < 10 || message.length > 4000) {
      return NextResponse.json(
        { error: "Съобщението трябва да е между 10 и 4000 символа." },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const to = process.env.CONTACT_TO_EMAIL
    const from = process.env.RESEND_FROM_EMAIL

    if (!apiKey || !to || !from) {
      console.error(
        "Contact form not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL and RESEND_FROM_EMAIL."
      )
      return NextResponse.json(
        { error: "Формата за връзка все още не е напълно настроена. Опитайте по-късно." },
        { status: 503 }
      )
    }

    const resend = new Resend(apiKey)
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: "Ново съобщение от контактната форма",
      text: `Имейл за връзка: ${email}\n\n${message}`,
    })

    return NextResponse.json(
      { message: "Съобщението е изпратено успешно." },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Грешка при изпращане. Опитайте отново." },
      { status: 500 }
    )
  }
}
