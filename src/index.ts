import transformKofiToDiscord from "./transformer";

export default {
  async fetch(request: Request, env: Bindings): Promise<Response> {
    let data;
    try {
      data = (await request.formData()).get("data") as string;
    } catch (e) {
      return new Response(null, {
        status: 400,
      });
    }
    const kofi: KofiWebhook = JSON.parse(data);

    if (kofi.verification_token !== env.VERIFICATION_TOKEN) {
      return new Response(null, {
        status: 401,
      });
    }

    const discordBody = transformKofiToDiscord(kofi, env.PUBLIC_MODE !== "false");

    const res = await fetch(env.DISCORD_WEBHOOK_URL, {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(discordBody),
    });

    return new Response((res.ok ? ":)" : ":("), {
      headers: { "content-type": "text/plain" },
      status: res.ok ? 200 : 500
    });
  },
};


