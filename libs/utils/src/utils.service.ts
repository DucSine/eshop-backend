import { ConfigService } from '@app/configs';
import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { AES, enc } from 'crypto-js';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';

dayjs.extend(utc);

@Injectable()
export class UtilsService {
    private static _instance: UtilsService;

    static getInstance() {
        if (this._instance) return this._instance;

        this._instance = new UtilsService();
        Object.freeze(this._instance);
        return this._instance;
    }

    /**
     * Convert any phone format to international format
     *
     * Default country is Vietnam
     *
     * @param phone
     * @param defaultCountry
     * @returns The International format
     */
    toIntlPhone(phone: string, defaultCountry: CountryCode = 'VN') {
        return parsePhoneNumber(phone, defaultCountry).formatInternational();
    }

    /**
     * Convert original text to hash text
     *
     * @param text
     * @returns The hash text
     */
    hashValue(text: string) {
        return hashSync(text, genSaltSync(10));
    }

    /**
     * Compare hash
     *
     * @param text
     * @param hashText
     * @returns result
     */
    compareHash(text: string, hashText: string) {
        return compareSync(text, hashText);
    }

    /**
     * Encryption value
     *
     * @param payload
     * @returns token
     */
    encryptValue(payload: any): string {
        return AES.encrypt(
            JSON.stringify(payload),
            ConfigService.getInstance().get('SERCRET_KEY')
        ).toString();
    }

    /**
     *  Decryption value
     * @param token
     * @returns payload
     */
    decryptValue(token: string): any {
        const decrypt = AES.decrypt(token, ConfigService.getInstance().get('SERCRET_KEY'));
        return JSON.parse(decrypt.toString(enc.Utf8));
    }

    /**
     * Get current timestamp
     *
     * @param isMiliseconds
     * @returns number
     */
    getCurrentTimestamp(isMiliseconds = false) {
        const currentDate = dayjs();
        return isMiliseconds ? currentDate.valueOf() : currentDate.unix();
    }

    /**
     * Get date
     *
     * @param date
     * @param isUTC
     * @param format
     * @returns dayjs.Dayjs
     */
    getDate(date?: string | number | dayjs.Dayjs, format?: string, isUTC = false) {
        const currentDate = isUTC ? dayjs.utc(date, format) : dayjs(date, format);
        return currentDate;
    }

    /**
     * Get full range date
     *
     * @param from
     * @param to
     * @param defaultCurrentDateOnUndefined
     * @returns [Date, Date]
     */
    getFullRangeDate(from?: string, to?: string, defaultCurrentDateOnUndefined = false) {
        if (defaultCurrentDateOnUndefined) {
            return [dayjs(from).startOf('day').toDate(), dayjs(to).endOf('day').toDate()];
        }
        return [
            from ? dayjs(from).startOf('day').toDate() : undefined,
            to ? dayjs(to).endOf('day').toDate() : undefined
        ];
    }
}
