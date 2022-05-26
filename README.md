# Ko-fi to Discord Webhook Relay

A simple [Cloudflare Worker](https://workers.cloudflare.com/) that accepts [Ko-Fi webhook requests](https://ko-fi.com/manage/webhooks) and transforms them to be delivered to a [Discord webhook URL](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks).


## Deployment
1. Clone the repository and publish the worker to your Cloudflare account:
    ```bash
    wrangler publish
    ```
2. Configure the required secrets:
    - `DISCORD_WEBHOOK_URL` - The webhook URL to relay to
    - `VERIFICATION_TOKEN` - The verification token from [your Ko-Fi webhooks page](https://ko-fi.com/manage/webhooks)
    ```bash
    wrangler secret put DISCORD_WEBHOOK_URL
    wrangler secret put VERIFICATION_TOKEN
    ```
3. (Optional) If the Discord webhook messages are **not shown publicly**,  you can set the `PUBLIC_MODE` environment variable to `false` [via the dashboard](https://developers.cloudflare.com/workers/platform/environment-variables/#adding-environment-variables-via-the-dashboard).\
    With this variable set to `false`, private messages will be included in the Discord embeds.
