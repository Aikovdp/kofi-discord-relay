import { RESTPostAPIWebhookWithTokenJSONBody, APIEmbedField } from "discord-api-types/v10";

const KOFI_RED = 0xFF5E5B;
const KOFI_BLUE = 0x13C3FF;
const KOFI_GOLD = 0xFBAA19;

export default function transformKofiToDiscord(kofi: KofiWebhook, publicMode: boolean) : RESTPostAPIWebhookWithTokenJSONBody {
    const isRenewal = kofi.is_subscription_payment && !kofi.is_first_subscription_payment;

    const fields : APIEmbedField[] = [
      {
        name: "Amount",
        value: `${kofi.amount} ${kofi.currency}`,
        inline: true
      }
    ]

    if (kofi.tier_name) {
      fields.push({
        name: "Tier",
        value: kofi.tier_name,
        inline: true
      })
    }

    if ((kofi.is_public || !publicMode) && kofi.message) {
      fields.push({
        name: `Message ${!kofi.is_public ? "(Private)" : ""}`,
        value: kofi.message,
        inline: true
      })
    }

    return {
      username: "Ko-Fi Notifications",
      embeds: [
        {
          author: {
            name: kofi.from_name
          },
          title: `New ${kofi.type} ${isRenewal ? "Renewal" : ""}`,
          color: (!kofi.is_subscription_payment) ? KOFI_GOLD : (kofi.is_first_subscription_payment) ? KOFI_RED : KOFI_BLUE,
          timestamp: kofi.timestamp,
          fields: fields
        },
      ],
    };
}
