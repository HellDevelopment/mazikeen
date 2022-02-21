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

module.exports = {};

module.exports.copyObject = mainObject => {
    let objectCopy = {};
    let key;
    for (key in mainObject) {
        objectCopy[key] = mainObject[key];
    }
    return objectCopy;
};

module.exports.isArray = toCheckVar => toCheckVar !== null && Array.isArray(toCheckVar);

/**
 * Check if a given string is an URL
 * @param {String} str
 */
module.exports.isUrl = str => {
    try {
        let url = new URL(str);
    } catch (err) {
        return false;
    }
    return true;
};

module.exports.isValidUrl = str => {
    var pattern = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$',
        'i'
    ); // fragment locator
    return !!pattern.test(str);
};

/**
 * returns a new Random generated Color ( you can provide a min brightness from 0-255 )
 */
module.exports.randomColor = (brightness = 0) => {
    // return (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    function randomChannel(brightness) {
        var r = 255 - brightness;
        var n = 0 | (Math.random() * r + brightness);
        var s = n.toString(16);
        return s.length == 1 ? '0' + s : s;
    }
    return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
};

function timePad(n, z = 2) {
    return n;
}

module.exports.msToTimeStrings = milliseconds => {
    var seconds = Math.floor(milliseconds / 1000),
        minutes = Math.floor(seconds / 60),
        hours = Math.floor(minutes / 60),
        days = Math.floor(hours / 24),
        months = Math.floor(days / 30),
        years = Math.floor(days / 365);
    seconds %= 60;
    minutes %= 60;
    hours %= 24;
    days %= 30;
    months %= 12;

    if (years > 0) return [timePad(years) + ' year(s)', timePad(months) + ' month(s)', timePad(days) + ' day(s)'];
    if (months > 0) return [timePad(months) + ' month(s)', timePad(days) + ' day(s)', timePad(hours) + ' hour(s)'];
    if (days > 0) return [timePad(days) + ' day(s)', timePad(hours) + ' hour(s)', timePad(minutes) + ' minute(s)'];
    if (hours > 0) return [timePad(hours) + ' hour(s)', timePad(minutes) + ' minute(s)', timePad(seconds) + ' second(s)'];
    if (minutes > 0) return [timePad(minutes) + ' minute(s)', timePad(seconds) + ' second(s)'];
    if (seconds > 0) return [timePad(seconds) + ' second(s)'];
};

module.exports.msToDays = milliseconds => {
    return milliseconds / 1000 / 60 / 60 / 24;
};

module.exports.randomMinMax = (min, max) => {
    if (min >= max) throw new Error('Max must be greater then min.');
    return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports.randomInterval = async (minDelay, maxDelay, intervalFunction) => {
    var getRandomNumberBetween = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var runFunction = () => {
        intervalFunction();
        createRandomInterval();
    };

    var createRandomInterval = () => {
        setTimeout(runFunction, getRandomNumberBetween(minDelay, maxDelay));
    };

    return createRandomInterval();
};
/**
 * paginate arrays
 */
module.exports.paginateArray = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};

/**
 * paginate collections
 */
module.exports.paginateCollection = (col, page_size, page_number) => {
    var arr = [];
    col.each(curr => arr.push(curr));
    arr = this.paginateArray(arr, page_size, page_number);
    return col.filter(curCol => arr.includes(curCol));
};
