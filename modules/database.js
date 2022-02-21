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

const MongoClient = require('./mongo-client');

var client = new MongoClient(process.env.DATABASE_CONNECTION);

module.exports.appendDatabaseHandler = bot => {
    bot.db = {
        client: client
    };

    bot.db.queryAsync = async (collection, searchQuery) => bot.db.client.queryAsync(process.env.DATABASE_NAME, collection, searchQuery);
    bot.db.insertAsync = async (collection, data) => bot.db.client.insertObjectAsync(process.env.DATABASE_NAME, collection, data);
    bot.db.updateAsync = async (collection, searchQuery, data) => bot.db.client.updateObjectAsync(process.env.DATABASE_NAME, collection, searchQuery, data);
    bot.db.deleteAsync = async (collection, searchQuery) => bot.db.client.deleteObjectAsync(process.env.DATABASE_NAME, collection, searchQuery);
    bot.db.rawQueryAsync = async (database, collection, searchQuery) => bot.db.client.queryAsync(database, collection, searchQuery);
    bot.db.rawInsertAsync = async (database, collection, data) => bot.db.client.insertObjectAsync(database, collection, data);
    bot.db.rawUpdateAsync = async (database, collection, searchQuery, data) => bot.db.client.updateObjectAsync(database, collection, searchQuery, data);
    bot.db.rawDeleteAsync = async (database, collection, searchQuery) => bot.db.client.deleteObjectAsync(database, collection, searchQuery);
};
