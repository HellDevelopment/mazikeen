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

const Discord = moduleRequire('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports.run = async (bot, interaction) => {
    try {
        let api_ping = Math.abs(Date.now() - interaction.createdTimestamp);

        interaction.replied = true;

        await interaction.channel
            .send({
                embeds: [
                    await bot.tools
                        .generateEmbed({
                            author: 'pinging...',
                            thumbnail: bot.user.displayAvatarURL({ dynamic: true }),
                            footer: {
                                text: `called by ${interaction.user.tag}`
                            }
                        })
                        .catch(error => {})
                ]
            })
            .then(async msg => {
                // console.log(msg);

                let edit_ping = Math.abs(msg.createdTimestamp - interaction.createdTimestamp);
                let socket_ping = Math.abs(bot.ws.ping);

                let status_api = api_ping >= 150 ? (api_ping > 350 ? '⛔' : '⚠️') : '🟢';
                let status_edit = edit_ping >= 250 ? (edit_ping > 400 ? '⛔' : '⚠️') : '🟢';
                let status_socket = socket_ping >= 250 ? (socket_ping > 350 ? '⛔' : '⚠️') : '🟢';

                let colorAPI = api_ping >= 150 ? (api_ping > 350 ? 'RED' : 'YELLOW') : 'GREEN';

                function pingPad(ping, emoji, name) {
                    var pad = '              ';
                    var newName = pad.slice(name.length) + name;
                    return `• ${emoji + ' ' + newName} | **${ping}** ms`;
                }

                msg.edit({
                    embeds: [
                        await bot.tools
                            .generateEmbed(
                                {
                                    color: colorAPI,
                                    author: 'Bot Pinging Information',
                                    thumbnail: bot.user.displayAvatarURL({ dynamic: true }),
                                    description: `
${pingPad(api_ping, status_api, 'Discord API:')}
${pingPad(edit_ping, status_edit, 'Edit Ping:')}
${pingPad(socket_ping, status_socket, 'Websocket:')}

                                    `,
                                    footer: {
                                        text: `called by ${interaction.user.tag}`
                                    }
                                },
                                pingEmbed => {}
                            )
                            .catch(error => {})
                    ]
                }).catch(error => {});
            })
            .catch(error => {});
    } catch (error) {
        bot.error('Error in Slash Command ping', error);
    }
};

module.exports.data = bot => {
    var slashCommandData = new SlashCommandBuilder().setName('ping').setDescription('Bot Ping');
    return slashCommandData.toJSON();
};

module.exports.active = true;
