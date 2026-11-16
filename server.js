
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/feedback", (req, res) => {
    const name = req.body.name;
    const feedback = req.body.feedback;

    res.send(`
        <html>
        <head>
            <title>Feedback Received</title>
            <style>
                body {
                    font-family: Arial;
                    text-align: center;
                    padding: 50px;
                    background: linear-gradient(120deg, #e8ddff, #d9efff);
                }
                .box {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 450px;
                    margin: auto;
                }
                a { color: #62517f; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>Thank You, ${escapeHTML(name)}!</h2>
                <p>Your feedback has been received successfully.</p>
                <p><b>Your feedback:</b> ${escapeHTML(feedback)}</p>
                <a href="/">Go Back</a>
            </div>
        </body>
        </html>
    `);
});

function escapeHTML(value) {
    return String(value || "").replace(/[&<>"']/g, function(char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];
    });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
