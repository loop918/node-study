const express = require('express');
const router = express.Router();
const mysql = require('../lib/db');

let conn = null;
// GET. /user
router.get("/", async (req, res) => {
    try {
        conn = await mysql.getConnection();
        let sql = "SELECT * FROM MEMBER";
        let [result] = await conn.query(sql);
        res.status(200).json(result);
    } catch(err) {
        console.error(err);
        res.status(400).json(err);
    } finally {
        conn.release();
    }
}); 

//GET. /user/:id
router.get("/:id", async(req,res) => {
    try {
        conn = await mysql.getConnection();
        let sql = "SELECT * FROM MEMBER WHERE id = ?";
        let parmas = req.body.id;
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

// POST. /user
router.post("/", async(req, res) => {
    try {
        conn = await mysql.getConnection();
        let body = req.body;
        let sql = "INSERT INTO MEMBER(id ,pw, email) VALUES('yongbin','1234','nextbigthing90@naver.com')";
        let params = [body.id, body.pw, body.email];
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

// PATCH. /:id
router.patch("/:id", async (req,res) => {
    try {
        conn = await mysql.getConnection();
        let body = req.body;
        let sql = "UPDATE MEMBER SET PW=?, EMAIL=? WHERE ID=?";
        let params = [body.id , body.pw, body.email];
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

//DELETE. /:id
router.delete("/:id", async (req,res) => {
    try {
        conn = await mysql.getConnection();
        let body = req.body;
        let sql = "DELETE FROM MEMBER WHERE ID=?"
        let params = [body.id];
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
