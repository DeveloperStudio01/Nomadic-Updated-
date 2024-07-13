import cookieParser from "cookie-parser";
import express from 'express'

const router=express.Router()

router.get('/setcookie', (req, res) => {
    res.cookie(`Cookie token name`,`encrypted cookie string Value`);
    res.send('Cookie have been saved successfully');
});

//show the saved cookies
router.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies);
});

// delete the saved cookie
router.get('/deletecookie', (req, res) => {
    res.clearCookie()
    res.send('Cookie has been deleted successfully');
});

export default router