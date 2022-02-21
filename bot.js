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

// append process.env variables by .env file
require('dotenv').config();

// require modules
const { Client, Intents } = require('discord.js');
const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const Enmap = require('enmap');

const { Logger } = require('./modules/node-logger');

const cachePath = process.cwd() + '/cache.json';
if (!fs.existsSync(cachePath)) {
    fs.writeFileSync(cachePath, JSON.stringify({}));
}

// create the Discord Client
const bot = new Client({
    intents: new Intents(98047),
    restRequestTimeout: 10000
});

// enable module caching by adding a new global require function
bot.modules = {};
global.moduleRequire = mod => {
    if (bot.modules[mod]) return bot.modules[mod];
    bot.modules[mod] = require(mod);
    return bot.modules[mod];
};

// add global fetch extension
import('node-fetch').then(({ default: fetch }) => {
    global.fetch = fetch;
    bot.fetch = fetch;
});

bot.ignoredPath = process.cwd() + '/.ignore_watch/';

bot.logger = new Logger('DiscordBot', 'main »').setDebugging(0 + process.env.DEBUG);

// Declare Bot Variables
bot.configs = {};
bot.interactions = new Enmap();
bot.slash_commands = new Enmap();

bot.banListPageMaxCount = process.env.BAN_LIST_PAGE_MAX_COUNT || 10;

bot.cacheJSON = require(cachePath);

// require configs
fs.readdir('./configs/', (error, files) => {
    if (error) throw error;
    files.forEach(file => {
        try {
            if (!file.endsWith('.json')) return;
            const config = require(`./configs/${file}`);
            let configName = file.split('.')[0];
            bot.configs[configName] = config;
            bot.logger.debug(`[CONFIG LOADED] » configs.${configName}...`);
        } catch (error) {
            bot.logger.error(error);
        }
    });
});

// load bot events
fs.readdir('./events/', (error, files) => {
    if (error) throw error;
    files.forEach(file => {
        try {
            if (!file.endsWith('.js')) return;
            const event = require(`./events/${file}`);
            let eventName = file.split('.')[0];
            bot.logger.debug(`[BOTEVENT LOADED] » events.${eventName}...`);
            bot.on(eventName, event.bind(null, bot));
        } catch (error) {
            bot.logger.error(error);
        }
    });
});

// init mongodb handle
require('./modules/database').appendDatabaseHandler(bot);
// require tools
bot.tools = moduleRequire('./tools');

// load interaction commands
fs.readdir('./interactions/', (error, files) => {
    if (error) throw error;
    files.forEach(file => {
        try {
            if (!file.endsWith('.js')) return;
            if (file.startsWith('_')) return;
            let props = require(`./interactions/${file}`);
            if (props.active == true) {
                let commandName = file.split('.')[0];
                bot.interactions.set(commandName, props);
                bot.logger.debug(`[INTERACTION COMMAND LOADED] >> interactions.${commandName}`);
            }
        } catch (error) {
            bot.logger.error(error);
        }
    });
});

// load interaction commands
fs.readdir('./slash_commands/', (error, files) => {
    if (error) throw error;
    files.forEach(file => {
        try {
            if (!file.endsWith('.js')) return;
            if (file.startsWith('_')) return;
            let props = require(`./slash_commands/${file}`);
            if (props.active == true) {
                let commandName = file.split('.')[0];
                bot.slash_commands.set(commandName, props);
                bot.logger.debug(`[SLASH COMMAND LOADED] >> slash_commands.${commandName}`);
            }
        } catch (error) {
            bot.logger.error(error);
        }
    });
});

// save cache.json method
bot.writeCacheJSON = data => fs.writeFileSync(cachePath, typeof data === 'string' ? data : JSON.stringify(data) || JSON.stringify({}));

process.on('SIGINT', () => {
    bot.writeCacheJSON();
});

process.on('SIGTERM', () => {
    bot.writeCacheJSON();
});

process.on('exit', () => {
    bot.writeCacheJSON();
});

// handler/client for slash commands thinhs
bot.restClient = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);
// finally login bot
bot.login(process.env.BOT_TOKEN);
