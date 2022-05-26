export {};

declare global {
    interface KofiWebhook {
        message_id: string;
        timestamp: string;
        type: string;
        is_public: boolean;
        from_name: string;
        message: string;
        amount: string;
        url: string;
        email: string;
        currency: string;
        is_subscription_payment: boolean;
        is_first_subscription_payment: boolean;
        kofi_transaction_id: string;
        verification_token: string;
        shop_items: ShopItem[];
        tier_name: string;
    }
      
    interface ShopItem {
        direct_link_code: string;
    }
      
    interface Bindings {
        DISCORD_WEBHOOK_URL: string;
        VERIFICATION_TOKEN: string;
        PUBLIC_MODE: string;
    }
}
