/**
 *
 * This file is part of the lucifer-morningstar.dev distribution (https://github.com/LuciferMorningstarDev or https://lucifer-morningstar.dev).
 *
 * Copyright (c) 2022 | lucifer-morningstar.dev | All Rights Reserved
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Repository:
 *
 *     Github:          https://github.com/HellDevelopment/mazikeen
 *
 * Contact:
 *
 *     Discord Server:  https://lucifer-morningstar.dev/discord
 *     Website:         https://lucifer-morningstar.dev/
 *     Mail:            contact@lucifer-morningstar.dev
 *
 *
 * @author LuciferMorningstarDev < contact@lucifer-morningstar.dev | https://lucifer-morningstar.dev/ >
 *
 */

'use strict'; // https://www.w3schools.com/js/js_strict.asp

module.exports = async (bot, interaction) => {
    if (interaction.isCommand()) {
        var command = bot.slash_commands.get(interaction.commandName);
        if (!command) return;
        try {
            command.run(bot, interaction);
        } catch (err) {
            bot.logger.error('Unhandled Error in SlashCommand', err);
        }
        return;
    } else {
        if (!interaction.customId) return;
        var command = bot.interactions.get(interaction.customId);
        if (!command) return;
        try {
            command.run(bot, interaction);
        } catch (err) {
            bot.logger.error('Unhandled Error in Interaction with CustomID', err);
        }
    }
};
