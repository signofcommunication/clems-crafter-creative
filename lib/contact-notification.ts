type ContactMessageInput = {
  name: string;
  email: string;
  message: string;
};

type FormSubmitResponse = {
  success?: string | boolean;
  message?: string;
};

const CONTACT_TO_EMAIL = "clemsgraftercreative23@gmail.com";
const CONTACT_CC_EMAILS = [
  "anjidananto@clemsgraftercreative.com",
  "haryantilosiana@clemsgraftercreative.com",
  "sales@clemsgraftercreative.com",
];

const formSubmitEndpoint = `https://formsubmit.co/ajax/${CONTACT_TO_EMAIL}`;

/** Sends the contact form via FormSubmit.co — never throws, resolves false on failure. */
export async function sendContactMessage(input: ContactMessageInput): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("_subject", "Pesan Baru dari Contact Form - Clems Grafter Creative");
    formData.append("_cc", CONTACT_CC_EMAILS.join(","));
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    formData.append("Nama", input.name);
    formData.append("Email", input.email);
    formData.append("Pesan", input.message);

    const response = await fetch(formSubmitEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const result = (await response.json().catch(() => null)) as FormSubmitResponse | null;
    const isSuccessful = result?.success === true || result?.success === "true";

    if (!response.ok || !isSuccessful) {
      console.error(
        `Contact form email failed (${response.status}): ${result?.message ?? "Unknown FormSubmit response"}`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return false;
  }
}
