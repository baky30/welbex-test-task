const db = require('../db')


class RecordController {
    async createRecord(req, res) {
        const {date, title, quantity, distance} = req.body;
        const newRecord = await db.query(`INSERT INTO records (date, title, quantity, distance) values ($1, $2, $3, $4) RETURNING *`, [date, title, quantity, distance]);

        res.json(newRecord.rows[0]);
    }

    async getRecords(req, res) {
        let records, totalCount;
        const { page, fieldName, condition, inputValue } = req.query;
        const limit = 4;
        const offset = page * limit - limit;

        if (fieldName && condition && inputValue) {
            let getRecordsQuery, getRowsCountQuery, queryCondition;

            switch (condition) {
                case "contains": queryCondition = "like"; break;
                case "equals":   queryCondition = "="; break;
                case "greater":  queryCondition = ">"; break;
                case "less":     queryCondition = "<"; break;
            }

            if (condition === 'contains') {
                getRecordsQuery = `select * from records where cast(${fieldName === 'title' ? 'lower(title)' : fieldName} AS TEXT) ${queryCondition} '%${inputValue}%' offset ${offset} limit ${limit}`
                getRowsCountQuery = `select count(*) from records WHERE CAST(${fieldName === 'title' ? 'lower(title)' : fieldName} AS TEXT) ${queryCondition} '${inputValue}'`
            } else {
                getRecordsQuery = `select * from records where ${fieldName} ${queryCondition} '${inputValue}' offset ${offset} limit ${limit}`
                getRowsCountQuery = `select count(*) from records WHERE ${fieldName} ${queryCondition} '${inputValue}'`
            }

            records = await db.query(getRecordsQuery)
            totalCount = await db.query(getRowsCountQuery)
        } else {
            records = await db.query(`select * from records offset ${offset} limit ${limit}`);
            totalCount = await db.query(`select count(*) from records`);
        }

        const data = {
            records: records.rows,
            totalCount: totalCount.rows[0].count
        }

        res.json(data);
    }

    async getOneRecord(req, res) {
        const id = req.params.id;
        const record = await db.query('SELECT * FROM weblex WHERE id = $1', [id]);

        return res.json(record.rows[0]);
    }
}

module.exports = new RecordController()

