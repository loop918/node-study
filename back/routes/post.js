const express = require('express');
const router = express.Router();
const mysql = require('../lib/db');

let conn = null;
// GET. /board/
router.get("/", async (req, res) => {
    try {
        conn = await mysql.getConnection();
        let sql = "SELECT * FROM BOARD";
        let [result] = await conn.query(sql);
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        res.status(400).json(err);
    } finally {
        conn.release();
    }
}); 

//GET. /board/:bnum
router.get("/:id", async(req,res) => {
    try {
        conn = await mysql.getConnection();
        let sql = "SELECT * FROM BOARD WHERE bnum = ?";
        let parmas = req.body.bnum;
        let [result] = await conn.query(sql, params, (err) => {
            if(err) throw err;
        })
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        return res.status(500).json(err);
    } finally {
        conn.release();
    }
});

// POST. /board
router.post("/", async(req, res) => {
    try {
        conn = await mysql.getConnection();
        let body = req.body;
        let sql = "INSERT INTO BOARD(id ,title, content) VALUES(?, ?, ?)";
        let params = [body.id, body.title, body.content];
        await conn.query(sql, params, (err) => {
            if(err) throw err
        });
        res.status(200).json({result:'success'});
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    } finally {
        conn.release();
    }
});

// PATCH. /board/:bnum
router.patch("/:bnum", async (req,res) => {
    try {
        conn = await mysql.getConnection();
        let body = req.body;
        let sql = "UPDATE BOARD SET TITLE=?, CONTENT=? WHERE BNUM=?";
        let params = [body.title , body.content, body.bnum];
        await  conn.query(sql, params, (err) => {
            if(err) throw err;
        })
        res.status(200).json({result : 'success'});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    } finally {
        conn.release();
    }
});

//DELETE. /board/:bnum
router.delete("/:bnum", async (req,res) => {
    try {
        conn = await mysql.getConnection();
        let body = req.body;
        let sql = "DELETE FROM BOARD WHERE BNUM=?"
        let params = [body.bnum];
        await conn.query(sql,params, (err) => {
            if(err) throw err;
        });
        res.status(200).json({result : 'success'});
    } catch(err) {
        console.error(err);
        res.status(500).json(err);
    } finally {
        conn.release();
    }
});

module.exports = router;