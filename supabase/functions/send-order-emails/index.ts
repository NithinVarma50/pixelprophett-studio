import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  budget: string;
  details: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, name, email, phone, services, budget, details }: OrderEmailRequest = await req.json();

    console.log("Processing order emails for:", { orderId, name, email });

    const servicesText = services.join(", ");
    const ownerEmail = "varmanithin029@gmail.com";
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    // Email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PXPLabs <onboarding@resend.dev>",
        to: [email],
        subject: "Order Confirmed - PXPLabs",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { text-align: center; margin-bottom: 40px; }
              .logo { font-size: 24px; font-weight: bold; color: #000; }
              .content { background: #f9f9f9; border-radius: 12px; padding: 30px; margin-bottom: 30px; }
              .order-detail { margin: 15px 0; }
              .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
              .value { font-size: 16px; color: #000; margin-top: 4px; }
              .footer { text-align: center; color: #666; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">PXPLabs</div>
              </div>
              <h1 style="text-align: center; margin-bottom: 30px;">Order Confirmed!</h1>
              <p>Hi ${name},</p>
              <p>Thank you for your order! We've received your project inquiry and our team will review it shortly.</p>
              
              <div class="content">
                <h3 style="margin-top: 0;">Order Summary</h3>
                <div class="order-detail">
                  <div class="label">Order ID</div>
                  <div class="value">${orderId}</div>
                </div>
                <div class="order-detail">
                  <div class="label">Services</div>
                  <div class="value">${servicesText}</div>
                </div>
                <div class="order-detail">
                  <div class="label">Budget</div>
                  <div class="value">${budget}</div>
                </div>
                ${details ? `
                <div class="order-detail">
                  <div class="label">Project Details</div>
                  <div class="value">${details}</div>
                </div>
                ` : ''}
              </div>
              
              <p>We'll be in touch within 24 hours to discuss your project in detail.</p>
              <p>Best regards,<br>The PXPLabs Team</p>
              
              <div class="footer">
                <p>© ${new Date().getFullYear()} PXPLabs. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const customerResult = await customerEmailResponse.json();
    console.log("Customer email sent:", customerResult);

    // Email to owner
    const ownerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "PXPLabs Orders <onboarding@resend.dev>",
        to: [ownerEmail],
        subject: `New Order from ${name} - PXPLabs`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              .header { background: #000; color: #fff; padding: 20px; border-radius: 12px 12px 0 0; }
              .content { background: #f9f9f9; border-radius: 0 0 12px 12px; padding: 30px; }
              .order-detail { margin: 15px 0; padding: 15px; background: #fff; border-radius: 8px; }
              .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; }
              .value { font-size: 16px; color: #000; margin-top: 4px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin: 0;">🎉 New Order Received!</h2>
              </div>
              <div class="content">
                <div class="order-detail">
                  <div class="label">Order ID</div>
                  <div class="value">${orderId}</div>
                </div>
                <div class="order-detail">
                  <div class="label">Customer Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="order-detail">
                  <div class="label">Email</div>
                  <div class="value"><a href="mailto:${email}">${email}</a></div>
                </div>
                <div class="order-detail">
                  <div class="label">Phone</div>
                  <div class="value"><a href="tel:${phone}">${phone}</a></div>
                </div>
                <div class="order-detail">
                  <div class="label">Services Requested</div>
                  <div class="value">${servicesText}</div>
                </div>
                <div class="order-detail">
                  <div class="label">Budget</div>
                  <div class="value">${budget}</div>
                </div>
                ${details ? `
                <div class="order-detail">
                  <div class="label">Project Details</div>
                  <div class="value">${details}</div>
                </div>
                ` : ''}
                <div class="order-detail">
                  <div class="label">Submitted At</div>
                  <div class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    const ownerResult = await ownerEmailResponse.json();
    console.log("Owner email sent:", ownerResult);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmail: customerResult, 
        ownerEmail: ownerResult 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-order-emails function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
