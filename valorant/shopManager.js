import {fetchChannel} from "../misc/util.js";
import {VPEmoji} from "../discord/emoji.js";
import {renderBundles, renderNightMarket, renderOffers} from "../discord/embed.js";
import {getUser} from "./auth.js";
import {getBundles, getNightMarket, getOffers} from "./shop.js";

export const fetchShop = async (interaction, user, targetId=interaction.user.id) => {
    // fetch the channel if not in cache
    const channel = interaction.channel || await fetchChannel(interaction.channelId);

    // start uploading emoji now
    const emojiPromise = VPEmoji(interaction, channel);

    let shop = await getOffers(targetId);
    if(shop.inQueue) shop = await waitForShopQueueResponse(shop);

    user = getUser(user);
    return await renderOffers(shop, interaction, user, await emojiPromise, targetId);
}

export const fetchBundles = async (interaction) => {
    const channel = interaction.channel || await fetchChannel(interaction.channelId);
    const emojiPromise = VPEmoji(interaction, channel);

    let bundles = await getBundles(interaction.user.id);
    if(bundles.inQueue) bundles = await waitForShopQueueResponse(bundles);

    return await renderBundles(bundles, interaction, await emojiPromise);
}

export const fetchNightMarket = async (interaction, user) => {
    const channel = interaction.channel || await fetchChannel(interaction.channelId);
    const emojiPromise = VPEmoji(interaction, channel);

    let market = await getNightMarket(interaction.user.id);
    if(market.inQueue) market = await waitForShopQueueResponse(market);

    return await renderNightMarket(market, interaction, user, await emojiPromise);
}